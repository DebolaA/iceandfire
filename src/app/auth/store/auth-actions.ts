import { createAction, props, emptyProps } from '@ngrx/store';
import { IRegisterRequest } from '../types/registerRequest.interface';
import { ICurrentUser } from '../../model/ice.interface';
import { IBackendError } from '../../model/backendErrors.interface';

export const register = createAction(
  '[Auth] Register',
  props<{ request: IRegisterRequest }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ currentUser: ICurrentUser }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: IBackendError }>()
);
