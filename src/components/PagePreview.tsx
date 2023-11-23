"use client";
import { StructuredText, useQuerySubscription } from "react-datocms";
import Hero from "@/components/Hero";
import PriceCardBlock from "@/components/PriceCardBlock";
import FAQBlock from "@/components/FAQBlock";
import TextImage from "@/components/TextImage";
import React from "react";

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
          case "RichtextBlockRecord":
            return (
              <div className="bg-neutral-50 px-6 py-12 text-center dark:bg-neutral-900 md:px-12 lg:text-left">
                <StructuredText data={item?.content?.value} />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
