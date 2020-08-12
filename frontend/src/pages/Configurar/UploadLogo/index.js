import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import api from "../../../services/api";

import Header from "../../Utils/Header";
import Footer from "../../Utils/Footer";

import {
  FiCheckCircle,
  FiChevronRight,
  FiImage,
  FiArrowLeft,
} from "react-icons/fi";
import "./styles.css";

export default function UploadLogo() {
  const [logo, setLogo] = useState(null);

  const enterprise_id = localStorage.getItem("enterpriseid");

  const history = useHistory();

  async function uploadLogo(e) {
    e.preventDefault();
    const data = new FormData();

    data.append("logo", logo);

    await api.put("/config/upload/logo", data, {
      headers: {
        Authorization: enterprise_id,
      },
    });
    history.push("/config");
  }

  return (
    <>
      <Header />
      <main>
        <form onSubmit={uploadLogo}>
          <label id="logo-upload">
            <p>
              <FiChevronRight size={16} color="#FF0000"></FiChevronRight>Logo da
              Sua empresa
            </p>
            <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
            <div id="imglogo">
              <FiImage size={160} color="#FFEA00"></FiImage>
            </div>
            <span>(32x28)</span>
            <div className="row-buttons">
              <Link className="Back_Interations" to="/config">
                <FiArrowLeft size={16} color="#FF5555" />
                Voltar
              </Link>
              <button type="submit">
                <FiCheckCircle size={33} color="#37B34A"></FiCheckCircle>
              </button>
            </div>
          </label>
        </form>
      </main>
      <Footer />
    </>
  );
}
