import React from "react";
import { Link } from "react-router-dom";

const DeletePage = ({ contactHandler }) => {
  return (
    <div className="main">
      <div class="ui red message">
        Are you sure,you want to delete this contact ?
      </div>
      <div className="center-div">
        <Link to="/">
          <button class="ui teal button right ">Back</button>
        </Link>
        <button
          class="ui red button center"
          onClick={(id) => {
            contactHandler(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeletePage;
