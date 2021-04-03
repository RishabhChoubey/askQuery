import React, { useState, useEffect, useRef, memo } from "react";
import ReactQuill from "react-quill";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  postDetail,
  postReview,
  remove,
  postDetailSuc,
  postReviewSuc,
  postReviewRemoveSuc,
  likeUnsucc,
  unlikeUnsucc,
} from "../../action/postAction";
import Message from "./message/MessageCard";
import style from "./Detail.module.css";
import Reaction from "../reaction/Reaction";
import Reacts from "../react/Reacts";
import { useHistory } from "react-router-dom";

const variants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 0.61,
      type: "string",
      // when: "beforeChildren",
      //delayChildren: 0.5,
      staggerChildren: 0.4,
      staggerDirection: -1,
    },
  },
};

const variant = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "string",
      //  delayChildren: 0.41,
    },
  },
};

const Detail = (props) => {
  const history = useHistory();
  const [showcomment, setshow] = useState(false);
  const [message, setcomment] = useState("");
  const [rev, setrev] = useState([]);
  const query = props.match.params.id;

  const input = useRef();
  const { userInfo } = useSelector((state) => state.userSignin);
  const {
    review: removeReview,
    success: reviewRemoveSuccess,
    error: reviewRemoveError,
  } = useSelector((state) => state.removeReview);

  const { post, loading, error, success } = useSelector(
    (state) => state.postDetail
  );
  const { post: liked, success: likesuccess } = useSelector(
    (state) => state.postLike
  );
  const { post: unliked, success: unlikesuccess } = useSelector(
    (state) => state.postUnlike
  );
  const datareview = useSelector((state) => state.postReview);

  const { review, success: revsucces } = datareview;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postDetail(query));
    console.log("fetch");
  }, [dispatch]);

  useEffect(() => {
    if (likesuccess) {
      if (liked && post._id == liked._id) {
        post.like = liked.like;
        console.log(post, "like");
      }
      dispatch(likeUnsucc());
    }
    if (unlikesuccess) {
      if (unliked && post._id == unliked._id) {
        post.like = unliked.like;
        console.log(post, "unlike");
      }
      dispatch(unlikeUnsucc());
    }
  }, [likesuccess, unlikesuccess]);

  useEffect(() => {
    if (success) {
      setrev(post.reviews);
      dispatch(postDetailSuc());
      console.log("runsuc");
    }
    if (revsucces) {
      let reviews = rev;
      reviews["user"] = { name: userInfo.name };
      setrev([review, ...reviews]);
      dispatch(postReviewSuc());
      console.log("runsuc update");
    }
  }, [revsucces, success]);

  const postcomment = () => {
    if (userInfo) {
      dispatch(postReview(message, post._id));
      input.current.value = "";
      setshow(false);
    } else {
      if (window.confirm("are you want to signin to post comment")) {
        history.push("/signin");
      } else {
        alert("see posts only");
      }
    }
  };
  useEffect(() => {
    if (reviewRemoveSuccess) {
      let reviews = rev;

      reviews = reviews.filter((it) => it._id != removeReview._id);
      setrev(reviews);
      dispatch(postReviewRemoveSuc());
      console.log("remove review");
    }
  }, [reviewRemoveSuccess]);

  const debounce = (fn, delay) => {
    let timer;
    return function (...arg) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...arg);
      }, delay);
    };
  };
  const del = (id, _id) => {
    dispatch(remove(id, _id));
  };

  return (
    <motion.div
      className={style.container}
      initial="initial"
      animate="animate"
      variants={variants}
    >
      <AnimatePresence>
        {!loading ? (
          !error ? (
            <motion.div className={style.sub} variants={variant}>
              {post.user ? <Reacts user={post.user} /> : ""}
              <div className={style.message}>
                {" "}
                <Message message={post.message} />
              </div>
              <motion.div className={style.reaction} variants={variant}>
                <Reaction
                  like={post.like}
                  dislike={post.dislike}
                  reviews={rev.length}
                  id={post._id}
                />
              </motion.div>

              {showcomment ? (
                <AnimatePresence>
                  <motion.div
                    className={style.area}
                    variants={variant}
                    exit={{
                      scale: 0,
                      transition: {
                        duration: 1,
                      },
                    }}
                  >
                    <textarea
                      ref={input}
                      onChange={debounce(
                        (e) => setcomment(e.target.value),
                        250
                      )}
                    />
                    {message ? (
                      <button
                        onClick={postcomment}
                        style={{ marginBottom: "20px" }}
                      >
                        comment
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      onClick={() => setshow(false)}
                      style={{ marginBottom: "10px" }}
                    >
                      cancel
                    </button>
                  </motion.div>{" "}
                </AnimatePresence>
              ) : (
                <button onClick={() => setshow(true)}>post comment</button>
              )}

              {rev.map((it) => (
                <motion.div className={style.review} variants={variant}>
                  <Reacts user={it.user} />
                  <div className={style.review_message}>
                    {" "}
                    <Message message={it.message} />
                  </div>
                  {/* <Reaction
                    like={it.like}
                    dislike={it.dislike}
                    reviews={null}
                  /> */}
                  {userInfo &&
                  (userInfo.id == it.user._id || userInfo.id == it.user) ? (
                    <button
                      onClick={() => del(it._id, post._id)}
                      className={style.reviewDelete}
                    >
                      delete
                    </button>
                  ) : (
                    ""
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            ""
          )
        ) : (
          "loading"
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(Detail);
