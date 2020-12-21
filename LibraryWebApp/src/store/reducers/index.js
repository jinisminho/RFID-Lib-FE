import { reducer as formReducer } from 'redux-form'
import Auth from './Auth';
import guest from './guest'; 
import book from './Admin/Book'; 
export default {
  Auth,
  guest,
  book,
  form: formReducer,
};