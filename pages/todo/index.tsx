import React from 'react';
import { useRecoilValue } from 'recoil';
import TodoItem, { TodoItemType } from '../../components/todo/TodoItem';
import TodoItemCreator from '../../components/todo/TodoItemCreator';
import TodoListFilters from '../../components/todo/TodoListFilters';
import TodoListStats from '../../components/todo/TodoListStats';
import { filteredTodoListState, todoListState } from '../../state/todo';

const Todo = () => {
  // const todoList = useRecoilValue(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);

  console.log('Render Todo');

  return (
    <div>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      {todoList.map((todoItem: TodoItemType) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </div>
  );
};

export default Todo;
