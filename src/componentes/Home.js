import * as React from 'react';
import { connect } from 'react-redux'


class Home extends React.Component {


    BoasVindas() {
        const { unique_name } = this.props;
        return unique_name ? `Você está logado como ${unique_name}` : 'Faça login para começar'
    }

    render() {
        return <div>
            <h1>Datamace Mobile Portal</h1>

            <p>Utilize esta portal para:</p>
            <ul>
                <li>Listar clientes</li>
                <li>Adicionar clientes</li>
                <li>Cadstrar aplicativos</li>
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