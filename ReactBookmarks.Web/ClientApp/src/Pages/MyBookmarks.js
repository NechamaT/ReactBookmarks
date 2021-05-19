import React, { useState, useEffect } from "react";
import axios from "axios";
import MyTableRow from "../components/MyTableRow";
import { Link } from "react-router-dom";
import {useBookmarkUserContext} from '../BookmarkUserContextComponent';

const MyBookmarks = () => {
  const [myBookmarks, setMyBookmarks] = useState([]);
  const {user} = useBookmarkUserContext();

  console.log(user);

  useEffect(() => {
    getMyBookmarks();
 
  }, []);

  const getMyBookmarks = async () => {
    const { data } = await axios.get(`api/bookmarks/getusersbookmarks`);
    setMyBookmarks(data);
  };
  const onUpdateClick = async (bookmark) => {
    await axios.post("/api/bookmarks/update", bookmark);
    getMyBookmarks();
  };

  const onDeleteClick = async (id) => {
      console.log(id)
    await axios.post(`/api/bookmarks/delete?id=${id}`);
    getMyBookmarks();
  };

  return (
    <div>
      <div className="container" style={{ marginTop: 20 }}>
        <div className="row">
          <Link to="/addbookmark" className="btn btn-primary btn-block" style={{marginTop: 20}}>
            Add Bookmark
          </Link>
        </div>
        <table className="table table-hover table-striped table-bordered" style={{marginTop: 20}}>
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {myBookmarks.map((b) => (
              <MyTableRow
                bookmark={b}
                key={b.id}
                onUpdateClick={onUpdateClick}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MyBookmarks;
