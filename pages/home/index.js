import { useState, useEffect } from "react";
import Devit from "@c/Devit";
import useUser from "hooks/useUser";
import { listenLatestDevits } from "firebase/client";
import Link from "next/link";
import Create from "../../components/Icons/Create";
import Home from "../../components/Icons/Home";
import Search from "../../components/Icons/Search";
import { colors } from "styles/theme";
import Head from "next/head";
export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();
  useEffect(() => {
    let unsubscribe;
    if (user) {
      unsubscribe = listenLatestDevits(setTimeline);
    }
    return () => unsubscribe && unsubscribe();
  }, [user]);
  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(
          ({ createdAt, img, id, userId, content, userName, avatar }) => (
            <Devit
              img={img}
              createdAt={createdAt}
              content={content}
              avatar={avatar}
              userName={userName}
              key={id}
              id={id}
              userId={userId}
            />
          )
        )}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>
      <style jsx>
        {`
          header {
            align-items: center;
            display: flex;
            border-bottom: 1px solid #eee;
            height: 49px;
            position: sticky;
            top: 0;
            width: 100%;
            background: #ffffffaa;
            backdrop-filter: blur(5px);
          }
          section {
            flex: 1;
          }
          h2 {
            font-size: 21px;
            font-weight: 800;
            padding-left: 15px;
          }

          nav {
            background: #fff;
            bottom: 0;
            border-top: 1px solid #eee;
            height: 49px;
            position: sticky;
            width: 100%;
            display: flex;
          }
          nav a {
            align-items: center;
            height: 100%;
            display: flex;
            flex: 1 1 auto;
            justify-content: center;
          }
          nav a:hover {
            background: radial-gradient(#0099ff22 15%, transparent 16%);
            background-size: 180px 180px;
            background-position: center;
          }
          nav a:hover > :global(svg) {
            stroke: ${colors.primary};
          }
        `}
      </style>
    </>
  );
}
