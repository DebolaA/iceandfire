import { IBackendError } from '../../model/backendErrors.interface';
import { ICurrentUser } from '../../model/ice.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: ICurrentUser | undefined | null;
  isLoading: boolean;
  validationErrors: IBackendError | null;
}
