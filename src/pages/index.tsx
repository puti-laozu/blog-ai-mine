import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="Welcome to my blog" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
      </main>
    </>
  );
} 