import { reducer as formReducer } from 'redux-form'
import Auth from './Auth';
import guest from './guest'; 
import book from './Admin/Book'; 
import copy from './Admin/BookCopy'; 
import checkout from './Admin/Checkout'; 
export default {
  Auth,
  guest,
  book,
  copy,
  checkout,
  form: formReducer,
};