/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetProductDetails($productId: Int!) {\n  productDetails(productId: $productId) {\n    id\n    stockCode\n    stock\n    gtin\n    manufacturerPartNumber\n    discountRate\n    incrementRange\n    isInFavorite\n    name\n    totalRecord\n    url\n    vat\n    productProperties {\n      id\n      barcode\n      price\n      stock\n      variantValues {\n        key\n        value\n      }\n      variantSubValues {\n        id\n        key\n        value\n      }\n    }\n    brand {\n      mname\n      picture\n      id\n    }\n    category {\n      url\n      id\n      categoryName\n    }\n    productImages {\n      relatedBarcodes\n      relatedBarcodesRaw\n      imagePath\n    }\n    salePrice\n    salePriceWithTax\n    oldPrice\n    oldPriceWithTax\n    price\n    priceWithTax\n    currency\n  }\n}": typeof types.GetProductDetailsDocument,
    "query GetProductImages($productId: Int!) {\n  productsByFilter(filter: {pageNumber: 1, pageSize: 1, productId: $productId}) {\n    products {\n      id\n      productImages {\n        relatedBarcodes\n        relatedBarcodesRaw\n        imagePath\n      }\n    }\n  }\n}": typeof types.GetProductImagesDocument,
    "query GetProducts($filter: ProductFilterInput!) {\n  productsByFilter(filter: $filter) {\n    totalPages\n    totalRecord\n    currentPage\n    hasNextPage\n    hasPreviousPage\n    products {\n      id\n      stockCode\n      stock\n      gtin\n      manufacturerPartNumber\n      discountRate\n      incrementRange\n      isInFavorite\n      name\n      totalRecord\n      url\n      vat\n      productProperties {\n        id\n        barcode\n        price\n        stock\n        variantValues {\n          key\n          value\n        }\n        variantSubValues {\n          id\n          key\n          value\n        }\n      }\n      brand {\n        mname\n        picture\n        id\n      }\n      category {\n        url\n        id\n        categoryName\n      }\n      productImages {\n        relatedBarcodes\n        relatedBarcodesRaw\n        imagePath\n      }\n      salePrice\n      salePriceWithTax\n      oldPrice\n      oldPriceWithTax\n      price\n      priceWithTax\n      currency\n    }\n  }\n}": typeof types.GetProductsDocument,
};
const documents: Documents = {
    "query GetProductDetails($productId: Int!) {\n  productDetails(productId: $productId) {\n    id\n    stockCode\n    stock\n    gtin\n    manufacturerPartNumber\n    discountRate\n    incrementRange\n    isInFavorite\n    name\n    totalRecord\n    url\n    vat\n    productProperties {\n      id\n      barcode\n      price\n      stock\n      variantValues {\n        key\n        value\n      }\n      variantSubValues {\n        id\n        key\n        value\n      }\n    }\n    brand {\n      mname\n      picture\n      id\n    }\n    category {\n      url\n      id\n      categoryName\n    }\n    productImages {\n      relatedBarcodes\n      relatedBarcodesRaw\n      imagePath\n    }\n    salePrice\n    salePriceWithTax\n    oldPrice\n    oldPriceWithTax\n    price\n    priceWithTax\n    currency\n  }\n}": types.GetProductDetailsDocument,
    "query GetProductImages($productId: Int!) {\n  productsByFilter(filter: {pageNumber: 1, pageSize: 1, productId: $productId}) {\n    products {\n      id\n      productImages {\n        relatedBarcodes\n        relatedBarcodesRaw\n        imagePath\n      }\n    }\n  }\n}": types.GetProductImagesDocument,
    "query GetProducts($filter: ProductFilterInput!) {\n  productsByFilter(filter: $filter) {\n    totalPages\n    totalRecord\n    currentPage\n    hasNextPage\n    hasPreviousPage\n    products {\n      id\n      stockCode\n      stock\n      gtin\n      manufacturerPartNumber\n      discountRate\n      incrementRange\n      isInFavorite\n      name\n      totalRecord\n      url\n      vat\n      productProperties {\n        id\n        barcode\n        price\n        stock\n        variantValues {\n          key\n          value\n        }\n        variantSubValues {\n          id\n          key\n          value\n        }\n      }\n      brand {\n        mname\n        picture\n        id\n      }\n      category {\n        url\n        id\n        categoryName\n      }\n      productImages {\n        relatedBarcodes\n        relatedBarcodesRaw\n        imagePath\n      }\n      salePrice\n      salePriceWithTax\n      oldPrice\n      oldPriceWithTax\n      price\n      priceWithTax\n      currency\n    }\n  }\n}": types.GetProductsDocument,
};

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
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductDetails($productId: Int!) {\n  productDetails(productId: $productId) {\n    id\n    stockCode\n    stock\n    gtin\n    manufacturerPartNumber\n    discountRate\n    incrementRange\n    isInFavorite\n    name\n    totalRecord\n    url\n    vat\n    productProperties {\n      id\n      barcode\n      price\n      stock\n      variantValues {\n        key\n        value\n      }\n      variantSubValues {\n        id\n        key\n        value\n      }\n    }\n    brand {\n      mname\n      picture\n      id\n    }\n    category {\n      url\n      id\n      categoryName\n    }\n    productImages {\n      relatedBarcodes\n      relatedBarcodesRaw\n      imagePath\n    }\n    salePrice\n    salePriceWithTax\n    oldPrice\n    oldPriceWithTax\n    price\n    priceWithTax\n    currency\n  }\n}"): (typeof documents)["query GetProductDetails($productId: Int!) {\n  productDetails(productId: $productId) {\n    id\n    stockCode\n    stock\n    gtin\n    manufacturerPartNumber\n    discountRate\n    incrementRange\n    isInFavorite\n    name\n    totalRecord\n    url\n    vat\n    productProperties {\n      id\n      barcode\n      price\n      stock\n      variantValues {\n        key\n        value\n      }\n      variantSubValues {\n        id\n        key\n        value\n      }\n    }\n    brand {\n      mname\n      picture\n      id\n    }\n    category {\n      url\n      id\n      categoryName\n    }\n    productImages {\n      relatedBarcodes\n      relatedBarcodesRaw\n      imagePath\n    }\n    salePrice\n    salePriceWithTax\n    oldPrice\n    oldPriceWithTax\n    price\n    priceWithTax\n    currency\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductImages($productId: Int!) {\n  productsByFilter(filter: {pageNumber: 1, pageSize: 1, productId: $productId}) {\n    products {\n      id\n      productImages {\n        relatedBarcodes\n        relatedBarcodesRaw\n        imagePath\n      }\n    }\n  }\n}"): (typeof documents)["query GetProductImages($productId: Int!) {\n  productsByFilter(filter: {pageNumber: 1, pageSize: 1, productId: $productId}) {\n    products {\n      id\n      productImages {\n        relatedBarcodes\n        relatedBarcodesRaw\n        imagePath\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts($filter: ProductFilterInput!) {\n  productsByFilter(filter: $filter) {\n    totalPages\n    totalRecord\n    currentPage\n    hasNextPage\n    hasPreviousPage\n    products {\n      id\n      stockCode\n      stock\n      gtin\n      manufacturerPartNumber\n      discountRate\n      incrementRange\n      isInFavorite\n      name\n      totalRecord\n      url\n      vat\n      productProperties {\n        id\n        barcode\n        price\n        stock\n        variantValues {\n          key\n          value\n        }\n        variantSubValues {\n          id\n          key\n          value\n        }\n      }\n      brand {\n        mname\n        picture\n        id\n      }\n      category {\n        url\n        id\n        categoryName\n      }\n      productImages {\n        relatedBarcodes\n        relatedBarcodesRaw\n        imagePath\n      }\n      salePrice\n      salePriceWithTax\n      oldPrice\n      oldPriceWithTax\n      price\n      priceWithTax\n      currency\n    }\n  }\n}"): (typeof documents)["query GetProducts($filter: ProductFilterInput!) {\n  productsByFilter(filter: $filter) {\n    totalPages\n    totalRecord\n    currentPage\n    hasNextPage\n    hasPreviousPage\n    products {\n      id\n      stockCode\n      stock\n      gtin\n      manufacturerPartNumber\n      discountRate\n      incrementRange\n      isInFavorite\n      name\n      totalRecord\n      url\n      vat\n      productProperties {\n        id\n        barcode\n        price\n        stock\n        variantValues {\n          key\n          value\n        }\n        variantSubValues {\n          id\n          key\n          value\n        }\n      }\n      brand {\n        mname\n        picture\n        id\n      }\n      category {\n        url\n        id\n        categoryName\n      }\n      productImages {\n        relatedBarcodes\n        relatedBarcodesRaw\n        imagePath\n      }\n      salePrice\n      salePriceWithTax\n      oldPrice\n      oldPriceWithTax\n      price\n      priceWithTax\n      currency\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;