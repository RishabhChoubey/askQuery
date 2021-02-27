import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  signin,
  unsuccess,
  resetPass,
  resetForget,
  tokenVerify,
  updatePassword,
} from "../../action/userAction";
import styles from "./Form.module.css";
import { useHistory } from "react-router-dom";
const Reset = (props) => {
  const [repass, setrepass] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const token = props.match.params.token;
  console.log(token);
  //   const { rrerror, success } = useSelector((state) => state.userRegistration);
  const {
    error: tokenError,
    success: tokenSuccess,
    loading: tokenLoading,
  } = useSelector((state) => state.tokenVerify);
  const submit = (e) => {
    e.preventDefault();

    //   dispatch(register(name, email, password));
  };
  //   //   useEffect(() => {
  //   //     if (success) props.history.push("/");
  //   //   }, [success]);
  useEffect(() => {
    dispatch(tokenVerify(token));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sign}>
        {tokenError}
        {tokenSuccess && <div>verified</div>}
        {tokenSuccess && (
          <form onSubmit={submit}>
            <input
              type="password"
              className="input"
              onChange={(e) => setpassword(e.target.value)}
              className={styles.input}
              placeholder="Password"
              data-aos="fade-zoom-in"
              data-aos-delay="100"
            />
            <br />

            <input
              className="input"
              onChange={(e) => setrepass(e.target.value)}
              className={styles.input}
              placeholder="RE Type Password"
              data-aos="fade-zoom-in"
              data-aos-delay="100"
            />
            <br />
            <button
              type="submit"
              className={styles.button}
              data-aos="fade-zoom-in"
              data-aos-delay="100"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Reset;
