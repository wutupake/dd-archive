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
        <article>
          <Link href={'/'}>
            <a>⬅ torna alla lista degli episodi</a>
          </Link>
          <br />
          <br />
          <h1>{episodeData.title}</h1>
          <div dangerouslySetInnerHTML={{ __html:episodeData.player}} />
          <p>{episodeData.excerpt}</p>
          <div className={styles.cover}>
            <Image data={episodeData.cover.responsiveImage} />
          </div>
          <div dangerouslySetInnerHTML={{ __html:episodeData.tracklist}} />
        </article>
      </main>
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