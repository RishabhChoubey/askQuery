import React, { useState } from "react";
import style from "./postModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postCreate } from "../../../action/postAction";
import { set } from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
const PostModal = (props) => {
  const dispatch = useDispatch();
  const [mess, setmess] = useState("");
  const send = () => {
    if (mess) {
      dispatch(postCreate(mess));
      setmess("");
      props.change();
    }
  };

  return (
    <AnimatePresence>
      {props.isVisible && (
        <motion.div className={style.back}>
          <motion.div
            className={style.postform}
            onClick={() => {}}
            initial={{
              x: `100%`,
              y: 500,
              scale: 0,
              transition: {
                duration: 0.5,
              },
            }}
            animate={{
              x: 0,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                duration: 0.5,
              },
            }}
            exit={{
              x: `100%`,
              y: 500,
              scale: [0.8, 0.5, 0.3, 0.2, 0.2],
              transition: {
                duration: 0.5,
              },
            }}
          >
            <div className={style.postforms}>
              <div className={style.close} onClick={() => props.change()}>
                X
              </div>
              <div post className={style.area}>
                <textarea
                  onChange={(e) => setmess(e.target.value)}
                  cols={40}
                  rows={10}
                />
              </div>
              <button onClick={() => send()}>Post</button>
            </div>{" "}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostModal;
