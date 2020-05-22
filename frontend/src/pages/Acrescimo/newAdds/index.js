import React, { useEffect , useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../../services/api';

import LogoHeader from '../../../assets/logoHeader.svg';
import NOLOGO from '../../../assets/NOLOGO.png';
import { FiArrowLeft, FiLogOut } from 'react-icons/fi';
import './styles.css';

export default function Newadds(){
    //logo uploda
    const[logo, setLogo] = useState([]);

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



return (
    <>
        <header>
            <Link className="logo-home-link" to='/inicio'>
                <img className="logoheader" src={LogoHeader} alt="Logo To Your House" />
            </Link>
            {logo.map(enterprise => (
            <div className="row-logo-name" key={enterprise.id}>
                    <img className="logoenterprise" src={enterprise.urllogo==null ? NOLOGO : enterprise.urllogo} alt="Logo da Empresa" />
            <p>Ola, {enterprise.name}</p>
            </div>
        ))}
        <div className="menu-interations">
        <Link  to="/inicio">Inicio</Link>
        <Link  to="/acrescimo">Acrescimos</Link>
        <Link  to="/config">Configurar</Link>
        <Link  to="/Login"><FiLogOut size={23} color="#FF0000" /></Link>
        </div>
        </header>
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
                <button className="cadastrar" type="submit">CADASTRAR</button>
                </div>
            </form>
        </div>
    </main>
    <footer><p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p></footer>
    </>
    )
}
                    