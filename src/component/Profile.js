import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../service/AxiosApiService";

export default function Profile() {
  var userInfo = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("userjwt");
  const headers = {
    Authorization: token,
  };
  const [user, setUser] = React.useState(userInfo);

  React.useEffect(() => {
    userInfo = user;
  }, [user]);

  const saveUser = () => {
    let uri = "/api/user/signature";
    api
      .post(uri, user, { headers })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("updated signature!");
      })
      .catch((err) => {
        toast.error("Error occurred while saving the data");
      });
  };

  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col">
          <div className="card shadow mb-3">
            <div className="card-header py-3">
              <p className="text-dark m-0 fw-bold">User info</p>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => e.preventDefault}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">
                        <strong>Username</strong>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="username"
                        value={user.id}
                        name="username"
                        readOnly
                      ></input>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">
                        <strong>Email Address</strong>
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        value={user.emailId}
                        name="email"
                        readOnly
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">
                        <strong>First Name</strong>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="first_name"
                        value={user.firstName}
                        name="first_name"
                        readOnly
                      ></input>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">
                        <strong>Last Name</strong>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="last_name"
                        value={user.lastName}
                        name="last_name"
                        readOnly
                      ></input>
                    </div>
                  </div>
                </div>
                {/* <div className="mb-3">
                  <button className="btn btn-primary btn-sm" type="submit">
                    Save Settings
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow mb-5">
            <div className="card-header py-3">
              <p className="text-dark m-0 fw-bold">Forum Settings</p>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3">
                      <label className="form-label">
                        <strong>Signature</strong>
                        <br />
                      </label>
                      <textarea
                        className="form-control"
                        id="signature"
                        rows="4"
                        name="signature"
                        value={user.signature}
                        onChange={(e) =>
                          setUser({ ...user, signature: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="mb-3"></div>
                    <div className="mb-3">
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={saveUser}
                      >
                        Save Settings
                      </button>
                    </div>
                  </form>
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
