import * as React from 'react';
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import { userService } from '../services/user.service'
import LinkToLogin from './LinkToLogin';
import classnames from 'classnames';
import shortid from 'shortid';

class NavMenu extends React.Component {


    render() {

        const linksList = [
            {
                Path: "/",
                Icon: "glyphicon-home",
                Nome: "Home"
            },
            {
                Path: "/Clientes",
                Icon: "glyphicon-briefcase",
                Nome: "Clientes"
            },
            {
                Path: "/Aplicativos",
                Icon: "glyphicon-phone",
                Nome: "Aplicativos"
            }
        ]

        if (userService.isMaster()) {
            linksList.push(
                {
                    Path: "/Usuarios",
                    Icon: "glyphicon-user",
                    Nome: "Usuarios"
                }
            )
        }

        var links = linksList.map(
            function (link) {
                return <li key={shortid.generate()}>
                    <NavLink to={link.Path} exact activeClassName='active'>
                        <span className={classnames('glyphicon', link.Icon)}></span>{link.Nome}
                    </NavLink>
                </li>
            }
        )

        return <div className='main-nav'>
            <nav className='navbar navbar-inverse'>
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

                        {links}

                    </ul>
                </div>
            </nav>
        </div>;
    }
}



function mapStateToProps(state) {
    const { isAuthenticated } = state.auth;
    return {
        isAuthenticated
    };
}


//export default connect(mapStateToProps)(NavMenu);

export default connect(mapStateToProps, null, null, {
    pure: false
})(NavMenu)