import React from 'react'
import classnames from 'classnames';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

export default class CardUsuario extends React.Component {


    constructor(props)
    {
      super(props);

      this.state = {

      }

    }

    render() {

        const user = this.props.usuario;

        return (
            <div className={classnames('card-app', { 'fieldAnimate': !user.status })} key={shortid.generate()}>
                <div className={classnames(
                    'card-header',
                    { 'card-header-blue': user.status },
                    { 'card-header-red': !user.status })}>{user.nome}</div>
                <div className="card-main">
                    <div>{user.descricao}</div>

                    <FormUsuario />

                    <div className="card-botoes">
                        <Link to={`/Aplicativo/${user.codigo}`} className='btn btn-primary card-botao'>Editar</Link>
                    </div>
                </div>
            </div>
        )
    }

}