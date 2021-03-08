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
import CheckoutInf from "views/Librarian/BorrowingInfo";
import Book from "views/Book/index.js";
import BookCopy from "views/BookCopy/index.js";
import Checkout from "views/Checkout/index.js";
import ReturnBook from "views/ReturnBook/index.js";
import BookDetail from "views/Book/BookDetail";
import Policy from "views/Librarian/Policy";
import Student from "views/Librarian/Student";
import CopyDetail from "views/BookCopy/BookCopyDetail";
import BookLost from "views/BookLost/index.js";
import Profile from "views/Student/Profile.js"
import ChangePassword from "views/ChangePassword/index";

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
    path: "/copyDetail",
    name: "Copy Detail",
    icon: "ni ni-book-bookmark text-primary",
    component: CopyDetail,
    layout: "/librarian",
    invisible: true
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
    path: "/checkoutInfo",
    name: "Checkout Information",
    icon: "ni ni-bullet-list-67 text-red",
    component: CheckoutInf,
    layout: "/librarian"
  },
  {
    path: "/student",
    name: "Patron Management",
    icon: "fa fa-book-reader text-red",
    component: Student,
    layout: "/librarian"
  },
  {
    path: "/policy",
    name: "Policy",
    icon: "ni ni-bullet-list-67 text-red",
    component: Policy,
    layout: "/librarian"
  },
  {
    path: "/lost",
    name: "Book Lost Report",
    icon: "ni ni-bullet-list-67 text-red",
    component: BookLost,
    layout: "/librarian"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/librarian",
    invisible: true
  },
  {
    path: "/changepw",
    name: "Change Password",
    icon: "fa fa-book-reader text-red",
    component: ChangePassword,
    layout: "/admin",
    invisible: true
  }
];
export default routes;