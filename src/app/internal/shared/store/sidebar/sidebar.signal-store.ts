import { patchState, signalStore, withState } from '@ngrx/signals';
import {
  payload,
  withDevtools,
  withRedux,
} from '@angular-architects/ngrx-toolkit';
import { SidebarLabelType } from '../../../data/sidebar.data';

export interface SidebarSignalStoreModel {
  common: {
    isLoading: boolean;
  };
  project: {
    label: SidebarLabelType;
  };
}

export const initialState: SidebarSignalStoreModel = {
  common: {
    isLoading: false,
  },
  project: {
    label: 'travelLog',
  },
};

export const sidebarSignalStore = signalStore(
  { providedIn: 'root' },
  withDevtools('[sidebar signal store]'),
  withState(initialState),
  withRedux({
    actions: {
      onClickSidebar: payload<{ label: SidebarLabelType }>(),
      onClickSidebarSuccess: payload(),
      onClickSidebarFailure: payload(),
    },
    reducer(actions, on) {
      on(actions.onClickSidebar, (signalState, { label }) =>
        patchState(signalState, { project: { label } }),
      );
    },
    effects() {
      return {};
    },
  }),
);
