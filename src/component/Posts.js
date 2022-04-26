import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useMetaData } from "../Context/UserContext";
import { api } from "../service/AxiosApiService";

function Posts({ userNum }) {
  let navigate = useNavigate();
  var [postList, setPostList] = useState([]);
  var metadata = useMetaData();

  const fetchPosts = (userNum) => {
    var loadingToastId = toast.loading("fetching data");

    var uri = "/api/post/fetch";

    // if (userNum === null || userNum !== "undefined") {
    //   uri = uri.concat(`/${userNum}`);
    // }
    var token = localStorage.getItem("userjwt");
    const headers = {
      Authorization: token,
    };
    console.log(typeof token);
    api
      .get(uri, {
        headers,
      })
      .then((res) => {
        toast.dismiss(loadingToastId);
        console.log(`posts`);
        setPostList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching post details");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("userjwt") == null) {
      navigate("/login");
    }
    fetchPosts();
  }, []);

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="card shadow">
          <CreatePost />
          {postList.length &&
            postList.map((post) => <Post key={post.postNum} post={post} />)}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

const Post = ({ post }) => {
  return (
    <div className="card-body mt-2">
      <div className="card">
        <PostHeader post={post} />
        <PostDetail post={post} />
      </div>
    </div>
  );
};

const PostDetail = ({ post }) => {
  return (
    <div className="card-body collapse" id={`postCollapse_${post.postNum}`}>
      <p className="lead card-text">{post.text}</p>
      <div className="row mt-5">
        <div className="col col-md-1">
          <button className="btn btn-primary mt-2" type="button">
            <i className="fa fa-heart"></i>
          </button>
        </div>
        <div className="col col-md-11 col-12 text-end">
          <textarea
            className="form-control"
            rows="2"
            placeholder="Add a comment ..."
          ></textarea>
          <span role="button">Comment</span>
        </div>
      </div>
      <Comment post={post} />
    </div>
  );
};

const Comment = ({ post }) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <div id={`commentCollaps_${post.postNum}`} className="collapse hide">
            <CommentDetails />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col" style={{ textAlign: "left" }}>
          <span
            role="button"
            href={`#commentCollaps_${post.postNum}`}
            data-bs-toggle="collapse"
          >
            Toggle Hide/show comments
          </span>
        </div>
        <div className="col" style={{ textAlign: "right" }}>
          <span
            role="button"
            href={`#commentCollaps_${post.postNum}`}
            data-bs-toggle="collapse"
          >
            Load comments
          </span>
        </div>
      </div>
    </>
  );
};
const CommentDetails = () => {
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
          Crazy.
          <span className="text-info">&nbsp;- shreeram 10:01</span>
        </p>
        <ul className="list-group mt-1">
          <li
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
            <span>thats good</span>
            <span className="text-info mx-2">- shreeram 10:01</span>
          </li>
          <li
            className="list-group-item"
            style={{
              borderTopStyle: "none",
              borderRightStyle: "none",
              borderBottomStyle: "none",
              borderLeftStyle: "solid",
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          >
            <span>cool</span>
            <span className="text-info mx-2">- shreeram 10:01</span>
          </li>
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
          ></input>
          <button
            className="btn btn-primary"
            type="button"
            style={{ height: "35px" }}
          >
            <i className="fa fa-reply"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
const PostHeader = ({ post }) => {
  return (
    <div
      className="btn card-header text-start"
      data-bs-toggle="collapse"
      href={`#postCollapse_${post.postNum}`}
    >
      <div className="row">
        <div className="col">
          {/* Author info */}
          <h6 className="text-info">
            {post.user.name} - {post.rowUpdateStamp}
          </h6>
        </div>
      </div>
      <div className="row mb-0">
        <div className="col mb-0">
          {/* Title */}
          <h5>{post.title}</h5>
        </div>
      </div>
    </div>
  );
};
export const CreatePost = () => {
  var [myPost, setMyPost] = useState({});
  return (
    <>
      <div className="card-header py-3" id="createPost">
        <div>
          <div className="row">
            <div className="col col-1">
              <img
                className="rounded-circle img-fluid d-block"
                src="assets/img/avatars/avatar1.jpeg"
              ></img>
            </div>
            <div className="col container">
              <div
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#postSomething"
              >
                <span className="d-block text-left border p-2 rounded-pill">
                  What's on your mind
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        role="dialog"
        tabIndex={-1}
        id="postSomething"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <input
                type="text"
                className="w-100 border-0 small"
                placeholder="Add title"
                value={myPost.title}
                onChange={(e) => {
                  myPost.title = e.target.value;
                  setMyPost(myPost);
                }}
              ></input>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                className="w-100 border-0 small"
                placeholder="Add main content"
                value={myPost.text}
                onChange={(e) => {
                  myPost.text = e.target.value;
                  setMyPost(myPost);
                }}
              ></textarea>
            </div>
            <div className="modal-footer">
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  type="button"
                  style={{
                    background: "var(--bs-gray-200)",
                    color: "var(--bs-gray-dark)",
                    borderColor: "var(--bs-gray-100)",
                  }}
                >
                  {myPost.postType ?? `Post Type`}
                </button>
                <div className="dropdown-menu">
                  <span className="dropdown-item">First Item</span>
                  <a className="dropdown-item" href="#">
                    Second Item
                  </a>
                  <a className="dropdown-item" href="#">
                    Third Item
                  </a>
                </div>
              </div>
              <button
                className="btn btn-light"
                type="button"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button className="btn btn-primary" type="button">
                <i className="fa fa-send"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
