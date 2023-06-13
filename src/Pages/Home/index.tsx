import { useState } from "react";
import { useStore } from "@/Store";
import { Todo } from "@/types/custom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const {
    state: { tasks },
    dispatch,
  } = useStore();

  const [opened, setOpened] = useState<number[]>();

  // useEffect(() => {
  //   if (InitialTasks)
  //     dispatch({
  //       type: "SET_TODOs",
  //       payload: InitialTasks,
  //     });
  // }, [InitialTasks]);

  const accordionOpen = ({ taskId }: { taskId: number }) => {
    console.log("===> ~ file: index.tsx:23 ~ accordionOpen ~ taskId:", taskId);
    const expandedAccordion = structuredClone(opened);
    if (expandedAccordion && expandedAccordion?.includes(taskId)) {
      const index = expandedAccordion?.indexOf(taskId);
      if (index > -1) {
        // only splice array when item is found
        expandedAccordion.splice(index, 1); // 2nd parameter means remove one item only
      }
      setOpened([...expandedAccordion]);
    } else if (expandedAccordion) {
      expandedAccordion.push(taskId);
      setOpened([...expandedAccordion]);
    } else {
      setOpened([taskId]);
    }
  };

  const doneWithTask = ({
    taskId,
    checked,
  }: {
    taskId: number;
    checked: boolean;
  }) => {
    dispatch({
      type: "TICK_TASK",
      payload: { taskId, checked },
    });
  };

  const doneWithSubTask = ({
    taskId,
    subtaskId,
    checked,
  }: {
    taskId: number;
    subtaskId: number;
    checked: boolean;
  }) => {
    dispatch({
      type: "TICK_SUBTASK",
      payload: { taskId, subtaskId, checked },
    });
  };
  return (
    <div className="px-10">
      <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
        My Todo's
      </span>

      <div
        id="accordion-flush"
        data-accordion="collapse"
        data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        data-inactive-classes="text-gray-500 dark:text-gray-400"
      >
        {tasks &&
          tasks.map((items: Todo, index: any) => {
            const todos = items as Todo;
            const accordionShouldOpen = opened?.includes(todos.id);
            return (
              <React.Fragment key={todos.id}>
                <h2 id="accordion-flush-heading-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-start gap-2 border-b border-gray-200 py-5 text-left font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
                    data-accordion-target="#accordion-flush-body-1"
                    aria-expanded="true"
                    aria-controls="accordion-flush-body-1"
                  >
                    <svg
                      data-accordion-icon
                      className={`h-6 w-6 shrink-0 ${
                        accordionShouldOpen && "rotate-180"
                      }`}
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => accordionOpen({ taskId: todos.id })}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>

                    <span
                      id={todos.id.toString()}
                      className={` flex h-7 w-7 cursor-pointer items-center
                      justify-center rounded-full border border-white ${
                        todos.completed ? "bg-green-700" : "bg-white"
                      } transition-all
                      hover:border-[#36d344]`}
                      onClick={() =>
                        doneWithTask({
                          checked: !todos.completed,
                          taskId: todos.id,
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} className="text-white" />
                    </span>

                    <span>{todos.title}</span>
                  </button>
                </h2>

                {accordionShouldOpen &&
                  todos.subtasks &&
                  todos.subtasks.map((subtask) => {
                    return (
                      <div
                        id="accordion-flush-body-1"
                        className=""
                        aria-labelledby="accordion-flush-heading-1"
                      >
                        <div className="flex gap-2 border-b border-gray-200 py-5 pl-8 dark:border-gray-700">
                          <span
                            id={todos.id.toString()}
                            className={` flex h-7 w-7 cursor-pointer items-center
                            justify-center rounded-full border border-white ${
                              subtask.completed ? "bg-green-700" : "bg-white"
                            } transition-all
                            hover:border-[#36d344]`}
                            onClick={() =>
                              doneWithSubTask({
                                subtaskId: subtask.id,
                                checked: !subtask.completed,
                                taskId: todos.id,
                              })
                            }
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              className=" text-white"
                            />
                          </span>
                          <p className="mb-2 text-gray-500 dark:text-gray-400">
                            {subtask.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
