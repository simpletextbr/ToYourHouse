import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import LogoHeader from "../../assets/logoHeader.svg";
import NOLOGO from "../../assets/NOLOGO.png";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const [enterprises, setEnterprises] = useState([]);

  const enterprise_id = localStorage.getItem("enterpriseid");

  //Logo e Name
  useEffect(() => {
    api
      .get("/enterprise/list", {
        headers: {
          Authorization: enterprise_id,
        },
      })
      .then((response) => {
        setEnterprises(response.data);
      });
  }, [enterprise_id]);

  return (
    <header>
      <Link className="logo-home-link" to="/inicio">
        <img className="logoheader" src={LogoHeader} alt="Logo To Your House" />
      </Link>
      {enterprises.map((logo) => (
        <div className="row-logo-name" key={logo.id}>
          <img
            className="logoenterprise"
            src={
              logo.logo == null
                ? NOLOGO
                : `http://localhost:3333/file/logo/${logo.logo}`
            }
            alt="Logo da Empresa"
          />

          <p>Ola, {logo.name}</p>
        </div>
      ))}
      <div className="menu-interations">
        <Link to="/inicio">Inicio</Link>
        <Link to="/acrescimo">Acrescimos</Link>
        <Link to="/config">Configurar</Link>
        <Link to="/inicio/changepass" style={{ color: "#FF9431" }}>
          Mudar Senha
        </Link>
        <Link to="/Login">
          <FiLogOut size={23} color="#FF0000" />
        </Link>
      </div>
    </header>
  );
}
