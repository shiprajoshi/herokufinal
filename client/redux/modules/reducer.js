import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';

import { reducer as form } from 'redux-form';

export default combineReducers({
  router: routerStateReducer,
  form,
  // multireducer: multireducer({
  //   counter1: counter,
  //   counter2: counter,
  //   counter3: counter
  // })
});
