/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Byte` scalar type represents non-fractional whole numeric values. Byte can represent values between 0 and 255. */
  Byte: { input: unknown; output: unknown; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: unknown; output: unknown; }
  /** The `Decimal` scalar type represents a decimal floating-point number. */
  Decimal: { input: unknown; output: unknown; }
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: { input: unknown; output: unknown; }
};

export type AdditionalInformation = {
  __typename: 'AdditionalInformation';
  editorReview: Maybe<Scalars['String']['output']>;
  memberOnlyContent: Maybe<Scalars['String']['output']>;
  plainTextDescription: Maybe<Scalars['String']['output']>;
  shortDescription: Maybe<Scalars['String']['output']>;
};

export type ArrayContentListRequestInput = {
  ids?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type ArrayContents = {
  __typename: 'ArrayContents';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  ctaLabel: Maybe<Scalars['String']['output']>;
  descriptionHtml: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  imageUrl: Maybe<Scalars['String']['output']>;
  label: Scalars['String']['output'];
  linkUrl: Maybe<Scalars['String']['output']>;
  sortOrder: Maybe<Scalars['Byte']['output']>;
  textContent: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type BankInstallmentDto = {
  __typename: 'BankInstallmentDto';
  bankId: Scalars['Int']['output'];
  bankLogo: Scalars['String']['output'];
  bankName: Scalars['String']['output'];
  plans: Array<InstallmentPlanDto>;
};

export type BannerResult = {
  __typename: 'BannerResult';
  bgColorFirst: Maybe<Scalars['String']['output']>;
  bgColorSecond: Maybe<Scalars['String']['output']>;
  buttonLabel: Maybe<Scalars['String']['output']>;
  categoryId: Scalars['Int']['output'];
  firstText: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  image: Maybe<Scalars['String']['output']>;
  redirectUrl: Maybe<Scalars['String']['output']>;
  secondText: Maybe<Scalars['String']['output']>;
  sortOrder: Scalars['Int']['output'];
  title: Maybe<Scalars['String']['output']>;
  urlTargetType: Maybe<Scalars['String']['output']>;
};

export type BlogDto = {
  __typename: 'BlogDTO';
  banner: Maybe<Scalars['String']['output']>;
  content: Maybe<Scalars['String']['output']>;
  date: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  metaDescription: Maybe<Scalars['String']['output']>;
  metaKeywords: Maybe<Scalars['String']['output']>;
  metaTitle: Maybe<Scalars['String']['output']>;
  preContent: Maybe<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
};

export type BlogV2Dto = {
  __typename: 'BlogV2DTO';
  blogs: Array<BlogDto>;
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  totalPages: Scalars['Int']['output'];
  totalRecord: Scalars['Int']['output'];
};

export type BlogsRequestInput = {
  ids?: InputMaybe<Scalars['String']['input']>;
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type Brand = {
  __typename: 'Brand';
  haveleIndirim: Scalars['Float']['output'];
  icerik: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  mname: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  show: Scalars['Int']['output'];
  sira: Scalars['Int']['output'];
};

export type BrandDto = {
  __typename: 'BrandDTO';
  brands: Array<MakesDto>;
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  totalPages: Scalars['Int']['output'];
  totalRecord: Scalars['Int']['output'];
};

export type BrandListRequestInput = {
  ids?: InputMaybe<Scalars['String']['input']>;
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  showcase?: InputMaybe<Scalars['Boolean']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type BreadcrumbItemDto = {
  __typename: 'BreadcrumbItemDto';
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Campaings = {
  __typename: 'Campaings';
  limitedTime: Maybe<LimitedTimeCampaignInformation>;
};

export type CategoryDto = {
  __typename: 'CategoryDTO';
  bottomDescription: Maybe<Scalars['String']['output']>;
  breadcrumb: Array<BreadcrumbItemDto>;
  catLevel: Scalars['Int']['output'];
  categoryName: Maybe<Scalars['String']['output']>;
  hit: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Int']['output'];
  metaDescription: Maybe<Scalars['String']['output']>;
  metaKey: Maybe<Scalars['String']['output']>;
  order: Scalars['Int']['output'];
  parentCatID: Scalars['Int']['output'];
  seoTitle: Maybe<Scalars['String']['output']>;
  status: Scalars['Int']['output'];
  topDescription: Maybe<Scalars['String']['output']>;
  url: Maybe<Scalars['String']['output']>;
};

export type CommentListDto = {
  __typename: 'CommentListDTO';
  comments: Array<CommentsDto>;
  totalRecord: Scalars['Int']['output'];
};

export type CommentsDto = {
  __typename: 'CommentsDTO';
  comment: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isApproved: Scalars['Int']['output'];
  productId: Scalars['Int']['output'];
  productName: Scalars['String']['output'];
  score: Scalars['Int']['output'];
  show: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  userName: Scalars['String']['output'];
};

export type ConstantsDto = {
  __typename: 'ConstantsDTO';
  content: Maybe<Scalars['String']['output']>;
  groupName: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
};

export type ConstantsInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  groupName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ContentPageListV2RequestInput = {
  ids?: InputMaybe<Scalars['String']['input']>;
  includeAll?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['Int']['input']>;
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  showContent: Scalars['Boolean']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type ContentTypesResult = {
  __typename: 'ContentTypesResult';
  contents: Array<ArrayContents>;
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  totalPages: Scalars['Int']['output'];
  totalRecord: Scalars['Int']['output'];
};

export type DynamicFacet = {
  __typename: 'DynamicFacet';
  displayName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  values: Array<FacetNode>;
};

export type DynamicFilters = {
  __typename: 'DynamicFilters';
  attributeFacets: Array<DynamicFacet>;
  priceRanges: Array<PriceRangeFacet>;
};

export type FacetNode = {
  __typename: 'FacetNode';
  children: Array<FacetNode>;
  count: Scalars['Long']['output'];
  key: Scalars['String']['output'];
  selected: Scalars['Boolean']['output'];
  value: Scalars['String']['output'];
};

export type FormDefinitionDto = {
  __typename: 'FormDefinitionDTO';
  actionUrl: Scalars['String']['output'];
  description: Scalars['String']['output'];
  fields: Array<FormFieldDto>;
  id: Scalars['Int']['output'];
  method: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  submitText: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type FormFieldDto = {
  __typename: 'FormFieldDTO';
  defaultValue: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  maxLength: Maybe<Scalars['Int']['output']>;
  minLength: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  options: Array<Scalars['String']['output']>;
  placeholder: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
  sortOrder: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  validationRegex: Scalars['String']['output'];
  visible: Scalars['Boolean']['output'];
};

export type FormFiltersRequestInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type HtmlContentResult = {
  __typename: 'HtmlContentResult';
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  index: Scalars['Int']['output'];
  isActive: Scalars['Int']['output'];
  lang: Scalars['Int']['output'];
  pageName: Scalars['String']['output'];
  recordId: Scalars['Int']['output'];
};

export type InstallmentDataDto = {
  __typename: 'InstallmentDataDto';
  banks: Array<BankInstallmentDto>;
  installmentLimitWarning: Maybe<Scalars['String']['output']>;
};

export type InstallmentPlanDto = {
  __typename: 'InstallmentPlanDto';
  isHighlighted: Scalars['Boolean']['output'];
  monthlyPayment: Scalars['Decimal']['output'];
  numberOfInstallmentPlus: Scalars['Int']['output'];
  numberOfInstallments: Scalars['Int']['output'];
  totalAmount: Scalars['Decimal']['output'];
};

export type InstallmentResponse = {
  __typename: 'InstallmentResponse';
  data: InstallmentDataDto;
};

export type KeyValuePairOfStringAndString = {
  __typename: 'KeyValuePairOfStringAndString';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type LimitedTimeCampaignInformation = {
  __typename: 'LimitedTimeCampaignInformation';
  campaignPrice: Scalars['Decimal']['output'];
  endDate: Maybe<Scalars['DateTime']['output']>;
  endDateIso: Maybe<Scalars['String']['output']>;
  endDateUnix: Maybe<Scalars['Long']['output']>;
  startDate: Maybe<Scalars['DateTime']['output']>;
  startDateIso: Maybe<Scalars['String']['output']>;
  startDateUnix: Maybe<Scalars['Long']['output']>;
  status: Scalars['Boolean']['output'];
};

export type MakesDto = {
  __typename: 'MakesDTO';
  content: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  image: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  productCount: Scalars['Int']['output'];
  show: Scalars['Boolean']['output'];
  slug: Maybe<Scalars['String']['output']>;
  wireTransferDiscount: Maybe<Scalars['Decimal']['output']>;
};

export type Navlinks = {
  __typename: 'Navlinks';
  children: Array<Navlinks>;
  content: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mainNavId: Maybe<Scalars['Int']['output']>;
  target: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  url: Maybe<Scalars['String']['output']>;
};

export type NavlinksResult = {
  __typename: 'NavlinksResult';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  navlinks: Array<Navlinks>;
  totalPages: Scalars['Int']['output'];
  totalRecord: Scalars['Int']['output'];
};

export type OtherCurrencies = {
  __typename: 'OtherCurrencies';
  icon: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  oldPrice: Scalars['Decimal']['output'];
  oldPriceWithTax: Scalars['Decimal']['output'];
  unitPrice: Scalars['Decimal']['output'];
  unitPriceOrginal: Scalars['Decimal']['output'];
  unitPriceWithTax: Scalars['Decimal']['output'];
};

export type PriceRangeFacet = {
  __typename: 'PriceRangeFacet';
  count: Scalars['Long']['output'];
  max: Maybe<Scalars['Decimal']['output']>;
  min: Maybe<Scalars['Decimal']['output']>;
};

export type Product = {
  __typename: 'Product';
  brand: Maybe<Brand>;
  brandId: Scalars['Int']['output'];
  brandName: Maybe<Scalars['String']['output']>;
  breadcrumb: Array<BreadcrumbItemDto>;
  campaings: Maybe<Campaings>;
  cargoDay: Scalars['Int']['output'];
  category: Maybe<CategoryDto>;
  categoryId: Scalars['Int']['output'];
  categoryProperties: Array<ProductCategoryPropertiesDto>;
  createdDate: Maybe<Scalars['DateTime']['output']>;
  currency: Maybe<Scalars['String']['output']>;
  currencyUnitId: Scalars['Int']['output'];
  defaultCurrency: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
  desi: Scalars['Decimal']['output'];
  discountRate: Scalars['Decimal']['output'];
  featuredInstallment: Scalars['Int']['output'];
  featuredInstallmentStr: Scalars['String']['output'];
  gtin: Maybe<Scalars['String']['output']>;
  hit: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  inCartQty: Scalars['Int']['output'];
  inProductPriceListAlert: Scalars['Int']['output'];
  inStockAlertList: Scalars['Int']['output'];
  incrementRange: Maybe<Scalars['String']['output']>;
  isInFavorite: Scalars['Int']['output'];
  listPrice: Scalars['Decimal']['output'];
  manufacturerPartNumber: Maybe<Scalars['String']['output']>;
  maxSaleUnit: Scalars['Float']['output'];
  minQuantity: Scalars['Int']['output'];
  minSaleUnit: Scalars['Float']['output'];
  name: Maybe<Scalars['String']['output']>;
  oiv: Scalars['Decimal']['output'];
  oldPrice: Scalars['Decimal']['output'];
  oldPriceWithTax: Scalars['Decimal']['output'];
  options: Array<ProductOption>;
  otherCurrencies: Maybe<Array<OtherCurrencies>>;
  plainTextDescription: Maybe<Scalars['String']['output']>;
  popularityScore: Maybe<Scalars['Int']['output']>;
  price: Maybe<Scalars['Decimal']['output']>;
  priceWithTax: Scalars['Decimal']['output'];
  producerCode: Maybe<Scalars['String']['output']>;
  product360: Maybe<Scalars['String']['output']>;
  productDescriptions: Maybe<ProductDescription>;
  productImages: Maybe<Array<ProductImagesDto>>;
  productMedia: Maybe<ProductMediaDto>;
  productProperties: Array<ProductVariant>;
  productReviews: Maybe<ProductReviewsDto>;
  productVideo: Maybe<Scalars['String']['output']>;
  property1: Maybe<Scalars['String']['output']>;
  property2: Maybe<Scalars['String']['output']>;
  property3: Maybe<Scalars['String']['output']>;
  property4: Maybe<Scalars['String']['output']>;
  property5: Maybe<Scalars['String']['output']>;
  property6: Maybe<Scalars['String']['output']>;
  property7: Maybe<Scalars['String']['output']>;
  quantityUnit: Maybe<Scalars['String']['output']>;
  salePrice: Scalars['Decimal']['output'];
  salePriceWithTax: Scalars['Decimal']['output'];
  score: Scalars['Decimal']['output'];
  sellerPrice1: Scalars['Decimal']['output'];
  sellerPrice1WithTax: Scalars['Decimal']['output'];
  sellerPrice2: Scalars['Decimal']['output'];
  sellerPrice2WithTax: Scalars['Decimal']['output'];
  sellerPrice3: Scalars['Decimal']['output'];
  sellerPrice3WithTax: Scalars['Decimal']['output'];
  sellerPrice4: Scalars['Decimal']['output'];
  sellerPrice4WithTax: Scalars['Decimal']['output'];
  sellerPrice5: Scalars['Decimal']['output'];
  sellerPrice5WithTax: Scalars['Decimal']['output'];
  seoDescription: Maybe<Scalars['String']['output']>;
  shortDescription: Maybe<Scalars['String']['output']>;
  status: Scalars['Int']['output'];
  stock: Scalars['Int']['output'];
  stockCode: Scalars['String']['output'];
  supplier: Maybe<Scalars['String']['output']>;
  totalRecord: Scalars['Int']['output'];
  url: Scalars['String']['output'];
  vat: Scalars['Decimal']['output'];
};

export type ProductCategoryPropertiesDto = {
  __typename: 'ProductCategoryPropertiesDTO';
  categoryId: Scalars['Int']['output'];
  defaultValues: Array<ProductCategoryPropertyDefaultValueDto>;
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  property: Scalars['String']['output'];
  values: Array<ProductCategoryPropertyValueDto>;
};

export type ProductCategoryPropertyDefaultValueDto = {
  __typename: 'ProductCategoryPropertyDefaultValueDTO';
  categoryPropertyId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

export type ProductCategoryPropertyValueDto = {
  __typename: 'ProductCategoryPropertyValueDTO';
  categoryPropertyId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  productId: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

export type ProductCommentFilterInput = {
  isApprovedComments: Scalars['Boolean']['input'];
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductDescription = {
  __typename: 'ProductDescription';
  additionalDescriptions: Maybe<AdditionalInformation>;
  description: Maybe<Scalars['String']['output']>;
  seoDescriptions: Maybe<SeoInformation>;
};

export type ProductFilterInput = {
  brandId?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  categoryId?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  customWhereClause?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  marketPlaceId?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  maxPrice?: InputMaybe<Scalars['Decimal']['input']>;
  minPrice?: InputMaybe<Scalars['Decimal']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  prodStatus?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  relationType?: InputMaybe<Scalars['String']['input']>;
  shippingTime?: InputMaybe<Scalars['Int']['input']>;
  stockStatus?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductGroupFilterRequestInput = {
  ids?: InputMaybe<Scalars['String']['input']>;
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  showcase?: InputMaybe<Scalars['Boolean']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type ProductGroupV2Dto = {
  __typename: 'ProductGroupV2DTO';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  productGroups: Array<ProductGroupsDto>;
  totalPages: Scalars['Int']['output'];
  totalRecord: Scalars['Int']['output'];
};

export type ProductGroupsDto = {
  __typename: 'ProductGroupsDTO';
  alias: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image: Maybe<Scalars['String']['output']>;
  isFixed: Scalars['Int']['output'];
  lang: Scalars['Int']['output'];
  listCatalog: Scalars['Int']['output'];
  metaDescription: Maybe<Scalars['String']['output']>;
  metaKey: Maybe<Scalars['String']['output']>;
  modulePicture: Maybe<Scalars['String']['output']>;
  moduleProductCount: Scalars['Int']['output'];
  recordID: Scalars['Int']['output'];
  showcasePicture: Maybe<Scalars['String']['output']>;
  showcaseProductCount: Scalars['Int']['output'];
  title: Maybe<Scalars['String']['output']>;
  totalProductsCount: Scalars['Int']['output'];
  url: Maybe<Scalars['String']['output']>;
};

export type ProductImagesDto = {
  __typename: 'ProductImagesDTO';
  id: Scalars['Int']['output'];
  imagePath: Maybe<Scalars['String']['output']>;
  relatedBarcodes: Maybe<Array<Scalars['String']['output']>>;
  relatedBarcodesRaw: Maybe<Scalars['String']['output']>;
};

export type ProductIndexV2Dto = {
  __typename: 'ProductIndexV2DTO';
  brand: Maybe<Brand>;
  brandId: Scalars['Int']['output'];
  category: Maybe<CategoryDto>;
  categoryId: Scalars['Int']['output'];
  categoryIds: Array<Scalars['Int']['output']>;
  categoryProperties: Array<ProductCategoryPropertiesDto>;
  createdDate: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  currencyUnitId: Scalars['Int']['output'];
  discountRate: Scalars['Decimal']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  oldPrice: Scalars['Decimal']['output'];
  oldPriceWithTax: Scalars['Decimal']['output'];
  options: Array<ProductOption>;
  popularityScore: Scalars['Int']['output'];
  productGroups: Array<ProductGroupsDto>;
  productMedia: Maybe<ProductMediaDto>;
  productProperties: Array<ProductVariant>;
  quantityUnit: Scalars['String']['output'];
  salePrice: Scalars['Decimal']['output'];
  salePriceWithTax: Scalars['Decimal']['output'];
  stock: Scalars['Int']['output'];
  stockCode: Scalars['String']['output'];
  tenantId: Scalars['String']['output'];
  url: Scalars['String']['output'];
  vat: Scalars['Int']['output'];
};

export type ProductList = {
  __typename: 'ProductList';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  products: Maybe<Array<Maybe<Product>>>;
  totalPages: Scalars['Int']['output'];
  totalRecord: Maybe<Scalars['Int']['output']>;
};

export type ProductMediaDto = {
  __typename: 'ProductMediaDto';
  product360: Maybe<Scalars['String']['output']>;
  productImages: Maybe<Array<ProductImagesDto>>;
  productVideo: Maybe<Scalars['String']['output']>;
};

export type ProductOption = {
  __typename: 'ProductOption';
  displayName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  values: Array<ProductOptionValue>;
};

export type ProductOptionValue = {
  __typename: 'ProductOptionValue';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ProductPropertiesDto = {
  __typename: 'ProductPropertiesDTO';
  barcode: Maybe<Scalars['String']['output']>;
  gtin: Maybe<Scalars['String']['output']>;
  ozelAlan: Maybe<Scalars['String']['output']>;
  price: Scalars['Decimal']['output'];
  stock: Maybe<Scalars['String']['output']>;
  variants: Maybe<Scalars['String']['output']>;
};

export type ProductReviewsDto = {
  __typename: 'ProductReviewsDto';
  productId: Scalars['Int']['output'];
  productName: Scalars['String']['output'];
  reviewsCount: Scalars['Int']['output'];
  reviewsScore: Scalars['Decimal']['output'];
  stockCode: Scalars['String']['output'];
};

export type ProductSearchRequestInput = {
  brandIds: Array<Scalars['Int']['input']>;
  categoryIds: Array<Scalars['Int']['input']>;
  categoryPropertyValueIds: Array<Scalars['Int']['input']>;
  facetFields: Array<Scalars['String']['input']>;
  includeFacets: Scalars['Boolean']['input'];
  keyword: Scalars['String']['input'];
  maxPrice?: InputMaybe<Scalars['Decimal']['input']>;
  minPrice?: InputMaybe<Scalars['Decimal']['input']>;
  optionValueIds: Array<Scalars['Int']['input']>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  productGroupIds: Array<Scalars['Int']['input']>;
  selectedVariants?: InputMaybe<Array<VariantFilterInput>>;
  sortBy: Scalars['String']['input'];
};

export type ProductSearchResponse = {
  __typename: 'ProductSearchResponse';
  categoryDetail: Maybe<CategoryDto>;
  currentPage: Scalars['Int']['output'];
  dynamicFilters: DynamicFilters;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  products: Array<ProductIndexV2Dto>;
  totalPages: Scalars['Int']['output'];
  totalRecord: Scalars['Int']['output'];
};

export type ProductTabsDto = {
  __typename: 'ProductTabsDTO';
  alias: Maybe<Scalars['String']['output']>;
  backgroundColor: Maybe<Scalars['String']['output']>;
  color: Maybe<Scalars['String']['output']>;
  content: Maybe<Scalars['String']['output']>;
  fontColor: Maybe<Scalars['String']['output']>;
  fontSize: Maybe<Scalars['Int']['output']>;
  fontWeight: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['Int']['output']>;
  isActive: Maybe<Scalars['Int']['output']>;
  isProgrammatic: Maybe<Scalars['Boolean']['output']>;
  productId: Maybe<Scalars['Int']['output']>;
  removable: Maybe<Scalars['Int']['output']>;
  tabProductScore: Maybe<Scalars['Decimal']['output']>;
  tabValuesCount: Maybe<Scalars['Int']['output']>;
  title: Maybe<Scalars['String']['output']>;
  widtHeight: Maybe<Scalars['Int']['output']>;
  width: Maybe<Scalars['Int']['output']>;
};

export type ProductVariant = {
  __typename: 'ProductVariant';
  barcode: Maybe<Scalars['String']['output']>;
  gtin: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  ozelAlan: Maybe<Scalars['String']['output']>;
  price: Maybe<Scalars['Decimal']['output']>;
  stock: Maybe<Scalars['Int']['output']>;
  variantSubValues: Array<VariantSubValueDto>;
  variantValues: Array<KeyValuePairOfStringAndString>;
};

export type Query = {
  __typename: 'Query';
  arrayContents: ContentTypesResult;
  banners: Array<BannerResult>;
  blogs: BlogV2Dto;
  brandList: BrandDto;
  constants: Array<ConstantsDto>;
  forms: Array<FormDefinitionDto>;
  htmlContent: HtmlContentResult;
  navlinks: NavlinksResult;
  productComments: CommentListDto;
  productDetails: Product;
  productGroups: ProductGroupV2Dto;
  productInstalments: InstallmentResponse;
  productRelations: ProductList;
  productSpecialTabContent: ProductTabsDto;
  productTabs: Array<ProductTabsDto>;
  productsByFilter: ProductList;
  rewrite: Maybe<RewriteContentDto>;
  searchProducts: ProductSearchResponse;
};


export type QueryArrayContentsArgs = {
  filter: ArrayContentListRequestInput;
};


export type QueryBannersArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryBlogsArgs = {
  filter: BlogsRequestInput;
};


export type QueryBrandListArgs = {
  filter: BrandListRequestInput;
};


export type QueryFormsArgs = {
  filter: FormFiltersRequestInput;
};


export type QueryHtmlContentArgs = {
  filter: Scalars['String']['input'];
};


export type QueryNavlinksArgs = {
  request: ContentPageListV2RequestInput;
};


export type QueryProductCommentsArgs = {
  filter: ProductCommentFilterInput;
};


export type QueryProductDetailsArgs = {
  productId: Scalars['Int']['input'];
};


export type QueryProductGroupsArgs = {
  filter: ProductGroupFilterRequestInput;
};


export type QueryProductInstalmentsArgs = {
  productId: Scalars['Int']['input'];
};


export type QueryProductRelationsArgs = {
  filter: ProductFilterInput;
};


export type QueryProductSpecialTabContentArgs = {
  tabId: Scalars['Int']['input'];
};


export type QueryProductTabsArgs = {
  productId: Scalars['Int']['input'];
};


export type QueryProductsByFilterArgs = {
  filter: ProductFilterInput;
};


export type QueryRewriteArgs = {
  filter: Scalars['String']['input'];
};


export type QuerySearchProductsArgs = {
  filter: ProductSearchRequestInput;
};

export type RewriteContentDto = {
  __typename: 'RewriteContentDTO';
  content: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  pageId: Maybe<Scalars['Int']['output']>;
  pageType: Maybe<Scalars['Int']['output']>;
  pageUrl: Maybe<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
};

export type SeoInformation = {
  __typename: 'SeoInformation';
  metaDescription: Maybe<Scalars['String']['output']>;
  metaKeywords: Maybe<Scalars['String']['output']>;
  searchKeywords: Maybe<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
};

export type VariantFilterInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type VariantSubValueDto = {
  __typename: 'VariantSubValueDTO';
  id: Scalars['Int']['output'];
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};
