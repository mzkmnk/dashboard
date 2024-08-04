import { computed, inject } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { concatMap, EMPTY, pipe, switchMap, tap } from 'rxjs';

import { InternalAPI } from '../../../../api/internal/internal.api';
import {
  InternalSignalStoreModel,
  SidebarModel,
} from '../../interfaces/internal.interface';
import { loadedSidebarData, loadedTaskData } from './internal.function';

export const initialState: InternalSignalStoreModel = {
  common: {
    clickSidebar: '',
    isLoading: false,
  },
  data: {},
};

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
     * サイドバー、タスクの取得を行う。
     */
    dataLoad: rxMethod(
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
              patchState(signalStore, (signalState) =>
                loadedSidebarData(signalState, sidebar),
              );
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
            response.tasks.map((task) =>
              patchState(signalStore, (signalState) =>
                loadedTaskData(signalState, task),
              ),
            );
          },
          error: () => EMPTY,
        }),
        tap(() =>
          patchState(signalStore, (signalState) => ({
            ...signalState,
            common: { ...signalState.common, isLoading: false },
          })),
        ),
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
