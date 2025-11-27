import { useQuery } from "@tanstack/react-query";
import {
  GetProductsDocument,
  type GetProductsQueryVariables,
  type GetProductsQuery,
} from "@/gql/graphql";
import { graphqlFetcher } from "@/shared/api/graphqlFetcher";

export const useGetProducts = (variables: GetProductsQueryVariables) => {
  return useQuery<GetProductsQuery>({
    queryKey: ["products", variables],
    queryFn: () => graphqlFetcher(GetProductsDocument, variables),
    staleTime: 1000 * 60 * 5, 
  });
};
