import { GetStaticProps } from "next";

import { prisma } from "../../lib/prisma";
import { Phrase } from "@prisma/client";

interface TopPhrasesProps {
  phrases: Array<Phrase>;
}

export default function TopPhrases({ phrases }: TopPhrasesProps) {
  return (
    <div>
      <h1>Frases</h1>
      <br />

      {phrases.map((phrase, index) => (
        <div key={index}>
          <span>{phrase.id}</span>
          <span>{phrase.description}</span>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const phrases = await prisma.phrase.findMany();

  return {
    props: {
      phrases,
    },
    revalidate: 10,
  };
};
