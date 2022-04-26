import React, { useEffect } from "react";
import { useMetaData } from "../Context/UserContext";
export default function MyPosts() {
  const metaData = useMetaData();
  useEffect(() => {
    console.log(metaData);
  }, []);
  return <div>MyPosts</div>;
}
