import React from 'react';

const Layout = (props) => ({
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark sticky-top"
                    style={{
                        minHeight: '3.5rem'
                    }}>
                </nav>
                <main>{props.children}</main>
            </div>
        );
    }
});

export default Layout;