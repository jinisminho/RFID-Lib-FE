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
// import Student from "views/Librarian/Student";
import CopyDetail from "views/BookCopy/BookCopyDetail";
import BookLost from "views/BookLost/index.js";
import Profile from "views/Student/Profile.js"
import ChangePassword from "views/ChangePassword/index";
import Misplace from "views/Librarian/Misplace/index.js";
import SearchBook from "views/SearchBook/index.js";
import InProcess from "views/BookCopy/inProcess.js";
import Lost from "views/BookCopy/lost.js";

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
    path: "/book-detail",
    name: "Book detail",
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
    isMultiLevel: true,
    groupName: "Book copies",
    groupId: "bookCopies",
    paths: ["/tag-copy", "/copy"],
    names: ["Tag copy", "Copy management"],
    layout: "/librarian",
  },
  {
    path: "/copy",
    name: "Copy management",
    icon: "ni ni-books text-primary",
    component: BookCopy,
    layout: "/librarian",
    invisible: true
  },
  {
    path: "/tag-copy",
    name: "Tag copy",
    icon: "ni ni-books text-primary",
    component: InProcess,
    layout: "/librarian",
    invisible: true
  },
  {
    path: "/copy-detail",
    name: "Copy detail",
    icon: "ni ni-book-bookmark text-primary",
    component: CopyDetail,
    layout: "/librarian",
    invisible: true
  },
  {
    isMultiLevel: true,
    groupName: "Circulation",
    groupId: "cỉculation",
    paths: ["/return", "/checkout", "/checkout-info"],
    names: ["Return", "Checkout", "Checkout information"],
    layout: "/librarian",
  },
  {
    path: "/checkout",
    name: "Check out books",
    icon: "fas fa-shopping-cart text-primary",
    component: Checkout,
    layout: "/librarian",
    invisible: true
  },
  {
    path: "/return",
    name: "Return books",
    icon: "fas fa-shopping-cart text-primary",
    component: ReturnBook,
    layout: "/librarian",
    invisible: true
  },
  {
    path: "/checkout-info",
    name: "Checkout information",
    icon: "ni ni-bullet-list-67 text-red",
    component: CheckoutInf,
    layout: "/librarian",
    invisible: true
  },
  {
    path: "/find-book",
    name: "Find book",
    icon: "ni ni-book-bookmark text-primary",
    component: SearchBook,
    layout: "/librarian"
  },
  {
    path: "/location",
    name: "Index/Check shelves",
    icon: "ni ni-bullet-list-67 text-red",
    component: Misplace,
    layout: "/librarian"
  },
  {
    path: "/lostReports",
    name: "Lost book reports",
    icon: "ni ni-bullet-list-67 text-red",
    component: BookLost,
    layout: "/librarian",
    invisible: true
  },
  {
    path: "/lost",
    name: "Lost books",
    icon: "ni ni-books text-primary",
    component: Lost,
    layout: "/librarian",
    invisible: true
  },
  {
    isMultiLevel: true,
    groupName: "Lost book management",
    groupId: "lostManagement",
    paths: ["/lostReports", "/lost"],
    names: ["Lost book reports", "Lost books"],
    layout: "/librarian",
  },
  // {
  //   path: "/student",
  //   name: "Patron management",
  //   icon: "fa fa-book-reader text-red",
  //   component: Student,
  //   layout: "/librarian"
  // },
  {
    path: "/policy",
    name: "Policy",
    icon: "ni ni-bullet-list-67 text-red",
    component: Policy,
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