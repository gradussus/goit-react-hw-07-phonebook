import { Item, List, DeleteBtn } from './ContactList.styled';
import { getContacts, deleteContact } from 'redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/filterSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const onFilterChange = () => {
    return contacts.filter(c =>
      c.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const removeContact = e => {
    dispatch(deleteContact(e.currentTarget.id));
  };

  return (
    <List>
      {onFilterChange().map(c => (
        <Item key={c.id}>
          <span>{c.name}</span>
          <span>{c.number}</span>
          <DeleteBtn id={c.id} onClick={removeContact}>
            Delete
          </DeleteBtn>
        </Item>
      ))}
    </List>
  );
};
