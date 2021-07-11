import "./App.css";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import { uuid } from "uuidv4";
// import contacts from "./contacts";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailPage from "./components/DetailPage";
import api from "./api/contact";
import EditContact from "./components/EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const contactHandler = async (contact) => {
    const req = {
      id: uuid(),
      ...contact,
    };

    const res = await api.post("/contacts", req);
    // setContacts([...contacts, { id: uuid(), ...contact }]);
    setContacts([...contacts, res.data]);
  };

  const searchHandler = (search) => {
    setSearch(search);
    if (search !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
  };

  const updateContactHandler = async (contact) => {
    const res = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = res.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...res.data } : contact;
      })
    );
  };
  const deleteContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);

    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  //fetch from api

  const retrieveContacts = async () => {
    const res = await api.get("/contacts");
    return res.data;
  };
  useEffect(() => {
    //retrieve from local storage
    // const retrieveContacts = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (retrieveContacts) setContacts(retrieveContacts);
    //from api

    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();

      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);
  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <Router>
      <div className="ui container">
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            // component={() => (
            //   <ContactList
            //     contacts={contacts}
            //     getContactId={deleteContactHandler}
            //   />
            // )}
            render={(props) => (
              <ContactList
                {...props}
                contacts={search.length < 1 ? contacts : searchResult}
                getContactId={deleteContactHandler}
                term={search}
                searchKey={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            exact
            // component={() => <AddContact contactHandler={contactHandler} />}
            render={(props) => (
              <AddContact {...props} contactHandler={contactHandler} />
            )}
          />

          <Route
            path="/edit"
            exact
            // component={() => <AddContact contactHandler={contactHandler} />}
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />

          <Route path="/contact/:id" component={DetailPage} />
        </Switch>

        {/* <AddContact contactHandler={AddContact} />
        <ContactList contacts={contacts} getContactId={deleteContactHandler} /> */}
      </div>
    </Router>
  );
}

export default App;
