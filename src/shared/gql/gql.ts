import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * NOTE: This map is populated automatically by GraphQL Code Generator.
 * Keeping the object typed avoids runtime undefined errors when there are no operations yet.
 */
const documents: Record<string, DocumentNode<never, never>> = {};
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): DocumentNode<never, never>;

export function graphql(source: string) {
  return documents[source] ?? ({} as DocumentNode<never, never>);
}

export type DocumentType<TDocumentNode extends DocumentNode<unknown, unknown>> =
  TDocumentNode extends DocumentNode<infer TType, unknown> ? TType : never;
