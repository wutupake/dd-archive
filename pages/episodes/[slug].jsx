import Link from "next/link";
import { getAllSlug, getEpisodeBySlug } from "../../lib/episodes";

export default function Episode(props) {
  const { episodeData } = props;
  return (
    <article>
      <Link href={'/'}>
        <a>torna alla lista degli episodi</a>
      </Link>
      <br />
      <img src={episodeData.cover.url} alt={episodeData.cover.alt} />
      <h1>{episodeData.title}</h1>
      <p>{episodeData.excerpt}</p>
      {episodeData.tracklist}
    </article>
  )
}

export const getStaticPaths = () => {
 const paths = getAllSlug();
 return {
   paths,
   fallback: false
 }
}

export const getStaticProps = ({ params }) => {
  const episodeData = getEpisodeBySlug(params.slug);
  return {
    props: {
      episodeData,
    }
  }
}