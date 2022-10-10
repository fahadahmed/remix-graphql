import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { gql } from "graphql-request";
import { client } from "~/lib/client";

const GetAllCountries = gql`
  {
    countries {
      name
      code
      currency
      capital
    }
  }
`;

export const loader = async () => {
  const { countries } = await client.request(GetAllCountries);
  return json({ countries });
}

export let meta = () => {
  return {
    title: 'Graphql + Remix',
    description: 'Simple implementation of Graphql inside a Remix app'
  }
}
export default function Index() {

  let { countries } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Remix and GraphQL tutorial</h1>
      <ul>
        {countries.map(({ code, name }) => (
          <li key={code}>
            <Link to={`/countries/${code}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
