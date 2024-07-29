import { Group, sampleTasks, Task } from '../../data/task.data';
import { patchState, signalStore, withState } from '@ngrx/signals';
import {
  payload,
  withDevtools,
  withRedux,
} from '@angular-architects/ngrx-toolkit';
import { of, switchMap } from 'rxjs';
import { SidebarLabelType } from '../../data/sidebar.data';

export type ProjectSignalStoreModel = {
  [key in SidebarLabelType]: {
    [key in Group]: Task[];
  };
};

export interface MainSignalStoreModel {
  common: {
    isLoading: boolean;
  };
  data: ProjectSignalStoreModel;
}

export const initialState: MainSignalStoreModel = {
  common: {
    isLoading: false,
  },
  data: {
    dashboard: {
      TODO: [],
      PROGRESS: [],
      COMPLETED: [],
    },
    travelLog: {
      TODO: [],
      PROGRESS: [],
      COMPLETED: [],
    },
  },
};

export const MainSignalStore = signalStore(
  withDevtools('[main signal store]'),
  withState(initialState),
  withRedux({
    actions: {
      taskDataLoad: payload(),
      taskDataLoadSuccess: payload<{ response: Task[] }>(),
      taskDataLoadFailure: payload(),

      taskDataUpdate: payload<{
        sidebarLabel: SidebarLabelType;
        group: Group;
        idx: number;
        progress: string;
      }>(),
      taskDataUpdateSuccess: payload(),
      taskDataUpdateFailure: payload(),

      taskAdd: payload(),
      taskAddSuccess: payload(),
      taskAddFailure: payload(),
    },
    reducer(actions, on) {
      on(actions.taskDataLoad, (signalStore) =>
        patchState(signalStore, { common: { isLoading: true } }),
      );
      on(actions.taskDataLoadSuccess, (signalStore, { response }) => {
        //ここでGroupTypeで分ける。
        const data: ProjectSignalStoreModel = {
          dashboard: {
            TODO: [],
            PROGRESS: [],
            COMPLETED: [],
          },
          travelLog: {
            TODO: [],
            PROGRESS: [],
            COMPLETED: [],
          },
        };
        response.map((dt) => data[dt.sidebarLabel][dt.group].push(dt));
        //todo この辺でtimelineの日付の昇順したいなぁ
        patchState(signalStore, { common: { isLoading: false }, data: data });
      });
      on(
        actions.taskDataUpdate,
        (signalStore, { sidebarLabel, group, idx, progress }): void => {
          patchState(signalStore, (signalState): MainSignalStoreModel => {
            const tasks: Task[] = signalState.data[sidebarLabel][group];
            tasks.map((data: Task, index: number): void => {
              if (index === idx) {
                data.progress = progress;
              }
            });
            return {
              ...signalState,
              data: {
                ...signalState.data,
                [sidebarLabel]: {
                  ...signalState.data[sidebarLabel],
                  [group]: tasks,
                },
              },
            };
          });
        },
      );
    },
    effects(actions, create) {
      return {
        load$: create(actions.taskDataLoad).pipe(
          switchMap(() => {
            //todo apiが完成次第ここに追記する。
            return of(actions.taskDataLoadSuccess({ response: sampleTasks }));
          }),
        ),
      };
    },
  }),
);
