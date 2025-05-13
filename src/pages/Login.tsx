import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../contexts/UserAuthContext";

const Login = () => {
  const { login } = useAuthServiceContext();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        await login(username, password);
        navigate("/testlogin");
      } catch (err) {
        console.error("Login failed:", err);
        // Add UI error feedback here
      }
    },
  });

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
        ></input>
        <label>Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
