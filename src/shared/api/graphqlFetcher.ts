import { GraphQLError, print } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  "https://rigelapi-test.kommerz.io/graphql/";
const GUID = process.env.RIGEL_GUID || "AREN-BEBE-6135-000C";

export async function graphqlFetcher<TData, TVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  variables?: TVariables
): Promise<TData> {
  const query = print(document);

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      GUID,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(
      result.errors.map((e: GraphQLError) => e.message).join(", ") ||
        "GraphQL request failed"
    );
  }

  return result.data;
}
