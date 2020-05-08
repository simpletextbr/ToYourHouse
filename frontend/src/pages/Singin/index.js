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
   
        


        await api.post('/register', data);
        alert('criou o user krai');

        history.push('/inicio');
    }catch(error){
        alert('Usuario ja Cadastrado, Tente na aba de Login')
    }

}

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

                            <div className="row city-uf">
                                <p>Cidade</p>
                                <input 
                                    placeholder="Raposos"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                                <p>UF</p>
                                <input 
                                    placeholder="MG"
                                    value={uf}
                                    onChange={e => setUf(e.target.value)}
                                />
                            </div>
                            <p>Senha <span className="aviso">( ESTE SERÁ O SEU USUÁRIO DE ACESSO )</span></p>
                            <input
                                type="password"
                                placeholder="**********"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                            <div className="row buttons">
                                <button className="btnregister" type="submit">Cadastar</button>
                                <button className="btnregister">Login</button>
                            </div>
                        </form>
                </section>
            </section>
        </main>
        <footer><p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p></footer>
        </>
    );
}