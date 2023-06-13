import { useState } from "react";
import { useStore } from "@/Store";
import { Subtask, Todo } from "@/types/custom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleMinus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const {
    state: { tasks },
    dispatch,
  } = useStore();

  const [opened, setOpened] = useState<number[]>();

  const accordionOpen = ({ taskId }: { taskId: number }) => {
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

  const removeTask = ({ taskId }: { taskId: number }) => {
    dispatch({
      type: "REMOVE_TASK",
      payload: taskId,
    });
  };

  const removeSubTask = ({
    taskId,
    subtaskId,
  }: {
    taskId: number;
    subtaskId: number;
  }) => {
    dispatch({
      type: "REMOVE_SUBTASK",
      payload: { taskId, subtaskId },
    });
  };

  const createTask = ({
    title,
    description,
    event,
  }: {
    title: string;
    description: string;
    event: React.KeyboardEvent<HTMLInputElement>;
  }) => {
    if (event.key === "Enter") {
      const lastIndex = tasks.length + 1;
      dispatch({
        type: "CREATE_TASK",
        payload: { id: lastIndex, title, description, completed: false },
      });
    }
  };

  const createSubTask = ({
    taskIndex,
    title,
    event,
  }: {
    taskIndex: number;
    title: string;
    event: React.KeyboardEvent<HTMLInputElement>;
  }) => {
    if (event.key === "Enter") {
      const taskId = tasks[taskIndex].id;
      const lastIndex = tasks[taskIndex].subtask
        ? tasks[taskIndex].subtask.length + 1
        : 0;
      const inputSubtask: Subtask = {
        completed: false,
        id: lastIndex,
        title,
      };
      dispatch({
        type: "CREATE_SUBTASK",
        payload: { taskId, subtask: inputSubtask },
      });
    }
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
        <div className="mx-8 py-5">
          <input
            type="text"
            id="large-input"
            placeholder="Add New Todo"
            onKeyDown={(e) =>
              createTask({ description: "test", event: e, title: "title 1" })
            }
            className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
        {tasks &&
          tasks.map((items: Todo, index: number) => {
            const todos = items as Todo;
            const accordionShouldOpen = opened?.includes(todos.id);
            return (
              <React.Fragment key={todos.id}>
                <h2
                  id="accordion-flush-heading-1"
                  className="flex items-center border-b border-gray-200"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-start gap-2
                     py-5 text-left font-medium
                    text-gray-500 dark:border-gray-700 dark:text-gray-400"
                    aria-controls="accordion-flush-body-1"
                  >
                    <svg
                      data-accordion-icon
                      className={`h-6 w-6 shrink-0 ${
                        accordionShouldOpen && "rotate-180"
                      }  transition-all ${
                        !todos.subtasks?.length && "fill-slate-400"
                      }`}
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => accordionOpen({ taskId: todos.id })}
                    >
                      <path
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

                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="pr-2 text-xl text-red-700"
                    onClick={() => removeTask({ taskId: todos.id })}
                  />
                </h2>

                {accordionShouldOpen && (
                  <>
                    <div className="mx-8 py-5">
                      <input
                        type="text"
                        onKeyDown={(e) =>
                          createSubTask({
                            title: "subtask 1",
                            taskIndex: index,
                            event: e,
                          })
                        }
                        placeholder={`+ Add Subtask for ${todos.title}`}
                        className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      />
                    </div>
                    {todos.subtasks &&
                      todos.subtasks.map((subtask) => {
                        return (
                          <div
                            key={todos.id + subtask.id}
                            id="accordion-flush-body-1"
                            className="mx-8 flex items-center justify-between border-b border-gray-200"
                          >
                            <div className="flex gap-2  py-5  dark:border-gray-700">
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

                            <FontAwesomeIcon
                              icon={faCircleMinus}
                              className="pr-2 text-xl text-red-700"
                              onClick={() =>
                                removeSubTask({
                                  subtaskId: subtask.id,
                                  taskId: todos.id,
                                })
                              }
                            />
                          </div>
                        );
                      })}
                  </>
                )}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
