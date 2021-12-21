import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { todoListFilterState } from '../../state/todo';

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = useCallback(
    ({ target: { value } }) => {
      setFilter(value);
    },
    [setFilter],
  );
  console.log('Render TodoListFilters', filter);
  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

export default TodoListFilters;
