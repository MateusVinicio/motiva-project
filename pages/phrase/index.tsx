import { GetStaticProps } from "next";

import { prisma } from "../../lib/prisma";
import { Phrase } from "@prisma/client";

interface PhraseProps {
  data: Phrase;
}

export default function PagePhrase({ data }: PhraseProps) {
  return (
    <div>
        <h1>Frase do dia </h1>
        <br />

        <div>
          <span>{data.id}</span>
          <span>{data.description}</span>
        </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {

    const count = await prisma.phrase.count();
    const id = getRandomPhrase(count);
    const phrase = await prisma.phrase.findUnique({
        where: {
            id : id
        }
    });

  return {
    props: {
        data: phrase,
    }
  };
};

const getRandomPhrase = (count:number) => {

    const randomNumber = Math.floor((Math.random() * count) + 1);
  
    return randomNumber;
  }
