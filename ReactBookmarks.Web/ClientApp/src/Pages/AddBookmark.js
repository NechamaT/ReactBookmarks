import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {useBookmarkUserContext} from '../BookmarkUserContextComponent';

const AddBookmark = () => {
  const [bookmark, setBookmark] = useState({ title: '', url: ''});
  const history = useHistory();
  const {user} = useBookmarkUserContext();

  const onTextChange = (e) => {
    const copy = { ...bookmark };
    copy[e.target.name] = e.target.value;
    setBookmark(copy);
    console.log(user);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(bookmark)
    await axios.post('api/bookmarks/add', bookmark);
    history.push('/');
  };

  return (
    
    <div className="row">
      <div className="col-md-6 offset-md-3 card card-body bg-light">
        <h3>Add Bookmark</h3>
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="form-control"
            value={bookmark.title}
            onChange={onTextChange} 
          />
          <br />
          <input
            type="text"
            name="url"
            placeholder="URL"
            className="form-control"
            value={bookmark.url}
            onChange={onTextChange} 
          />
          <br />
          <button className="btn btn-primary">Add</button>
        </form>
      </div>
    </div>
  );
};
export default AddBookmark;