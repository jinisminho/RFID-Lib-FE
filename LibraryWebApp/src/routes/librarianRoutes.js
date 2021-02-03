/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import CheckoutInf from "views/Librarian/BorrowingInfo";
import Book from "views/Book/index.js";
import BookCopy from "views/BookCopy/index.js";
import Checkout from "views/Checkout/index.js";
import ReturnBook from "views/ReturnBook/index.js";
import BookDetail from "views/Book/BookDetail";

var routes = [
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Index,
  //   layout: "/librarian"
  // },
  {
    path: "/index",
    name: "Books",
    icon: "ni ni-book-bookmark text-primary",
    component: Book,
    layout: "/librarian",
    invisible:true
  },
  {
    path: "/book/detail",
    name: "Book Detail",
    icon: "ni ni-book-bookmark text-primary",
    component: BookDetail,
    layout: "/librarian",
    invisible: true
  },
  {
    path: "/book",
    name: "Books",
    icon: "ni ni-book-bookmark text-primary",
    component: Book,
    layout: "/librarian"
  },
  {
    path: "/copy",
    name: "Copy of book",
    icon: "ni ni-books text-primary",
    component: BookCopy,
    layout: "/librarian"
  },
  {
    path: "/checkout",
    name: "Check out books",
    icon: "fas fa-shopping-cart text-primary",
    component: Checkout,
    layout: "/librarian"
  },
  {
    path: "/return",
    name: "Return books",
    icon: "fas fa-shopping-cart text-primary",
    component: ReturnBook,
    layout: "/librarian"
  },
  {
    path: "/renting",
    name: "Checkout Information",
    icon: "ni ni-bullet-list-67 text-red",
    component: CheckoutInf,
    layout: "/librarian"
  },
];
export default routes;