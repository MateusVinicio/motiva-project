import { GetStaticProps } from "next";
import { Card, Comment, Avatar, Tooltip } from "antd";
import { prisma } from "../lib/prisma";
import { Comment as Cm, Phrase } from "@prisma/client";

interface PhraseProps {
  data: Phrase & { comments: Cm[] };
}

export default function PagePhrase({ data }: PhraseProps) {
  return (
    <div>
      <Card
        title="Frase do dia"
        bordered={false}
        headStyle={{ color: "#403e3b", fontSize: "1.85rem" }}
        style={{ width: 800 }}
      >
        <h3>
          <p>"{data.description}"</p>
        </h3>
      </Card>

      {data.comments.map((comment, index) => (
        <div key={index} style={{ marginTop: "2rem" }}>
          <Comment
            author={<a>{comment.username}</a>}
            avatar={
              <Avatar
                src="https://joeschmoe.io/api/v1/random"
                alt={comment.username}
              />
            }
            content={<p>{comment.description}</p>}
          />
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const count = await prisma.phrase.count();
  const id = getRandomPhrase(count);
  const phrase = await prisma.phrase.findUnique({
    where: {
      id: id,
    },
    include: {
      comments: true,
    },
  });

  return {
    props: {
      data: phrase,
    },
  };
};

const getRandomPhrase = (count: number) => {
  const randomNumber = Math.floor(Math.random() * count + 1);

  return randomNumber;
};
