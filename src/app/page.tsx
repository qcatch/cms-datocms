import { performRequest } from "@/lib/datacms";
import { draftMode } from "next/headers";
import { RealtimeHome } from "@/components/HomePreview";
import Hero from "@/components/Hero";
import PriceCardBlock from "@/components/PriceCardBlock";
import FAQBlock from "@/components/FAQBlock";
import TextImage from "@/components/TextImage";
import { StructuredText } from "react-datocms";
import React from "react";

const PAGE_CONTENT_QUERY = `query Home {
  home {
    content {
      ... on HeroRecord {
      _modelApiKey
        id
        _createdAt
        image {
          responsiveImage(imgixParams: { fit: crop, w: 1200, h: 1200 }) {
            width
            webpSrcSet
            srcSet
            src
            title
            sizes
            height
            bgColor
            base64
            aspectRatio
            alt
          }
          title
        }
        buttons {
          title
          link
        }
        title
      }
      ... on RichtextBlockRecord {
      _modelApiKey
        id
        content {
          value
        }
      }
    }
    title
    id
  }
}`;

function getPageRequest({ includeDrafts }) {
  return { query: PAGE_CONTENT_QUERY, includeDrafts };
}

export default async function Home() {
  const { isEnabled } = draftMode();

  const pageRequest = getPageRequest({ includeDrafts: isEnabled });
  const data = await performRequest(pageRequest);
  console.log(data);
  return isEnabled ? (
    <>
      <RealtimeHome
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
    </>
  );
}
