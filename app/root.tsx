import { Box, ChakraProvider, Heading } from '@chakra-ui/react'
import type { V2_MetaFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react'

export const meta: V2_MetaFunction = () => [
  {
    title: 'automaton',
  },
]

function Document({ children, title = 'App title' }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  // throw new Error("💣💥 Booooom");

  return (
    <Document>
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    </Document>
  )
}

// How ChakraProvider should be used on CatchBoundary
export function CatchBoundary() {
  const caught = useCatch()

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <ChakraProvider>
        <Box>
          <Heading as="h1" bg="purple.600">
            [CatchBoundary]: {caught.status} {caught.statusText}
          </Heading>
        </Box>
      </ChakraProvider>
    </Document>
  )
}

// How ChakraProvider should be used on ErrorBoundary
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <ChakraProvider>
        <Box>
          <Heading as="h1" bg="blue.500">
            [ErrorBoundary]: There was an error: {error.message}
          </Heading>
        </Box>
      </ChakraProvider>
    </Document>
  )
}
