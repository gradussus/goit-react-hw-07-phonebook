import { Item, List, DeleteBtn } from './ContactList.styled';
import { deleteContact } from 'redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/filterSlice';
import { useGetContactsQuery } from 'redux/API';

export const ContactList = () => {
  const dispatch = useDispatch();
  const { data } = useGetContactsQuery();
  const filter = useSelector(getFilter);

  const onFilterChange = () => {
    return data.filter(c =>
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
