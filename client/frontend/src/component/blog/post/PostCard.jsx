import React, { useState, useEffect, useRef } from "react";
import style from "./PostCard.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Message from "../../postDetail/message/MessageCard";
import Reaction from "../../reaction/Reaction";
import Reacts from "../../react/Reacts";
import { postDelete } from "../../../action/postAction";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const PostCard = ({ data }) => {
  const dispatch = useDispatch();
  const THRESHOLD = [0.25, 0.5, 0.75];
  const controls = useAnimation();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const variants = {
    initial: { opacity: 1, scale: 1 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "tween",
        stiffness: 50,
      },
    },
  };
  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
    if (!inView) {
      controls.start("initial");
    }
  }, [controls, inView]);

  const deletePost = (id) => {
    console.log("card");

    dispatch(postDelete(id));
  };
  return (
    <motion.div
      className={style.card}
      initial={false}
      style={{ scale: 1, rotateY: 0 }}
      animate={controls}
      variants={variants}
      end={{
        scale: 0,
      }}
      // whileHover={{
      //   scale: [0.98, 1.1],
      //   rotateY: [10, 0],
      //   transformStyle: "preserve-3d",
      // }}
      ref={ref}
    >
      <div className={style.react}>
        <Reacts user={data.user} />
      </div>{" "}
      <Link to={`/detail/${data._id}`}>
        <div className={style.mess}>
          <Message message={data.message} />
        </div>{" "}
      </Link>
      <div className={style.reaction}>
        <Reaction
          like={data.like}
          dislike={data.dislike}
          id={data._id}
          userid={data.user._id}
          reviews={data.reviews.length}
          deletePost={() => deletePost(data._id)}
        />
      </div>
    </motion.div>
  );
};

export default PostCard;
