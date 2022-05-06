import React, { useState } from "react";
import { api } from "../service/AxiosApiService";
import { toast } from "react-toastify";

function saveComment(comment) {
  var token = localStorage.getItem("userjwt");
  const headers = {
    Authorization: token,
  };
  let uri = "/api/post/comment/save";
  return api.post(uri, comment, {
    headers,
  });
}

function Comment({ post }) {
  var token = localStorage.getItem("userjwt");
  const headers = {
    Authorization: token,
  };
  const [commentCollapse, setCommentCollapse] = useState("show");
  const [comments, setComments] = useState([]);
  const [loadCommentMsg, setLoadCommentMsg] = useState("Load Comments");

  let uri = "/api/post/comment/fetch";

  const fetchComments = (postNum) => {
    api
      .get(`${uri}/${postNum}`, {
        headers,
      })
      .then((res) => {
        setComments(res.data);
        res.data.length === 0
          ? setLoadCommentMsg("No comments available")
          : setLoadCommentMsg("Toggle to hide/show");
      });
  };

  return (
    <>
      <CommentAndUpvote
        post={post}
        setComments={setComments}
        comments={comments}
      />
      <div className="row">
        <div className="col">
          <div id={`commentCollaps_${post.postNum}`} className="collapse hide">
            {comments.map((comment) => {
              return (
                <Replies
                  key={comment.commentNum}
                  comment={comment}
                  post={post}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col" style={{ textAlign: "center" }}>
          <span
            role="button"
            href={`#commentCollaps_${post.postNum}`}
            data-bs-toggle="collapse"
            onClick={() => fetchComments(post.postNum)}
          >
            {loadCommentMsg}
          </span>
        </div>
      </div>
    </>
  );
}

const CommentAndUpvote = ({ post, setComments, comments }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [myComment, setMyComment] = useState({
    postNum: post.postNum,
    user: { userNum: user.userNum },
  });

  return (
    <>
      <div className="row mt-5">
        <Upvote post={post} />
        <div className="col col-md-11 col-12 text-end">
          <textarea
            className="form-control"
            rows="2"
            placeholder="Add a comment ..."
            value={myComment.text}
            onChange={(e) => {
              let text = e.target.value;
              setMyComment({ ...myComment, text });
            }}
          ></textarea>
          <span
            role="button"
            onClick={() => {
              saveComment(myComment)
                .then((res) => {
                  setComments([res.data, ...comments]);
                  setMyComment({ ...myComment, text: "" });
                })
                .catch((err) => {
                  toast.error("Error saving comment !");
                });
            }}
          >
            Comment
          </span>
        </div>
      </div>
    </>
  );
};

const Upvote = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [upvoteCount, setUpvote] = useState(post.upvote);
  const [upvoteFlag, setUpvoteFlag] = useState(false);

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  const upvotePost = () => {
    let uri = "/api/post/upvote";
    var token = localStorage.getItem("userjwt");
    const headers = {
      Authorization: token,
    };
    setUpvoteFlag(!upvoteFlag);
    api
      .post(
        uri,
        {
          userNum: user.userNum,
          postNum: post.postNum,
          upvoteFlag: !upvoteFlag,
        },
        {
          headers,
        }
      )
      .then((res) => {
        setUpvote(res.data.upvote);
      });
  };

  return (
    <div className="col col-md-1">
      <button
        className="btn btn-primary mt-2"
        type="button"
        onClick={() => upvotePost()}
      >
        <i className={upvoteFlag ? "fa fa-heart" : "far fa-heart"}>
          <br></br>
          <small>{kFormatter(upvoteCount)}</small>
        </i>
      </button>
    </div>
  );
};

const Replies = ({ comment, post }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [replies, setReplies] = useState(comment.replies ?? []);
  const [myReply, setMyReply] = useState({
    parentNum: comment.commentNum,
    postNum: post.postNum,
    user: { userNum: user.userNum },
    text: "",
  });

  return (
    <div className="card mt-1 border-0">
      <div
        className="card-body"
        style={{
          borderTopStyle: "none",
          borderRightStyle: "none",
          borderBottomStyle: "none",
          borderLeftStyle: "solid",
        }}
      >
        <p className="card-text">
          {comment.text}
          <span className="text-info">
            &nbsp;- {comment.user.firstName} - {comment.rowAddStamp}
          </span>
        </p>
        <ul className="list-group mt-1">
          {replies &&
            replies.map((reply) => {
              return (
                <li
                  key={reply.commentNum}
                  className="list-group-item"
                  style={{
                    borderTopStyle: "none",
                    borderRightStyle: "none",
                    borderBottomStyle: "none",
                    borderLeftStyle: "solid",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
                  }}
                >
                  <span>{reply.text}</span>
                  <span className="text-info mx-2">
                    - {reply.user.firstName} - {reply.rowAddStamp}
                  </span>
                </li>
              );
            })}
        </ul>
        <div className="input-group">
          <input
            className="form-control mb-2"
            type="text"
            style={{
              height: "35px",
              borderRadius: "0px",
              borderTopStyle: "none",
              borderRightStyle: "none",
              borderBottomStyle: "1px",
              borderLeftStyle: "none",
            }}
            placeholder="reply"
            value={myReply.text}
            onChange={(e) => {
              setMyReply({ ...myReply, text: e.target.value });
            }}
          ></input>
          <button
            className="btn btn-primary"
            type="button"
            style={{ height: "35px" }}
            onClick={() => {
              saveComment(myReply)
                .then((res) => {
                  setReplies([...replies, res.data]);
                  setMyReply({ ...myReply, text: "" });
                })
                .catch((err) => {
                  console.log(err);
                  toast.error("Error saving reply !");
                });
            }}
          >
            <i className="fa fa-reply"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
