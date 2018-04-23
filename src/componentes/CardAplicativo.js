import React from 'react'
import classnames from 'classnames';
import shortid from 'shortid';


import FormAplicativo from './FormAplicativo';

export default class CardAplicativo extends React.Component {


    constructor(props)
    {
        super(props);

        this.state = {
            isEditing: false,
            app: this.props.app
        }

        this.onClick = this.onClick.bind(this);
        this.setAppToState = this.setAppToState.bind(this)
    }

    onClick(event) {
        event.preventDefault();
        this.setState(
            {
               isEditing: !this.state.isEditing
            }
        )
    }

    setAppToState(app)
    {
        this.setState(
            {
                app: app,
                isEditing: !this.state.isEditing
            }
        )
    }


    render() {

        const app = this.state.app;

        return (
            <div className={classnames('card-app', { 'fieldAnimate': !app.status })} key={shortid.generate()}>
                <div className={classnames(
                    'card-header',
                    { 'card-header-blue': app.status },
                    { 'card-header-red': !app.status })}>{app.nome}</div>
                <div className="card-main">
                    <div>{app.descricao}</div>
                    <div className="card-botoes">
                        <button onClick={this.onClick} className='btn btn-primary card-botao'>Editar</button>
                    </div>
                    { this.state.isEditing ? <FormAplicativo updateApp={this.setAppToState} app={app} /> : null }
                </div>
            </div>
        )
    }

}