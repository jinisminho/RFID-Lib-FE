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
import Author from "views/Admin/Author/index.js";
import Position from "views/Admin/Position/index.js";
import History from "views/Admin/CheckoutHistory/index.js";
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
    path: "/book-detail",
    name: "Book detail",
    icon: "ni ni-book-bookmark text-primary",
    component: BookDetail,
    layout: "/admin",
    invisible: true
  },
  {
    isMultiLevel: true,
    groupName: "Book copies",
    groupId: "bookCopies",
    paths: ["/tag-copy", "/copy"],
    names: ["Tag copy", "Copy management"],
    layout: "/admin",
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
    path: "/tag-copy",
    name: "Tag copy",
    icon: "ni ni-books text-primary",
    component: InProcess,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/copy-detail",
    name: "Copy detail",
    icon: "ni ni-book-bookmark text-primary",
    component: CopyDetail,
    layout: "/admin",
    invisible: true
  },
  {
    isMultiLevel: true,
    groupName: "Circulation",
    groupId: "cỉculation",
    paths: ["/return", "/checkout", "/checkout-info"],
    names: ["Return", "Checkout", "Checkout information"],
    layout: "/admin",
  },
  {
    path: "/checkout",
    name: "Check out books",
    icon: "fas fa-shopping-cart text-primary",
    component: Checkout,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/return",
    name: "Return books",
    icon: "fas fa-shopping-cart text-primary",
    component: ReturnBook,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/checkout-info",
    name: "Checkout information",
    icon: "ni ni-bullet-list-67 text-red",
    component: BorrowingInfo,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/find-book",
    name: "Find book",
    icon: "ni ni-book-bookmark text-primary",
    component: SearchBook,
    layout: "/admin"
  },
  {
    isMultiLevel: true,
    groupName: "Shelf management",
    groupId: "shelfManagement",
    paths: ["/location", "/location-setting"],
    names: ["Index / Check", "Location setting"],
    layout: "/admin",
  },
  {
    path: "/location",
    name: "Index and check book locations",
    icon: "ni ni-bullet-list-67 text-red",
    component: Misplace,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/location-setting",
    name: "Location setting",
    icon: "ni ni-bullet-list-67 text-red",
    component: Position,
    layout: "/admin",
    invisible: true
  },
  {
    isMultiLevel: true,
    groupName: "Lost book management",
    groupId: "lostManagement",
    paths: ["/lost-reports", "/lost"],
    names: ["Lost book reports", "Lost books"],
    layout: "/admin",
  },
  {
    path: "/lost-reports",
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
    groupName: "Account management",
    groupId: "accountManagement",
    paths: ["/librarian-mng", "/patron-mng"],
    names: ["Librarian", "Patron"],
    layout: "/admin",
  },
  {
    path: "/librarian-mng",
    name: "Librarian management",
    icon: "fa fa-users text-red",
    component: Staff,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/patron-mng",
    name: "Patron management",
    icon: "fa fa-book-reader text-red",
    component: Student,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/logs",
    name: "Security gate logs",
    icon: "ni ni-bullet-list-67 text-red",
    component: Logs,
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
    isMultiLevel: true,
    groupName: "Other settings",
    groupId: "otherSetting",
    paths: ["/groups", "/author"],
    names: ["Group managementt", "Author management"],
    layout: "/admin",
  },
  {
    path: "/groups",
    name: "Group management",
    icon: "ni ni-bullet-list-67 text-red",
    component: Types,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/author",
    name: "Author management",
    icon: "ni ni-bullet-list-67 text-red",
    component: Author,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/checkout-history",
    name: "Checkout history",
    icon: "ni ni-bullet-list-67 text-red",
    component: History,
    layout: "/admin",
    invisible: true
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
    name: "Change password",
    icon: "fa fa-book-reader text-red",
    component: ChangePassword,
    layout: "/admin",
    invisible: true
  }
];
export default routes;