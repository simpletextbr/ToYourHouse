import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import logoLogin from "../../assets/logoLogin.png";
import Footer from "../Utils/Footer";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";
import api from "../../services/api";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function Logar(e) {
    e.preventDefault();

    const data = {
      name,
      password,
    };

    try {
      const response = await api.post("/session", data);

      localStorage.setItem("enterpriseid", response.data.id);
      localStorage.setItem("enterprisename", name);

      history.push("/inicio");
    } catch (error) {
      alert("Usuario ou senha incorretos, Tente novamente.");
    }
  }
  return (
    <>
      <header className="login">
        <img src={logoLogin} alt="Logo To Your House" />
      </header>
      <main>
        <div className="login">
          <form onSubmit={Logar}>
            <p>Nome da Empresa</p>
            <input
              placeholder="O nome da sua Empresa"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>Senha</p>
            <input
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="row-buttons">
              <Link className="Back_Interations" to="/">
                <FiArrowLeft size={16} color="#FF5555" />
                Voltar
              </Link>
              <button className="btn" type="submit">
                ENTRAR
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
