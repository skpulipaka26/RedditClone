import React, { Component } from 'react';

class AutoComplele extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onChange = e => {
        console.log(e);
    };

    onKeyDown = e => {
        const keyCode = e.keyCode;
        switch (keyCode) {

            // User pressed the enter key
            case 13:
                break;

            // User pressed the up arrow
            case 38:
                break;

            // User pressed the down arrow
            case 40:
                break;
            default:
                break;
        }
    };


    render() {

        return (

            <div className="container">
                <div className="row w-100">
                    <div className="col-12">
                        <form className="form-inline d-flex justify-content-between">
                            <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" style={{ flex: 1 }} onChange={this.onChange} />
                            <button className="btn btn-success" type="button">GO</button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default AutoComplele;
