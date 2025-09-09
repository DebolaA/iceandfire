import { createAction, props } from '@ngrx/store';
import { IUser } from '../../model/ice.interface';

export const register = createAction('[Auth] Register', props<IUser>());
