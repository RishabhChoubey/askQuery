import React, { useState, useEffect, memo } from "react";
import style from "./Reaction.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postLike, postUnlike } from "../../action/postAction";

const Reaction = ({ like, dislike, reviews, id, deletePost, userid }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userSignin);

  const likeButton = (id, _id) => {
    if (userInfo) {
      if (!like.includes(userInfo.id)) {
        dispatch(postLike(id, _id));
      } else {
        dispatch(postUnlike(id, _id));
      }
    }
  };
  const del = () => {
    deletePost();
  };
  console.log(reviews, "length");
  return (
    <div className={style.reaction}>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (userInfo) likeButton(id, userInfo.id);
          else {
            alert("LOGIN FIRST");
          }
        }}
      >
        like {like && like.length}
      </div>

      <div>reviews {reviews}</div>
      {userInfo && userInfo.id == userid && (
        <div onClick={() => del()}>delete</div>
      )}
    </div>
  );
};

export default memo(Reaction);
