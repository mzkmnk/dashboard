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
        index: number;
        progress: string;
      }>(),
      taskDataUpdateSuccess: payload(),
      taskDataUpdateFailure: payload(),
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
        patchState(signalStore, { common: { isLoading: false }, data: data });
      });
      on(
        actions.taskDataUpdate,
        (signalStore, { sidebarLabel, group, index, progress }): void => {
          patchState(signalStore, (signalState): MainSignalStoreModel => {
            const task: Task = signalState.data[sidebarLabel][group][index];
            // todo これって実は参照渡し??
            task.progress = progress;
            return {
              ...signalState,
              data: {
                ...signalState.data,
                [sidebarLabel]: {
                  ...signalState.data[sidebarLabel],
                  [group]: [...signalState.data[sidebarLabel][group]],
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
