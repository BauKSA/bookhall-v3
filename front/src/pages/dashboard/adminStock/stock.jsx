import React from "react";

import get_title from '../../../get_title'

import './adminStock.css'

import Swal from 'sweetalert2'

import { BsCaretDownSquareFill } from 'react-icons/bs'
import BackToDash from '../backToDash/backToDash'

import { connect } from 'react-redux'
import { change_stock } from '../../../redux/actions'

class Stock extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products: {
                comics: [],
                mangas: [],
                colecciones: [],
                libros: []
            },
            filtered: {
                comics: [],
                mangas: [],
                colecciones: [],
                libros: []
            },
            form: [],
            selected: []
        }
    }

    setFormsLibros = () => {

        let forms = []

        this.state.products.libros.map((v)=>{
            let created = false
            for(let i = 0; i < forms.length; i++){
                if(forms[i].nombre === v.serie){
                    created = true
                    if(v.subtitulo){
                        const vol = {
                            n: `${v.numero} - ${v.subtitulo}`,
                            id: v.id,
                            stock: v.stock
                        }
                        forms[i].vols.push(vol)
                    }else{
                        const vol = {
                            n: `${v.numero}`,
                            id: v.id,
                            stock: v.stock
                        }
                        forms[i].vols.push(vol)
                    }
                }
            }

            if(!created){
                let vol = {
                    nombre: v.serie,
                    vols: []
                }

                if(v.subtitulo){
                    const _vol = {
                        n: `${v.numero} - ${v.subtitulo}`,
                        id: v.id,
                        stock: v.stock
                    }
                    vol.vols.push(_vol)
                }else{
                    const _vol = {
                        n: `${v.numero}`,
                        id: v.id,
                        stock: v.stock
                    }
                    vol.vols.push(_vol)
                }

                return forms.push(vol)
            }else{
                return null
            }

        })

        this.setState({
            form: forms
        })
    }

    setFormsMangas = () => {

        let forms = []

        this.state.products.mangas.map((v)=>{
            let created = false
            for(let i = 0; i < forms.length; i++){
                if(forms[i].nombre === v.serie){
                    created = true
                    if(v.special){
                        const vol = {
                            n: `${v.numero} - ${v.comment}`,
                            id: v.id,
                            stock: v.stock
                        }
                        forms[i].vols.push(vol)
                    }else{
                        const vol = {
                            n: `${v.numero}`,
                            id: v.id,
                            stock: v.stock
                        }
                        forms[i].vols.push(vol)
                    }
                }
            }

            if(!created){
                let vol = {
                    nombre: v.serie,
                    vols: []
                }

                if(v.special){
                    const _vol = {
                        n: `${v.numero} - ${v.comment}`,
                        id: v.id,
                        stock: v.stock
                    }
                    vol.vols.push(_vol)
                }else{
                    const _vol = {
                        n: `${v.numero}`,
                        id: v.id,
                        stock: v.stock
                    }
                    vol.vols.push(_vol)
                }

                return forms.push(vol)
            }else{
                return null
            }

        })

        this.setState({
            form: forms
        })
    }

    setFormsComics = () => {

        let forms = []

        this.state.products.comics.map((v)=>{
            let created = false
            for(let i = 0; i < forms.length; i++){
                if(forms[i].nombre === v.serie){
                    created = true
                    if(v.subtitulo){
                        const vol = {
                            n: `${v.numero} - ${v.subtitulo}`,
                            id: v.id,
                            stock: v.stock
                        }
                        forms[i].vols.push(vol)
                    }else{
                        const vol = {
                            n: `${v.numero}`,
                            id: v.id,
                            stock: v.stock
                        }
                        forms[i].vols.push(vol)
                    }
                }
            }

            if(!created){
                let vol = {
                    nombre: v.serie,
                    vols: []
                }

                if(v.subtitulo){
                    const _vol = {
                        n: `${v.numero} - ${v.subtitulo}`,
                        id: v.id,
                        stock: v.stock
                    }
                    vol.vols.push(_vol)
                }else{
                    const _vol = {
                        n: `${v.numero}`,
                        id: v.id,
                        stock: v.stock
                    }
                    vol.vols.push(_vol)
                }

                return forms.push(vol)
            }else{
                return null
            }

        })

        this.setState({
            form: forms
        })
    }

    setFormsCol = () => {

        let forms = []

        this.state.products.colecciones.map((v)=>{
            let created = false
            for(let i = 0; i < forms.length; i++){
                if(forms[i].nombre === v.serie){
                    created = true
                    const vol = {
                        n: `${v.nombre}`,
                        id: v.id,
                        stock: v.stock
                    }
                    forms[i].vols.push(vol)
                }
            }

            if(!created){
                let vol = {
                    nombre: v.serie,
                    vols: []
                }

                const _vol = {
                    n: `${v.nombre}`,
                    id: v.id,
                    stock: v.stock
                }
                vol.vols.push(_vol)

                return forms.push(vol)
            }else{
                return null
            }

        })

        this.setState({
            form: forms
        })
    }

    componentDidMount(){
        this.setState({
            products: this.props.products,
            filtered: this.props.products
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.products !== this.props.products){
            this.setState({
                products: this.props.products,
                filtered: this.props.products
            })
        }

        if(prevProps.state.status !== this.props.state.status){
            if(this.props.state.status){
                Swal.fire({
                    icon: 'success',
                    title: "Stock actualizado con éxito!"
                })
                .then(()=>{
                    window.location.reload()
                })
            }
        }
    }

    filterMangas = (e) => {
        e.preventDefault()
        const value = document.getElementById('search-mangas').value

        const mangas = this.state.products.mangas
        const filtered = []

        for(let i = 0; i < mangas.length; i++){
            if(mangas[i].serie.toLowerCase().includes(value)){
                filtered.push(mangas[i])
            }
        }

        this.setState({
            filtered: {
                ...this.state.filtered,
                mangas: []
            }
        }, ()=>{
            this.setState({
                filtered: {
                    ...this.state.filtered,
                    mangas: filtered
                }
            })
        })

    }

    filterComics = (e) => {
        e.preventDefault()
        const value = document.getElementById('search-comics').value

        const comics = this.state.products.comics
        const filtered = []

        for(let i = 0; i < comics.length; i++){
            if(comics[i].serie.toLowerCase().includes(value)){
                filtered.push(comics[i])
            }
        }

        this.setState({
            filtered: {
                ...this.state.filtered,
                comics: []
            }
        }, ()=>{
            this.setState({
                filtered: {
                    ...this.state.filtered,
                    comics: filtered
                }
            })
        })

    }

    filterCol  = (e) => {
        e.preventDefault()
        const value = document.getElementById('search-colecciones').value

        const comics = this.state.products.colecciones
        const filtered = []

        for(let i = 0; i < comics.length; i++){
            if(comics[i].serie.toLowerCase().includes(value)){
                filtered.push(comics[i])
            }
        }

        this.setState({
            filtered: {
                ...this.state.filtered,
                colecciones: []
            }
        }, ()=>{
            this.setState({
                filtered: {
                    ...this.state.filtered,
                    colecciones: filtered
                }
            })
        })
    }

    filterLibros  = (e) => {
        e.preventDefault()
        const value = document.getElementById('search-libros').value

        const libros = this.state.products.libros
        const filtered = []

        for(let i = 0; i < libros.length; i++){
            if(libros[i].serie.toLowerCase().includes(value)){
                filtered.push(libros[i])
            }
        }

        this.setState({
            filtered: {
                ...this.state.filtered,
                libros: []
            }
        }, ()=>{
            this.setState({
                filtered: {
                    ...this.state.filtered,
                    libros: filtered
                }
            })
        })
    }

    handleChange = (e) => {
        const form = this.state.form

        for(let i = 0; i < form.length; i++){
            if(form[i].nombre === e.target.value){
                return this.setState({
                    selected: form[i].vols
                })
            }
        }
    }

    handleChangeType = (e) => {
        const type = e.target.value
        switch(type){
            case "Mangas":
                return this.setFormsMangas()
            case "Libros":
                return this.setFormsLibros()
            case "Cómics":
                return this.setFormsComics()
            case "Colecciones":
                return this.setFormsCol()
            default:
                return null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let serie = document.getElementById('changestock-serie').value
        let tomo = document.getElementById('changestock-vol').value
        let stock_ant = 0
        let stock = parseInt(document.getElementById('changestock-stock').value)
        const type = document.getElementById("changestock-tipo").value

        const form = this.state.form
        for(let i = 0; i < form.length; i++){
            if(form[i].nombre === serie){
                let vols = form[i].vols
                for(let j = 0; j < vols.length; j++){
                    if(vols[j].n === tomo){
                        stock_ant = parseInt(vols[j].stock)
                    }
                }
            }
        }

        Swal.fire({
            title: "Confirmar cambio?",
            text: `Stock ${serie} ${tomo}: ${stock_ant} > ${(stock_ant + stock)}`,
            showCancelButton: true,
            showConfirmButton: true
        })
        .then((res)=>{
            if(res.isConfirmed){
                const data = {
                    serie: serie,
                    tomo: tomo,
                    stock: stock,
                    type: type
                }

                document.getElementById("addcol-button").disabled = true
                return this.props.change_stock(data)
            }else{
                return null
            }
        })
    }

    render(){
        return(
            <div className="stock-main-container">
                <BackToDash />
                <br/>
                <form className="dash-form-container" onSubmit={this.handleSubmit}>
                    <h3 className="dash-form-title">
                        Modificar stock
                    </h3>
                    <span className="dash-form-space">
                        <div className="dash-form-column">
                        <select
                            className="dash-form-input"
                            id="changestock-tipo"
                            onChange={this.handleChangeType}
                            >
                                <option key={`tipo-addcol`} selected={true} disabled={true}>
                                    Tipo
                                </option>
                                <option key={`mangas-addcol`}>
                                    Mangas
                                </option>
                                <option key={`comics-addcol`}>
                                    Cómics
                                </option>
                                <option key={`colecciones-addcol`}>
                                    Colecciones
                                </option>
                                <option key={`libros-addcol`}>
                                    Libros
                                </option>
                            </select>
                            <br/>
                            <select
                            className="dash-form-input input-nombre"
                            id="changestock-serie"
                            onChange={this.handleChange}
                            >
                                <option key={`-addcol`} selected={true} disabled={true}>
                                    Serie/Colección
                                </option>
                                {
                                    this.state.form.map((v)=>{
                                        return(
                                            <option key={v.id}>
                                                {v.nombre}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <br/>
                            <select
                            className="dash-form-input input-nombre"
                            id="changestock-vol"
                            >
                                <option key={`-addcol`} selected={true} disabled={true}>
                                    Tomo
                                </option>
                                {
                                    this.state.selected.map((v)=>{
                                        return(
                                            <option key={v.id}>
                                                {v.n}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <br/>
                            <input
                            className="dash-form-input"
                            id="changestock-stock"
                            type="number"
                            placeholder="Nuevo stock"
                            />
                        </div>
                    </span>
                    
                    <button className="dash-form-button" id="addcol-button" type="submit">
                        Cambiar
                    </button>
                </form>
                <p className="ver-stock">
                    Ver stock
                </p>
                <BsCaretDownSquareFill className="ver-stock-icon" />
                <h1 className="stock-title">Mangas</h1>
                <form className="stock-form" onSubmit={this.filterMangas}>
                    <input
                    className="stock-input"
                    type="text"
                    id="search-mangas"
                    placeholder="Buscar..."
                    />
                    <button type="submit" className="stock-button">
                        Buscar
                    </button>
                </form>
                <br/>
                <section className="table-section">
                    <table className="stock-table">
                        <tr className="stock-row-header">
                            <th className="stock-header">SERIE</th>
                            <th className="stock-header stock">STOCK</th>
                        </tr>
                        {
                            this.state.filtered.mangas.map((m)=>{
                                if(parseInt(m.stock) > 0){
                                    return(
                                        <tr className="stock-row" key={Math.random()}>
                                            <td className="stock-data" id="serie">
                                                {get_title(m)}
                                            </td>
                                            <td className="stock-data stock" id="has-stock">
                                                {m.stock}
                                            </td>
                                        </tr>
                                    )
                                }else{
                                    return(
                                        <tr className="stock-row" id="sin-stock" key={Math.random()}>
                                            <td className="stock-data" id="serie">
                                                {get_title(m)}
                                            </td>
                                            <td className="stock-data stock">
                                                {m.stock}
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </table>
                </section>
                <h1 className="stock-title">Cómics</h1>
                <form className="stock-form" onSubmit={this.filterComics}>
                    <input
                    className="stock-input"
                    type="text"
                    id="search-comics"
                    placeholder="Buscar..."
                    />
                    <button type="submit" className="stock-button">
                        Buscar
                    </button>
                </form>
                <br/>
                <section className="table-section">
                    <table className="stock-table">
                        <tr className="stock-row-header">
                            <th className="stock-header">SERIE</th>
                            <th className="stock-header stock">STOCK</th>
                        </tr>
                        {
                            this.state.filtered.comics.map((m)=>{
                                if(parseInt(m.stock) > 0){
                                    return(
                                        <tr className="stock-row" key={Math.random()}>
                                            <td className="stock-data" id="serie">
                                                {get_title(m)}
                                            </td>
                                            <td className="stock-data stock" id="has-stock">
                                                {m.stock}
                                            </td>
                                        </tr>
                                    )
                                }else{
                                    return(
                                        <tr className="stock-row" id="sin-stock" key={Math.random()}>
                                            <td className="stock-data" id="serie">
                                                {get_title(m)}
                                            </td>
                                            <td className="stock-data stock">
                                                {m.stock}
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </table>
                </section>
                <h1 className="stock-title">Colecciones</h1>
                <form className="stock-form" onSubmit={this.filterCol}>
                    <input
                    className="stock-input"
                    type="text"
                    id="search-colecciones"
                    placeholder="Buscar..."
                    />
                    <button type="submit" className="stock-button">
                        Buscar
                    </button>
                </form>
                <br/>
                <section className="table-section">
                    <table className="stock-table">
                        <tr className="stock-row-header">
                            <th className="stock-header">NOMBRE</th>
                            <th className="stock-header stock">STOCK</th>
                        </tr>
                        {
                            this.state.filtered.colecciones.map((m)=>{
                                if(parseInt(m.stock) > 0){
                                    return(
                                        <tr className="stock-row" key={Math.random()}>
                                            <td className="stock-data" id="serie">
                                                {get_title(m)}
                                            </td>
                                            <td className="stock-data stock" id="has-stock">
                                                {m.stock}
                                            </td>
                                        </tr>
                                    )
                                }else{
                                    return(
                                        <tr className="stock-row" id="sin-stock" key={Math.random()}>
                                            <td className="stock-data" id="serie">
                                                {get_title(m)}
                                            </td>
                                            <td className="stock-data stock">
                                                {m.stock}
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </table>
                </section>
                <h1 className="stock-title">Libros</h1>
                <form className="stock-form" onSubmit={this.filterLibros}>
                    <input
                    className="stock-input"
                    type="text"
                    id="search-libros"
                    placeholder="Buscar..."
                    />
                    <button type="submit" className="stock-button">
                        Buscar
                    </button>
                </form>
                <br/>
                <section className="table-section">
                    <table className="stock-table">
                        <tr className="stock-row-header">
                            <th className="stock-header">NOMBRE</th>
                            <th className="stock-header stock">STOCK</th>
                        </tr>
                        {
                            this.state.filtered.libros.map((m)=>{
                                if(parseInt(m.stock) > 0){
                                    return(
                                        <tr className="stock-row" key={Math.random()}>
                                            <td className="stock-data" id="serie">
                                                {get_title(m)}
                                            </td>
                                            <td className="stock-data stock" id="has-stock">
                                                {m.stock}
                                            </td>
                                        </tr>
                                    )
                                }else{
                                    return(
                                        <tr className="stock-row" id="sin-stock" key={Math.random()}>
                                            <td className="stock-data" id="serie">
                                                {get_title(m)}
                                            </td>
                                            <td className="stock-data stock">
                                                {m.stock}
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </table>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: state
    }
}

const mapDispatchToProps = {
    change_stock
}

const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(Stock);