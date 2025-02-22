import ITodoItem from './interfaces/ITodoItem';
import IGetProgressInfo from './interfaces/IGetProgressInfo';
import { TODO_STATUSES, TODO_TYPES, TTodoStatuses } from './constants';
import IEditTodo from './interfaces/IEditTodo';
import IRemoveTodo from './interfaces/IRemoveTodo';

class TodoList {
  private todoList: ITodoItem[] = [];
  private currentId: number = 1;

  addTodo(todoItem: Omit<ITodoItem, 'id' | 'createdAt' | 'editAt'>): void {
    if (!todoItem?.title?.trim() && !todoItem?.text?.trim()) {
      throw new Error('Title or text are required');
    }
    const newTodo: ITodoItem = {
      ...todoItem,
      id: this.currentId++,
      createdAt: new Date(),
      editAt: new Date(),
    };
    this.todoList.push(newTodo);
  }

  removeTodo({ id, confirmRemoving }: IRemoveTodo): void {
    const item = this.getTodoById(id);
    if (!item) return;

    if (item.type === TODO_TYPES.NEED_APPROVE && confirmRemoving && !confirmRemoving()) {
      return;
    }
    this.todoList = this.todoList.filter((todoItem) => todoItem.id !== id);
  }

  editTodo({ id, updatedFields, confirmEdit }: IEditTodo): void {
    const currentItem = this.getTodoById(id);
    if (!currentItem) return;

    if (currentItem.type === TODO_TYPES.NEED_APPROVE && confirmEdit && !confirmEdit()) {
      return;
    }

    const updatedItem: ITodoItem = {
      ...currentItem,
      ...updatedFields,
      editAt: new Date(),
    };

    if (!updatedItem?.title?.trim() && !updatedItem?.text?.trim()) {
      throw new Error('Title or text are required');
    }

    this.todoList = this.todoList.map((item) => (item.id === id ? updatedItem : item));
  }

  markTodoAsDone(id: number): void {
    const item = this.getTodoById(id);
    if (item) {
      item.status = TODO_STATUSES.DONE;
      item.editAt = new Date();
    }
  }

  getTodoById(id: number): ITodoItem | undefined {
    return this.todoList.find((item) => item.id === id);
  }

  getTodoList(): ITodoItem[] {
    return [...this.todoList];
  }

  getProgressInfo(): IGetProgressInfo {
    const totalCount = this.todoList.length;
    const inProgressCount = this.todoList.filter(
      (item) => item.status === TODO_STATUSES.IN_PROGRESS
    ).length;
    const doneCount = this.todoList.filter((item) => item.status === TODO_STATUSES.DONE).length;

    return { totalCount, inProgressCount, doneCount };
  }

  findTodoByTitleOrText(search: string): ITodoItem[] {
    return this.todoList.filter(
      (item) => item?.title?.includes(search) || item?.text?.includes(search)
    );
  }

  sortTodosByStatus(targetStatus: TTodoStatuses): ITodoItem[] {
    return [...this.todoList].sort((a, b) => {
      if (a.status === targetStatus && b.status !== targetStatus) return -1;
      if (a.status !== targetStatus && b.status === targetStatus) return 1;
      return 0;
    });
  }

  sortTodosByDateAt(): ITodoItem[] {
    return [...this.todoList].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

//examples

const todoList = new TodoList();

todoList.addTodo({
  title: 'Buy groceries',
  text: 'Milk, bread, eggs',
  status: TODO_STATUSES.IN_PROGRESS,
  type: TODO_TYPES.DEFAULT,
});

todoList.addTodo({
  title: 'Call mom',
  text: '',
  status: TODO_STATUSES.IN_PROGRESS,
  type: TODO_TYPES.NEED_APPROVE,
});

todoList.addTodo({
  title: 'Go for a walk',
  text: 'Evening walk in the park',
  status: TODO_STATUSES.IN_PROGRESS,
  type: TODO_TYPES.DEFAULT,
});

try {
  todoList.addTodo({
    title: '   ',
    text: '  ',
    status: TODO_STATUSES.IN_PROGRESS,
    type: TODO_TYPES.DEFAULT,
  });
} catch (error: any) {
  console.error('Error while adding:', error.message);
}

todoList.editTodo({ id: 1, updatedFields: { text: 'Milk, bread, eggs, cheese' } });
todoList.markTodoAsDone(1);

console.log('Todo with id 1:', todoList.getTodoById(1));
console.log('All todos:', todoList.getTodoList());
console.log('Progress:', todoList.getProgressInfo());
console.log("Todos containing 'Buy':", todoList.findTodoByTitleOrText('Buy'));
console.log('Todos sorted by status (DONE first):', todoList.sortTodosByStatus(TODO_STATUSES.DONE));

const allTodos = todoList.getTodoList();
allTodos[0]!.createdAt = new Date('2025-02-20T10:00:00Z');
allTodos[1]!.createdAt = new Date('2025-02-25T10:00:00Z');
allTodos[2]!.createdAt = new Date('2025-02-22T10:00:00Z');
console.log('Todos sorted by creation date:', todoList.sortTodosByDateAt());

todoList.removeTodo({ id: 1 });
console.log('All todos after removing id 1:', todoList.getTodoList());

export default TodoList;
