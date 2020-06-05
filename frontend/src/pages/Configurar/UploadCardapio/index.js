import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


import api from '../../../services/api';

import Header from '../../Utils/Header';
import {FiCheckCircle, FiChevronRight, FiImage, FiArrowLeft } from 'react-icons/fi';



import './styles.css';

export default function Uploadcardapio(){
const[enterprises, setEnterprises] = useState([]);
const[cardapio, setCardapio] = useState(null);

const enterprise_id = localStorage.getItem('enterpriseid');
const history = useHistory();

async function uploadCardapio(e){
    e.preventDefault();
    const data = new FormData();

    data.append('cardapio', cardapio)

    await api.put('/config/upload/cardapio', data, {
        headers:{
            Authorization: enterprise_id
        }
    });
    history.push('/config');
} 

useEffect(() => {
    api.get('/enterprise/list', {
        headers: {
            Authorization: enterprise_id
            
        }
    }).then(response => {
        setEnterprises(response.data);
    })
    },[enterprise_id]);


return (
    <>
    <Header />
<main>
    <form onSubmit={uploadCardapio}>   
            <label id="cardapio-upload"><p><FiChevronRight size={16} color="#FF0000"></FiChevronRight>Seu Cardapio</p>
            <input type="file" onChange={e => setCardapio(e.target.files[0])}/>
            {enterprises.map(enterprise => (
            <div id="imgcardapio" key={enterprise.id} >
                { enterprise.cardapio===null 
                ? <FiImage size={412} color="#FFEA00"></FiImage> 
                : <img className="cardapio" src={`http://localhost:3333/file/cardapio/${enterprise.cardapio}`} alt="Cardapio da Sua Empresa" />}
                </div>))}   
            <span>(412x823)</span>
            <div className="row-buttons">
                <Link className="Back_Interations" to="/config">
                    <FiArrowLeft size={16} color='#FF5555' />
                            Voltar
                </Link> 
            <button type="submit">
                <FiCheckCircle size={33} color="#37B34A"></FiCheckCircle> 
            </button>
            </div>
            </label>
        </form> 
</main>
<footer><p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p></footer>
</>
)

}