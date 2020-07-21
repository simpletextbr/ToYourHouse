import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../../services/api";

import Header from "../../Utils/Header";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";

export default function Newproduct() {
  //Categorias
  const [category, setCategory] = useState([]);
  //Novo Produto
  const [proName, setProname] = useState("");
  const [proIng, setProing] = useState("");
  const [proPrice, setProprice] = useState("");
  const [cat_id, setCat_id] = useState("");
  const [adds, setAdds] = useState();

  const enterprise_id = localStorage.getItem("enterpriseid");
  const history = useHistory();

  async function createProduct(e) {
    e.preventDefault();

    const name = proName;
    const Ing = proIng;
    const price = proPrice;

    const data = {
      name,
      Ing,
      price,
      adds,
    };

    if (cat_id === "Selecione uma categoria" || cat_id.trim() === "") {
      alert("Você precisa selecionar uma categoria!");
    } else {
      try {
        await api.post("/products", data, {
          headers: {
            Authorization: enterprise_id,
            cat_Authorization: cat_id,
          },
        });
        history.push("/inicio");
      } catch (error) {
        alert("Não foi possivel criar seu produto, tente novamente");
      }
    }
  }

  //List Category
  useEffect(() => {
    api
      .get("/category", {
        headers: {
          Authorization: enterprise_id,
        },
      })
      .then((response) => {
        setCategory(response.data);
      });
  }, [enterprise_id]);

  return (
    <>
      <Header />
      <main>
        <div className="add-product">
          <p className="title">Opa! Produto novo chegando!!</p>
          <form onSubmit={createProduct}>
            <p>Nome do Produto</p>
            <input
              placeholder="Seu novo produto"
              required
              value={proName}
              onChange={(e) => setProname(e.target.value)}
            />
            <p>Ingredientes Basicos</p>
            <textarea
              placeholder="Ingredientes Principais do seu Produto"
              value={proIng}
              onChange={(e) => setProing(e.target.value)}
            />
            <p>Preço</p>
            <input
              type="number"
              required
              placeholder="R$0,00"
              value={proPrice}
              onChange={(e) => setProprice(e.target.value)}
            />
            <p>Categoria</p>
            <select value={cat_id} onChange={(e) => setCat_id(e.target.value)}>
              <option value="-1">Selecione uma categoria</option>
              {category.map((categorys) => (
                <option key={categorys.id} value={categorys.id}>
                  {categorys.name}
                </option>
              ))}
            </select>
            <div className="row-checkbox">
              <p>Esse Produdo pode receber acréscimos ?</p>
              <input
                type="checkbox"
                name="Sim"
                value={true}
                onChange={(e) => setAdds(e.target.value)}
              />
              <i>Sim</i>
              <input
                type="checkbox"
                name="Nao"
                value={false}
                onChange={(e) => setAdds(e.target.value)}
              />
              <i>Não</i>
            </div>
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
      <footer>
        <p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p>
      </footer>
    </>
  );
}
