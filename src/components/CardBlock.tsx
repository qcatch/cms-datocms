import React from "react";
import Card, { CardProps } from "@/components/Card";

interface CardBlockProps {
  title: string;
  price: string;
  cards: CardProps[];
}

const CardBlock: React.FC<CardBlockProps> = ({ title, cards, price }) => {
  return (
    <section className="py-10 bg-gray-100 sm:py-16 lg:py-24 mb-5">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-800 sm:text-4xl lg:text-5xl">
            {title} <span className="text-blue-600">{price}</span>
          </h2>
        </div>

        <div className="grid max-w-xl grid-cols-1 mx-auto mt-8 text-center lg:max-w-full sm:mt-12 lg:mt-20 lg:grid-cols-3 gap-x-6 xl:gap-x-12 gap-y-6">
          {cards.map((item) => (
            <div className="mb-6 lg:mb-0" key={item.id}>
              <Card {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardBlock;