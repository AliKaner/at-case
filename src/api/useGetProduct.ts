import { useQuery } from "@tanstack/react-query";
import {
  GetProductDetailsDocument,
  type GetProductDetailsQueryVariables,
  type GetProductDetailsQuery,
} from "@/gql/graphql";
import { graphqlFetcher } from "@/shared/api/graphqlFetcher";

export const useGetProduct = (variables: GetProductDetailsQueryVariables) => {
  return useQuery<GetProductDetailsQuery>({
    queryKey: ["product", variables.productId],
    queryFn: () => graphqlFetcher(GetProductDetailsDocument, variables),
    enabled: !!variables.productId,
    staleTime: 1000 * 60 * 5,
  });
};

