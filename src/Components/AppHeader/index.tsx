import { useStore } from "@/Store";
import { useEffect, useRef, useState } from "react";

function AppHeader() {
  const {
    state: { loggedIn, userName },
  } = useStore();

  const [dropdown, setDropdown] = useState(true);
  const dropDownRef = useRef(null);

  const openDropdown = () => {
    loggedIn && setDropdown(!dropdown);
  };

  const handleOutsideClick = (e: any) => {
    if (
      dropDownRef?.current &&
      //@ts-expect-error ref has some issue
      !dropDownRef?.current?.contains(e.target)
    ) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdown]);

  return (
    <div className="flex h-16 justify-between px-10 py-5">
      <div className="font-xl relative">{loggedIn ? userName : "Hello"}</div>

      <button
        data-dropdown-toggle="dropdown"
        id="dropdownDefaultButton"
        type="button"
        onClick={openDropdown}
        className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600"
        ref={dropDownRef}
      >
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {loggedIn ? "PV" : "0"}
        </span>
      </button>

      <div
        id="dropdown"
        className={`absolute right-4 top-[70px] z-10 ${
          dropdown ? "content" : "hidden"
        } w-auto divide-y divide-gray-100 rounded-lg bg-white px-2 shadow dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li className="flex justify-center">
            <button
              type="button"
              className="mb-2  rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
            >
              Sign Out
            </button>
          </li>
          <li>
            <button
              disabled={true}
              className="block px-4 py-2  dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Version: 0.0.1
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AppHeader;
