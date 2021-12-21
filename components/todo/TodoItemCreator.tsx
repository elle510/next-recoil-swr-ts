import React, { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../../state/todo';
// import { TodoItemType } from './TodoItem';

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
const getId = () => {
  return id++;
};

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = useCallback(() => {
    setTodoList((prevTodoList) => [
      ...prevTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
  }, [inputValue, setTodoList]);

  const onChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);
  console.log('Render TodoItemCreator');
  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default TodoItemCreator;
