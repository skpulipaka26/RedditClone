import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, debounceTime, map, tap } from 'rxjs/operators';

import * as userActions from '../actions/users';

import Modal from '../components/Modal';
import GMap from '../components/Map';
import User from '../components/User';

class AutoComplele extends Component {

    searchEvent$ = new BehaviorSubject('');

    constructor(props) {
        super(props);
        this.state = {
            filteredList: [],
            selectedResultIndex: 0,
            searchValue: ''
        };
    }

    componentDidMount() {
        this.searchEvent$.pipe(
            tap(e => this.setState({ ...this.state, searchValue: e.target ? e.target.value : '' })),
            map(e => e && e.target ? e.target.value.trim().toLowerCase() : ''),
            distinctUntilChanged(),
            debounceTime(200)
        ).subscribe(searchString => {
            const users = this.props.users.list || [];
            const filteredList = users.filter(user => searchString !== '' &&
                Object.keys(user).some(key => typeof user[key] === 'string' && user[key].trim().toLowerCase().includes(searchString)));
            this.setState({
                ...this.state,
                filteredList: filteredList,
                selectedResultIndex: 0
            });
        });
    }

    onChange = e => {
        this.searchEvent$.next(e);
    };

    onKeyDown = e => {
        const keyCode = e.keyCode;
        const currIndex = this.state.selectedResultIndex;
        const currFilteredList = this.state.filteredList;
        switch (keyCode) {
            //enter key
            case 13:
                this.onSelectSearchResult();
                e.preventDefault();
                break;
            //up arrow
            case 38:
                const previousIndex = Math.max(currIndex - 1, 0);
                this.setState({
                    ...this.state,
                    selectedResultIndex: previousIndex
                });
                break;
            //down arrow
            case 40:
                const nextIndex = Math.min(currIndex + 1, currFilteredList.length - 1);
                this.setState({
                    ...this.state,
                    selectedResultIndex: nextIndex
                });
                break;
            default:
                break;
        }
    };

    onSelectSearchResult() {
        const currIndex = this.state.selectedResultIndex;
        const selectedUser = this.state.filteredList[currIndex];
        this.props.setSelectedUser(selectedUser);
        this.setState({
            ...this.state,
            filteredList: [],
            searchValue: ''
        });
    }


    render() {
        let userDetails = null;
        let geo;
        if (this.props.users.selectedUser) {
            const { address, ...user } = this.props.users.selectedUser;
            userDetails = user;
            geo = address.geo;
        }
        return (

            <div className="container">
                <div className="row w-100">
                    <div className="col-12">
                        <form className="form-inline d-flex justify-content-between">
                            <input className="form-control"
                                value={this.state.searchValue}
                                type="search" placeholder="Search Users" aria-label="Search"
                                style={{ flex: 1 }}
                                onChange={this.onChange}
                                onKeyDown={this.onKeyDown} />
                        </form>
                        {this.state.filteredList.length > 0 && (
                            <ul className="list-group" style={{
                                position: 'absolute',
                                width: '100%',
                                border: '3px solid rgba(0,0,0,.125)',
                                borderTop: 'none',
                                backgroundColor: '#fff'
                            }}>
                                {this.state.filteredList.map((listItem, index) => (
                                    <li key={index} className="list-group-item m-0"
                                        onClick={() => {
                                            this.setState({
                                                ...this.state,
                                                selectedResultIndex: index
                                            });
                                            this.onSelectSearchResult();
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            border: this.state.selectedResultIndex === index ? '1px solid rgba(0,0,0,.125)' : 'none'
                                        }}>
                                        {listItem.username}</li>

                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {userDetails && (
                    <Modal
                        title='User Details'
                        onClose={() => this.props.setSelectedUser(null)} >
                        <User {...userDetails} />
                        <GMap {...geo} />
                    </Modal>)}
            </div >

        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        ...userActions
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AutoComplele);