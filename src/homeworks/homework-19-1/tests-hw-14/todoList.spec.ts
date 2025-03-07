import TodoList from '../../homework-14-1/TodoList';
import { TODO_STATUSES, TODO_TYPES } from '../../homework-14-1/constants';

const MOCK_TODO_1 = {
  title: 'Test Todo',
  text: 'This is a test',
  status: TODO_STATUSES.IN_PROGRESS,
  type: TODO_TYPES.DEFAULT,
};

const MOCK_TODO_2 = {
  title: 'Task 1',
  text: '',
  status: TODO_STATUSES.IN_PROGRESS,
  type: TODO_TYPES.DEFAULT,
};

const MOCK_TODO_3 = {
  title: 'Task 2',
  text: '',
  status: TODO_STATUSES.DONE,
  type: TODO_TYPES.DEFAULT,
};

describe('TodoList', () => {
  let todoList: TodoList;

  beforeEach(() => {
    todoList = new TodoList();
  });

  it('should add a new todo item', () => {
    todoList.addTodo(MOCK_TODO_1);
    const todos = todoList.getTodoList();
    expect(todos).toHaveLength(1);
    expect(todos[0]).toMatchObject(MOCK_TODO_1);
  });

  it('should throw an error if title and text are empty', () => {
    expect(() =>
      todoList.addTodo({
        title: '',
        text: '',
        status: TODO_STATUSES.IN_PROGRESS,
        type: TODO_TYPES.DEFAULT,
      })
    ).toThrow('Title or text are required');
  });

  it('should remove a todo item', () => {
    todoList.addTodo(MOCK_TODO_1);
    const todoId = todoList.getTodoList()[0]!.id;
    todoList.removeTodo({ id: todoId });
    expect(todoList.getTodoList()).toHaveLength(0);
  });

  it('should edit a todo item', () => {
    todoList.addTodo(MOCK_TODO_1);
    const todoId = todoList.getTodoList()[0]!.id;
    todoList.editTodo({ id: todoId, updatedFields: { title: 'New Title' } });
    expect(todoList.getTodoById(todoId)?.title).toBe('New Title');
  });

  it('should mark a todo as done', () => {
    todoList.addTodo(MOCK_TODO_1);
    const todoId = todoList.getTodoList()[0]!.id;
    todoList.markTodoAsDone(todoId);
    expect(todoList.getTodoById(todoId)?.status).toBe(TODO_STATUSES.DONE);
  });

  it('should return progress info', () => {
    todoList.addTodo(MOCK_TODO_2);
    todoList.addTodo(MOCK_TODO_3);
    const progress = todoList.getProgressInfo();
    expect(progress).toEqual({ totalCount: 2, inProgressCount: 1, doneCount: 1 });
  });

  it('should find todos by title or text', () => {
    todoList.addTodo({
      title: 'Buy groceries',
      text: 'Milk and eggs',
      status: TODO_STATUSES.IN_PROGRESS,
      type: TODO_TYPES.DEFAULT,
    });
    todoList.addTodo({
      title: 'Walk the dog',
      text: 'Evening walk',
      status: TODO_STATUSES.IN_PROGRESS,
      type: TODO_TYPES.DEFAULT,
    });
    const results = todoList.findTodoByTitleOrText('Buy');
    expect(results).toHaveLength(1);
    expect(results[0]!.title).toBe('Buy groceries');
  });

  it('should sort todos by status', () => {
    todoList.addTodo(MOCK_TODO_2);
    todoList.addTodo(MOCK_TODO_3);
    const sortedTodos = todoList.sortTodosByStatus(TODO_STATUSES.DONE);
    expect(sortedTodos[0]!.status).toBe(TODO_STATUSES.DONE);
  });

  it('should sort todos by creation date', () => {
    todoList.addTodo({
      title: 'First',
      text: '',
      status: TODO_STATUSES.IN_PROGRESS,
      type: TODO_TYPES.DEFAULT,
    });
    todoList.addTodo({
      title: 'Second',
      text: '',
      status: TODO_STATUSES.IN_PROGRESS,
      type: TODO_TYPES.DEFAULT,
    });
    const allTodos = todoList.getTodoList();
    allTodos[0]!.createdAt = new Date('2025-02-20T10:00:00Z');
    allTodos[1]!.createdAt = new Date('2025-02-25T10:00:00Z');
    const sortedTodos = todoList.sortTodosByDateAt();
    expect(sortedTodos[0]!.title).toBe('First');
  });
});
