import Head from 'next/head';
import Link from "next/link";
import { Image } from "react-datocms";
// lib
import { request } from '../../lib/datocms';
// styles
import styles from '../../styles/Article.module.css';

export default function Episode(props) {
  const { episodeData } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>Diggin&rsquo;Deeper archive</title>
        <meta name="description" content="Diggin&rsquo;Deeper episode archive" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.back}>
            <Link href={'/'}>
              <a>⬅ torna alla lista degli episodi</a>
            </Link>
          </div>
          <h1 className={styles.title}>{episodeData.title}</h1>
          <div className={styles.player} dangerouslySetInnerHTML={{ __html:episodeData.player}} />
          <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html:episodeData.excerpt}} />
          <div className={styles.table}>
            <div className={styles.cover}>
              <Image data={episodeData.cover.responsiveImage} />
            </div>
            <div className={styles.tracklist} dangerouslySetInnerHTML={{ __html:episodeData.tracklist}} />
          </div>
        </article>
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

const PATHS_QUERY = `
query MyQuery {
  allEpisodes(first: 30) {
    slug
  }
}
`

export const getStaticPaths = async () => {
  const slugQuery = await request({
    query: PATHS_QUERY,
  });
  let paths = [];
  slugQuery.allEpisodes.map(ep => paths.push(`/episodes/${ep.slug}`));
  return {
    paths,
    fallback: false
  }
}

const ARTICLE_QUERY = `
query MyQuery($slug: String) {
  episode(filter: {slug: {eq: $slug}}) {
    id
    season
    episodeNumber
    aired
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
        webpSrcSet
        width
      }
    }
    excerpt
    tracklist
    player
    slug
  }
}
`

export const getStaticProps = async ({ params }) => {
  const episode = await request({
    query: ARTICLE_QUERY,
    variables: {
      slug: params.slug
    },
  });

  return {
    props: {
      episodeData: episode.episode,
    }
  }
}