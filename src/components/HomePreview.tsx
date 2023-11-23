"use client";
import { StructuredText, useQuerySubscription } from "react-datocms";
import Hero from "@/components/Hero";
import React from "react";

export function RealtimeHome({ subscription }) {
  const { data, error, status } = useQuerySubscription(subscription);
  console.log(data, error, status);
  return (
    <div className="space-y-20">
      {data.home?.content?.map((item) => {
        // console.log(item.__typename);
        switch (item._modelApiKey) {
          case "hero":
            return <Hero key={item.key} {...item} />;
          case "richtext_block":
            return (
              <div className="container mx-auto bg-neutral-50 px-6 py-12 text-center dark:bg-neutral-900 md:px-12 lg:text-left my-10">
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
