import React from 'react';
import ReactPaginate from 'react-paginate';

import SearchIcon from '../../../assets/icons/Search.svg';
import '../../../scss/components/_table.scss';
import { Spinner } from '../index';
import Feather from '../Feather';

export default function Table({
    columns = [],
    data = [],
    details = { count: 0, filter: '', limit: 0, page: 0, pages: 0 },
    search = false,
    expand = '',
    sort = { sort: '', order: 'asc' },
    loading = false,
    pagination = false,
    paginationProps = {},
    onSort = () => {},
    onSearch = () => {},
    onChangePage = () => {},
    onChangeTextFilter = () => {}
}) {
    if (!columns || !columns.length) {
        return null;
    }

    const formatColumns = {};
    columns.forEach(col => {
        formatColumns[col.dataIndex] = col;
    });

    return (
        <div>
            <div className='Users__actions'>
                {search && (
                    <div className='search_block'>
                        <form className='search_form' onSubmit={onSearch}>
                            <input
                                type='search'
                                name='search'
                                placeholder='Search'
                                className='search_form__input'
                                onChange={onChangeTextFilter}
                            />
                            <button className='search_form__button' type='submit'>
                                <img className='search_form__icon' src={SearchIcon} alt='icon search' />
                            </button>
                        </form>
                        <span className='search_text'>
                            {data.length} {data.length > 1 ? 'items' : 'item'} was found
                        </span>
                    </div>
                )}
                {pagination && (
                    <ReactPaginate
                        previousLabel='Prev'
                        nextLabel='Next'
                        breakLabel='...'
                        breakClassName={'break-me'}
                        pageCount={details.pages}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={details.limit}
                        onPageChange={onChangePage}
                        containerClassName='Pagination'
                        activeClassName='active'
                        {...paginationProps}
                    />
                )}
            </div>
            <div className='TableComponent'>
                <table>
                    <thead>
                        <tr>
                            {columns.map(col => {
                                return (
                                    <th
                                        key={col.dataIndex}
                                        className={`text_${col.align || 'left'} ${col.sort ? ' cursor_pointer' : ''}`}
                                        onClick={() => {
                                            if (col.sort)
                                                onSort({
                                                    sort: col.dataIndex,
                                                    order: sort.order === 'asc' ? 'desc' : 'asc'
                                                });
                                        }}>
                                        <div className='flex'>
                                            <div className='column_title'>{col.title}</div>
                                            <div className='sort_area'>
                                                {sort.sort === col.dataIndex && col.sort && (
                                                    <Feather
                                                        name={`${sort.order === 'asc' ? 'ChevronUp' : 'ChevronDown'}`}
                                                        className='sort_icon'
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => {
                            return (
                                <>
                                    <tr key={row.id || row._id}>
                                        {columns.map(col => {
                                            return (
                                                <td className={`text_${formatColumns[col.dataIndex].align || 'left'}`}>
                                                    {formatColumns[col.dataIndex].render
                                                        ? formatColumns[col.dataIndex].render(row)
                                                        : row[col.dataIndex]}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    {expand(row)}
                                </>
                            );
                        })}
                    </tbody>
                </table>
                {loading && <Spinner />}
            </div>
        </div>
    );
}
