import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';

const yoga = createYoga({
  schema,
  plugins: [
    {
      onRequest({ request }) {
        console.log(`[${new Date().toISOString()}] incoming request: ${request.method} ${request.url}`);
      },
    },
  ],
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log(`Visit ${process.env.NEXT_PUBLIC_GRAPHQL_URL!}`);
});
