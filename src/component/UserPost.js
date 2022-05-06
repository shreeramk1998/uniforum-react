import React, { useEffect } from "react";
import { useMetaData } from "../Context/UserContext";
import Posts from "./Posts";
import { useParams } from "react-router-dom";

export default function UserPost() {
  var [postList, setPostList] = React.useState([]);
  const metaData = useMetaData();
  const { userNum } = useParams();

  return (
    <Posts userNum={userNum} postList={postList} setPostList={setPostList} />
  );
}
