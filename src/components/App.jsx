import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList ';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';
import { getContacts } from 'redux/contactsSlice';
import { useSelector } from 'react-redux';

export const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>

      {contacts.length !== 0 ? (
        <>
          <Filter />
          <ContactList />
        </>
      ) : (
        <div>
          Your contacts are not here yet, but you can add contacts in the form
          above and save them in this app
        </div>
      )}
    </Container>
  );
};
