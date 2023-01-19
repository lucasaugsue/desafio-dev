import Head from 'next/head';
import Apresentacao from '../src/components/Apresentacao';
import Header from '../src/components/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title></title>
        <link rel="icon" href="/car-solid.png" />
      </Head>

      <Header/>
      <Apresentacao/>
    </div>
  )
}
