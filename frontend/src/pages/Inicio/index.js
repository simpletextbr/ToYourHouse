import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


import api from '../../services/api';

import Header from '../Utils/Header'
import { FiTrash2, FiCheckCircle, FiPlus} from 'react-icons/fi';
import './styles.css';

export default function Inicio() {
//categorias
const[category, setCategory] = useState([]);
const[catName, setCatname] = useState('');
//Produtos
const[products, setProducts] = useState([]);
//outra coisa

const enterprise_id = localStorage.getItem('enterpriseid');
const history = useHistory();


async function createCategory(e){
    e.preventDefault();
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
        history.go(0)
    }catch(error){
        alert('falha ao criar categoria, tente novamente');
    }
}
async function deleteCategory(id){
    try{
        products.map(product => (
            product.cat_id===id ? 
            deleteProduct(product.id) : null))
            
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
<Header />
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
        <div className="new-product" >
                <ul>
                    <li className="product">
            <Link className="add-interations" to='/inicio/new'>
                <FiPlus size={72} color="#dadada"></FiPlus>
            </Link>
                </li>
            </ul>
        </div> :
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
                    <FiPlus size={72} color="#dadada"></FiPlus>
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
                    <FiCheckCircle size={18} color="#37B34A"></FiCheckCircle>
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

