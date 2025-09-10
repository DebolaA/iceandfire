import { ICurrentUser } from './../../model/ice.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { AuthActions } from '../types/action-types';

const initialAuthState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,
    on(AuthActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(AuthActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: null,
      currentUser: action.currentUser,
    })),
    on(AuthActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.error,
      currentUser: null,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectValidationErrors,
  selectCurrentUser,
} = authFeature;
