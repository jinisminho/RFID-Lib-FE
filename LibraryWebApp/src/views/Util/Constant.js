//TABLES TITLE
export const BOOKS = "Search Books"
export const OVERDUE_BOOKS = "Overdue Books"
export const BORROWING_BOOKS = "Borrowing Books"
export const RETURNED_BOOKS = "Returned Books"
export const LOST_BOOKS = "Lost Books"
export const BORROW_POLICY = "Borrow Policy"
export const PATRON_POLICY = "Patron Policy"
export const FINE_POLICY = "Fine Policy"

//Format
export const DATETIME = "YYYY-MM-DD, HH:mm:ss"
export const DATE = "YYYY-MM-DD"
export const DATETIME_REQ = "YYYY-MM-DD, HH:mm:ss"
export const DATE_REQ = "YYYY-MM-DD"

//Status

export const BOOK_COPY_IN_PROCESS = "IN_PROCESS"
export const BOOK_COPY_AVAILABLE = "AVAILABLE"
export const BOOK_COPY_BORROWED = "BORROWED"
export const BOOK_COPY_OUT_OF_CIRCULATION = "OUT_OF_CIRCULATION"
export const BOOK_COPY_LOST = "LOST"
export const BOOK_COPY_LIB_USE_ONLY = "LIB_USE_ONLY"
export const BOOK_COPY_DISCARD = "DISCARD"

export const BOOK_OUT_OF_CIRCULATION = "OUT_OF_CIRCULATION"
export const BOOK_IN_CIRCULATION = "IN_CIRCULATION"
export const BOOK_LIB_USE_ONLY = "LIB_USE_ONLY"
export const BOOK_NOT_ALLOWED_TO_BORROWED = "NOT_ALLOWED_TO_BORROWED"

//PolicyConstant
export const MAX_NUMBER_BORROW = 100;
export const MIN_NUMBER_BORROW = 0;

export const MAX_EXTEND_TIME = 100;
export const MIN_EXTEND_TIME = 0;

export const MAX_DUE_DURATION = 1000;
export const MIN_DUE_DURATION = 1;

export const MAX_EXTEND_DUE_DURATION = 1000;
export const MIN_EXTEND_DUE_DURATION = 1;


export const MAX_FINE_PER_DAY = 100000;
export const MIN_FINE_PER_DAY = 1000;

export const MAX_PERCENTAGE_OVERDUE_FINE = 100;
export const MIN_PERCENTAGE_OVERDUE_FINE = 10;

export const MAX_DOC_PROCESSING_FEE = 100000;
export const MIN_DOC_PROCESSING_FEE = 1000;

export const MAX_DOC_MULTIPLIER = 100;
export const MIN_DOC_MULTIPLIER = 1;

//Other
export const DEFAULT_DATE_TO_ADD = 7
export const CURRENCY = "VND"


//Book status
export const BOOK_STATUS_ADD_LIST = { IN_CIRCULATION: "In circulation", OUT_OF_CIRCULATION: "Out of circulation", LIB_USE_ONLY: "Library use only" }
export const BOOK_STATUS_LIST = { IN_CIRCULATION: "In circulation", OUT_OF_CIRCULATION: "Out of circulation", LIB_USE_ONLY: "Library use only", DISCARD: "Discard" }

export const BOOK_COPY_STATUS_LIST = { AVAILABLE: "Available", IN_PROCESS: "In process", BORROWED: "Borrowed", OUT_OF_CIRCULATION: "Out of circulation", LOST: "Lost", LIB_USE_ONLY: "Library use only", DISCARD: "Discard" }

export const GENDER_LIST = { M: "Male", F: "Female" }

export const BOOK_COPY_NOT_UPDATE_STATUS = ["BORROWED","LOST","DISCARD"]
export const BOOK_NOT_UPDATE_STATUS = ["DISCARD"]

export const BOOK_LOST_STATUS = {CONFIRMED:"Confirmed",PENDING:"Pending"}