// redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authSlice";

// interfaces
import IReduxStates from "../interfaces/reduxStates";

// components
import { Button } from "../components/forms";

const Home = () => {
  // redux
  const dispatch = useDispatch();
  const auth = useSelector((state: IReduxStates) => state.auth);

  // functions
  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
    console.log("dispatch called");
  };

  return (
    <div>
      <p>{auth.user.username}</p>
      <Button
        variant={"primary"}
        type={"button"}
        disabled={false}
        label={"Log out"}
        handleClick={handleLogout}
      ></Button>
    </div>
  );
};

export default Home;
