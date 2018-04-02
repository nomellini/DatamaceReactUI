import React from 'react'
import classnames from 'classnames';
import TestApiComponent from './TestApiComponent';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

export default class CardCliente extends React.Component {

    render() {

        const cli = this.props.cliente;

        return (
            <div className={classnames('card', { 'fieldAnimate': !cli.status }, 'card-cliente')} key={shortid.generate()}>
                <div className={classnames(
                    'card-header',
                    { 'card-header-blue': cli.status },
                    { 'card-header-red': !cli.status })}>{cli.nome} - {cli.codigo}</div>
                <div className="card-main">
                    <div>{cli.descricao}</div>
                    <div>{this.props.checkConnection ? <TestApiComponent cliente={cli} /> : null } {cli.url}</div>
                    <Link to={`/cliente/${cli.codigo}`} className='btn btn-primary'>Editar</Link>
                </div>
            </div>
        )
    }

}