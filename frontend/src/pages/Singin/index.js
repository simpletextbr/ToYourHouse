import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


import logoHeader from '../../assets/logoHeader.svg';
import './styles.css';
import api from '../../services/api';

export default function Logon(){
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

async function Register(e){
    e.preventDefault();


    const data = {
        name,
        phone,
        address,
        city,
        uf,
        password
    }
    if(name.trim() === "" || phone.trim() === "" || address.trim() === "" || city.trim() === "" || uf.trim() === "" || password.trim() ===""){
        alert('Você precisa preencher todos os campos!')
    }else{
    try{
        await api.post('/register',  data);
        history.push('/inicio');
    }catch(error){
        alert('Usuario ja Cadastrado, Tente na aba de Login')
        }
    }
}

async function Login(e){
    e.preventDefault();

    history.push('/login')
}
    return(
        <>
        <header><img src={logoHeader} alt="Logomarca Toyourhouse"></img></header>
        <main>
            <section className="content">
                <div className="apresentation">
                    <p><span className="S">S</span>eja Bem-Vindo ao <span className="TYH">TOYOURHOUSE®</span>,
                         Esta pagina é destinada aos web commerce que desejam aumentar sua produtividade e 
                         eficiência em sua recepção de pedidos via Whatsapp® e facilitar aos seus clientes a 
                         solicitação de cada pedido pelo Aplicativo mobile <span className="TYH">TOYOURHOUSE®</span>.</p>
                </div>
                <div className="singin">
                    <h3>Faça já o cadastro da sua empresa</h3>
                        <form onSubmit={Register}>
                            <p>Nome da Empresa<span className="aviso">( ESTE SERÁ O SEU USUÁRIO DE ACESSO )</span></p>
                            <input 
                                placeholder="AÇAITEIRA MIL GRAU"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />

                            <p>Whatsapp® da Empresa<span className="aviso">( APENAS NUMEROS )</span></p>
                            <input
                                placeholder="(31) 9 1234 5678"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />

                            <p>Endereço da Empresa</p>
                            <input
                                placeholder="Rua A, Numero 100, Bairro Centro"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />

                            <div className="rowcity-uf">
                                <p>Cidade
                                <input 
                                    className="city"
                                    placeholder="Raposos"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                /></p>
                                
                                <p>UF
                                <input
                                    className="uf"
                                    placeholder="MG"
                                    value={uf}
                                    onChange={e => setUf(e.target.value)}
                                /></p>
                                
                            </div>
                            <p>Senha <span className="aviso">( DEVE SER NUMERICA )</span></p>
                            <input
                                type="password"
                                placeholder="**********"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                            <div className="rowbuttons">
                                <button className="btnregister" type="submit">CADASTRAR</button>
                                <button className="btnlogin" type="button" onClick={Login}>LOGIN</button>
                            </div>
                        </form>
                </div>
            </section>
        </main>
        <footer><p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p></footer>
        </>
    );
}