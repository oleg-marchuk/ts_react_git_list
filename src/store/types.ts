export interface IRepository {
    name: string;
    description: string;
}

export interface IRepositories {
    repositories: IRepository[];
}

export const LOAD_REPOSITORIES = "LOAD_REPOSITORIES";

interface LoadRepositoriesAction {
    type: typeof LOAD_REPOSITORIES;
    payload: IRepositories;
}

export type RepositoriesActionTypes = LoadRepositoriesAction;