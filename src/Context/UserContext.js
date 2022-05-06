import React, { useContext, useState, useEffect } from "react";
import { api } from "../service/AxiosApiService";
import { useNavigate, useLocation } from "react-router-dom";

const MetaDataContext = React.createContext();

export const useMetaData = () => {
  return useContext(MetaDataContext);
};
export function MetaDataContextProvider({ children }) {
  const navigate = useNavigate();
  const a = useLocation();

  const [metaData, setMetaData] = useState([]);
  const [allowedPostType, setAllowedPostType] = useState({});

  useEffect(() => {
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
          console.log(`fetched meta data ${JSON.stringify(res.data)}`);

          setMetaData(res.data);
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    };
    fetchAndSetMetaData();
  }, []);

  useEffect(() => {
    if (metaData.length !== 0) {
      let user = JSON.parse(localStorage.getItem("user"));

      let postTypMap = metaData
        .filter((item) => item.typeGroupNum === 10)[0]
        .typeRefList.reduce((map, obj) => {
          map[obj.typeRefNum] = obj.description;

          return map;
        }, {});
      let isUserAdmin = user.roleList.some((role) => {
        return role.roleNum === 2;
      });
      if (!isUserAdmin) {
        delete postTypMap[1002];
      }
      setAllowedPostType(postTypMap);
    }
  }, [metaData]);
  return (
    <>
      {metaData.length && (
        <MetaDataContext.Provider value={{ metaData, allowedPostType }}>
          {children}
        </MetaDataContext.Provider>
      )}
    </>
  );
}
