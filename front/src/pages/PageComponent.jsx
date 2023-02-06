import React from 'react'

import { Routes, Route } from 'react-router-dom'; 
import Cart from './cart/cart';
import AdminLibros from './dashboard/adminLibros/adminLibros';
import AdminMangas from './dashboard/adminMangas/adminMangas';
import Dashboard from './dashboard/dashboard';
import Home from './home/home';
import Mangas from './mangas/mangas';

class PageComponent extends React.Component{
    render(){
        return(
            <Routes>
                <Route path='/' element={<Home
                    products={this.props.products}/>}
                />
                <Route path='/cart' element={<Cart
                    products={this.props.products}
                    user={this.props.user}/>}
                />
                <Route path='/mangas' element={<Mangas
                    products={this.props.products}/>}
                />
                <Route path='/dashboard' element={<Dashboard
                    products={this.props.products}
                    user={this.props.user}/>}
                />
                <Route path='/adminmangas' element={<AdminMangas
                    products={this.props.products}
                    user={this.props.user}
                    editoriales={this.props.editoriales}/>}
                />
                <Route path='/adminlibros' element={<AdminLibros
                    products={this.props.products}
                    user={this.props.user}
                    editoriales={this.props.editoriales}/>}
                />
            </Routes>
        )
    }
}

export default PageComponent;