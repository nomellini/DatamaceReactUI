import React from 'react'
import classnames from 'classnames';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

export default class CardAplicativo extends React.Component {

    render() {

        const app = this.props.app;

        return (
            <div className={classnames('card', { 'fieldAnimate': !app.status }, 'card-cliente')} key={shortid.generate()}>
                <div className={classnames(
                    'card-header',
                    { 'card-header-blue': app.status },
                    { 'card-header-red': !app.status })}>{app.nome}</div>
                <div className="card-main">
                    <h4>{app.descricao}</h4>
                    <div className="card-botoes">
                        <Link to={`/Aplicativo/${app.codigo}`} className='btn btn-primary card-botao'>Editar</Link>
                    </div>
                </div>
            </div>
        )
    }

}