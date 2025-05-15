import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserAuth } from "../hooks/useUserAuth";

const Login: React.FC = () => {
  const { login, isAuthenticated, loading } = useUserAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await login(values.username, values.password);
        navigate("/");
      } catch (err) {
        console.error("Login failed:", err);
        setErrors({ password: "Invalid credentials" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Now it’s safe to conditionally return:
  if (!loading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Login</h1>
      {loading && <p>Checking authentication…</p>}
      {!loading && (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && <div>{formik.errors.username}</div>}

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && <div>{formik.errors.password}</div>}

          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Logging in…" : "Login"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
