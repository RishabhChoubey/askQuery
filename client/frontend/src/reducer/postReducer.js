import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_REVIEW_CREATE_FAIL,
  POST_REVIEW_CREATE_REQUEST,
  POST_REVIEW_CREATE_SUCCESS,
  POST_DETAILS_CHANGE,
  POST_REVIEW_CHANGE,
  POST_REVIEWREMOVE_CHANGE,
  POST_LIKE_FAIL,
  POST_LIKE_SUCCESS,
  POST_LIKE_REQUEST,
  POST_UNLIKE_FAIL,
  POST_UNLIKE_SUCCESS,
  POST_UNLIKE_REQUEST,
  POST_UNLIKE_RESET,
  POST_LIKE_RESET,
} from "../constant/postConstant";
import {
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
} from "../constant/reviewConstant";

export const postDetailReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { loading: true };
    case POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload, success: true };
    case POST_DETAILS_FAIL:
      return { loading: false, error: true, success: false };
    case POST_DETAILS_CHANGE:
      return { ...state, success: false };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postListReducer = (state = { post: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true };
    case POST_LIST_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const postReviewReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case POST_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case POST_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case POST_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case POST_REVIEW_CHANGE:
      return { ...state, success: false };
    default:
      return state;
  }
};

export const removeReviewReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case REVIEW_DELETE_REQUEST:
      return { loading: true };
    case REVIEW_DELETE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case REVIEW_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case POST_REVIEWREMOVE_CHANGE:
      return { ...state, success: false };
    default:
      return state;
  }
};

export const postLikeReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_LIKE_REQUEST:
      return { loading: true };
    case POST_LIKE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_LIKE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case POST_LIKE_RESET:
      return {};
    default:
      return state;
  }
};

export const postUnlikeReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_UNLIKE_REQUEST:
      return { loading: true };
    case POST_UNLIKE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_UNLIKE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case POST_UNLIKE_RESET:
      return {};
    default:
      return state;
  }
};
