"use client";
import { StructuredText, useQuerySubscription } from "react-datocms";
import Hero from "@/components/Hero";
import React from "react";
import CardBlock from "@/components/CardBlock";
import TextImage from "@/components/TextImage";

export function RealtimeHome({ subscription }: { subscription: any }) {
  const { data, error, status } = useQuerySubscription(subscription);
  // console.log(data, error, status);
  return (
    <div className="space-y-20">
      {data.home?.content?.map((item: any) => {
        // console.log(item.__typename);
        switch (item._modelApiKey) {
          case "hero":
            return <Hero key={item.key} {...item} />;
          case "richtext_block":
            return (
              <div className="container mx-auto bg-neutral-50 px-6 py-12 text-center md:px-12 lg:text-left my-10">
                <StructuredText data={item?.content?.value} />
              </div>
            );
          case "cardblock":
            return (
              <div className="container mx-auto bg-neutral-50 px-6 py-12 text-center md:px-12 lg:text-left my-10">
                <CardBlock key={item.key} {...item} />
              </div>
            );
          case "textimage":
            return (
              <div className="container mx-auto bg-neutral-50 px-6 py-12 text-center md:px-12 lg:text-left my-10">
                <TextImage key={item.key} {...item} />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
