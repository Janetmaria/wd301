interface Project {
  id: number;
  name: string;
}
// Now, I'll rename the interface in the `ProjectList` component from `State`
// to `ProjectsState`. And I'll also export the interface. 

export interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
// Next, I'll comment the `Action` interface

// interface Action {
//   type: string;
//   payload?: any;
// }

// Then I'll define a new type called `ProjectsActions` 
// for all possible combimations of action objects.

export const initialState: ProjectsState = {
  projects: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
};

export type ProjectsActions = 
  | { type: 'FETCH_PROJECTS_REQUEST' }
  | { type: 'FETCH_PROJECTS_SUCCESS'; payload: Project[] }
  | { type: 'FETCH_PROJECTS_FAILURE'; payload: string }
  | { type: 'ADD_PROJECT_SUCCESS'; payload: Project }

export const reducer = (state: ProjectsState, action: ProjectsActions): ProjectsState => {
  switch (action.type) {
    case "FETCH_PROJECTS_REQUEST":
      return {
        ...state,
        isLoading: true
      };   
    case "FETCH_PROJECTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        projects: action.payload,
      };      
    case "FETCH_PROJECTS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true, 
        errorMessage: action.payload
      };           
    case 'ADD_PROJECT_SUCCESS':
      return {
        ...state, 
        projects: [...state.projects, action.payload] 
      }; 
    default:
      return state;
  }
}