"use client";
import { useQuerySubscription } from "react-datocms";
import Hero from "@/components/Hero";
import PriceCardBlock from "@/components/PriceCardBlock";
import FAQBlock from "@/components/FAQBlock";
import TextImage from "@/components/TextImage";

export function RealtimePage({ subscription }) {
  const { data, error, status } = useQuerySubscription(subscription);
  // console.log(data, error, status);
  return (
    <div className="container my-24 mx-auto md:px-6">
      {data.page?.content?.map((item) => {
        // console.log(item.__typename);
        switch (item.__typename) {
          case "CardpriceblockRecord":
            return <PriceCardBlock key={item._key} {...item} />;
          case "FaqblockRecord":
            return <FAQBlock key={item.key} {...item} />;
          case "TextimageRecord":
            return <TextImage key={item.key} {...item} />;
          case "HeroRecord":
            return <Hero key={item.key} {...item} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
