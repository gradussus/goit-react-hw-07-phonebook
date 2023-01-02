import { useDispatch, useSelector } from 'react-redux';
import { setFilter, getFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <label>
      <p>Find contacts by name</p>
      <input type="text" value={filter} onChange={onFilterChange} />
    </label>
  );
};
