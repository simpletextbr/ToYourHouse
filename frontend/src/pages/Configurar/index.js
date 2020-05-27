import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


import api from '../../services/api';

import Header from '../Utils/Header'
import { FiTrash2, FiCheckCircle, FiChevronRight} from 'react-icons/fi';
import './styles.css';



export default function Configurar(){
//Pagamentos
const[payments, setPayments] = useState([]);
const[payTitle, setPayTitle] = useState('');

//Customizacao
const[custom, setCustom] = useState([]);
const[bgcolor, setBgcolor] = useState('#FDF5F5');
const[btcolor, setBtcolor] = useState('#FF0000');


const enterprise_id = localStorage.getItem('enterpriseid');

const history = useHistory();

async function createPayment(e){
    e.preventDefault();
    const title = payTitle

    const data = {
        title
    }

    try{
        await api.post('/config/payments', data,{
            headers:{
                Authorization: enterprise_id
            }
        })
        history.go(0)
    }catch(error){
        alert('Não foi possivel cadastrar seu pagamento, tente novamente');
    }

    history.push('/config');

}

async function deletePayment(id){
    try{
        await api.delete(`/config/payments/${id}`, {
              headers: {
                  Authorization: enterprise_id
              }
          });
          setPayments(payments.filter(payment => payment.id !== id))
    }catch(error){
      alert('Não foi possivel deletar seu metodo de pagamento, tente novamente');
    }
  }

async function updateColor(e){
    e.preventDefault();

    const backgound_app = bgcolor;
    const button_app = btcolor;

    const data = { 
        backgound_app,
        button_app
     }

     try{
        await api.put('/config/custom', data, {
            headers:{
                Authorization: enterprise_id
            }
        });
        history.go(0);
     }catch(error){
        alert('Não foi possivel atualizar as cores do app, tente novamente');
     }
}

//List Payments
useEffect(() => {
    api.get('/config/payments', {
        headers:{
            Authorization: enterprise_id
        }
    }).then(response => {
        setPayments(response.data);
        })
    },[enterprise_id]);

//List custom
useEffect(() => {
    api.get('/config/custom', {
        headers:{
            Authorization: enterprise_id
        }
    }).then(response => {
        setCustom(response.data);
    })
},[enterprise_id]);

return(
    <>
    <Header />
    <main>
        <section className="config">
            <div className="pagamento">
                <p className="tittle">Pagamento</p>
                {payments === null ? 
                    <div className="new-user">
                        <form onSubmit={createPayment}>
                            <FiChevronRight size={16} color="#FF0000"></FiChevronRight>
                            <input 
                                placeholder="Nova forma de Pagamento..."
                                required
                                value={payTitle}
                                onChange={e => setPayTitle(e.target.value)}
                                />
                            <button type="submit">
                            <FiCheckCircle size={16} color="#37B34A"></FiCheckCircle>
                            </button>
                        </form>
                    </div> : 
                payments.map(payment => (
                    <div className="list-payments" key={payment.id}>
                        <p><FiChevronRight size={16} color="#FF0000"></FiChevronRight>
                            {payment.title}
                            <button className="delete-payment" onClick={() => deletePayment(payment.id)} type="button">
                                <FiTrash2 size={18} color="#FF0000"></FiTrash2>
                            </button>
                        </p>
                    </div>))}{payments ? 
                    <div className="default">
                        <form onSubmit={createPayment}>
                            <FiChevronRight size={16} color="#FF0000"></FiChevronRight>
                            <input 
                                placeholder="Nova forma de Pagamento..."
                                required
                                value={payTitle}
                                onChange={e => setPayTitle(e.target.value)}
                                />
                            <button type="submit">
                            <FiCheckCircle size={16} color="#37B34A"></FiCheckCircle>
                            </button>
                        </form>
                    </div>: null}
            </div>
            <div className="custom">
                <p className="title">Personalização</p>
                <form onSubmit={updateColor}>
                <p className="bgcolor"><FiChevronRight size={16} color="#FF0000"></FiChevronRight>Cor de Fundo do App</p>
                    <ul className="Colors" >
                        <li className="List-colors">Atual
                            <p className="atual" style={{backgroundColor: custom.map(bg =>(bg.backgound_app)),  width:32, height: 28, borderRadius: 6}}></p>
                            <input
                                type='color'
                                value={bgcolor}
                                onChange={e => setBgcolor(e.target.value)}
                                />
                        </li>
                    </ul>
                
                <p className="btcolor"><FiChevronRight size={16} color="#FF0000"></FiChevronRight>Cor dos Botões do App</p>
                    <ul className="Colors" >
                        <li className="List-colors">Atual
                            <p className="atual" style={{backgroundColor: custom.map(bt =>(bt.button_app)),  width:32, height: 28, borderRadius: 6}}></p>
                        <input
                            type='color'
                            value={btcolor}
                            onChange={e => setBtcolor(e.target.value)}
                            />
                        </li>
                    </ul>
                    <button type="submit">
                    <FiCheckCircle size={16} color="#37B34A"></FiCheckCircle> 
                    </button>
                </form>
                    <Link to="/config/upload/logo">Upload do logo</Link>
                    <Link to="/config/upload/cardapio">Upload do cardapio</Link>  
                </div>
        </section>
    </main>
    <footer><p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p></footer>
    </>
    )
    }