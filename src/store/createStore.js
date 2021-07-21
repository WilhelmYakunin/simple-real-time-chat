import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginSlice from '../features/login/loginSlice.jsx';
import signupSlice from '../features/signup/signupSlice.jsx';
import channelsSlice from '../features/channels/channelsSlice.jsx';
import modalSlice from '../features/modals/modalSlice.jsx';
import dropdownInfoSlice from '../features/channels/dropdownSlice.jsx';
import messagesInfoSlice from '../features/messages/messagesSlice.jsx';

const rootReducer = combineReducers({
  login: loginSlice,
  signup: signupSlice,
  channelsData: channelsSlice,
  messagesData: messagesInfoSlice,
  dropdown: dropdownInfoSlice,
  modal: modalSlice,
});

export default (preloadedState) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  return store;
};