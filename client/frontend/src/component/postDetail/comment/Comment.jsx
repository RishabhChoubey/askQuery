import React, { useState, useEffect } from "react";

const Comment = ({ visible }) => {
  return (
    <>
      {visible && (
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
            onChange={debounce((e) => setcomment(e.target.value), 250)}
          />
          {message ? <button onClick={postcomment}>comment</button> : ""}
          <button onClick={() => setshow(false)}>cancel</button>
        </motion.div>
      )}
    </>
  );
};

export default Comment;
