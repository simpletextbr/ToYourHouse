import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


import api from '../../services/api';

import LogoHeader from '../../assets/logoHeader.svg';
import NOLOGO from '../../assets/NOLOGO.png';
import { FiTrash2, FiCheckCircle, FiPlus } from 'react-icons/fi'
import './styles.css';

export default function Inicio(){
    //logo uploda
    const[logo, setLogo] = useState([]);

    //categorias
    const[category, setCategory] = useState([]);
    const[catName, setCatname] = useState('')
    //Produtos
    const[products, setProducts] = useState([])
    const[proName, setProname] = useState('')
    const[proIng, setProing] = useState('')
    const[proprice, setProprice] = useState('')
    //outra coisa

    const enterprise_id = localStorage.getItem('enterpriseid');
    const history = useHistory();
   
   
    async function createCategory(){
        const name = catName;

        const data = {
            name, 
            enterprise_id
        }
    
        if(name.trim()===""){
            alert('Você precisa preencher todos os campos!')
        }else{
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
    }

    async function deleteCategory(id){
        try{
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

    async function createProduct(){

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
        <header className="inicio">
                <Link className="logo-home-link" to='/inicio'>
                    <img className="logoheader" src={LogoHeader} alt="Logo To Your House" />
                </Link>
        {logo.map(enterprise => (
            <div className="row-logo-name" key={enterprise.id}>
                
                    <img  src={enterprise.urllogo==null ? NOLOGO : enterprise.urllogo} alt="Logo da Empresa" />
               
            <h4>Ola, {enterprise.name}</h4>
            </div>
        ))}
        <Link to="/inicio">Inicio</Link>
        <Link to="/acrescimo">Acrescimos</Link>
        <Link to="/config">Configurar</Link>
        </header>
        <main className="inico">
            { category===null ? 
                <div className="new-user">
                        <input
                            placeholder="Crie uma nova categoria nomeando aqui..."
                            value={catName}
                            onChange={e => setCatname(e.target.value)}
                        />
                        <Link className="new-category" onClick={createCategory} to='/inicio'>
                            <FiCheckCircle size={16} color="#37B34A"></FiCheckCircle>
                        </Link> 
                </div> :
            category.map(categorys =>(
                <div className="list-category" key={categorys.id}>
                    <p>{categorys.name}
                        <button className="delete-category" onClick={() => deleteCategory(categorys.id)} type="button">
                            <FiTrash2 size={16} color="#FF0000"></FiTrash2>
                        </button></p>
                        { products===null ?
                            <div className="new-product" >
                                <button  type="button">
                                    <FiPlus size={72} color="#FFFFFF"></FiPlus>
                                </button>
                                <div className="add-product" id="divProducts">
                                    <form onSubmit={createProduct}>
                                        <input
                                        placeholder="Seu novo produto"
                                        value={proName}
                                        onChange={e => setProname(e.target.value)}
                                        />
                                        <textarea
                                        placeholder="Ingredientes Principais do seu Produto"
                                        value={proName}
                                        onChange={e => setProname(e.target.value)}
                                        />
                                        <input
                                        type="number"
                                        placeholder="0.00"
                                        value={proName}
                                        onChange={e => setProname(e.target.value)}
                                        />
                                    </form>
                                </div>
                            </div>
                            :
                          products.map(product => (  
                        <div className="list-products" key={product.id}>
                            <p>{product.cat_id === categorys.id ? product.name : null}</p>
                            <p>{product.cat_id === categorys.id ? product.Ing  : null}</p>
                            <p>{product.cat_id === categorys.id ? product.price : null}</p>
                        </div>
                        ))}{ products ? 
                        <div className="new-product" >
                            <button className="new-product" type="button">
                                <FiPlus size={72} color="#FFFFFF"></FiPlus>
                            </button> 
                        <div className="add-product" id="divProducts">
                            <form onSubmit={createProduct}>
                                <input
                                placeholder="Seu novo produto"
                                value={proName}
                                onChange={e => setProname(e.target.value)}
                                />
                                <textarea
                                placeholder="Ingredientes Principais do seu Produto"
                                value={proName}
                                onChange={e => setProname(e.target.value)}
                                />
                                <input
                                type="number"
                                placeholder="0.00"
                                value={proName}
                                onChange={e => setProname(e.target.value)}
                                />
                            </form>
                        </div>  
                    </div> : null}
                }{ category ?
                <div className="add-category" >
                    <form onSubmit={createCategory}>
                        <input
                            placeholder="Crie uma nova categoria nomeando aqui..."
                            value={catName}
                            onChange={e => setCatname(e.target.value)}
                            />
                            <button className="add-category" type="submit">
                                <FiCheckCircle size={16} color="#37B34A"></FiCheckCircle>
                            </button> 
                    </form>
                </div> : null}
             </div>
            ),
        </main>
        <footer><p>2020@ Todos Os Direitos Reservatos. Developed by PlanUnity Inc.</p></footer>
        </>
        )
    }
}
