import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList ';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';
import { useGetContactsQuery } from 'redux/API';

export const App = () => {
  const { data, error, isLoading } = useGetContactsQuery();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>

      {!isLoading && data.length !== 0 ? (
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
      {error && <div>Oh no... Something wrong</div>}
    </Container>
  );
};
