import { CommentState, CommentActions, initialState } from './types';

export const reducer = (state: CommentState = initialState, action: CommentActions): CommentState => {
  switch (action.type) {
    case 'FETCH_COMMENTS_REQUEST':
      return { ...state, isLoading: true };
    case 'FETCH_COMMENTS_SUCCESS':
      return { ...state, isLoading: false, comments: action.payload };
    case 'FETCH_COMMENTS_FAILURE':
      return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
    case 'ADD_COMMENT_SUCCESS':
      return { ...state, comments: [action.payload, ...state.comments] };
    default:
      return state;
  }
};