import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import api from '../../services/api';

import LogoHeader from '../../assets/logoHeader.svg';
import NOLOGO from '../../assets/NOLOGO.png';
import { FiTrash2, FiPlus, FiLogOut} from 'react-icons/fi';
import './styles.css';

export default function Acrescimos() {
//logo uploda
const[logo, setLogo] = useState([]);
//Acrescimos
const[adds, setAdds] = useState([]);

const enterprise_id = localStorage.getItem('enterpriseid');

async function deleteAdds(id){
  try{
    await api.delete(`/adds/${id}`, {
        headers: {
            Authorization: enterprise_id
        }
     });
    setAdds(adds.filter(add => add.id !== id))
  }catch(error){
    alert('Não foi possivel deletar seu acrescimo, tente novamente');
  }
}

//Logo e Name
useEffect(() => {
    api.get('/enterprise/list', {
        headers: {
            Authorization: enterprise_id
        }
    }).then(response => {
        setLogo(response.data);
    })
   },[enterprise_id]);

//Listar Adds
useEffect(() => {
    api.get('/adds', {
        headers:{
            Authorization: enterprise_id
        }
    }).then(response => {
        setAdds(response.data);
    })
   },[enterprise_id])

    return(
        <>
        <header>
            <Link className="logo-home-link" to='/inicio'>
                <img className="logoheader" src={LogoHeader} alt="Logo To Your House" />
            </Link>
        {logo.map(enterprise => (
            <div className="row-logo-name" key={enterprise.id}>
                
                    <img className="logoenterprise"  src={enterprise.urllogo==null ? NOLOGO : enterprise.urllogo} alt="Logo da Empresa" />
               
            <p>Ola, {enterprise.name}</p>
            </div>
        ))}
        <div className="menu-interations">
        <Link to="/inicio">Inicio</Link>
        <Link to="/acrescimo">Acrescimos</Link>
        <Link to="/config">Configurar</Link>
        <Link to="/Login"><FiLogOut size={23} color="#FF0000" /></Link>
        </div>
        </header>
        <main>
            <section className="acrescimo">
                <p className="title">Acrescimos</p>
                    <div className="content">
                        {adds === null ? 
                        <div className="new-user" >
                            <ul>
                                <li className="adds">
                                <Link className="add-interations" to='/acrescimo/new'>
                                    <FiPlus size={72} color="#dadada"></FiPlus>
                                </Link>
                                </li>
                            </ul>
                        </div>   :
                        <div className="list-adds" >
                            <ul>
                        {adds.map(add => (
                                <li className="add" key={add.id}>
                                <p className="name">{add.name}</p>
                                <p className="price">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(add.price)}</p>
                                <button className="delete-adds" onClick={() => deleteAdds(add.id)} type="button">
                                    <FiTrash2 size={16} color="#FF0000" />
                                </button>
                                </li>
                                ))}
                                {adds ?
                        <div className="default" >
                            <div className="new-adds" >
                            <Link className="add-interations" to='/acrescimo/new'>
                                <FiPlus size={72} color="#dadada"></FiPlus>
                            </Link>
                        </div> 
                    </div>: null}
                            </ul>
                        </div>}
                    </div>
            </section>
        </main>
        <footer><p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p></footer>
        </>
    )
}