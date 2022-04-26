import { api } from "./AxiosApiService";
const LoginService = {
  authenticate: (username, password) => {
    console.log(username);

    return api.post(
      "/api/login",
      new URLSearchParams({
        username: username,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  },
};

export default LoginService;
