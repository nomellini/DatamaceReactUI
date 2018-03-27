import React from 'react';
import { history } from '../../helper/history';

export default class DtmPageBase extends React.Component {

  /*
    nas paginas filhas se precisas use
    componentWillMount() {
      super.componentWillMount();
    }
 */
  componentWillMount() {


    // console.log(history.location.pathname);
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
