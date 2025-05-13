import { useAuthServiceContext } from "../contexts/UserAuthContext";

const TestLogin = () => {
  const { isAuthenticated, logout } = useAuthServiceContext();
  return (
    <>
      {isAuthenticated.toString()}
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default TestLogin;
