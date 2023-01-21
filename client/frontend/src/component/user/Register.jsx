import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { register,unsuccRes } from "../../action/userAction";
import styles from "./Form.module.css";

const Register = (props) => {
  const [name, setusername] = useState();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const { rrerror, success } = useSelector((state) => state.userRegistration);
  const submit = (e) => {
    e.preventDefault();

    dispatch(register(name, email, password));
  };
  useEffect(() => {
    if (success)
    { 
      dispatch(unsuccRes());
      props.history.push("/");}



  }, [success]);

  return (
    <div className={styles.container}>
      <div className={styles.sign}>
        <form onSubmit={submit}>
          <div
            className={styles.error}
            data-aos="fade-zoom-in"
            data-aos-delay="100"
          >
            {" "}
            {rrerror && (rrerror.password || rrerror.user)}
          <
            /div>
          <input
            className="input"
            onChange={(e) => setusername(e.target.value)}
            className={styles.input}
            placeholder="UserName"
            data-aos="fade-zoom-in"
            data-aos-delay="100"
          />
          <br />

          <input
            className="input"
            onChange={(e) => setemail(e.target.value)}
            className={styles.input}
            placeholder="Email"
            data-aos="fade-zoom-in"
            data-aos-delay="100"
          />
          <br />

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
          <button
            type="submit"
            className={styles.button}
            data-aos="fade-zoom-in"
            data-aos-delay="100"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
