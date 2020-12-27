import { reducer as formReducer } from 'redux-form'
import Auth from './Auth';
import guest from './guest'; 
import book from './Admin/Book'; 
import info from './Student/info';
import infoLside from './Librarian/info'; 
export default {
  Auth,
  guest,
  book,
  info,
  infoLside,
  form: formReducer,
};