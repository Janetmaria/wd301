export interface Comment {
  id: number;
  content: string;
  created_at: string;
  user_name: string;
}

export interface CommentState {
  comments: Comment[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export const initialState: CommentState = {
  comments: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export type CommentActions =
  | { type: 'FETCH_COMMENTS_REQUEST' }
  | { type: 'FETCH_COMMENTS_SUCCESS'; payload: Comment[] }
  | { type: 'FETCH_COMMENTS_FAILURE'; payload: string }
  | { type: 'ADD_COMMENT_SUCCESS'; payload: Comment };

export type CommentDispatch = React.Dispatch<CommentActions>;
