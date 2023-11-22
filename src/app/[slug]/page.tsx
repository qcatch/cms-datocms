import { performRequest } from "@/lib/datacms";
import { PAGE_QUERY } from "@/lib/datacms.query";
import { AppRouteProps } from "@/models/app-route.model";
import FAQBlock from "@/components/FAQBlock";
import TextImage from "@/components/TextImage";
import { draftMode } from "next/headers";
import PriceCardBlock from "@/components/PriceCardBlock";
import { metadata } from "@/app/layout";

export async function generateMetadata({ params }: AppRouteProps) {
  const { isEnabled } = draftMode();

  const pageRequest = {
    query: PAGE_QUERY,
    includeDrafts: isEnabled,
    variables: { slug: params.slug },
  };

  const { page } = await performRequest(pageRequest);

  return {
    title: `${page.title}: ${metadata.title}`,
  };
}

export default async function Page({ params }: AppRouteProps) {
  const { isEnabled } = draftMode();

  const pageRequest = {
    query: PAGE_QUERY,
    includeDrafts: isEnabled,
    variables: { slug: params.slug },
  };

  const { page } = await performRequest(pageRequest);

  return (
    <div className="container my-24 mx-auto md:px-6">
      {page?.content?.map((item) => {
        // console.log(item.__typename);
        switch (item.__typename) {
          case "CardpriceblockRecord":
            return <PriceCardBlock key={item._key} {...item} />;
          case "FaqblockRecord":
            return <FAQBlock key={item.key} {...item} />;
          case "TextimageRecord":
            return <TextImage key={item.key} {...item} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
