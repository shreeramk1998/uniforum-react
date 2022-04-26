import React, { useContext, useState, useEffect } from "react";
import { api } from "../service/AxiosApiService";
import { useNavigate } from "react-router-dom";

const MetaDataContext = React.createContext();

export const useMetaData = () => {
  return useContext(MetaDataContext);
};
export function MetaDataContextProvider({ children }) {
  const navigate = useNavigate();

  const [metaData, setMetaData] = useState([]);

  const fetchAndSetMetaData = () => {
    const uri = "/api/metadata/typegroupref/fetch";
    var token = localStorage.getItem("userjwt");
    const headers = {
      Authorization: token,
    };
    api
      .get(uri, {
        headers,
      })
      .then((res) => {
        console.log(`fetched meta data ${res.data}`);

        setMetaData(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  };

  useEffect(() => {
    fetchAndSetMetaData();
  }, []);
  return (
    <>
      {metaData.length && (
        <MetaDataContext.Provider value={metaData}>
          {children}
        </MetaDataContext.Provider>
      )}
    </>
  );
}
