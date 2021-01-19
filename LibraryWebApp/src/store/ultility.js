export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export function convertToDate(d) {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp) 
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return (
        d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                d.constructor === Number ? new Date(d) :
                    d.constructor === String ? new Date(d) :
                        typeof d === "object" ? new Date(d.year, d.month, d.date) :
                            NaN
    );
}

export function compareDate(date1, date2) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    return (
        isFinite(date1 = this.convertToDate(date1).valueOf()) &&
            isFinite(date2 = this.convertToDate(date2).valueOf()) ?
            (date1 > date2) - (date1 < date2) :
            NaN
    );
}

export function bookDescriptionFormat(cell, row) {
    let res = "";
    let authors = row.authors;
    let authorStr = "";
    
    let i = 0;
    authors.forEach(element => {
        i < authors.length - 1 ? authorStr += " " + element["name"] + " , " : authorStr += " " + element["name"] + " ";
        i++;
    });

    res += row.sub ? row.title + " - " + row.sub : row.title
    res +=  " / By " + authorStr + " - Publisher:" + row.publisher + " - " + row.language + " - " + row.nop + " pages - Edition: " + row.edition 

    return res;

    // let authorStr = row.author.join();
    // return (
    //     <Row>

    //         <Col className="col-6">Title: {row.title}</Col>
    //         <Col className="col-6">Subtitle: {row.sub}</Col>
    //         <Col className="col-4">DDC: {row.ddc}</Col>
    //         <Col className="col-4">Author: {authorStr}</Col>
    //         <Col className="col-4">Publisher:{row.publisher}</Col>
    //         <Col className="col-4">Language: {row.language}</Col>
    //         <Col className="col-4">Number of page: {row.nop}</Col>
    //         <Col className="col-4">Edition: {row.edition}</Col>
    //     </Row>
    // )
}

export default {
    updateObject,
    convertToDate,
    compareDate,
    bookDescriptionFormat
};