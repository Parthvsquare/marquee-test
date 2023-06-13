import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="mx-auto h-[calc(100vh_-_64px)] max-w-6xl overflow-scroll">
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default HomeLayout;
