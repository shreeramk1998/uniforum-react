import React from "react";
import Posts, { CreatePost } from "./Posts";

function Home() {
  var [postList, setPostList] = React.useState([]);
  var [a, setA] = React.useState({ postType: {} });
  return (
    <div className="container-fluid mt-4">
      <CreatePost postList={postList} setPostList={setPostList} />
      <Posts postList={postList} setPostList={setPostList} />
      {/* {a.postType} */}
    </div>
  );
}

export default Home;
