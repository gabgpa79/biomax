import { alertConstants } from '../constants';

export const alertActions = {
    success
};

function success() {
    return { 
      type: alertConstants.SUCCESS,
      message: 'You have been logged in!',      
      duration: 2000,
      canDismiss: true,
      icon: <i className="fa fa-check" />
    };
}
