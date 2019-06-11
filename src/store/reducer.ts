import {
    IRepositories,
    LOAD_REPOSITORIES,
    RepositoriesActionTypes
  } from "./types";
  
  const initialState: IRepositories = {
    repositories: []
  };
  
  export function repositoryReducer(
    state = initialState,
    action: RepositoriesActionTypes
  ): IRepositories {
    switch (action.type) {
      case LOAD_REPOSITORIES:
        
        return Object.assign({}, state, {
          repositories: [...action.payload.repositories]
        })
  
      default:
        return state;
    }
  }