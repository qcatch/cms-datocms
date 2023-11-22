import { performRequest } from "@/lib/datacms";
import { draftMode } from "next/headers";
import { RealtimeHome } from "@/components/HomePreview";
import Hero from "@/components/Hero";

const PAGE_CONTENT_QUERY = `
  query Home {
    home {
      title
      homehero {
        title
        image {
          responsiveImage(imgixParams: { fit: crop, w: 600, h: 600 }) {
            sizes
            src
            width
            height
            alt
            title
            base64
          }
        }
        buttons {
          title
          link
        }
      }
    }
  }`;

function getPageRequest({ includeDrafts }) {
  return { query: PAGE_CONTENT_QUERY, includeDrafts };
}

export default async function Home() {
  const { isEnabled } = draftMode();

  const pageRequest = getPageRequest({ includeDrafts: isEnabled });
  const data = await performRequest(pageRequest);

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
        {data?.home?.homehero?.map((hero) => (
          <Hero
            key={hero.title}
            title={hero.title}
            buttons={hero.buttons}
            image={hero.image}
          />
        ))}
      </div>
    </>
  );
}
