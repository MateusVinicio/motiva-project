import { GetStaticProps } from "next";

import { prisma } from "../../lib/prisma";
import { Phrase } from "@prisma/client";
import { Card } from "antd";

interface TopPhrasesProps {
  phrases: Array<Phrase>;
}

export default function TopPhrases({ phrases }: TopPhrasesProps) {
  return (
    <div>
      <h1 style={{ color: "#403e3b", fontSize: "1.85rem" }}>
        Top 10 frases mais comentadas
      </h1>

      {phrases.map((phrase, index) => (
        <div key={index}>
          <Card
            bordered={false}
            headStyle={{ color: "#403e3b", fontSize: "1.85rem" }}
            style={{ width: 800, marginTop: "2rem" }}
          >
            <h3>
              <p>&ldquo;{phrase.description}&rdquo;</p>
            </h3>
          </Card>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const phrases = await prisma.phrase.findMany({
    take: 10,
  });

  return {
    props: {
      phrases,
    },
    revalidate: 10,
  };
};
