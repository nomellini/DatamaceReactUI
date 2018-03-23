import * as React from 'react';
import NavMenu from './NavMenu';

class Layout extends React.Component {
    render() {
        return <div className='container-fluid'>

            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu AppName={this.props.AppName} />
                </div>
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}

export default Layout;