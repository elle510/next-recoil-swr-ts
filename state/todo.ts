import { atom, selector } from 'recoil';
import { TodoItemType } from '../components/todo/TodoItem';

type FilterType = 'Show All' | 'Show Completed' | 'Show Uncompleted';

export const todoListState = atom<TodoItemType[]>({
  key: 'todoListState',
  default: [],
});

export const todoListFilterState = atom<FilterType>({
  key: 'todoListFilterState',
  default: 'Show All',
});

// filteredTodoListState는 내부적으로 2개의 의존성 todoListFilterState와 todoListState을 추적한다.
// 그래서 둘 중 하나라도 변하면 filteredTodoListState는 재 실행된다.
export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    console.log('selector');
    switch (filter) {
      case 'Show Completed':
        return list.filter((item: TodoItemType) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item: TodoItemType) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
