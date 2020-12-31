import {rentingInfo, extendedDueHistory} from './mock_data'

function getRentingInfos() {
    return {"data": rentingInfo, "total":rentingInfo.length,"status":true};
}

function getExtendedHistory() {
    return {"data": extendedDueHistory, "total":extendedDueHistory.length,"status":true};
}

export { getRentingInfos, getExtendedHistory }