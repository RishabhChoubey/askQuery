import React, { useState, useEffect } from "react";
import style from "./React.module.css";
import { useDispatch, useSelector } from "react-redux";
const Reacts = ({ user }) => {
  const { userInfo } = useSelector((state) => state.userSignin);
  let name = "";

  if (userInfo && user == userInfo.id) {
    name = userInfo.name;
  }
  return (
    <div className={style.react}>
      <div>user : {userInfo && user == userInfo.id ? name : user.name}</div>
    </div>
  );
};

export default Reacts;
