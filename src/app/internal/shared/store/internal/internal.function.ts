import {
  InternalSignalStoreModel,
  Sidebar,
  Status,
  Task,
} from '../../interfaces/internal.interface';

/**
 * @description
 * sidebarをsignalStoreに追加する。
 * @param state
 * @param sidebar
 */
export const loadedSidebarData = (
  state: InternalSignalStoreModel,
  sidebar: Sidebar,
): InternalSignalStoreModel => {
  const clickSidebar =
    state.common.clickSidebar !== '' ? state.common.clickSidebar : sidebar.name;
  return {
    ...state,
    common: {
      ...state.common,
      clickSidebar,
    },
    data: {
      ...state.data,
      [sidebar.name]: {
        tasks: {
          todo: [],
          progress: [],
          completed: [],
        },
      },
    },
  };
};

/**
 * @description
 * signalStateとtaskを受け取り、status配列にtaskを追加する。
 * @param state
 * @param task
 */
export const loadedTaskData = (
  state: InternalSignalStoreModel,
  task: Task,
): InternalSignalStoreModel => {
  const tasks: Task[] = [
    ...state.data[task.sidebar].tasks[task.status as Status],
    task,
  ];
  return {
    ...state,
    data: {
      ...state.data,
      [task.sidebar]: {
        ...state.data[task.sidebar],
        tasks: {
          ...state.data[task.sidebar].tasks,
          [task.status]: tasks,
        },
      },
    },
  };
};
