import React from "react";
import { useMetaData } from "../Context/UserContext";

export const Data = () => {
  const metadata = useMetaData();

  return { metadata };
};
