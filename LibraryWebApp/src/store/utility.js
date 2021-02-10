import { Link } from 'react-router-dom'
import React from 'react'
import * as MyConstant from '../views/Util/Constant'
import * as Constant from './constant'
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

const detailsTextClassName = "h3"

export function bookDescriptionFormat(cell, row, extraData) {
    let hide = extraData.hide ? extraData.hide : [];
    let thisBook = [];
    thisBook.push(row)

    let title = row.title && !hide.title ? (
        <Link to={{
            pathname: '/patron/book/detail',
            state: {
                book: thisBook,
                studentId: extraData.studentId ? extraData.studentId : null
            }
        }}><h1 className="font-weight-bolder">{row.title}{row.sub ? " : " + row.sub : null}</h1></Link>
    ) : null;

    let authors = row.author && !hide.author ? (row.author.length > 0 ? row.author : []) : [];
    let authorStr = "";
    let i = 0;
    authors.forEach(element => {
        i < authors.length - 1 ? authorStr += " " + element["name"] + " , " : authorStr += " " + element["name"] + " ";
        i++;
    });
    // let authorStr = row.author.join(", ")
    let author = authorStr !== null && authorStr !== '' ? (
        <p className={detailsTextClassName}>Author(s): {authorStr}</p>
    ) : null;

    let edition = row.edition && !hide.edition ? (
        <p className={detailsTextClassName}>Edition: {row.edition}</p>
    ) : null;

    let position = row.ddc ? "Available at " + row.ddc : null;
    let position_class = "text-success"
    if (row.status != MyConstant.BOOK_IN_CIRCULATION || row.stock <= 0) {
        position = "Not available"
        position_class = "text-danger"
    }
    let pos = position && !hide.position ? (
        <p className={position_class+" "+detailsTextClassName}>{position}</p>
    ) : null;

    let publisherPublishYearStr = row.publisher && !hide.publisher ? row.publisher : "";
    publisherPublishYearStr += row.publishYear && !hide.publishYear ? " - " + row.publishYear : "";
    let publisherPublishYear = publisherPublishYearStr !== "" ? (
        <p className={detailsTextClassName}>Publisher: {publisherPublishYearStr}</p>
    ) : null;

    let language = row.language && !hide.language ? (
        <p className={detailsTextClassName}>Language: {row.language}</p>
    ) : null;

    let nop = row.nop && !hide.nop ? (
        <p className={detailsTextClassName}>Number of pages: {row.nop} Pages</p>
    ) : null;

    let warn = row.onlyInLibrary && !hide.warn ? (
        <p className={"text-danger "+ detailsTextClassName}>ONLY IN LIBRARY</p>
    ) : null;

    let totalCopies = row.numberOfCopy && !hide.totalCopies ? (
        <p className={detailsTextClassName}> Total copies: {row.numberOfCopy}</p>
    ) : null;

    let totalAvailableCopies = row.stock && !hide.totalAvailableCopies ? (
        <p className={detailsTextClassName}> Total available copies: {row.stock}</p>
    ) : null;

    let isbn = row.isbn && !hide.isbn ? (
        <p className={detailsTextClassName}> ISBN: {row.isbn}</p>
    ) : null;

    let genre = row.genre && !hide.genre ? (
        <p className={detailsTextClassName}> Genre(s): {row.genre}</p>
    ) : null;

    return (
        <>
            {title}
            {author}
            {publisherPublishYear}
            {edition}
            {language}
            {isbn}
            {nop}
            {genre}
            {totalCopies}
            {totalAvailableCopies}
            {pos}
            {warn}
        </>
    )
}

export function imageFormatter(cell, row){
    return (<img className="img-thumbnail" src={cell}/>)
}

export function responseError(status,err){
    let msg=""
    switch (status) {
        case 500:
            msg=Constant.INTERNAL_SERVER_ERROR
            break;
    
        default:
            msg=err.message
            break;
    }
    return msg
}
export default {
    updateObject,
    convertToDate,
    compareDate,
    bookDescriptionFormat,
    imageFormatter,
    responseError
};