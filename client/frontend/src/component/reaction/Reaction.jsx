import React, { useState, useEffect, memo } from "react";
import style from "./Reaction.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postLike, postUnlike } from "../../action/postAction";
import Cookie from "js-cookie";
const Reaction = ({ like, dislike, reviews, id, deletePost, userid }) => {
  const dispatch = useDispatch();

  const user = Cookie.getJSON("userInfo");

  const likeButton = (id, _id) => {
    if (user) {
      if (!like.includes(user.id)) {
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
          if (user) likeButton(id, user.id);
          else {
            alert("LOGIN FIRST");
          }
        }}
      >
        like {like && like.length}
      </div>

      <div>reviews {reviews}</div>
      {user && user.id == userid && <div onClick={() => del()}>delete</div>}
    </div>
  );
};

export default memo(Reaction);
