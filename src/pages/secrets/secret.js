// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const Secret = () => {
const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  if (isError) {
    navigate("/", { replace: true });
  }
  return (
    <div>
      <h1>This is a Secret page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};