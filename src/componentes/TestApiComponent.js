import React from 'react';
import classnames from 'classnames';
import { testarApiPorIdCliente } from '../actions/cliente.actions';


export default class TestApiComponent extends React.Component {

    // 0 - refresh
    // 1 - ok
    // 2 - remove
    constructor(props) {
        super(props);
        this.state = {
            loading: 0
        };
    }

    componentDidMount() {
        console.log('componentDidMount - TestApiComponent', this.props);
        testarApiPorIdCliente(this.props.cliente.codigo).then(
            (res) => {
                this.setState({
                    loading: 1
                })
            },
            (err) =>  {
                this.setState({
                    loading: 2
                })
            }
        )
    }

    render() {
        return <span aria-hidden="true" className={classnames('glyphicon',
            { 'glyphicon-refresh glyphicon-spin': this.state.loading == 0 },
            { 'glyphicon-ok ApiClienteOk': this.state.loading == 1 },
            { 'glyphicon-remove ApiClienteFailure fieldAnimate': this.state.loading == 2 }
        )} ></span>
    }

}