import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  signin,
  unsuccess,
  resetPass,
  resetForget,
} from "../../action/userAction";
import styles from "./Form.module.css";
import { useHistory } from "react-router-dom";

const Signin = (props) => {
  console.log(props.history.location.pathname, "loaction");
  let history = useHistory();
  const [resetemail, setresetemail] = useState("");
  const [resetpass, setresetpass] = useState(false);
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { userInfo, success, error, loading } = useSelector(
    (state) => state.userSignin
  );
  const {
    loading: forgetLoading,
    error: forgetError,
    success: forgetSuccess,
    data: forgetData,
  } = useSelector((state) => state.userForget);
  const submit = (e) => {
    e.preventDefault();

    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (success) {
      dispatch(unsuccess());

      history.goBack();
    }
  }, [success]);
  useEffect(() => {
    dispatch(unsuccess());
  }, []);
  const getMail = () => {
    dispatch(resetPass(resetemail));
    setresetemail("");
  };
  const cancelForget = () => {
    setresetpass(false);
    dispatch(resetForget());
  };
  return (
    <div className={styles.container}>
      <div className={styles.sign}>
        {!resetpass && (
          <form onSubmit={submit} className={styles.form}>
            <div
              className={styles.error}
              data-aos="flip-left"
              data-aos-delay="300"
            >
              {error && (error.password || error.user)}
            </div>
            <input
              data-aos="fade-zoom-in"
              data-aos-delay="300"
              className="input"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email"
              className={styles.input}
            />
            <br />

            <input
              data-aos="fade-zoom-in"
              data-aos-delay="300"
              type="password"
              className="input"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
              className={styles.input}
            />
            <br />
            {loading ? (
              "please wait"
            ) : (
              <button
                type="submit"
                className={styles.button}
                data-aos="fade-zoom-in"
                data-aos-delay="300"
              >
                Login
              </button>
            )}
          </form>
        )}
        {/* {!resetpass && (
          <div onClick={() => setresetpass(true)}>forget password</div>
        )} */}
        {resetpass && (
          <>
            {forgetError}
            {forgetData}
            <input
              placeholder="email"
              onChange={(e) => setresetemail(e.target.value)}
              value={resetemail}
            ></input>
            <button onClick={getMail}>submit</button>
            <button onClick={() => cancelForget()}>cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Signin;
