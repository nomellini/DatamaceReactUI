import React from 'react'
import classnames from 'classnames';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

export default class CardUsuario extends React.Component {

  render() {
    const user = this.props.usuario;
    return (
      <div className={classnames('card', { 'fieldAnimate': !user.status })} key={shortid.generate()}>
        <div className={classnames(
          'card-header',
          { 'card-header-blue': user.status },
          { 'card-header-red': !user.status })}>{user.usuario}</div>
        <div className="card-main">
          <div>Nome: <strong>{user.nome}</strong></div>
          <div>Perfil: <strong>{user.perfil}</strong></div>
          <div>{user.descricao}</div>
          <div>{user.email}</div>
          <div className="card-botoes">
            <Link to={`/Usuario/${user.codigo}`} className='btn btn-primary card-botao'>Editar</Link>
          </div>
        </div>
      </div>
    )


  }

}