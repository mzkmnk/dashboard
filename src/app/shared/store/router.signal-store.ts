import { signalStore, withState } from '@ngrx/signals';
import {
  payload,
  withDevtools,
  withRedux,
} from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

export type routePath = 'auth/auth' | 'internal/home';

export interface routerSignalStoreModel {
  path: routePath;
}

export const initialState: routerSignalStoreModel = {
  path: 'auth/auth',
};

export const RouterSignalStore = signalStore(
  { providedIn: 'root' },
  withDevtools('[router signal store]'),
  withState(initialState),
  withRedux({
    actions: {
      navigate: payload<{ path: routePath }>(),
      navigateSuccess: payload(),
      navigateFailure: payload(),
    },
    reducer() {},
    effects(actions, create) {
      const router = inject(Router);
      return {
        navigate$: create(actions.navigate).pipe(
          switchMap(({ path }) => {
            router.navigate([path]);
            return of(actions.navigateSuccess());
          }),
        ),
      };
    },
  }),
);
