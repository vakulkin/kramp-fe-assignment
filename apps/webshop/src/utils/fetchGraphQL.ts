export async function fetchGraphQL<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  if (!graphqlUrl) {
    throw new Error('NEXT_PUBLIC_GRAPHQL_URL is not defined');
  }

  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'GraphQL returned errors');
  }

  return json.data as T;
}
