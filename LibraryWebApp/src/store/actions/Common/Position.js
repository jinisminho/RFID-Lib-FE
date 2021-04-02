import * as actionTypes from '../actionTypes'
import axios from '../../../axios'
import { responseError } from '../../utility'

//Shelves
export const getShelvesSuccess = (data) => {
    return {
        type: actionTypes.COMMON_GET_SHELVES_SUCCESS,
        data: data,
    }
}

export const getShelvesFailed = (error) => {
    return {
        type: actionTypes.COMMON_GET_SHELVES_FAILED,
        error: error
    }
}

export const getShelvesStart = () => {
    return {
        type: actionTypes.COMMON_GET_SHELVES_START
    }
}

export const getShelves = () => {
    return dispatch => {
        dispatch(getShelvesStart())

        let url = '/position/shelf/all'
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getShelvesSuccess(response.data))
            })
            .catch(error => {
                dispatch(responseError(getShelvesFailed, error))
            });
    }

}

//Lines
export const getLinesSuccess = (data) => {
    return {
        type: actionTypes.COMMON_GET_LINES_SUCCESS,
        data: data,
    }
}

export const getLinesFailed = (error) => {
    return {
        type: actionTypes.COMMON_GET_LINES_FAILED,
        error: error
    }
}

export const getLinesStart = () => {
    return {
        type: actionTypes.COMMON_GET_LINES_START
    }
}

export const getLines = (shelf) => {
    return dispatch => {
        dispatch(getLinesStart())

        let url = '/position/row/' + shelf
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getLinesSuccess(response.data))
            })
            .catch(error => {
                dispatch(responseError(getLinesFailed, error))
            });
    }

}

//Save sampled position

export const saveSampledPositionStart = () => {
    return ({
        type: actionTypes.COMMON_SAVE_SAMPLED_POSITION_START
    })
}
export const saveSampledPositionFail = (error) => {
    return ({
        type: actionTypes.COMMON_SAVE_SAMPLED_POSITION_FAILED,
        error: error
    })
}
export const saveSampledPositionSuccess = () => {
    return ({
        type: actionTypes.COMMON_SAVE_SAMPLED_POSITION_SUCCESS,
    })
}

export const saveSampledPosition = (data) => {
    return dispatch => {
        dispatch(saveSampledPositionStart())

        let url = '/position/row/save'
        axios.post(url, data, { withCredentials: true })
            .then(response => {
                dispatch(saveSampledPositionSuccess())
            })
            .catch(error => {
                dispatch(responseError(saveSampledPositionFail, error))
            });
    }
}

//Get initial positions

export const getInitialPositionsStart = () => {
    return ({
        type: actionTypes.COMMON_GET_INIT_POS_START
    })
}
export const getInitialPositionsFail = (error) => {
    return ({
        type: actionTypes.COMMON_GET_INIT_POS_FAILED,
        error: error
    })
}
export const getInitialPositionsSuccess = (data) => {
    return ({
        type: actionTypes.COMMON_GET_INIT_POS_SUCCESS,
        data: data,
    })
}

export const getInitialPositions = (positionId) => {
    return dispatch => {
        dispatch(getInitialPositionsStart())

        let url = '/position/row/getBooks/' + positionId
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getInitialPositionsSuccess(response.data))
            })
            .catch(error => {
                dispatch(responseError(getInitialPositionsFail, error))
            });
    }
}

//Get book
export const getScannedBookSuccess = (data) => {
    return {
        type: actionTypes.COMMON_GET_SCANNED_BOOK_SUCCESS,
        bookData: data
    }
}

export const getScannedBookFail = (error) => {
    return {
        type: actionTypes.COMMON_GET_SCANNED_BOOK_FAILED,
        error: error
    }
}

export const getScannedBookStart = () => {
    return {
        type: actionTypes.COMMON_GET_SCANNED_BOOK_START
    }
}

export const getScannedBook = (rfid) => {
    return dispatch => {
        dispatch(getScannedBookStart())
        let url = '/copy/get/rfid/' + rfid
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getScannedBookSuccess(response.data))
            })
            .catch(error => {
                dispatch(responseError(getScannedBookFail, error))
            });
    }

}

//Clear scanned list
export const clearBook = () => {
    return {
        type: actionTypes.CLEAR_SCANNED_BOOK
    }

}

//Shelf + Line by RFID
export const getPositionByRFIDSuccess = (data) => {
    return {
        type: actionTypes.COMMON_GET_POSITION_RFID_SUCCESS,
        data: data,
    }
}

export const getPositionByRFIDFailed = (error) => {
    return {
        type: actionTypes.COMMON_GET_POSITION_RFID_FAILED,
        error: error
    }
}

export const getPositionByRFIDStart = () => {
    return {
        type: actionTypes.COMMON_GET_POSITION_RFID_START
    }
}

export const getPositionByRFID = (rfid) => {
    return dispatch => {
        dispatch(getPositionByRFIDStart())

        let url = '/position/rfid/getPosition/' + rfid
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getPositionByRFIDSuccess(response.data))
            })
            .catch(error => {
                dispatch(responseError(getPositionByRFIDFailed, error))
            });
    }

}
