import { reducer as formReducer } from 'redux-form'
import Auth from './Auth';
import guest from './guest'; 
import book from './Librarian/Book'; 
import copy from './Librarian/BookCopy'; 
import checkout from './Librarian/Checkout'; 
import info from './Student/info';
import infoLside from './Librarian/info'; 
export default {
  Auth,
  guest,
  book,
  copy,
  checkout,
  info,
  infoLside,
  form: formReducer,
};