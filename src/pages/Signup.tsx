import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: () => {},
  });

  return (
    <div>
      <h1>Signup</h1>
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
