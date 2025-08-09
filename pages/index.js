import Head from 'next/head';
import CommandStation from '../components/CommandStation';

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Command Station</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#0b0f19',color:'#e6e9f2',padding:'32px'}}>
        <div style={{width:'min(1100px, 95vw)'}}>
          <CommandStation />
        </div>
      </main>
    </>
  );
}
