import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import Header from "../Utils/Header";
import { FiTrash2, FiPlus } from "react-icons/fi";
import "./styles.css";

export default function Acrescimos() {
  //Acrescimos
  const [adds, setAdds] = useState([]);

  const enterprise_id = localStorage.getItem("enterpriseid");

  async function deleteAdds(id) {
    try {
      await api.delete(`/adds/${id}`, {
        headers: {
          Authorization: enterprise_id,
        },
      });
      setAdds(adds.filter((add) => add.id !== id));
    } catch (error) {
      alert("Não foi possivel deletar seu acrescimo, tente novamente");
    }
  }

  //Listar Adds
  useEffect(() => {
    api
      .get("/adds", {
        headers: {
          Authorization: enterprise_id,
        },
      })
      .then((response) => {
        setAdds(response.data);
      });
  }, [enterprise_id]);

  return (
    <>
      <Header />
      <main>
        <section className="acrescimo">
          <p className="title">Acrescimos</p>
          <div className="content">
            {adds === null ? (
              <div className="new-user">
                <ul>
                  <li className="adds">
                    <Link className="add-interations" to="/acrescimo/new">
                      <FiPlus size={72} color="#dadada"></FiPlus>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="list-adds">
                <ul>
                  {adds.map((add) => (
                    <li className="add" key={add.id}>
                      <p className="name">{add.name}</p>
                      <p className="price">
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(add.price)}
                      </p>
                      <button
                        className="delete-adds"
                        onClick={() => deleteAdds(add.id)}
                        type="button"
                      >
                        <FiTrash2 size={16} color="#FF0000" />
                      </button>
                    </li>
                  ))}
                  {adds ? (
                    <div className="default">
                      <div className="new-adds">
                        <Link className="add-interations" to="/acrescimo/new">
                          <FiPlus size={72} color="#dadada"></FiPlus>
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
      <footer>
        <p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p>
      </footer>
    </>
  );
}
