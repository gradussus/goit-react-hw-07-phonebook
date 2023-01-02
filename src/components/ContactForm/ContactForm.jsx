import { useState } from 'react';
import { AddContactForm } from './ContactForm.styled';
import { nanoid } from 'nanoid';
import { useAddContactMutation, useGetContactsQuery } from 'redux/API';
// import { addContact, getContacts } from 'redux/contactsSlice';

export const ContactForm = () => {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const { data } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  const newContact = async (name, number) => {
    const includeName = name => {
      return data.find(
        e => e.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      );
    };
    const includeNumber = () => {
      return data.find(e => e.number === number);
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
    try {
      await addContact(contact);
    } catch {
      window.alert('Oh no, error...');
    }
  };

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
    newContact(contactName, contactNumber);
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
