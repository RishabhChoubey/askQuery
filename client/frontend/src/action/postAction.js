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
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_RESET,
  POST_UNLIKE_REQUEST,
  POST_UNLIKE_SUCCESS,
  POST_UNLIKE_FAIL,
  POST_UNLIKE_RESET,
} from "../constant/postConstant";

import {
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
} from "../constant/reviewConstant";
import axios from "axios";
import Cookie from "js-cookie";

export const postList = () => async (dispatch) => {
  dispatch({ type: POST_LIST_REQUEST });

  const { data } = await axios.get("http://localhost:2000/api/posts/");
  console.log("data", data);
  if (data.err) {
    dispatch({ type: POST_LIST_FAIL, payload: data.msg });
  } else {
    dispatch({ type: POST_LIST_SUCCESS, payload: data.msg.post });
  }
};

export const postDetail = (query) => async (dispatch) => {
  dispatch({ type: POST_DETAILS_REQUEST });

  const { data } = await axios.get(
    "http://localhost:2000/api/posts/postr/" + query
  );
  console.log("data", data);
  if (data.err) {
    dispatch({ type: POST_DETAILS_FAIL, payload: data.msg });
  } else {
    dispatch({ type: POST_DETAILS_SUCCESS, payload: data.msg.post[0] });
  }
};
export const postDetailSuc = () => async (dispatch) => {
  dispatch({ type: POST_DETAILS_CHANGE });
};
export const postReviewSuc = () => async (dispatch) => {
  dispatch({ type: POST_REVIEW_CHANGE });
};
export const postReviewRemoveSuc = () => async (dispatch) => {
  dispatch({ type: POST_REVIEWREMOVE_CHANGE });
};

export const postCreate = (message) => async (dispatch) => {
  dispatch({ type: POST_CREATE_REQUEST });
  const userInfo = Cookie.getJSON("userInfo");
  //console.log(userInfo.token);
  const { data } = await axios.post(
    "http://localhost:2000/api/posts/post/",
    {
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );

  if (data.err) {
    dispatch({ type: POST_CREATE_FAIL, payload: data.msg });
  } else {
    dispatch({ type: POST_CREATE_SUCCESS, payload: data.msg });
  }
};

export const postReview = (message, id) => async (dispatch) => {
  const userInfo = Cookie.getJSON("userInfo");
  dispatch({ type: POST_REVIEW_CREATE_REQUEST });

  const { data } = await axios.post(
    "http://localhost:2000/api/review/post/" + id,
    {
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );

  if (data.err) {
    dispatch({ type: POST_REVIEW_CREATE_FAIL, payload: data.msg });
  } else {
    dispatch({ type: POST_REVIEW_CREATE_SUCCESS, payload: data.msg.post });
  }
};

export const remove = (id, _id) => async (dispatch) => {
  const userInfo = Cookie.getJSON("userInfo");
  dispatch({ type: REVIEW_DELETE_REQUEST });

  const { data } = await axios.put(
    "http://localhost:2000/api/posts/post/remove/" + id,
    {
      _id,
    },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
  console.log(data, "data");
  if (data.err) {
    dispatch({ type: REVIEW_DELETE_FAIL, payload: data.msg });
  } else {
    dispatch({
      type: REVIEW_DELETE_SUCCESS,
      payload: data.msg.post,
    });
  }
};
export const postLike = (id, _id) => async (dispatch) => {
  const userInfo = Cookie.getJSON("userInfo");
  dispatch({ type: POST_LIKE_REQUEST });

  const { data } = await axios.put(
    "http://localhost:2000/api/posts/like/" + id,
    {
      _id,
    },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
  console.log(data, "data like");
  if (data.err) {
    dispatch({ type: POST_LIKE_FAIL, payload: data.msg });
  } else {
    dispatch({
      type: POST_LIKE_SUCCESS,
      payload: data.msg.post,
    });
  }
};

export const postUnlike = (id, _id) => async (dispatch) => {
  const userInfo = Cookie.getJSON("userInfo");
  dispatch({ type: POST_UNLIKE_REQUEST });

  const { data } = await axios.put(
    "http://localhost:2000/api/posts/unlike/" + id,
    {
      _id,
    },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
  console.log(data, "data");
  if (data.err) {
    dispatch({ type: POST_UNLIKE_FAIL, payload: data.msg });
  } else {
    dispatch({
      type: POST_UNLIKE_SUCCESS,
      payload: data.msg.post,
    });
  }
};
export const likeUnsucc = () => async (dispatch) => {
  dispatch({ type: POST_LIKE_RESET });
};
export const unlikeUnsucc = () => async (dispatch) => {
  dispatch({ type: POST_UNLIKE_RESET });
};

export const postDelete = (id) => async (dispatch) => {
  const userInfo = Cookie.getJSON("userInfo");

  dispatch({ type: POST_DELETE_REQUEST });
  console.log("delete", id);
  const { data } = await axios.delete(
    "http://localhost:2000/api/posts/post/delete/" + id,

    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
  console.log(data, "data");
  if (data.err) {
    dispatch({ type: POST_DELETE_FAIL, payload: data.msg });
  } else {
    dispatch({
      type: POST_DELETE_SUCCESS,
      payload: data.msg.post,
    });
  }
};
