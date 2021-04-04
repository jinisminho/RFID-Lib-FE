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
import BorrowingInfo from "views/Librarian/BorrowingInfo";
import Book from "views/Book/index.js";
import BookCopy from "views/BookCopy/index.js";
import Checkout from "views/Checkout/index.js";
import ReturnBook from "views/ReturnBook/index.js";
import Staff from "views/Admin/Staff/index.js";
import Student from "views/Admin/Student/index.js";
import BookDetail from "views/Book/BookDetail";
import Policy from "views/Admin/Policy";
import CopyDetail from "views/BookCopy/BookCopyDetail";
import Profile from "views/Student/Profile.js"
import ChangePassword from "views/ChangePassword/index";
import Types from "views/Admin/Types.js"
import Logs from "views/Admin/Logs.js"
import BookLost from "views/BookLost/index.js";
import SearchBook from "views/SearchBook/index.js";
import Misplace from "views/Librarian/Misplace/index.js";
import InProcess from "views/BookCopy/inProcess.js";
import Lost from "views/BookCopy/lost.js";

var routes = [
  {
    path: "/index",
    name: "Books",
    icon: "ni ni-book-bookmark text-primary",
    component: Book,
    layout: "/admin"
  },
  {
    path: "/bookDetail",
    name: "Book Detail",
    icon: "ni ni-book-bookmark text-primary",
    component: BookDetail,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/copy",
    name: "Copy management",
    icon: "ni ni-books text-primary",
    component: BookCopy,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/tagCopy",
    name: "Tag copy",
    icon: "ni ni-books text-primary",
    component: InProcess,
    layout: "/admin",
    invisible: true
  },
  {
    isMultiLevel: true,
    groupName: "Book copies",
    groupId: "bookCopies",
    paths: ["/tagCopy", "/copy"],
    names: ["Tag copy", "Copy mangament"],
    layout: "/admin",
  },
  {
    path: "/copyDetail",
    name: "Copy Detail",
    icon: "ni ni-book-bookmark text-primary",
    component: CopyDetail,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/checkout",
    name: "Check out books",
    icon: "fas fa-shopping-cart text-primary",
    component: Checkout,
    layout: "/admin"
  },
  {
    path: "/return",
    name: "Return books",
    icon: "fas fa-shopping-cart text-primary",
    component: ReturnBook,
    layout: "/admin"
  },
  {
    path: "/checkoutInfo",
    name: "Checkout information",
    icon: "ni ni-bullet-list-67 text-red",
    component: BorrowingInfo,
    layout: "/admin"
  },
  {
    path: "/searchbook",
    name: "Search book",
    icon: "ni ni-book-bookmark text-primary",
    component: SearchBook,
    layout: "/admin"
  },
  {
    path: "/misplace",
    name: "Check misplaced books",
    icon: "ni ni-bullet-list-67 text-red",
    component: Misplace,
    layout: "/admin"
  },
  {
    path: "/logs",
    name: "Security gate logs",
    icon: "ni ni-bullet-list-67 text-red",
    component: Logs,
    layout: "/admin"
  },
  {
    path: "/lostReports",
    name: "Lost book reports",
    icon: "ni ni-bullet-list-67 text-red",
    component: BookLost,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/lost",
    name: "Lost books",
    icon: "ni ni-books text-primary",
    component: Lost,
    layout: "/admin",
    invisible: true
  },
  {
    isMultiLevel: true,
    groupName: "Lost book management",
    groupId: "lostManagement",
    paths: ["/lostReports", "/lost"],
    names: ["Lost book reports", "Lost books"],
    layout: "/admin",
  },
  {
    path: "/groups",
    name: "Group management",
    icon: "ni ni-bullet-list-67 text-red",
    component: Types,
    layout: "/admin"
  },
  {
    path: "/staff",
    name: "Librarian management",
    icon: "fa fa-users text-red",
    component: Staff,
    layout: "/admin"
  },
  {
    path: "/student",
    name: "Patron management",
    icon: "fa fa-book-reader text-red",
    component: Student,
    layout: "/admin"
  },
  {
    path: "/policy",
    name: "Policy setting",
    icon: "ni ni-bullet-list-67 text-red",
    component: Policy,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
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