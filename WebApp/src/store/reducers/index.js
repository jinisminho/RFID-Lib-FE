import { reducer as formReducer } from 'redux-form'
import Auth from './Auth';
import guest from './guest'; 
export default {
  Auth,
  guest,
  form: formReducer,
};