import * as React from 'react';
import { connect } from 'react-redux'
import FlashMessagesList from './flash/FlashMessagesList';


class Home extends React.Component {


    BoasVindas() {
        const { unique_name } = this.props;
        return unique_name ? `Você está logado como ${unique_name}` : 'Faça login para começar'
    }

    render() {
        return <div>
            <h1>Datamace Mobile Configuration</h1>
            <div><FlashMessagesList /></div>
            <p>Utilize esta site para:</p>
            <ul>
                <li>Listar clientes</li>
                <li>Adicionar clientes</li>
            </ul>
            <p>
                {this.BoasVindas()}
            </p>
        </div>;
    }
}


function mapStateToProps(state) {
    const { unique_name } = state.auth.user;
    return {
        unique_name
    };
}

export default connect(mapStateToProps)(Home);