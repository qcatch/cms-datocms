import { performRequest } from "@/lib/datacms";
import { PAGE_QUERY } from "@/lib/datacms.query";
import { AppRouteProps } from "@/models/app-route.model";
import FAQBlock from "@/components/FAQBlock";
import TextImage from "@/components/TextImage";
import { draftMode } from "next/headers";
import PriceCardBlock from "@/components/PriceCardBlock";
import { metadata } from "@/app/layout";
import { RealtimePage } from "@/components/PagePreview";
import Hero from "@/components/Hero";
import React from "react";
import { StructuredText } from "react-datocms";
import CardBlock from "@/components/CardBlock";

export async function generateMetadata({ params }: AppRouteProps) {
  const { isEnabled } = draftMode();

  const pageRequest = {
    query: PAGE_QUERY,
    includeDrafts: isEnabled,
    variables: { slug: params.slug },
  };

  const { page } = await performRequest(pageRequest);

  return {
    title: `${page?.title}: ${metadata.title}`,
  };
}

export default async function Page({ params }: AppRouteProps) {
  const { isEnabled } = draftMode();

  const pageRequest = {
    query: PAGE_QUERY,
    includeDrafts: isEnabled,
    variables: { slug: params.slug },
  };

  const data = await performRequest(pageRequest);

  return isEnabled ? (
    <>
      <RealtimePage
        subscription={{
          ...pageRequest,
          initialData: data,
          environment: process.env.NEXT_DATOCMS_ENVIRONMENT,
          token: process.env.NEXT_DATOCMS_API_TOKEN,
        }}
      />
    </>
  ) : (
    <>
      <div className="container my-24 mx-auto md:px-6">
        {data?.page?.content?.map((item: any) => {
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
    </>
  );
}
