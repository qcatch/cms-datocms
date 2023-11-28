import { buildClient } from "@datocms/cma-client-node";
import { NextResponse } from "next/server";
import { Client } from "@datocms/cma-client";

const corsInitOptions = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
};

const baseUrl = process.env.VERCEL_BRANCH_URL
  ? // Vercel auto-populates this environment variable
    `https://${process.env.VERCEL_BRANCH_URL}`
  : // Netlify auto-populates this environment variable
    process.env.URL;

async function installWebPreviewsPlugin(client: Client) {
  const webPreviewsPlugin = await client.plugins.create({
    package_name: "datocms-plugin-web-previews",
  });

  await client.plugins.update(webPreviewsPlugin, {
    parameters: {
      frontends: [
        { name: "Production", previewWebhook: `${baseUrl}/api/preview-links` },
      ],
      startOpen: true,
    },
  });
}

/*
  This endpoint is called right after bootstrapping the Starter project...
  it can be removed afterwards!
*/

export async function OPTIONS() {
  return NextResponse.json({ success: true }, corsInitOptions);
}

export async function POST(request: Request) {
  const requestBody = await request.json();
  const client = buildClient({ apiToken: requestBody.datocmsApiToken });

  try {
    await Promise.all([installWebPreviewsPlugin(client)]);

    return NextResponse.json({ success: true }, corsInitOptions);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
        request: error.request,
        response: error.response,
      },
      { ...corsInitOptions, status: 500 },
    );
  }
}
