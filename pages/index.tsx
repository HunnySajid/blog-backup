import type { NextPage } from 'next'
import Head from 'next/head'
import ClientOnly from "../components/config/client-only";
import Hero from '../components/hero';
import App from '../components/app';
import Footer from '../components/footer';


const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Hashub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 pt-4 flex-col items-center px-20 text-center">
        <Hero />
        <ClientOnly>
          <App />
        </ClientOnly>
      </main>

      <Footer link="https://www.linkedin.com/in/hunainsajid/" poweredBy="HBS" />
    </div>
  )
}

export default Home
