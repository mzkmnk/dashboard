import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { concatMap, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { Status } from '../../internal/data/task.data';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, inject } from '@angular/core';
import { InternalAPI, Task } from '../../api/internal/internal.api';
import { tapResponse } from '@ngrx/operators';

type ProjectSignal = {
  tasks: {
    [key in Status]: Task[];
  };
};

export type ProjectSignalStoreModel = {
  [key in string]: ProjectSignal;
};

export interface InternalSignalStoreModel {
  common: {
    isLoading: boolean;
    clickSidebar: string;
  };
  data: ProjectSignalStoreModel;
}

export const initialState: InternalSignalStoreModel = {
  common: {
    clickSidebar: '',
    isLoading: false,
  },
  data: {},
};

export interface SidebarModel {
  name: string;
  cnt: number;
}

export const InternalSignalStore = signalStore(
  { providedIn: 'root' },
  withDevtools('[main signal store]'),
  withState(initialState),
  /**
   * computed
   */
  withComputed(({ data }) => ({
    selectSidebars: computed((): SidebarModel[] => {
      const sidebars: SidebarModel[] = [];
      console.log('data', data());

      for (const key of Object.keys(data())) {
        const tasks = data()[key].tasks;
        sidebars.push({
          name: key,
          cnt:
            tasks.todo.length + tasks.progress.length + tasks.completed.length,
        });
      }
      return sidebars;
    }),
  })),
  /**
   * method
   */
  withMethods((signalStore, internalAPI = inject(InternalAPI)) => ({
    /**
     * @description
     * サイドバーの取得を行う。
     */
    sidebarDataLoad: rxMethod<{}>(
      pipe(
        tap(() =>
          patchState(signalStore, {
            common: { isLoading: true, clickSidebar: '' },
          }),
        ),
        switchMap(() => internalAPI.postGetSidebars()),
        tapResponse({
          next: (response) => {
            response.sidebarLabels.map((sidebar) => {
              patchState(signalStore, (signalState) => {
                const clickSidebar =
                  signalState.common.clickSidebar !== ''
                    ? signalState.common.clickSidebar
                    : sidebar.name;
                return {
                  ...signalState,
                  common: {
                    ...signalState.common,
                    clickSidebar,
                  },
                  data: {
                    ...signalState.data,
                    [sidebar.name]: {
                      tasks: {
                        todo: [],
                        progress: [],
                        completed: [],
                      },
                    },
                  },
                };
              });
            });
          },
          error: () => EMPTY,
        }),
        concatMap(() => signalStore.selectSidebars()),
        concatMap((sidebar) =>
          internalAPI.postGetTasks({ sidebarLabel: sidebar.name }),
        ),
        tapResponse({
          next: (response) => {
            response.tasks.map((task) => {
              //todo リファクタ必須 ちょっと何書いてるかわからん
              patchState(signalStore, (signalState) => {
                const tasks =
                  signalState.data[task.sidebar]['tasks'][
                    task.status as Status
                  ];
                tasks.push(task);
                return {
                  ...signalState,
                  data: {
                    ...signalState.data,
                    [task.sidebar]: {
                      ...signalState.data[task.sidebar],
                      tasks: {
                        ...signalState.data[task.sidebar].tasks,
                        [task.status]: tasks,
                      },
                    },
                  },
                };
              });
            });
          },
          error: () => EMPTY,
        }),
      ),
    ),
    /**
     * サイドバークリック時の変更
     */
    clickSidebar: rxMethod<{ sidebar: string }>(
      pipe(
        tap(({ sidebar }) =>
          patchState(signalStore, {
            common: { isLoading: false, clickSidebar: sidebar },
          }),
        ),
      ),
    ),
  })),
);
