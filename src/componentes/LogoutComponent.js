import { userActions } from '../actions/user.actions';

export default (props) => {
  userActions.logout();
  return null;
}