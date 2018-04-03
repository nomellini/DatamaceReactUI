import React from 'react';
//import { history } from '../../helper/history';
//import store from '../../redux/store';
//import { Mensagens } from '../../actions/flashMessages.actions'

export default class DtmPageBase extends React.Component {

  /*
    nas paginas filhas se precisas use
    componentWillMount() {
      super.componentWillMount();
    }
 */
  componentWillMount() {

    //const state = store.getState();
    //const { role } = state.auth.user;
    //const PathName = history.location.pathname;

    // if (PathName !== '/') {
    //   console.log(PathName)
    //   const index = role.indexOf("Master");
    //   if (index === -1) {
    //     Mensagens.addFlashMessageErro(`Sem permissão para ${PathName}`);
    //   }
      //history.push('/');
    //}

  }

}
