import { history } from '../helper/history';
import React from 'react';

export default class DtmPageBase extends React.Component {

  componentWillMount() {

    console.log(history);

    // const index = this.props.role.indexOf("Masters");
    // if (index === -1) {
    //   this.props.addFlashMessage({
    //     type: 'success',
    //     text: `Sem permissão para usar a tela`
    //   });
    //   history.push('/');
    // }
  }

}
