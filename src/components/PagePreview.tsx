"use client";
import { StructuredText, useQuerySubscription } from "react-datocms";
import Hero from "@/components/Hero";
import FAQBlock from "@/components/FAQBlock";
import TextImage from "@/components/TextImage";
import React from "react";
import CardBlock from "@/components/CardBlock";

export function RealtimePage({ subscription }: { subscription: any }) {
  const { data, error, status } = useQuerySubscription(subscription);
  return (
    data && (
      <div className="container my-24 mx-auto md:px-6">
        {data.page?.content?.map((item: any) => {
          // console.log(item.__typename);
          switch (item.__typename) {
            case "CardblockRecord":
              return <CardBlock key={item._key} {...item} />;
            case "FaqblockRecord":
              return <FAQBlock key={item.key} {...item} />;
            case "TextimageRecord":
              return <TextImage key={item.key} {...item} />;
            case "HeroRecord":
              return <Hero key={item.key} {...item} />;
            case "RichtextBlockRecord":
              return (
                <div className="bg-neutral-50 px-6 py-12 text-center md:px-12 lg:text-left my-10">
                  <StructuredText data={item?.content?.value} />
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    )
  );
}
