import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import jwtAxios from "../api/jwtinterceptor";

const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await jwtAxios.post("/api/register/", values); // Adjust endpoint as needed
        navigate("/login");
      } catch (err) {
        console.error("Signup failed:", err);
      }
    },
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
        />
        <label>Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
