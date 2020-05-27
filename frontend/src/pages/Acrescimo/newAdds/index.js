import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../../services/api';

import Header from '../../Utils/Header'
import { FiArrowLeft} from 'react-icons/fi';
import './styles.css';

export default function Newadds(){
//Acrescimos 
const[addName, setAddname] = useState('');
const[addPrice, setAddPrice] = useState('');

const enterprise_id = localStorage.getItem('enterpriseid');
const history = useHistory();

async function createAdds(e) {
    e.preventDefault();
    const name = addName;
    const price = addPrice;

    const data = {
        name,
        price
    }
    try{
        await api.post('/adds', data, {
            headers: {
                Authorization: enterprise_id
            }
        });
        history.push('/acrescimo');
    }catch(error){
        alert('Não foi possivel criar seu Acrescimo, tente novamente');
    }

}


return (
<>
<Header />
<main>
    <div className="add-adds">
        <p className="title">Opa! Acrescimo novo chegando!!</p>
        <form onSubmit={createAdds}>
            <p>Nome do Acrescimo</p>
            <input
            placeholder="Seu novo Acrescimo"
            required
            value={addName}
            onChange={e => setAddname(e.target.value)}
            />
            <p>Preço</p>
            <input
            type="number"
            required
            placeholder="R$0,00"
            value={addPrice}
            onChange={e => setAddPrice(e.target.value)}
            />
            <div className='row-buttons'>
            <Link className="Back_Interations" to="/acrescimo">
                <FiArrowLeft size={16} color='#FF5555' />
                    Voltar
            </Link>
            <button className="btn" type="submit">CADASTRAR</button>
            </div>
        </form>
    </div>
</main>
<footer><p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p></footer>
</>
)
}
                    