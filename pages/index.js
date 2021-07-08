import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import YouTube from "react-youtube";
import styles from "../styles/Home.module.css";

const YOUTUBE_PLAYLIST_ITEM = `https://www.googleapis.com/youtube/v3/playlistItems`;

export const getStaticProps = async () => {
  const res = await fetch(
    `${YOUTUBE_PLAYLIST_ITEM}?part=snippet&playlistId=PLyGEmW7O18z0cfPmjI8xgShs4Z0gklpVh&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await res.json();

  return {
    props: {
      playlist: data,
    },
  };
};

export default function Home({ playlist }) {
  const [url, setUrl] = useState("");
  const autoFocus = useRef();

  const handleClick = (id) => {
    setUrl(id);
    autoFocus.current.focus();
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>My Youtube API | HOME</title>
        <meta name="description" content="my youtube api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Syafia dan Arissa Playlist</h1>

        <div ref={autoFocus} tabIndex="1">
          <YouTube videoId={url} opts={opts} className={styles.video}/>
        </div>

        <div className={styles.grid}>
          {playlist.items.map((item) => {
            const { id, snippet = {} } = item;
            const { title, thumbnails = {}, resourceId } = snippet;
            const { medium } = thumbnails;
            return (
              <div key={id} className={styles.card}>
                <li onClick={() => handleClick(resourceId.videoId)}>
                  <Image
                    width={medium.width}
                    height={medium.height}
                    src={medium.url}
                    alt=""
                  />
                  <h2>{title}</h2>
                </li>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
