import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRoutes, Navigate } from "react-router";

// interfaces
import IReduxStates from "./interfaces/reduxStates";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

const AuthRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Navigate to="/" replace />,
    },
    {
      path: "/404",
      element: <PageNotFound />,
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

const UnAuthRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/404",
      element: <PageNotFound />,
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

const Auth = () => {
  //redux - states
  const auth = useSelector((state: IReduxStates) => state.auth);

  // states
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (!auth.user.username) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }

    return () => {
      setIsAuth(false);
    };
  }, [auth.user.username]);

  return isAuth ? <AuthRoutes /> : <UnAuthRoutes />;
};

export default Auth;
