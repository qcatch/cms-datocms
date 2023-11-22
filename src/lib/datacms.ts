import { cache } from "react";

interface GraphQLResponse {
  data: any;
  errors?: any[];
  [key: string]: any;
}

const HTTPS_GRAPHQL_DATOCMS_COM = "https://graphql.datocms.com/";
const NEXT_DATOCMS_API_TOKEN: string | undefined =
  process.env.NEXT_DATOCMS_API_TOKEN;
const NEXT_DATOCMS_ENVIRONMENT: string | undefined =
  process.env.NEXT_DATOCMS_ENVIRONMENT;
const AUTHORIZATION_BEARER: string = `Bearer ${NEXT_DATOCMS_API_TOKEN}`;

const dedupedFetch = cache(async (serializedInit: any) => {
  const response = await fetch(
    HTTPS_GRAPHQL_DATOCMS_COM,
    JSON.parse(serializedInit),
  );
  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(
      `${response.status} ${response.statusText}: ${JSON.stringify(
        responseBody,
      )}`,
    );
  }
  return await response.json();
});

export async function performRequest({
  query,
  variables = {},
  includeDrafts = true,
  excludeInvalid = false,
  visualEditingBaseUrl,
  revalidate,
}: {
  query: string;
  variables?: Record<string, any>;
  includeDrafts?: boolean;
  excludeInvalid?: boolean;
  visualEditingBaseUrl?: string;
  revalidate?: any;
}): Promise<GraphQLResponse> {
  const { data } = await dedupedFetch(
    JSON.stringify({
      method: "POST",
      headers: {
        Authorization: AUTHORIZATION_BEARER,
        ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
        ...(excludeInvalid ? { "X-Exclude-Invalid": "true" } : {}),
        ...(visualEditingBaseUrl
          ? {
              "X-Visual-Editing": "vercel-v1",
              "X-Base-Editing-Url": visualEditingBaseUrl,
            }
          : {}),
        ...(NEXT_DATOCMS_ENVIRONMENT
          ? { "X-Environment": NEXT_DATOCMS_ENVIRONMENT }
          : {}),
      },
      body: JSON.stringify({ query, variables, revalidate }),
    }),
  );
  return data;
}
