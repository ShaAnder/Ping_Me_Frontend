import { useState } from "react";
import { useAuthServiceContext } from "../contexts/UserAuthContext";
import jwtAxios from "../api/jwtinterceptor";

const TestLogin = () => {
  const { isAuthenticated, logout } = useAuthServiceContext();
  const [userName, setUserName] = useState("");

  const getUserDetails = async () => {
    try {
      const response = await jwtAxios.get(`/api/account/?user=1`);
      setUserName(response.data.username);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isAuthenticated.toString()}
      <div>
        <button onClick={logout}>Logout</button>
        <button onClick={getUserDetails}>Get User Details</button>
      </div>
      <div>Username: {userName}</div>
    </>
  );
};

export default TestLogin;
