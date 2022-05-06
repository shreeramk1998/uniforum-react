import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useMetaData } from "../Context/UserContext";
import { api } from "../service/AxiosApiService";
import Comment from "./Comment";
import { NavLink } from "react-router-dom";

function Posts({ userNum, postList, setPostList }) {
  let navigate = useNavigate();

  const fetchPosts = (userNum) => {
    const token = localStorage.getItem("userjwt");

    const headers = {
      Authorization: token,
    };
    var loadingToastId = toast.loading("fetching data");
    let uri = `/api/post/fetch/${userNum ?? ""}`;

    api
      .get(uri, {
        headers,
      })
      .then((res) => {
        toast.dismiss(loadingToastId);
        setPostList(res.data);
      })
      .catch((err) => {
        toast.dismiss(loadingToastId);
        toast.error("Error fetching post details");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("userjwt") == null) {
      navigate("/login");
    }
    fetchPosts(userNum);
  }, []);

  return (
    <>
      <div className="card shadow">
        {postList.length === 0 ? (
          <span className="text-center">"No posts to show !"</span>
        ) : (
          postList.map((post) => <Post key={post.postNum} post={post} />)
        )}
      </div>
      <ToastContainer />
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
      <p className="lead card-text" style={{ whiteSpace: "pre-wrap" }}>
        {post.text}
      </p>

      <Comment post={post} />
    </div>
  );
};

const PostHeader = ({ post }) => {
  const classNames = {
    1001: "badge bg-primary",
    1002: "badge bg-warning text-dark",
    1003: "badge bg-info text-dark",
  };

  return (
    <div
      className="btn card-header text-start"
      data-bs-toggle="collapse"
      href={`#postCollapse_${post.postNum}`}
    >
      <div className="row">
        <div className="row justify-content-between">
          <div className="col-auto me-auto">
            {/* Author info */}
            <NavLink
              className="nav-link p-0"
              to={`/posts/${post.user.userNum}`}
            >
              <h6 className="text-info">
                {post.user.firstName.concat(` ${post.user.lastName}` ?? ``)}{" "}
                {" - "}
                {post.rowUpdateStamp}
              </h6>
            </NavLink>
          </div>

          <div className="col-auto">
            <span className={`${classNames[post.postType.typeRefNum]}`}>
              {post.postType.description}
            </span>
          </div>
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
export const CreatePost = ({ postList, setPostList }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  var { metadata, allowedPostType } = useMetaData();

  var [myPost, setMyPost] = useState({
    text:
      user.signature === null || user.signature.length === 0
        ? ""
        : "\n".concat(user.signature),
    upvote: 0,
    topicNum: 1,
    user,
    postType: {},
    title: "",
  });

  const savePost = () => {
    const token = localStorage.getItem("userjwt");

    const headers = {
      Authorization: token,
    };
    let uri = "/api/post/save";
    api
      .post(uri, myPost, {
        headers,
      })
      .then((res) => {
        toast.success("Post added !");
        setPostList([res.data, ...postList]);
      })
      .catch((err) => {
        toast.error("Error occured while saving the post !");
      });
  };

  return (
    <>
      <div className="card-header py-3" id="createPost">
        <div>
          <div className="row">
            <div className="col col-1">
              <img
                className="rounded-circle img-fluid d-block"
                src="assets/img/avatars/dm-profile.jpg"
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
                  setMyPost({ ...myPost, title: e.target.value });
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
                  setMyPost({ ...myPost, text: e.target.value });
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
                  {myPost.postType.description ?? `Post Type`}
                </button>
                <div className="dropdown-menu">
                  {Object.entries(allowedPostType).map((pt) => (
                    <option
                      style={{ cursor: "pointer" }}
                      className="dropdown-item pointer"
                      key={pt[0]}
                      value={pt[0]}
                      id={pt[0]}
                      onClick={(e) => {
                        setMyPost({
                          ...myPost,
                          postType: {
                            typeRefNum: e.target.value,
                            description: allowedPostType[e.target.value],
                          },
                        });
                      }}
                    >
                      {pt[1]}
                    </option>
                  ))}
                </div>
              </div>
              <button
                className="btn btn-light"
                type="button"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                type="button"
                data-bs-dismiss="modal"
                onClick={savePost}
              >
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
