import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';


import api from '../../../services/api';

import Header from '../../Utils/Header'
import {FiCheckCircle, FiChevronRight, FiImage, FiArrowLeft } from 'react-icons/fi';
import './styles.css';

export default function UploadLogo(){

//Listagem de empresas
const[enterprises, setEnterprises] = useState([]);

const[logo, setLogo] = useState(null)


const enterprise_id = localStorage.getItem('enterpriseid');

const history = useHistory();

async function uploadLogo(e){
    e.preventDefault();
    const data = new FormData();

    data.append('logo', logo)
    
    await api.put('/config/upload/logo', data, {
        headers:{
            Authorization: enterprise_id
        }
    })
    history.push('/config');
}

//Listagem de Empresas
useEffect(() => {
    api.get('/enterprise/list', {
        headers: {
            Authorization: enterprise_id
            
        }
    }).then(response => {
        setEnterprises(response.data);
    })
    },[enterprise_id]);

return(
    <>
    <Header />
    <main>
        <form onSubmit={uploadLogo}>
            <label id="logo-upload"><p><FiChevronRight size={16} color="#FF0000"></FiChevronRight>Logo da Sua empresa</p>
                <input type="file" onChange={e => setLogo(e.target.files[0])} />
                {enterprises.map( enterprise => (
                <div id="imglogo" key={enterprise.id}>
                    {enterprise.urllogo===null 
                    ? <FiImage size={32} color="#FFEA00" key={enterprise.id}></FiImage> 
                    : <img className="logo" src={enterprise.urllogo} alt="Logo da Sua Empresa" /> }
                </div>))}
                <span>(32x28)</span>
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