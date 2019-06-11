import * as React from 'react';
import { connect } from 'react-redux';
import { AppStateReducer } from "../store";

import { IRepositories, IRepository } from "../store/types";
import { loadRepositories } from "../store/actions";

interface AppProps {
    loadRepositories: typeof loadRepositories;
    repositories: IRepositories;
}

interface AppState {
    token: string;
    searchText: string;
}

class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props)

        this.state = {
            token: "",
            searchText: ""
        }

        this.textTokenChange = this.textTokenChange.bind(this);
        this.textSearchChange = this.textSearchChange.bind(this);
    }

    textTokenChange(event) {
        this.setState({ token: event.target.value });
    }

    textSearchChange(event) {
        this.setState({ searchText: event.target.value });
    }

    enterSearch() {
        this.props.loadRepositories(this.state.token, this.state.searchText);
    }

    render() {

        let list = this.props.repositories.repositories.map((item: IRepository, i: number) => {
            return (
                <div key={i} className="container_item">
                    <span>{item.name}</span>
                    <span>{item.description}</span>
                </div>
            )
        })

        return (
            <div className="wrap">
                <div className="container_input">
                    <input type="text" placeholder="GitHub Token" size={40} value={this.state.token} onChange={this.textTokenChange} />
                    <input type="text" placeholder="Search Text" size={40} value={this.state.searchText} onChange={this.textSearchChange} />
                    <input type="button" value="Отправить" onClick={this.enterSearch.bind(this)} />
                </div>
                <div className="container_listSearch">
                    {list}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateReducer) => ({
    repositories: state.repositoryReducer,
});

export default connect(
    mapStateToProps,
    { loadRepositories }
)(App);