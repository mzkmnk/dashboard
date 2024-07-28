import { patchState, signalStore, withState } from '@ngrx/signals';
import {
  payload,
  withDevtools,
  withRedux,
} from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { AuthAPI } from '../../api/auth/auth.api';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { RouterSignalStore } from '../../shared/store/router.signal-store';

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  code: string;
}

export interface SignUpRequest {
  username: string;
  password: string;
}

export interface SignUpResponse {
  code: string;
}

export interface AuthSignalStoreModel {
  signIn: SignInRequest & { isLoading: boolean };
  signUp: SignUpRequest & { isLoading: boolean };
}

export const initialState: AuthSignalStoreModel = {
  signIn: {
    username: '',
    password: '',
    isLoading: false,
  },
  signUp: {
    username: '',
    password: '',
    isLoading: false,
  },
};

export const AuthSignalStore = signalStore(
  withDevtools('[auth signal store]'),
  withState(initialState),
  withRedux({
    actions: {
      signInRequest: payload<{ request: SignInRequest }>(),
      signInRequestSuccess: payload(),
      signInRequestFailure: payload(),

      signUpRequest: payload<{ request: SignInRequest }>(),
      signUpRequestSuccess: payload(),
      signUpRequestFailure: payload(),
    },
    reducer(actions, on) {
      on(actions.signInRequest, (signalStore, { request }) =>
        patchState(signalStore, {
          signIn: { ...request, isLoading: true },
        }),
      );

      on(actions.signUpRequest, (signalStore, { request }) =>
        patchState(signalStore, {
          signUp: { ...request, isLoading: true },
        }),
      );
    },
    effects(actions, create) {
      const authAPI = inject(AuthAPI);
      const routerSignalStore = inject(RouterSignalStore);
      return {
        signIn$: create(actions.signInRequest).pipe(
          switchMap(({ request }) => {
            return authAPI.signIn(request).pipe(
              tapResponse({
                next: (response): void => {
                  routerSignalStore.navigate({ path: 'internal/home' });
                },
                error: (error): void => {
                  console.log(error);
                },
              }),
            );
          }),
        ),

        signUp$: create(actions.signUpRequest).pipe(
          switchMap(({ request }) => {
            return authAPI.signUp(request).pipe(
              tapResponse({
                next: (response): void => {
                  console.log(response);
                  routerSignalStore.navigate({ path: 'internal/home' });
                },
                error: (error): void => {
                  console.log(error);
                },
              }),
            );
          }),
        ),
      };
    },
  }),
);
