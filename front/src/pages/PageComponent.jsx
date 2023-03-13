import React from 'react'

import { Routes, Route } from 'react-router-dom'; 
import Cart from './cart/cart';
import AdminComics from './dashboard/adminComics/adminComics';
import AdminFiguras from './dashboard/adminFiguras/adminFiguras';
import AdminLibros from './dashboard/adminLibros/adminLibros';
import AdminMangas from './dashboard/adminMangas/adminMangas';
import AdminStock from './dashboard/adminStock/adminStock';
import AdminVentas from './dashboard/adminVentas/adminVentas';
import Dashboard from './dashboard/dashboard';
import Precios from './dashboard/precios/precios';
import SimulVenta from './dashboard/simulVenta/simulVenta';
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
                <Route path='/admincomics' element={<AdminComics
                    products={this.props.products}
                    user={this.props.user}
                    editoriales={this.props.editoriales}/>}
                />
                <Route path='/adminlibros' element={<AdminLibros
                    products={this.props.products}
                    user={this.props.user}
                    editoriales={this.props.editoriales}/>}
                />
                <Route path='/adminfiguras' element={<AdminFiguras
                    user={this.props.user}/>}
                />
                <Route path='/adminstock' element={<AdminStock
                    products={this.props.products}
                    user={this.props.user}/>}
                />
                <Route path='/adminventas' element={<AdminVentas
                    ventas={this.props.ventas}
                    user={this.props.user}/>}
                />
                <Route path='/simulventa' element={<SimulVenta
                    products={this.props.products}
                    user={this.props.user}/>}
                />
                <Route path='/adminprecios' element={<Precios
                    products={this.props.products}
                    user={this.props.user}
                    editoriales={this.props.editoriales}/>}
                />
            </Routes>
        )
    }
}

export default PageComponent;