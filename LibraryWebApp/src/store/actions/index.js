export {
    auth,
    logout,
    setAuthRedirectPath,
    authCheckState,
    changePassword,
} from './auth'

export {
    getBooks,
} from './guest'

export {
    getRentingInfo as getRentingInfoLibrarianSide,
    getExtendedHistory as getExtendedHistoryLibrarianSide,
    extendDue as extendDueLibrarianSide
} from './Librarian/info'

export {
    getBook,
    addBook,
    updateBook,
    deleteBook,
    addBookCopy
} from './Librarian/Book'

export {
    getCopy,
    addCopy,
    updateCopy,
    deleteCopy,
    getAllBook
} from './Librarian/BookCopy'

export {
    getStudent,
    getStudentBook
} from './Librarian/Checkout'

export {
    getRentingInfo,
    getExtendedHistory,
    extendDue,
    addReminder,
    getStudentProfile,
    updateStudentProfile
} from './Student/info'

export {
    getReturningStudent,
    getReturningBook
} from './Librarian/ReturnBook'

export {
    getStaff,
    addStaff,
    updateStaff,
    deleteStaff
} from './Admin/Staff'

export{
    requestNewBook,
    refreshRequestNewBook
}from './Student/RequestNewBook'

export {
    getBook as getBookStudentSide,
    getWhislist
} from './Student/Book'
