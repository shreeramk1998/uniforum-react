import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../service/LoginService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userjwt");
    localStorage.removeItem("user");
  });

  const performLogin = (e) => {
    e.preventDefault();

    LoginService.authenticate(username, password)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userjwt", res.headers.authorization);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
      })
      .catch((err) => {
        toast.error("Login failed ! Retry", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-12 col-xl-10">
          <div className="card shadow-lg o-hidden border-0 my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-flex">
                  <div
                    className="flex-grow-1 bg-login-image"
                    style={{
                      background:
                        'url("assets/img/fergusson.png") center / contain no-repeat',
                    }}
                  ></div>
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h4 className="text-dark mb-2">UNIFORUM</h4>
                      <h5 className="mb-4">Login</h5>
                    </div>
                    <form className="user" onSubmit={(e) => performLogin(e)}>
                      <div className="mb-3">
                        <input
                          className="form-control form-control-user"
                          type="text"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Username"
                          name="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control form-control-user"
                          type="password"
                          id="exampleInputPassword"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                      </div>
                      {/* <div className="mb-3">
                        <div className="custom-control custom-checkbox small">
                          <div className="form-check">
                            <input
                              className="form-check-input custom-control-input"
                              type="checkbox"
                              id="formCheck-1"
                            ></input>
                            <label
                              className="form-check-label custom-control-label"
                              htmlFor="formCheck-1"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                      </div> */}
                      <button
                        className="btn btn-primary d-block btn-user w-100"
                        type="submit"
                      >
                        Login
                      </button>
                      {/* <hr></hr> */}
                    </form>
                    {/* <div className="text-center">
                      <a className="small">Forgot Password?</a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
