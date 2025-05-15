import { useLocation, useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleSave = () => {
    // ...save logic
    navigate(from);
  };

  return (
    // ...your edit form
    <button onClick={handleSave}>Save</button>
  );
};

export default EditProfilePage;
