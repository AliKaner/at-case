import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      GUID: process.env.RIGEL_GUID || "AREN-BEBE-6135-000C",
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
        "https://rigelapi-test.kommerz.io/graphql/",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("GraphQL Proxy Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const variables = searchParams.get("variables");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      GUID: process.env.RIGEL_GUID || "AREN-BEBE-6135-000C",
    };

    const body: Record<string, unknown> = { query };
    if (variables) {
      body.variables = JSON.parse(variables);
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
        "https://rigelapi-test.kommerz.io/graphql/",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("GraphQL Proxy Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


