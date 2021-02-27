import React, { useState, useEffect } from "react";
import style from "./Message.module.css";

const Message = ({ message }) => {
  return <div className={style.message}>{message}</div>;
};

export default Message;
