import React from "react";
import Button from "@c/Buttons";
import useUser from "hooks/useUser";
import { logout } from "./../../firebase/client";
import { useRouter } from "next/router";
export default function Usuario() {
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  const user = useUser();
  const handleVolver = () => {
    router.push("/");
  };
  return (
    <>
      {user !== undefined && (
        <div>
          <h2>Bienvenido , {user.username}</h2>
          <img src={user.avatar} alt={user.username} />
        </div>
      )}
      <h3>Desea cerrar sesion?</h3>
      <Button onClick={handleLogout}>Cerrar sesion</Button>
      <h3>o volver al home?</h3>
      <Button onClick={handleVolver}>Home</Button>
    </>
  );
}
