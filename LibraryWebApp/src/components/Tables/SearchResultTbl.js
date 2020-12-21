import React, { useMemo } from 'react'
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip
} from "reactstrap";
import { useTable, usePagination } from 'react-table'
import { COLUMNS } from './columnsSearchResult'
import { emptyRenderer } from 'react-table/dist/react-table.development';

export const SearchResultTbl = props => {

    const columns = useMemo(() => COLUMNS, [])
    var data = []

    if (props.data != null) {
        data = props.data
    }

    const tableInstance = useTable(
        {
            columns: columns,
            data: data,
            initialState: { pageIndex: 0, pageSize: 10 }
        },
        usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = tableInstance

    return (
        <div>
            <Table {...getTableProps} className="align-items-center" responsive>
                <thead className="thead-light">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {page.length === 0 ? (
                    <tbody>
                        <tr>
                            <td colSpan="10000" className="text-left">
                                * Not found
                      </td>
                        </tr>
                    </tbody>
                ) : (
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    )}
            </Table>
        </div>
    )
}