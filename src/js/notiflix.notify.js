import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const notifySuccess = successMessage => {
  Notify.success(successMessage, {
    timeout: 4000,
    width: '400px',
    borderRadius: '0px',
    clickToClose: true,
    position: 'right-top',
    fontSize: '14px',
  });
};

export const notifyFailure = errorMessage => {
  Notify.failure(errorMessage, {
    timeout: 4000,
    width: '400px',
    borderRadius: '0px',
    clickToClose: true,
    position: 'right-top',
    fontSize: '14px',
  });
};
