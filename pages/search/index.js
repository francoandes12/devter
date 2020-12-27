import React, { useState } from "react";
import { colors } from "styles/theme";
import { useForm } from "./../../hooks/useForm";
import { getElementsFiltered } from "./../../helpers/getElementsFiltered";
import { useRouter } from "next/router";
import Button from "@c/Buttons";
import useDateTimeFormat from "../../hooks/useDateTimeFormat";
import Head from "next/head";
export default function Search() {
  const router = useRouter();
  const [formValues, handleInputChange, reset] = useForm({
    buscar: "",
  });
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const { buscar } = formValues;
  const handleSubmit = (e) => {
    e.preventDefault();
    const devits = JSON.parse(localStorage.getItem("devits"));
    const elemfiltrados = getElementsFiltered(devits, buscar);
    setResultadosBusqueda(elemfiltrados);
    reset({ buscar: "" });
  };
  const Resultados = ({ userName, content, createdAt }) => {
    const createdAtFormated = useDateTimeFormat(createdAt);

    return (
      <>
        <div>
          <h3>Usuario: {userName}</h3>
          <p>Devit: {content}</p>
          <h6>Creado el: {createdAtFormated}</h6>
        </div>
        <style jsx>
          {`
            div {
              background: ${colors.black};
              margin: 0 auto;
              width: 50%;
              border-radius: 10px;
            }
            h3 {
              color: ${colors.primary};
              text-align: center;
            }
            p {
              color: ${colors.white};
              text-align: justify;
            }
            h6 {
              color: ${colors.white};
            }
          `}
        </style>
      </>
    );
  };
  const handleVolver = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Buscar devits</title>
      </Head>
      <h2>Buscar tweets de usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          placeholder="ingrese un usuario"
          type="text"
          name="buscar"
          onChange={handleInputChange}
          value={buscar}
        />
        <Button type="submit">Buscar</Button>
      </form>
      {resultadosBusqueda !== 0 && (
        <div>
          <h2>Resultados:{resultadosBusqueda.length}</h2>
          {/* <img src={resultadosBusqueda[0].avatar} /> */}
          {resultadosBusqueda.map(({ createdAt, userName, content }) => (
            <Resultados
              key={createdAt}
              userName={userName}
              content={content}
              createdAt={createdAt}
            />
          ))}
        </div>
      )}

      <Button onClick={handleVolver}>volver al inicio</Button>
      <style jsx>
        {`
          input {
            width: 100%;
            font-size: 1rem;
            border: 0;
            border-bottom: 2px solid ${colors.primary};
            outline: 0;
            padding: 7px 2px;
            background: transparent;
            margin-bottom: 10px;
          }
        `}
      </style>
    </>
  );
}
