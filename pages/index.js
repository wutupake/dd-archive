import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
// lib
import { getAllEpisodes } from '../lib/episodes';
import { request } from '../lib/datocms';
// styles
import styles from '../styles/Home.module.css';

const HOMEPAGE_QUERY = `
query MyQuery {
  allEpisodes {
    aired
    episode
    excerpt
    season
    slug
    title
    tracklist
    module {
      mediaTextField {
        value
      }
    }
  }
}
`;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
  });
  return {
    props: { data }
  };
}

export default function Home(props) {
  // const episodes = getAllEpisodes();
  const { data } = props;
  const episodes = data.allEpisodes;
  return (
    <div className={styles.container}>
      <Head>
        <title>Diggin&rsquo;Deeper archive</title>
        <meta name="description" content="Diggin&rsquo;Deeper episode archive" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}><Image src="/img/layout/logo.png" alt="DIGGIN'DEEPER" width={278} height={108} /></div>
        <h3>Diggin&rsquo;Deeper is a program recorded live, homemade, <br />with turntables, vinyls and passion. <br />Respect the music.</h3>

        <div className={styles.grid}>
          {episodes.map((ep) => (
            <EpisodePreview key={ep.id} data={ep} />
          ))}
        </div>
      </main>
    </div>
  )
}


const EpisodePreview = (props) => {
  const { data } = props;
  return (
    <div className={styles.container}>
      <Link href={`/episodes/${data.slug}`}>
        <a>
          {/* <Image src={data.cover.url} alt={data.title} layout='fill' /> */}
          <h3>episode {data.title}</h3>
        </a>
      </Link>
    </div>
  )
}