import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
 

import logoLogin from'../../assets/logoLogin.png';
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import api from '../../services/api';


export default function Login(){
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');

   const history = useHistory('');

   async function Logar(e){
    e.preventDefault();

    const data = {
        name, 
        password
    }

    try{
        await api.post('/session', data);
        history.push('/inicio');
    }catch(error){
        alert('Usuario ou senha incorretos, Tente novamente.')
    }
}
    return(
        <>
        <header><img src={logoLogin} alt="Logo To Your House" /></header>
        <main>
            <form onSubmit={Logar}>
                <p>Nome da Empresa</p>
                    <input 
                    placeholder="AÇAITEIRA MIL GRAU"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                <p>Senha</p>
                    <input
                    type="password"
                    placeholder="**********"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    <div className="row-buttons">
               <Link className="Back_Interations" to="/">
                   <FiArrowLeft size={16} color='#FF5555' />
                    Voltar
                   </Link>
                   <button className="btnlogin" type="submit">ENTRAR</button>
                   </div>
            </form> 
        </main>
        <footer><p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p></footer>
        </>
    );
}