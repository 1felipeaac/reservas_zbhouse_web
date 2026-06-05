import { toast } from 'react-toastify';
import { parseApiError } from './parseApiError';

export const handleApiError = (error: unknown) => {
  const messages = parseApiError(error);
  messages.forEach((msg) => toast.error(msg));
};

