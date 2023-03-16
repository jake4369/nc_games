import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUsers } from "./../utils/api";

const Login = () => {
  const { setLoggedInUser } = useContext(UserContext);
  const [allUsers, setAllUser] = useState([]);
  const [username, setUsername] = useState("");
  const [notFound, setNotFound] = useState(false);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    getUsers().then((usersData) => {
      setAllUser(usersData);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = allUsers.find((obj) => obj.username === username);

    if (!user) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setLoggedInUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.replace(document.referrer);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-page__heading">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="username-input"
          id="username-input"
          placeholder="Username"
          onChange={handleChange}
          value={username}
        />
        {notFound && <label htmlFor="username-input">User not found</label>}

        <button className="login-form-btn">Log In</button>
      </form>
    </div>
  );
};

export default Login;
