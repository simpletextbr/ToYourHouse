import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import Header from "../Utils/Header";
import Footer from "../Utils/Footer";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";

export default function Changepass() {
  const [olderpass, setOlderPass] = useState("");
  const [newpass, setNewPass] = useState("");
  const [repnewpass, setRepNewPass] = useState("");

  const enterprise_id = localStorage.getItem("enterpriseid");
  const history = useHistory();

  async function change(e) {
    e.preventDefault();
    const data = {
      olderpass,
      newpass,
      repnewpass,
    };
    try {
      const response = await api.put("/changepass", data, {
        headers: {
          Authorization: enterprise_id,
        },
      });
      console.log(response.data.send);

      if (response.data.send === "Older Password Incompatible") {
        alert("Sua senha Antiga esta incorreta");
      } else if (response.data.send === "Newer Password Incompatible") {
        alert("As novas senha não são iguais");
      } else {
        history.push("/inicio");
      }
    } catch (err) {
      alert("Não foi possivel criar seu produto, tente novamente");
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="Changepass">
          <p className="title">Hora de Mudar a senha!</p>
          <form onSubmit={change}>
            <p>
              Senha Antiga<span className="aviso"> (apenas numeros)</span>
            </p>
            <input
              type="password"
              placeholder="********"
              required
              value={olderpass}
              onChange={(e) => setOlderPass(e.target.value)}
            />
            <p>
              Nova Senha<span className="aviso"> (apenas numeros)</span>
            </p>
            <input
              type="password"
              required
              placeholder="********"
              value={newpass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <p>
              Confirme a nova Senha
              <span className="aviso"> (apenas numeros)</span>
            </p>
            <input
              type="password"
              required
              placeholder="********"
              value={repnewpass}
              onChange={(e) => setRepNewPass(e.target.value)}
            />
            <div className="row-buttons">
              <Link className="Back_Interations" to="/inicio">
                <FiArrowLeft size={16} color="#FF5555" />
                Voltar
              </Link>
              <button className="btn" type="submit">
                CADASTRAR
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
