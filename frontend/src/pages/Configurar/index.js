import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import Header from "../Utils/Header";
import Footer from "../Utils/Footer";
import {
  FiTrash2,
  FiCheckCircle,
  FiChevronRight,
  FiImage,
} from "react-icons/fi";
import "./styles.css";

export default function Configurar() {
  //Listagem de empresas
  const [enterprises, setEnterprises] = useState([]);

  //Pagamentos
  const [payments, setPayments] = useState([]);
  const [payTitle, setPayTitle] = useState("");

  //Status
  const [status, setStatus] = useState("");

  //Customizacao
  const [custom, setCustom] = useState([]);
  const [bgcolor, setBgcolor] = useState("#FDF5F5");
  const [btcolor, setBtcolor] = useState("#FF0000");

  const enterprise_id = localStorage.getItem("enterpriseid");

  const history = useHistory();

  async function createPayment(e) {
    e.preventDefault();
    const title = payTitle;

    const data = {
      title,
    };

    try {
      await api.post("/config/payments", data, {
        headers: {
          Authorization: enterprise_id,
        },
      });
      history.go(0);
    } catch (error) {
      alert("Não foi possivel cadastrar seu pagamento, tente novamente");
    }

    history.push("/config");
  }

  async function deletePayment(id) {
    try {
      await api.delete(`/config/payments/${id}`, {
        headers: {
          Authorization: enterprise_id,
        },
      });
      setPayments(payments.filter((payment) => payment.id !== id));
    } catch (error) {
      alert(
        "Não foi possivel deletar seu metodo de pagamento, tente novamente"
      );
    }
  }

  async function updateStatus() {
    const data = {
      status,
    };
    try {
      await api.put("/config/status", data, {
        headers: {
          Authorization: enterprise_id,
        },
      });
    } catch (error) {
      alert("Não foi possivel atualizar o seu status do app, tente novamente");
    }
  }

  async function updateColor(e) {
    e.preventDefault();

    const backgound_app = bgcolor;
    const button_app = btcolor;

    const data = {
      backgound_app,
      button_app,
    };

    try {
      await api.put("/config/custom", data, {
        headers: {
          Authorization: enterprise_id,
        },
      });
      history.go(0);
    } catch (error) {
      alert("Não foi possivel atualizar as cores do app, tente novamente");
    }
  }

  //List Payments
  useEffect(() => {
    api
      .get("/config/payments", {
        headers: {
          Authorization: enterprise_id,
        },
      })
      .then((response) => {
        setPayments(response.data);
      });
  }, [enterprise_id]);

  //List custom
  useEffect(() => {
    api
      .get("/config/custom", {
        headers: {
          Authorization: enterprise_id,
        },
      })
      .then((response) => {
        setCustom(response.data);
      });
  }, [enterprise_id]);

  //Listagem de Empresas
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
    <>
      <Header />
      <main>
        <section className="config">
          <div className="pagamento">
            <p className="title">Pagamento</p>
            {payments === null ? (
              <div className="new-user">
                <form onSubmit={createPayment}>
                  <FiChevronRight size={16} color="#FF0000"></FiChevronRight>
                  <input
                    placeholder="Nova forma de Pagamento..."
                    required
                    value={payTitle}
                    onChange={(e) => setPayTitle(e.target.value)}
                  />
                  <button type="submit">
                    <FiCheckCircle size={20} color="#37B34A"></FiCheckCircle>
                  </button>
                </form>
              </div>
            ) : (
              payments.map((payment) => (
                <div className="list-payments" key={payment.id}>
                  <p>
                    <FiChevronRight size={16} color="#FF0000"></FiChevronRight>
                    {payment.title}
                  </p>
                  <button
                    className="delete-payment"
                    onClick={() => deletePayment(payment.id)}
                    type="button"
                  >
                    <FiTrash2 size={18} color="#FF0000"></FiTrash2>
                  </button>
                </div>
              ))
            )}
            {payments ? (
              <div className="default">
                <form onSubmit={createPayment}>
                  <FiChevronRight size={16} color="#FF0000"></FiChevronRight>
                  <input
                    placeholder="Nova forma de Pagamento..."
                    required
                    value={payTitle}
                    onChange={(e) => setPayTitle(e.target.value)}
                  />
                  <button type="submit">
                    <FiCheckCircle size={20} color="#37B34A"></FiCheckCircle>
                  </button>
                </form>
              </div>
            ) : null}
          </div>
          <div className="Status">
            <p className="title">Status de Funcionamento</p>
            <form onSubmit={updateStatus}>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="-1">Selecione seu status atual</option>
                <option value="0">Fechado</option>
                <option value="1">Tempo de entrega 10 - 20 min</option>
                <option value="2">Tempo de entrega 20 - 30 min</option>
                <option value="3">Tempo de entrega 30 - 40 min</option>
                <option value="4">Tempo de entrega 40 - 50 min</option>
                <option value="5">Tempo de entrega 50 - 60 min</option>
                <option value="6">Tempo de entrega + de 1Hr</option>
              </select>
              <p className="Dados">
                Seu Status atual é:
                {enterprises.map((enterprise) =>
                  enterprise.status === 0
                    ? " Fechado"
                    : enterprise.status === 1
                    ? " Tempo de entrega 10 - 20 min"
                    : enterprise.status === 2
                    ? " Tempo de entrega 20 - 30 min"
                    : enterprise.status === 3
                    ? " Tempo de entrega 30 - 40 min"
                    : enterprise.status === 4
                    ? " Tempo de entrega 40 - 50 min"
                    : enterprise.status === 5
                    ? " Tempo de entrega 50 - 60 min"
                    : enterprise.status === 6
                    ? " Tempo de entrega + de 1Hr"
                    : " Sem Status Definido"
                )}
              </p>
              <button className="btn" type="submit">
                Mudar Status
              </button>
            </form>
          </div>
          <div className="custom">
            <p className="title">Personalização</p>
            <form onSubmit={updateColor}>
              <div className="Colors">
                <p className="bgcolor">
                  <FiChevronRight size={16} color="#FF0000"></FiChevronRight>Cor
                  de Fundo do App
                </p>
                <div className="Color">
                  <li className="List-colors">
                    <p className="atual">
                      Atual
                      <i
                        className="seletor"
                        style={{
                          backgroundColor: custom.map((bg) => bg.backgound_app),
                          width: 32,
                          height: 28,
                          borderRadius: 6,
                        }}
                      ></i>
                    </p>
                    <p className="seletor">
                      Seletor
                      <input
                        type="color"
                        value={bgcolor}
                        onChange={(e) => setBgcolor(e.target.value)}
                      />
                    </p>
                  </li>
                </div>
              </div>
              <div className="Colors">
                <p className="btcolor">
                  <FiChevronRight size={16} color="#FF0000"></FiChevronRight>Cor
                  dos Botões do App
                </p>
                <div className="Color">
                  <li className="List-colors">
                    <p className="atual">
                      Atual
                      <i
                        className="seletor"
                        style={{
                          backgroundColor: custom.map((bt) => bt.button_app),
                          width: 32,
                          height: 28,
                          borderRadius: 6,
                        }}
                      ></i>{" "}
                    </p>
                    <p className="seletor">
                      Seletor
                      <input
                        type="color"
                        value={btcolor}
                        onChange={(e) => setBtcolor(e.target.value)}
                      />
                    </p>
                  </li>
                </div>
              </div>
              <button className="btn" type="submit">
                Mudar Cor
              </button>
            </form>
          </div>
          <div className="uploads">
            <p className="title">Sessão de Uploads</p>
            <div className="links">
              <Link to="/config/upload/logo">
                {enterprises.map((enterprise) => (
                  <div id="bgcolor" key={enterprise.id}>
                    <p>Logo da sua Empresa</p>
                    {enterprise.logo === null ? (
                      <FiImage size={100} color="#FFEA00"></FiImage>
                    ) : (
                      <img
                        className="logo"
                        src={`http://api-tyh-com-br.umbler.net/file/logo/${enterprise.logo}`}
                        alt="Logo da Sua Empresa"
                      />
                    )}
                  </div>
                ))}
              </Link>
              <Link to="/config/upload/cardapio">
                {enterprises.map((enterprise) => (
                  <div id="btcolor" key={enterprise.id}>
                    <p>Cardapio da sua Empresa</p>
                    {enterprise.cardapio === null ? (
                      <FiImage size={100} color="#FFEA00"></FiImage>
                    ) : (
                      <img
                        className="cardapio"
                        src={`http://api-tyh-com-br.umbler.net/file/cardapio/${enterprise.cardapio}`}
                        alt="Cardapio da Sua Empresa"
                      />
                    )}
                  </div>
                ))}{" "}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
