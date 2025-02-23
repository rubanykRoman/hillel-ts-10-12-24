import ITodoItem from './ITodoItem';

export default interface IEditTodo {
  id: number;
  updatedFields: Partial<Omit<ITodoItem, 'id' | 'createdAt' | 'editAt'>>;
  confirmEdit?: () => boolean;
}
