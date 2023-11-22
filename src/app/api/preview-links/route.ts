import { NextResponse } from "next/server";

const cors = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
};

function generatePreviewUrl(item, itemType, locale: string) {
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
  return new Response("OK", cors);
}

export async function POST(request: Request) {
  const body = await request.json();

  const url = generatePreviewUrl(body.item, body.itemType, body.locale);

  if (!url) {
    return NextResponse.json({ previewLinks: [] }, cors);
  }

  const baseUrl = process.env.VERCEL_URL
    ? // Vercel auto-populates this environment variable
      `https://${process.env.VERCEL_URL}`
    : // Netlify auto-populates this environment variable
      process.env.URL;

  const previewLinks = [
    // Public URL:
    {
      label: "Published version",
      url: `${baseUrl}${url}`,
    },
    // This requires an API route on your project that starts Next.js Preview Mode
    // and redirects to the URL provided with the `redirect` parameter:
    {
      label: "Draft version",
      url: `${baseUrl}/api/draft?redirect=${url}&secret=${process.env.PREVIEW_MODE_SECRET}`,
    },
  ];

  return NextResponse.json({ previewLinks: previewLinks }, cors);
}
