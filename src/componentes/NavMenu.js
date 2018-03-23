import * as React from 'react';
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import LinkToLogin from './LinkToLogin';

class NavMenu extends React.Component {
    render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>{this.props.AppName}</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <LinkToLogin />
                        </li>
                        <li>
                            <NavLink to={'/'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span>Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/Clientes'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span>Clientes
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </div>;
    }
}



function mapStateToProps(state) {
    const { isLogged } = state.auth;
    return {
        isLogged
    };
}


//export default connect(mapStateToProps)(NavMenu);

export default connect(mapStateToProps, null, null, {
    pure: false
  })(NavMenu)