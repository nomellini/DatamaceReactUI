import * as React from 'react';
import NavMenu from './NavMenu';
//import FlashMessagesList from './flash/FlashMessagesList';


class Layout extends React.Component {
    render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'>
                <NavMenu AppName={this.props.AppName} />
                </div>
                <div className='col-sm-10'>
                    {/* <div><FlashMessagesList /></div> */}
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}

export default Layout;