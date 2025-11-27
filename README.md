# Akıllı Ticaret E-Commerce Case Study

A modern e-commerce application built with Next.js 16, React 19, and GraphQL. This project demonstrates advanced product filtering, variant selection, favorites management, and shopping cart functionality.

## 📁 Project Structure

```
src/
├── api/                          # API layer & GraphQL operations
│   ├── getProductDetails.graphql # Product detail query
│   ├── getProductImages.graphql  # Product images query
│   ├── getProducts.graphql       # Products list query
│   ├── productFilterSchema.ts    # Zod validation for filters
│   ├── useGetProduct.ts          # Product detail hook
│   └── useGetProducts.ts         # Products list hook
│
├── app/                          # Next.js App Router
│   ├── api/graphql/              # GraphQL API route
│   ├── cart/                     # Shopping cart page
│   ├── favorites/                # Favorites page
│   ├── products/                 # Products listing & detail pages
│   │   └── [id]/                 # Dynamic product detail route
│   ├── layout.tsx                # Root layout
│   ├── providers.tsx             # Client providers (React Query, etc.)
│   ├── manifest.ts               # PWA manifest
│   ├── robots.ts                 # SEO robots.txt
│   └── sitemap.ts                # SEO sitemap
│
├── features/                     # Feature-based modules
│   ├── favorities/               # Favorites feature
│   │   └── components/
│   │       └── FavoriteCard/     # Favorite product card component
│   │
│   ├── product-detail/           # Product detail feature
│   │   ├── components/
│   │   │   ├── ProductDetailClient/   # Client-side detail wrapper
│   │   │   ├── ProductDetailError/    # Error boundary component
│   │   │   ├── ProductDetailImage/    # Product image gallery
│   │   │   ├── ProductDetailInfo/     # Product info & actions
│   │   │   └── ProductDetailVersions/ # Variant selection UI
│   │   └── utils/
│   │       └── productVariantUtils.ts # Variant selection logic
│   │
│   └── products/                 # Products listing feature
│       ├── components/
│       │   ├── CategoryFilter/   # Category selection component
│       │   └── ProductCard/      # Product card with skeleton
│       └── layout/
│           ├── ProductFilters/   # Advanced filtering panel
│           └── ProductsPageContent/ # Products grid layout
│
├── gql/                          # Auto-generated GraphQL types
│   ├── gql.ts                    # Document exports
│   ├── graphql.ts                # Generated types & operations
│   └── index.ts                  # Public exports
│
├── shared/                       # Shared utilities & components
│   ├── api/
│   │   ├── apolloClient.ts       # Apollo Client configuration
│   │   └── graphqlFetcher.ts     # GraphQL fetch utility
│   ├── components/
│   │   ├── Button/               # Reusable button component
│   │   ├── Card/                 # Card container component
│   │   ├── Error/                # Error display component
│   │   ├── Footer/               # App footer
│   │   ├── Header/               # App header with nav
│   │   ├── icons/                # SVG icon components
│   │   ├── Input/                # Form input component
│   │   ├── SegmentedControl/     # Segmented toggle component
│   │   ├── Select/               # Select dropdown component
│   │   ├── Spinner/              # Loading spinner
│   │   └── Switch/               # Toggle switch component
│   ├── constants/                # App constants & routes
│   ├── hooks/
│   │   ├── useDebounce.ts        # Debounce hook for search
│   │   └── useUrlFilters.ts      # URL state sync for filters
│   ├── types/                    # Shared TypeScript types
│   └── utils/
│       └── price.ts              # Price formatting utilities
│
├── store/                        # Zustand state management
│   ├── cart.ts                   # Shopping cart store (persisted)
│   ├── favorities.ts             # Favorites store (persisted)
│   └── products.ts               # Products filter state
│
└── styles/                       # Global styles
    ├── globals.scss              # Global CSS
    ├── typography.scss           # Typography system
    └── variables.scss            # SCSS variables
```

