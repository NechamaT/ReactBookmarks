import React, { useState, useEffect } from "react";

const MyTableRow = ({ bookmark, onUpdateClick, onDeleteClick }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(bookmark.title);
  }, []);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onCancelClick = () => {
    setEditMode(false);
    setTitle(bookmark.title);
  };

  const updateClick = () => {
    setEditMode(false);
    const copy = { ...bookmark };
    copy.title = title;
    onUpdateClick(copy);
  };

  return (
    <tr>
      <td>
        {editMode && (
          <input
            type="text"
            className="form-control"
            onChange={onTitleChange}
            value={title}
          />
        )}
        {!editMode && bookmark.title}
      </td>
      <td>
        <a href={bookmark.url} target="_blank">
          {bookmark.url}
        </a>
      </td>
      <td>
          {!editMode && <button onClick={() =>setEditMode(true)} className="btn btn-outline-info">Edit</button>}
      {!!editMode && 
      <>
      <button className='btn btn-outline-warning' onClick={updateClick}>Update</button>
      <button className='btn btn-outline-success'style={{marginLeft: 20}} onClick={onCancelClick}>Cancel</button>
      </>}
      <button className="btn btn-outline-danger" style={{marginLeft: 20}}onClick={() => onDeleteClick(bookmark.id)}>Delete</button>
      </td>
    </tr>
  );
};
export default MyTableRow;