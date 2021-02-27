import React, { useEffect, useState, useCallback, memo } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  postList,
  postCreate,
  likeUnsucc,
  unlikeUnsucc,
} from "../../action/postAction";
import { useSelector, useDispatch } from "react-redux";
import style from "./PostList.module.css";
import PostCard from "./post/PostCard";
import PostModal from "./modal/PostModal";

const PostList = () => {
  const [createpost, setcreatepost] = useState(false);
  const { post, loading, error } = useSelector((state) => state.postList);
  const { post: liked, success } = useSelector((state) => state.postLike);
  const { post: unliked, success: unlikesuccess } = useSelector(
    (state) => state.postUnlike
  );
  const { success: postCreateSuccess } = useSelector(
    (state) => state.postCreate
  );
  const { success: postDeleteSuccess, error: postError } = useSelector(
    (state) => state.postDelete
  );
  const { userInfo } = useSelector((state) => state.userSignin);
  console.log(post, "posts", loading, error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(postList());
  }, [postCreateSuccess, postDeleteSuccess]);

  const changePostState = useCallback(() => {
    setcreatepost((it) => !it);
  });
  return (
    <div>
      <div>
        {!loading
          ? post &&
            post.map((it) => {
              if (success) {
                if (liked && it._id == liked._id) {
                  it.like = liked.like;
                  console.log(it, "like");
                }
                dispatch(likeUnsucc());
              }
              if (unlikesuccess) {
                if (unliked && it._id == unliked._id) {
                  it.like = unliked.like;
                  console.log(it, "unlike");
                }
                dispatch(unlikeUnsucc());
              }

              return (
                <div className={style.container}>
                  <PostCard data={it} />{" "}
                </div>
              );
            })
          : [...Array(10)].map(() => (
              <div style={{ margin: "10px" }}>
                <SkeletonTheme color="#7b4">
                  <Skeleton height={50} width={"40%"} count={1}></Skeleton>
                </SkeletonTheme>
                <SkeletonTheme color="#7b6" highlightColor="#294">
                  <Skeleton height={150} width={"40%"} count={1}></Skeleton>
                </SkeletonTheme>
              </div>
            ))}
        <PostModal isVisible={createpost} change={changePostState}></PostModal>
        <AnimatePresence>
          {!userInfo ? (
            <></>
          ) : (
            <motion.div
              className={style.postButton}
              onClick={changePostState}
              style={{ rotateY: 0 }}
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
                opacity: 0,
                transition: {
                  duration: 0.5,
                },
              }}
              whileHover={{
                rotateY: [40, -40, 0],
              }}
            >
              post
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
const editThe = (prevProps, nextProps) => {
  {
    if (prevProps !== nextProps) {
      return true;
    } else {
      return false;
    }
  }
};

export default memo(PostList, editThe);
