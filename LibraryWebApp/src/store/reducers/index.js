import { reducer as formReducer } from 'redux-form'
import Auth from './Auth';
import guest from './guest'; 
import book from './Librarian/Book'; 
import copy from './Librarian/BookCopy'; 
import checkout from './Librarian/Checkout'; 
import info from './Student/info';
import infoLside from './Librarian/info'; 
import returnBook from './Librarian/ReturnBook';
import staff from './Admin/Staff';
import student from './Admin/Student';
import requestNewBook from './Student/requestNewBook';
import bookStu from './Student/book'
import policy from './Librarian/Policy'
import lost from './Librarian/BookLost'
import types from './Common/Types'
import logs from './Admin/Log'
import lostBook from './Common/LostBook'
import position from './Common/Position'
import search from './searchBook'

export default {
  Auth,
  guest,
  book,
  copy,
  checkout,
  returnBook,
  info,
  infoLside,
  staff,
  requestNewBook,
  bookStu,
  student,
  policy,
  lost,
  types,
  logs,
  lostBook,
  position,
  search,
  form: formReducer,
};