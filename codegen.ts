import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://rigelapi-test.kommerz.io/graphql/": {
      headers: {
        GUID: process.env.RIGEL_GUID ?? "AREN-BEBE-6135-000C",
      },
    },
  },
  documents: ["src/**/*.{ts,tsx,graphql}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
        },
        defaultScalarType: "unknown",
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
      },
    },
  },
};

export default config;