---

## ✅ Requirements Implementation

### 1. Add to Favorites (Detail Screen)

- Heart icon button on product detail page
- Toggle favorite state with visual feedback
- Favorite status persisted in localStorage via Zustand
- Real-time UI updates across the application

### 2. Product Detail Screen

- Full product information display (name, brand, category, price)
- Product image gallery with variant-specific images
- Stock availability indicator
- Old price / sale price comparison
- Barcode display for selected variant
- Add to cart functionality with stock validation

### 3. Product Variants

- Dynamic variant options extracted from `productProperties`
- Interactive variant selector buttons (Color, Size, etc.)
- Automatic price/stock/image updates on variant change
- Variant-specific barcode tracking
- Cart items tracked separately per variant

### 4. Product Filtering

- **Keyword search** with debounced input (300ms)
- **Category filter** with multi-select support
- **Stock status filter** (All / In Stock / Out of Stock)
- **Price range filter** (min/max) with validation
- **Items per page** selector (12, 24, 48)
- **URL synchronization** - filters persist in URL params
- **Shareable filter URL** - copy current filter state
- Form validation with Zod schema

---

## ⭐ Extra Features Added

### Shopping Cart

- Add to cart with quantity selection
- Variant-aware cart (same product with different variants = separate items)
- Quantity increment/decrement with stock limit validation
- Remove individual items or clear entire cart
- Order summary with total calculation
- Persistent cart state (survives page refresh)
- Cart icon with item count badge in header
- Empty cart state with "Explore Products" CTA

### Favorites Page

- Dedicated `/favorites` route
- Grid display of all favorited products
- Quick actions: view details, remove from favorites, add to cart
- Persistent favorites (localStorage via Zustand)
- Empty state with helpful message
- Loading skeleton for better UX

### Additional Enhancements

- **Error Boundaries** - Graceful error handling at route level
- **Loading Skeletons** - Skeleton loaders for all async content
- **SEO Optimization** - robots.txt, sitemap.xml, meta tags
- **PWA Manifest** - Progressive Web App support
- **Responsive Design** - Mobile-first SCSS styling
- **Toast Notifications** - React Toastify integration
- **Type Safety** - Full TypeScript coverage with GraphQL Codegen

---

## 🚀 What I Would Add With More Time

### Features

- **User Authentication** - Login/register with JWT, protected routes
- **Product Reviews & Ratings** - User-submitted reviews with star ratings
- **Wishlist Sharing** - Share favorites list via unique URL
- **Recently Viewed Products** - Track and display browsing history
- **Product Comparison** - Side-by-side comparison of selected products
- **Advanced Search** - Autocomplete, search suggestions, fuzzy matching
- **Order History** - Complete order management after checkout
- **Checkout Flow** - Multi-step checkout with payment integration

### Technical Improvements

- **Unit Tests** - Jest + React Testing Library for components
- **E2E Tests** - Playwright/Cypress for critical user flows
- **Storybook** - Component documentation and visual testing
- **i18n** - Multi-language support (Turkish, English)
- **Dark Mode** - Theme toggle with system preference detection
- **Performance Optimization** - Image optimization, lazy loading, bundle analysis
- **CI/CD Pipeline** - GitHub Actions for automated testing and deployment
- **Monitoring** - Error tracking (Sentry), analytics (Vercel Analytics)

### UX Enhancements

- **Infinite Scroll** - Alternative to pagination for product listing
- **Quick View Modal** - Preview product without leaving the list
- **Size Guide** - Interactive size guide for clothing items
- **Stock Notifications** - "Notify me when back in stock" feature
- **Smooth Animations** - Page transitions, micro-interactions

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18.18+ (required by Next.js 16)
- npm 10+

### Getting Started

