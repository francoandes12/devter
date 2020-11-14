import { useEffect } from "react";
import Head from "next/head";
import { colors } from "../styles/theme";
import Button from "@c/Buttons";
import GitHub from "@c/Icons/Github";
import { loginWithGitHub } from "../firebase/client";
import Logo from "@c/Icons/Logo";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
import useUser, { USER_STATES } from "./../hooks/useUser";

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace("/home");
  }, [user]);
  const handleClick = () => {
    loginWithGitHub().catch((error) => {
      console.log(error);
    });
  };
  return (
    <>
      <Head>
        <title>Devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Logo width="100" />
        <h1>Devter</h1>
        <h2>
          talk about development <br /> with developers
        </h2>
        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub fill="#fff" width={25} height={25} />
              Login with github
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && (
            <Loader
              type="ThreeDots"
              color="#0049ff"
              height={100}
              width={100}
              timeout={3000}
            />
          )}
        </div>
      </section>
      <style jsx>
        {`
          section {
            display: grid;
            height: 100%;
            place-content: center;
            place-items: center;
          }
          img {
            width: 120px;
          }
          div {
            margin-top: 17px;
          }
          h1 {
            color: ${colors.primary};
            font-weight: 800;
            margin-bottom: 16px;
            font-size: 32px;
          }
          h2 {
            color: ${colors.secondary};
            font-size: 21px;
            margin: 0;
          }
        `}
      </style>
    </>
  );
}
