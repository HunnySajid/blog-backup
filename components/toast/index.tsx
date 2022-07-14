import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastComponent() {
  return <ToastContainer />;
}

export function showToast({
  message = '',
  type = 'success',
  pauseOnHover = false,
  pauseOnFocusLoss = false,
}) {
  toast(message, {
    type,
    pauseOnHover,
    pauseOnFocusLoss,
  });
}