```bash
# 1. Clone the repository
git clone <repository-url>
cd at-case-1

# 2. Install dependencies
npm install

# 3. (Optional) Create environment file
# Create .env.local and add:
RIGEL_GUID=AREN-BEBE-6135-000C

# 4. Generate GraphQL types
npm run codegen

# 5. Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Create optimized production build        |
| `npm run start`   | Run production server                    |
| `npm run lint`    | Run ESLint for code quality              |
| `npm run codegen` | Generate GraphQL types from schema       |

---

## 🧰 Tech Stack

### Core Framework

| Technology     | Version | Purpose                                                       |
| -------------- | ------- | ------------------------------------------------------------- |
| **Next.js**    | 16.0.3  | React framework with App Router, SSR, API routes              |
| **React**      | 19.1.0  | UI library with latest features (Server Components, Suspense) |
| **TypeScript** | 5.x     | Type safety and better developer experience                   |

### State Management

| Technology               | Purpose                                                            |
| ------------------------ | ------------------------------------------------------------------ |
| **Zustand**              | Lightweight state management for cart & favorites with persistence |
| **TanStack React Query** | Server state management, caching, and synchronization              |

### Data Fetching

| Technology        | Purpose                              |
| ----------------- | ------------------------------------ |
| **Apollo Client** | GraphQL client for data fetching     |
| **GraphQL**       | Query language for API communication |

### Forms & Validation

| Technology              | Purpose                                          |
| ----------------------- | ------------------------------------------------ |
| **React Hook Form**     | Performant form handling with minimal re-renders |
| **Zod**                 | TypeScript-first schema validation               |
| **@hookform/resolvers** | Integration between React Hook Form and Zod      |

### Styling

| Technology       | Purpose                                           |
| ---------------- | ------------------------------------------------- |
| **SCSS Modules** | Scoped, maintainable CSS with SASS features       |
| **Tailwind CSS** | Utility classes (available for rapid prototyping) |

### Developer Tools

| Technology                 | Purpose                                            |
| -------------------------- | -------------------------------------------------- |
| **GraphQL Code Generator** | Auto-generate TypeScript types from GraphQL schema |
| **ESLint**                 | Code linting and quality enforcement               |
| **Babel React Compiler**   | Automatic React optimizations                      |

---

## 🔧 Why GraphQL Code Generator?

GraphQL Code Generator is a crucial tool in this project that provides:

### 1. Type Safety

Automatically generates TypeScript types from the GraphQL schema, ensuring:

- Query/mutation arguments are correctly typed
- Response data matches expected structure
- Compile-time error detection for API mismatches

### 2. Developer Experience

- **IntelliSense Support** - Full autocomplete in IDE for GraphQL operations
- **Refactoring Safety** - Schema changes are immediately reflected in types
- **Documentation** - Generated types serve as living API documentation

### 3. How It Works

```typescript
// 1. Define GraphQL operation (src/api/getProducts.graphql)
query GetProducts($filters: ProductFilterInput) {
  productsByFilter(filters: $filters) {
    products { id, name, price, ... }
    totalCount
  }
}

// 2. Run codegen (npm run codegen)
// Generates types in src/gql/graphql.ts

// 3. Use typed operations
import { GetProductsQuery, GetProductsQueryVariables } from '@/gql/graphql';

// Full type safety for variables and response!
const { data } = useQuery<GetProductsQuery, GetProductsQueryVariables>(...);
```

### 4. Configuration

The `codegen.ts` file configures:

- **Schema source**: Rigel test API with GUID header
- **Document sources**: All `.graphql` and `.ts/.tsx` files in `src/`
- **Output**: Generated types in `src/gql/` directory
- **Preset**: Apollo Client preset for optimal integration

---

## 📝 API Information

This project connects to the Rigel test API:

- **Endpoint**: `https://rigelapi-test.kommerz.io/graphql/`
- **Authentication**: GUID header (`AREN-BEBE-6135-000C`)

---

## 📄 License

This project was created as a case study for Akıllı Ticaret.
