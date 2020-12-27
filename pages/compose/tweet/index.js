import Button from "@c/Buttons";
import useUser from "hooks/useUser";
import { useEffect, useState } from "react";
import { addDevit } from "firebase/client";
import { useRouter } from "next/router";
import Head from "next/head";
import { uploadImage } from "./../../../firebase/client";
import Avatar from "./../../../components/Avatar/index";
const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCES: 2,
  ERROR: -1,
};
const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};
export default function ComposeTweet() {
  const user = useUser();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = () => {};
      const onComplete = () => {
        console.log("onComplete");
        task.snapshot.ref.getDownloadURL().then(setImgURL);
      };
      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);
  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addDevit({
      avatar: user.avatar,
      content: message,
      img: imgURL,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.log(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];
    const task = uploadImage(file);
    setTask(task);
  };
  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;
  const handleVolver = () => {
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Crear un Devit</title>
      </Head>
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onChange={handleChange}
            placeholder="¿que esta pasando mi raza?"
            value={message}
          ></textarea>
          {imgURL && (
            <section className="removeImg">
              <button onClick={() => setImgURL(null)}>x</button>
              <img src={imgURL} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </section>
      <Button onClick={handleVolver}>Volver al inicio</Button>
      <style jsx>{`
        div {
          padding: 15px;
        }
        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }
        form {
          padding: 10px;
        }
        img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
        button {
          position: absolute;
          right: 15px;
          color: #fff;
          font-size: 24px;
          top: 15px;
          background: rgba(0, 0, 0, 0.3);
          border: 0;
          border-radius: 999px;
          width: 32px;
          height: 32px;
          cursor: pointer;
        }
        .removeImg {
          position: relative;
        }
        .form-container {
          display: flex;
          align-items: flex-start;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          padding: 15px;
          border-radius: 10px;
          resize: none;
          font-size: 21px;
          width: 100%;
          min-height: 200px;
          outline: 0;
        }
      `}</style>
    </>
  );
}
