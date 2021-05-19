import React, { useEffect, useState } from 'react';
import TableRow from '../components/TableRow'
import axios from 'axios';

const Home =() =>{
    const [topBookmarks, setTopBookmarks] = useState([]);
    
    useEffect(() =>{
        const getTopBookmarks = async() =>{
            const {data} = await axios.get(`api/bookmarks/gettopbookmarks`)
            setTopBookmarks(data);
        };

        getTopBookmarks();
    }, [])

    return(
        <div>
      <div className="container" style={{marginTop: 20}}>
      <h1>Welcome to the React Bookmark Application</h1>
            <h4>Top 5 most bookmarked links</h4>
        <table className="table table-hover table-striped table-bordered">
            
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                {!!setTopBookmarks.length && topBookmarks.map((topBookmark) =>(
                    <TableRow topBookmarks={topBookmark} key={topBookmark.Id} />
                ))}
            </tbody>
        </table>
        </div>
        </div>
    )
}
export default Home;