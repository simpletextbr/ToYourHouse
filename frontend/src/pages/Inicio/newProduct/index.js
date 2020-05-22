import React, { useEffect , useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../../services/api';

import LogoHeader from '../../../assets/logoHeader.svg';
import NOLOGO from '../../../assets/NOLOGO.png';
import { FiArrowLeft, FiLogOut } from 'react-icons/fi';
import './styles.css';

export default function Newproduct(){
    //logo uploda
    const[logo, setLogo] = useState([]);
    //Categorias
    const[category, setCategory] = useState([]);
    //Novo Produto
    const[proName, setProname] = useState('');
    const[proIng, setProing] = useState('');
    const[proPrice, setProprice] = useState('');
    const[cat_id, setCat_id] = useState('');

    const enterprise_id = localStorage.getItem('enterpriseid');
    const history = useHistory();

    async function createProduct(e){
        e.preventDefault()

        const name=proName;
        const Ing=proIng;
        const price= proPrice;

        const data = {
            name,
            Ing,
            price
        }
        if(cat_id==="Selecione uma categoria" || cat_id.trim()===""){
            alert('Você precisa selecionar uma categoria!');

        }else{
         try{
            await api.post('/products', data,{
                headers:{
                    Authorization: enterprise_id,
                    cat_Authorization: cat_id
                }
            });
            history.push('/inicio')
         }catch(error){
            alert('Não foi possivel criar seu produto, tente novamente');
        }

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

    //List Category
    useEffect(() => {
        api.get('/category',{
            headers:{
                Authorization: enterprise_id,
            }
        }).then(response => {
           setCategory(response.data);
        });
       }, [enterprise_id]);


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
        <div className="add-product">
            <p className="title">Opa! Produto novo chegando!!</p>
            <form onSubmit={createProduct}>
                <p>Nome do Produto</p>
                <input
                placeholder="Seu novo produto"
                required
                value={proName}
                onChange={e => setProname(e.target.value)}
                />
                <p>Ingredientes Basicos</p>
                <textarea
                placeholder="Ingredientes Principais do seu Produto"
                required
                value={proIng}
                onChange={e => setProing(e.target.value)}
                />
                <div className="row-inputs">
                <p>Preço</p>
                <input
                type="number"
                required
                placeholder="R$0,00"
                value={proPrice}
                onChange={e => setProprice(e.target.value)}
                />
                <p>Categoria</p>
                <select 
                value={cat_id} 
                onChange={e => setCat_id(e.target.value)}
                >
                        <option value="-1">Selecione uma categoria</option>
                        {category.map(categorys =>
                            <option key={categorys.id} value={categorys.id}>
                                {categorys.name}
                            </option>
                            )}
                </select>
                </div>
                <div className='row-buttons'>
                <Link className="Back_Interations" to="/inicio">
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
                    