import React from 'react'
import { APP_API } from '../../helper/apiConfig';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import DtmPageBase from './DtmPageBase'
import CardAplicativo from '../CardAplicativo'
import axios from 'axios';



export default class AplicativosPage extends DtmPageBase {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isLoading: false
    }
  }

  componentDidMount() {

    this.setState({
      apps: [],
      message: '',
      errors: {},
      isLoading: true
    });

    return axios.get(APP_API)
      .then(
        (res) => {
          this.setState({
            apps: res.data,
            isLoading: false
          })
        }
      )
  }

  renderCards(_this) {
    const _apps = _this.state.apps;
    var apps = [];
    if (_apps) {
      apps = _apps.map(function (app) {
        return <CardAplicativo app={app} key={shortid.generate()}/>
      });
    }
    return apps

  }

  render() {
    return (
      <div>

        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center">Cadastro de Aplicativos</h3>
          </div>
        </div>

        {this.state.message && <div className="alert alert-danger">{this.state.message}</div>}

        <div className="card">
          <Link disabled={this.state.isLoading} className='btn btn-danger' to={'/Aplicativo/0'}>Novo Aplicativo</Link>
        </div>


        <div className="card-container">
          {this.renderCards(this)}
        </div>


      </div>
    );
  }
}