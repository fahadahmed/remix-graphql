import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { gql } from "graphql-request";

import { client } from "~/lib/client";

const GetCountryByCode = gql`
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      name
      code
      capital
      currency
    }
  }
`;

export type LoaderType = {
  params: {
    code: string;
  }
}

export const loader = async ({ params }: LoaderType) => {
  const { code } = params;

  const { country } = await client.request(GetCountryByCode, {
    code,
  });

  return json({ country });
}

export default function CountryPage() {
  let data = useLoaderData();
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}