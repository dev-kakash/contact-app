import React, { useState } from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";
import DeletePage from "./DeletePage";

const ContactCard = ({ contact, clickHandler }) => {
  const [showResults, setShowResults] = useState(false);
  const onClick = () => setShowResults(true);
  const onBack = () => setShowResults(false);
  return (
    <div className="item">
      <img class="ui avatar image" src={user}></img>
      <div className="content">
        <Link
          to={{
            pathname: `/contact/${contact.id}`,
            state: { contact: contact },
          }}
        >
          <div className="header">{contact.name}</div>
          <div>{contact.email}</div>
        </Link>
      </div>

      <i
        className="trash alternate outline icon right floated "
        style={{ color: "red", marginTop: "7px", marginLeft: "7px" }}
        onClick={
          onClick
          // (id) => {
          // clickHandler(contact.id);}
        }
      ></i>
      <Link
        to={{
          pathname: "/edit",
          state: { contact: contact },
        }}
      >
        <i
          className="edit alternate outline icon right floated "
          style={{ color: "green", marginTop: "7px" }}
        ></i>
      </Link>

      {showResults ? (
        <>
          <div className="main">
            <div class="ui red message">
              Are you sure,you want to delete this contact ?
            </div>
            <div className="center-div">
              <Link to="/">
                <button class="ui teal button right " onClick={onBack}>
                  Back
                </button>
              </Link>
              <button
                class="ui red button center"
                onClick={(id) => {
                  clickHandler(contact.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ContactCard;
