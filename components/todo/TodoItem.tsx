import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../../state/todo';

export type TodoItemType = {
  id: number;
  text: string;
  isComplete: boolean;
};

type Props = {
  item: TodoItemType;
};

const TodoItem: React.FC<Props> = ({ item }) => {
  const { text, isComplete } = item;

  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = useCallback(
    ({ target: { value } }) => {
      const newList = replaceItemAtIndex(todoList, index, {
        ...item,
        text: value,
      });

      setTodoList(newList);
    },
    [index, item, setTodoList, todoList],
  );

  const toggleItemCompletion = useCallback(() => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !isComplete,
    });

    setTodoList(newList);
  }, [index, isComplete, item, setTodoList, todoList]);

  const deleteItem = useCallback(() => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  }, [index, setTodoList, todoList]);

  console.log('Render TodoItem');
  return (
    <div>
      <input type="text" value={text} onChange={editItemText} />
      <input type="checkbox" checked={isComplete} onChange={toggleItemCompletion} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

export default TodoItem;

function replaceItemAtIndex(arr: TodoItemType[], index: number, newValue: TodoItemType) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: TodoItemType[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
