import Devit from "@c/Devit";
import { firestore } from "firebase/admin";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
export default function DevitPage(props) {
  const router = useRouter();
  if (router.isFallback)
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    );
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  );
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "7X2iSDRwXMA0n3ysgKYC" } }],
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      };
      return { props };
    })
    .catch(() => {
      return { props: {} };
    });
}
