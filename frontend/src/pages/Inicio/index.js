import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'


import api from '../../services/api';

import LogoHeader from '../../assets/logoHeader.svg';
import NOLOGO from '../../assets/NOLOGO.png';
import { FiTrash2, FiCheckCircle } from 'react-icons/fi'
import './styles.css';

export default function Inicio(){
    //logo uploda
    const[logo, setLogo] = useState([]);
    //controle de categorias
    const[category, setCategory] = useState([]);
    const[catName, setCatname] = useState('')

    const enterprise_id = localStorage.getItem('enterpriseid');

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
//categoria de produtos 
    useEffect(() => {
        api.get('/category', {
        headers: {
            Authorization: enterprise_id
        }
        }).then(response => {
            setCategory(response.data);
        })
    }, [enterprise_id]);

    async function createCategory(){

        const name = catName;

        const data = {
            name,
            enterprise_id
        }

        console.log(data)
        if(name.trim()===""){
            alert('Você precisa preencher todos os campos!')
        }else{
        try{
            await api.post('/category', data);
        }catch(error){
            alert('falha ao criar categoria, tente novamente');
            }
        }
    }


    return(
        <>
        <header className="inicio"><img className="logoheader" src={LogoHeader} alt="Logo To Your House" />
        {logo.map(enterprise => (
            <div className="row-logo-name" key={enterprise.id}>
            <img  src={enterprise.urllogo==null ? NOLOGO : enterprise.urllogo} alt="Logo da Empresa" />
            <h4>Ola, {enterprise.name}</h4>
            </div>
        ))}
        <Link to="/inicio">Inicio</Link>
        <Link to="/acrescimo">Acrescimos</Link>
        <Link to="/config">Configurar</Link>
        </header>
        <main className="inico">
            {category.map(categorys => (
                !categorys.name.trim()==="" ?  
                <div className="category_create" key={categorys.id}>
                <input
                    placeholder="Crie uma nova lista nomeando aqui..."
                    value={catName}
                    onChange={e => setCatname(e.target.value)}
                    /> 
                    <Link className="check-interations" onClick={createCategory} to='/inicio'>
                        <FiCheckCircle size={16} color='#10C72D' ></FiCheckCircle>
                    </Link>
                </div> : <div key={categorys.id}>
                <ul> {categorys.name} 
                <Link className="delete-interations" to='/inicio'>
                    <FiTrash2 size={16} color='#FF0000'></FiTrash2>
                </Link>
                <li>nome produto</li>
                <li>ing produto</li>
                <li>preco produto</li>
                
                </ul>
                <input
                    placeholder="Crie uma nova lista nomeando aqui..."
                    value={catName}
                    onChange={e => setCatname(e.target.value)}
                    /> 
                    <Link className="check-interations" onClick={createCategory} to='/inicio'>
                        <FiCheckCircle size={16} color='#10C72D' ></FiCheckCircle>
                    </Link>
                </div>
            ))}
        </main>
        <footer><p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p></footer>
        </>
    )
}