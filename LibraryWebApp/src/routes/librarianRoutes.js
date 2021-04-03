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
import Misplace from "views/Librarian/Misplace/index.js";
import SearchBook from "views/SearchBook/index.js";
import InProcess from "views/BookCopy/inProcess.js";

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
    name: "Other copies",
    icon: "ni ni-books text-primary",
    component: BookCopy,
    layout: "/librarian",
    invisible: true
  },
  {
    path: "/inprocess",
    name: "In Process",
    icon: "ni ni-books text-primary",
    component: InProcess,
    layout: "/librarian",
    invisible: true
  },
  {
    isMultiLevel: true,
    groupName: "Book copies",
    groupId: "bookCopies",
    paths: ["/inprocess", "/copy"],
    names: ["In process", "Other"],
    layout: "/librarian",
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
    name: "Checkout information",
    icon: "ni ni-bullet-list-67 text-red",
    component: CheckoutInf,
    layout: "/librarian"
  },
  {
    path: "/searchbook",
    name: "Search book",
    icon: "ni ni-book-bookmark text-primary",
    component: SearchBook,
    layout: "/librarian"
  },
  {
    path: "/misplace",
    name: "Check misplaced books",
    icon: "ni ni-bullet-list-67 text-red",
    component: Misplace,
    layout: "/librarian"
  },
  {
    path: "/student",
    name: "Patron management",
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
    name: "Book lost report",
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
    layout: "/librarian",
    invisible: true
  }
];
export default routes;