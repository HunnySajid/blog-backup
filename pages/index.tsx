import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import ClientOnly from "../components/app/client-only";
import Posts from "../components/posts";


const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Hashub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <label className="text-blue-600" href="https://nextjs.org">
            Hashub
          </label>
        </h1>

        <p className="mt-3 text-2xl">
          Search hashnode {' '}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
            username
          </code>
           {' '} to take blog backup 
        </p>
        <ClientOnly>
          <Posts />
        </ClientOnly>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
