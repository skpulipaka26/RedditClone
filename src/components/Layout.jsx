import React from 'react';
import AutoComplele from '../cotainers/AutoComplete';

const Layout = (props) => ({
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark sticky-top d-flex justify-content-center"
                    style={{
                        minHeight: '3.5rem'
                    }}>
                    <AutoComplele />
                </nav>
                <main>{props.children}</main>
            </div>
        );
    }
});

export default Layout;