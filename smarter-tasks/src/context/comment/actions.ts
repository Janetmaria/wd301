/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_ENDPOINT } from '../../config/constants';
import { CommentDispatch } from './types';

export const fetchComments = async (dispatch: CommentDispatch, projectID: string, taskID: string) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: 'FETCH_COMMENTS_REQUEST' });
    const response = await fetch(`${API_ENDPOINT}/projects/${projectID}/tasks/${taskID}/comments`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch comments');
    const data = await response.json();
    dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_COMMENTS_FAILURE', payload: 'Unable to load comments' });
  }
};

export const addComment = async (
  dispatch: CommentDispatch,
  projectID: string,
  taskID: string,
  content: string
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    const response = await fetch(`${API_ENDPOINT}/projects/${projectID}/tasks/${taskID}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });
    if (!response.ok) throw new Error('Failed to post comment');
    const data = await response.json();
    dispatch({ type: 'ADD_COMMENT_SUCCESS', payload: data });
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};
