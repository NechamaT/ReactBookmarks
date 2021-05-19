import React from 'react';

const TableRow = ({topBookmarks}) =>{
    const {url, count} = topBookmarks;
    return(
        <tr>
            <td><a href={url} target="_blank">{url}</a></td>
            <td>{count}</td>
        </tr>
    )
}

export default TableRow;