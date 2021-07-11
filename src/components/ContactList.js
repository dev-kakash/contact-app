import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = ({ contacts, getContactId, term, searchKey }) => {
  const inputE1 = useRef("");
  const deleteContactHandler = (id) => {
    getContactId(id);
  };

  const getSearchTerm = () => {
    searchKey(inputE1.current.value);
  };

  return (
    <div className="main">
      <div class="ui grid">
        <div class="six wide column">
          <Link to="/add">
            <button className="ui button blue right ">Add Contact</button>
          </Link>
        </div>
        <div class="ten wide column">
          <div className="ui search">
            <div className="ui icon input">
              <input
                ref={inputE1}
                type="text"
                placeholder="search contact"
                className="prompt "
                value={term}
                onChange={getSearchTerm}
              />
              <i className="search icon"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="ui celled list">
        {contacts.length > 0 ? (
          <>
            {contacts.map((contact) => {
              return (
                <ContactCard
                  contact={contact}
                  clickHandler={deleteContactHandler}
                  key={contact.id}
                />
              );
            })}
          </>
        ) : (
          <>
            <div class="ui yellow tiny message">No match found</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactList;
