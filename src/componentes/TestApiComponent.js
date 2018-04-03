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
            loading: 0,
            isTesting: false
        };
    }

    componentDidMount() {

        if (!this.state.isTesting) {
            this.setState({
                isTesting: true
            })

            testarApiPorIdCliente(this.props.cliente.codigo).then(
                (res) => {
                    this.setState({
                        loading: 1,
                        isTesting: false
                    })
                },
                (err) => {
                    this.setState({
                        loading: 2,
                        isTesting: false
                    })
                }
            )
        }
    }

    render() {
        return <span aria-hidden="true" className={classnames('glyphicon',
            // eslint-disable-next-line
            { 'glyphicon-refresh glyphicon-spin': this.state.loading == 0 },
            // eslint-disable-next-line
            { 'glyphicon-ok ApiClienteOk': this.state.loading == 1 },
            // eslint-disable-next-line
            { 'glyphicon-remove ApiClienteFailure fieldAnimate': this.state.loading == 2 }
        )} ></span>
    }

}