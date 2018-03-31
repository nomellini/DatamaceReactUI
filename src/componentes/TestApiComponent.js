import React from 'react';
import classnames from 'classnames';


export default class TestApiComponent extends React.Component {

    // 0 - refresh
    // 1 - ok
    // 2 - remove
    constructor(props) {
        super(props);
        this.state = {
            loading: 0
        }

        this.testarApi = this.testarApi.bind(this);
    }

    componentDidMount() {
        setTimeout(this.testarApi, 5000 * Math.random());
    }

    testarApi() {
        console.log('opa !')

        if (Math.random() < .5)
            this.setState({
                loading: 1
            });
        else
            this.setState({
                loading: 2
            });
    }

    render() {
        return <span aria-hidden="true" className={classnames('glyphicon',
            { 'glyphicon-refresh glyphicon-spin': this.state.loading == 0 },
            { 'glyphicon-ok': this.state.loading == 1 },
            { 'glyphicon-remove': this.state.loading == 2 }
        )} ></span>
    }

}