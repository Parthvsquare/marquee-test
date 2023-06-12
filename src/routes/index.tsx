import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useStore } from "@/Store";
import Task from "@/Pages/Task";
const Layout = lazy(() => import("@/Components/Layout"));
const AppHeader = lazy(() => import("@/Components/AppHeader"));
const AuthPage = lazy(() => import("@/Pages/Auth"));
const NotFound = lazy(() => import("@/Pages/NotFound"));
const HomeLayout = lazy(() => import("@/Components/HomeLayout"));
const Home = lazy(() => import("@/Pages/Home"));

const AppRouter = () => {
  const {
    state: { loggedIn },
  } = useStore();

  return (
    <Layout>
      <AppHeader />
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <HomeLayout /> : <Navigate to="login" />}
        >
          <Route index element={<Home />} />
          <Route path="/task/:taskName" element={<Task />} />
        </Route>
        <Route
          path="/"
          element={!loggedIn ? <AuthPage /> : <Navigate to="/" />}
        >
          <Route path="login" element={<AuthPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Route>
        <Route
          path="/*"
          element={loggedIn ? <NotFound /> : <Navigate to="/login" />}
        />
      </Routes>
    </Layout>
  );
};

export default AppRouter;
