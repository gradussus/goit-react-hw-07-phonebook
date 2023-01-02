import { useState } from 'react';
import { AddContactForm } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import { addContact, getContacts } from 'redux/contactsSlice';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const contacts = useSelector(getContacts)

  const newContact = (name, number) => {
    const includeName = name => {
      return contacts.find(
        e =>
          e.name.toLocaleLowerCase() ===
          name.toLocaleLowerCase()
      );
    };
    const includeNumber = () => {
      return contacts.find(
        e => e.number === number
      );
    };
    const contact = {
      id: nanoid(10),
      name,
      number,
    };
    if (includeName(contact.name)) {
      return alert(`${contact.name} is already in contacts`);
      
    }
    if (includeNumber(contact.number)) {
      return alert(`${contact.number} is already in contacts`);
    }
    dispatch(addContact( contact ));
  }

  




  const handleChange = e => {
    const event = e.target;
    if (event.type === 'text') {
      setContactName(event.value);
    }
    if (event.type === 'tel') {
      setContactNumber(event.value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    newContact(contactName, contactNumber)
    setContactName('');
    setContactNumber('');
  };

  return (
    <AddContactForm onSubmit={onSubmit} autoComplete="off">
      <label>
        <p>Name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          required
          value={contactName}
          onChange={handleChange}
        />
      </label>
      <label>
        <p>Number</p>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          required
          value={contactNumber}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Add contact</button>
    </AddContactForm>
  );
};
