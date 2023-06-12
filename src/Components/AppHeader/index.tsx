import { useStore } from "@/Store";

function AppHeader() {
  const {
    state: { loggedIn, userName },
  } = useStore();

  return (
    <div className="flex h-16 justify-between px-10 py-5">
      <div className="font-xl">{loggedIn ? userName : "Hello"}</div>
      <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {loggedIn ? "PV" : "0"}
        </span>
      </div>
    </div>
  );
}

export default AppHeader;
