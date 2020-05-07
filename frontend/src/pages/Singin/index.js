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

    try{
        const response = await api.post('/register', 'enterprise', data);

        history.push('/');
    }catch(err){

    }

};

    return(
        <>
        <header><img src={logoHeader} alt="Logomarca Toyourhouse"></img></header>
        <main>
            <section className="content">
                <section className="apresentation">
                    <p><span className="S">S</span>eja Bem-Vindo ao <span className="TYH">TOYOURHOUSE®</span>,
                         Esta pagina é destinada aos web commerce que desejam aumentar sua produtividade e 
                         eficiência em sua recepção de pedidos via Whatsapp® e facilitar aos seus clientes a 
                         solicitação de cada pedido pelo Aplicativo mobile <span className="TYH">TOYOURHOUSE®</span>.</p>
                </section>
                <section className="singin">
                    <h3>Faça já o cadastro da sua empresa</h3>
                        <form>
                            <p>Nome da Empresa</p><p className="aviso">( ESTE SERÁ O SEU USUÁRIO DE ACESSO )</p>
                            <input 
                                placeholder="AÇAITEIRA MIL GRAU"
                            />

                            <p>Telefone da Empresa</p><p className="aviso">( APENAS NUMEROS )</p>
                            <input
                                type="tel"
                                placeholder="(31) 9 1234 5678"
                            />

                            <p>Endereço da Empresa</p>
                            <input
                                placeholder="Rua A, Numero 100, Bairro Centro"
                            />

                            <section className="row city-uf">
                                <p>Cidade</p>
                                <input 
                                    placeholder="Raposos"
                                />
                                <p>UF</p>
                                <input 
                                    placeholder="MG"
                                />
                            </section>
                            <p>Senha</p>
                            <input
                                type="password"
                                placeholder="**********"
                                />
                                <button type="submit">Cadastar</button>
                                <button>Login</button>
                        </form>
                </section>
            </section>
        </main>
        <footer><p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p></footer>
        </>
    );
}