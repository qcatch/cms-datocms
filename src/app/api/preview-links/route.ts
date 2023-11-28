import { NextResponse } from "next/server";
import { SchemaTypes } from "@datocms/cma-client-node";
import { cookies } from "next/headers";

const cors = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
};

function generatePreviewUrl(
  item: SchemaTypes.Item,
  itemType: SchemaTypes.ItemType,
  locale: string,
) {
  // console.log("APIKEY:", itemType.attributes.api_key);
  // console.log("SLUG:", item.attributes.slug);
  switch (itemType.attributes.api_key) {
    case "home":
      return "/";
    case "page":
      return `/${item.attributes.slug}`;
    default:
      return null;
  }
}

export async function OPTIONS() {
  return NextResponse.json({ success: true }, cors);
}

export async function POST(request: Request) {
  const body = await request.json();

  const url = generatePreviewUrl(body.item, body.itemType, body.locale);

  if (!url) {
    return NextResponse.json({ previewLinks: [] }, cors);
  }

  const cookieStore = cookies();
  const cookie = cookieStore.get("__prerender_bypass")!;
  cookies().set({
    name: "__prerender_bypass",
    value: cookie?.value,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });

  const baseUrl = process.env.VERCEL_URL
    ? // Vercel auto-populates this environment variable
      `https://${process.env.VERCEL_URL}`
    : // Netlify auto-populates this environment variable
      process.env.URL;

  const previewLinks = [
    {
      label: "Draft version",
      url: `${baseUrl}/api/draft?redirect=${url}&secret=${process.env.NEXT_DATOCMS_PREVIEW_SECRET}`,
    },
    // This requires an API route on your project that starts Next.js Preview Mode
    // and redirects to the URL provided with the `redirect` parameter:
    {
      label: "Published version",
      url: `${baseUrl}/api/exit-draft?redirect=${url}&secret=${
        process.env.NEXT_DATOCMS_PREVIEW_SECRET || ""
      }`,
    },

    // Public URL:
  ];

  return NextResponse.json({ previewLinks }, cors);
}
