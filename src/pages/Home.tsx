// redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authSlice";

// interfaces
import IReduxStates from "../interfaces/reduxStates";

// components
import { Button } from "../components/forms";
import { PlayerList, TeamList } from "../components/elements";

const Home = () => {
  // redux
  const dispatch = useDispatch();
  const auth = useSelector((state: IReduxStates) => state.auth);

  // functions
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div>
        {/* navigation */}
        <div className="w-screen border border-b px-12 py-1 flex items-center justify-between">
          <p className="text-md text-dark font-bold">
            {auth.user.username}'s Board
          </p>
          <div className="flex items-center justify-center">
            <Button
              variant={"bordered"}
              type={"button"}
              disabled={false}
              label={"Log out"}
              handleClick={handleLogout}
            ></Button>
          </div>
        </div>

        <div className="p-12 grid grid-cols-2 gap-8">
          <PlayerList />
          <TeamList />
        </div>
      </div>
    </>
  );
};

export default Home;
