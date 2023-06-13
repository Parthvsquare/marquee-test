import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="h-[calc(100vh_-_64px)] overflow-scroll">
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default HomeLayout;
