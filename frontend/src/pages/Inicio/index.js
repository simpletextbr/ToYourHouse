import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


import api from '../../services/api';

import LogoHeader from '../../assets/logoHeader.svg';
import NOLOGO from '../../assets/NOLOGO.png';
import { FiTrash2, FiCheckCircle, FiPlus, FiLogOut} from 'react-icons/fi';
import './styles.css';

export default function Inicio() {
    //logo uploda
    const[logo, setLogo] = useState([]);

    //categorias
    const[category, setCategory] = useState([]);
    const[catName, setCatname] = useState('');
    //Produtos
    const[products, setProducts] = useState([]);
    //outra coisa

    const enterprise_id = localStorage.getItem('enterpriseid');
    const history = useHistory();
   
   
    async function createCategory(){
        const name = catName;

        const data = {
            name, 
            enterprise_id
        }
    
        try{
            await api.post('/category', data,{
                headers: {
                    Authorization: enterprise_id
                }
            });
            history.push('/inicio')
        }catch(error){
            alert('falha ao criar categoria, tente novamente');
            }
        }

    async function deleteCategory(id){
        try{
            products.map(product => (
                product.cat_id===id ? 
                deleteProduct(product.id) : null ))
                await api.delete(`/category/${id}`, {
                headers:{
                    Authorization: enterprise_id
                }
            });
            setCategory(category.filter(categorys => categorys.id !== id))
        }catch(error){
            alert('falha ao deletar a categoria, tente novamente');
        }
        
    }
    
    async function deleteProduct(id){
        try{
            await api.delete(`/products/${id}`, {
                headers: {
                    Authorization: enterprise_id,
                }
            });
            setProducts(products.filter(product => product.id !== id))
        }catch(error){
            alert('falha ao deletar a produto, tente novamente');
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
//List Products
    useEffect(() => {
        api.get('/products', {
           headers:{
               Authorization: enterprise_id, 
           }
        }).then(response =>{
            setProducts(response.data);
        });
    }, [enterprise_id]);


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
        <section className="inicio" >
           { category === null ? 
           <div className="new-user">
               <form onSubmit={createCategory}>
                <input
                    placeholder="Crie uma nova categoria nomeando aqui..."
                    required
                    value={catName}
                    onChange={e => setCatname(e.target.value)}
                />
                <button className="add-category" type="submit">
                    <FiCheckCircle size={23} color="#37B34A"></FiCheckCircle>
                </button>
                </form>
            </div> :
            category.map(categorys => (
            <div className="content" key={categorys.id} >   
                <div className="list-category">
                    <p>{categorys.name}
                        <button className="delete-category" onClick={() => deleteCategory(categorys.id)} type="button">
                            <FiTrash2 size={18} color="#FF0000"></FiTrash2>
                        </button>
                        </p>
                </div>
                { products === null ?
                    null :
                    <div className="list-products">
                        <ul> 
                    { products.map(product => ( 
                     product.cat_id === categorys.id ?
                     <li className="product" key={product.id}>
                        <p className="name">{product.name}</p>
                        <p className="Ing" >{product.Ing}</p>
                        <p className="price">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.price)}</p>
                        <button className="delete-product" onClick={() => deleteProduct(product.id)} type="button">
                            <FiTrash2 size={16} color="#FF0000" />
                        </button>
                        </li> : null))}
                    <div className="new-product" >
                        <Link className="add-interations" to='/inicio/new'>
                            <FiPlus size={72} color="#000000"></FiPlus>
                        </Link>
                    </div>   
                    </ul> 
                </div>}
            </div>))}{category ? 
            <div className="default" >
                <div className="add-category">
                    <form onSubmit={createCategory}>
                        <input
                        placeholder="Crie uma nova categoria nomeando aqui..."
                        required
                        value={catName}
                        onChange={e => setCatname(e.target.value)}
                        />
                        <button className="add-category" type="submit">
                            <FiCheckCircle size={16} color="#37B34A"></FiCheckCircle>
                        </button> 
                    </form>
                </div> 
            </div>: null}
        </section>
        </main>
        <footer><p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p></footer>
        </>
        )
    }

