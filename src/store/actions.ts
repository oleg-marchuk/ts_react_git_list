import { AppStateReducer } from "./index";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { GraphQLClient } from 'graphql-request'
import { IRepositories, IRepository, RepositoriesActionTypes, LOAD_REPOSITORIES } from "./types";

const repoQuery = `
  query($name: String!){
    search(query: $name, last: 10, type: REPOSITORY) {
      edges {
        node {
          ... on Repository {
            nameWithOwner
            description
          }
        }
      }
    }
  }
`

export const loadRepositories = (token: string, searchText: string): ThunkAction<void, AppStateReducer, null, Action<any>> => async dispatch => {
  
  const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  let repo: IRepositories = {
    repositories: []
  };

  client.request(repoQuery, { name: searchText }).then(data => {
    data.search.edges.forEach(function (value: any) {
      repo.repositories.push({ name: value.node.nameWithOwner, description: value.node.description })
    });

    dispatch({
      type: LOAD_REPOSITORIES,
      payload: repo
    });
  })

};