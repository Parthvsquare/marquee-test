import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        overflow: "scroll",
      }}
      className="h-full"
    >
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default HomeLayout;
