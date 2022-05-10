import Head from 'next/head';
import Link from 'next/link';
import { Image } from 'react-datocms';
// lib
import { request } from '../lib/datocms';
// styles
import styles from '../styles/Home.module.css';

const HOMEPAGE_QUERY = `
query MyQuery {
  allEpisodes(orderBy: aired_ASC, first: 30) {
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
        <h2 className={styles.motto}>Diggin&rsquo;Deeper <del>is</del> <em>was</em> a program recorded live, homemade, with turntables, vinyl and passion.</h2>

        <div className={styles.grid}>
          {episodes.map((ep) => (
            <CardEpisode key={ep.id} data={ep} />
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        Diggin&rsquo;Deeper è stato un programma andato in onda dal 2013 al 2014 su The Great Complotto Radio.
        Qui è possibile trovare gli episodi delle due stagioni.
        Il sito originale non è più online, ma questo ne riprende il design (d&rsquo;altronde l&rsquo;autore è lo stesso).
        Le caselle di posta sul vecchio dominio non sono più attive.
        La pagina Facebook è ancora online, ma non è più aggiornata.
        Le puntate sono ancora caricate su MixCloud.
        Se sei un vecchio ascoltatore: grazie per il supporto! Se non hai mai sentito Diggin&lsquo;Deeper, e ti va di ascoltarlo, qui puoi farlo <small>😊</small> <br />
        RESPECT THE MUSIC.
      </footer>
    </div>
  )
}


const CardEpisode = (props) => {
  const { data } = props;
  return (
    <div className={styles.card}>
      <Link href={`/episodes/${data.slug}`}>
        <a>
          <div className={styles.pretitle}>S0{data.season} | EP{data.episodeNumber}</div>
          <Image data={data.cover.responsiveImage} />
          <h4 className={styles.title}>{data.title}</h4>
        </a>
      </Link>
    </div>
  )
}