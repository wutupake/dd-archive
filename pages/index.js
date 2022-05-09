import Head from 'next/head';
import Link from 'next/link';
import { Image } from 'react-datocms';
// lib
import { request } from '../lib/datocms';
// styles
import styles from '../styles/Home.module.css';

const HOMEPAGE_QUERY = `
query MyQuery {
  allEpisodes(orderBy: aired_ASC) {
    id
    season
    episodeNumber
    title
    cover {
      responsiveImage {
        alt
        aspectRatio
        base64
        bgColor
        height
        sizes
        src
        srcSet
        title
        width
      }
    }
    aired
    slug
  }
  logo {
    logo {
      responsiveImage {
        alt
        aspectRatio
        base64
        bgColor
        height
        sizes
        src
        srcSet
        title
        width
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
  const { data } = props;
  const logo = data.logo.logo;
  const episodes = data.allEpisodes;
  return (
    <div className={styles.container}>
      <Head>
        <title>Diggin&rsquo;Deeper archive</title>
        <meta name="description" content="Diggin&rsquo;Deeper episode archive" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}><Image data={logo.responsiveImage} /></div>
        <h3>Diggin&rsquo;Deeper is a program recorded live, homemade, <br />with turntables, vinyls and passion. <br />Respect the music.</h3>

        <div className={styles.grid}>
          {episodes.map((ep) => (
            <CardEpisode key={ep.id} data={ep} />
          ))}
        </div>
      </main>
    </div>
  )
}


const CardEpisode = (props) => {
  const { data } = props;
  return (
    <div className={styles.container}>
      <Link href={`/episodes/${data.slug}`}>
        <a>
          <div>{data.season} - {data.episodeNumber} - {data.aired}</div>
          <Image data={data.cover.responsiveImage} />
          <h3>{data.title}</h3>
        </a>
      </Link>
    </div>
  )
}