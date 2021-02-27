import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Router from "./router/Router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "./action/userAction";

function App() {
  const dispatch = useDispatch();
  const [option, setoption] = useState(false);
  const { userInfo } = useSelector((state) => state.userSignin);
  const logout = () => {
    dispatch(logoutAction());
  };
  const userOption = () => {
    setoption((it) => !it);
  };
  return (
    <div className="App">
      {" "}
      <BrowserRouter>
        <div className="header">
          {" "}
          <div className="right">
            {" "}
            <Link to="/">query </Link>
          </div>
          <div className="left">
            <div className="link">
              <Link to="/signin">signin </Link>
            </div>
            <div className="link">
              {userInfo ? <></> : <Link to="/register">signup </Link>}
            </div>
            {userInfo ? (
              <>
                <div onClick={logout} className="link">
                  logout
                </div>
                {/* <div className="box">
                  <div
                    className={option ? "dot close" : "dot"}
                    onClick={userOption}
                  ></div>
                </div> */}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={option ? "option show" : "option"}>
          {option ? (
            <ul onClick={() => setoption((it) => !it)}>
              <li>
                <Link to="/post">posts</Link>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>

        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
