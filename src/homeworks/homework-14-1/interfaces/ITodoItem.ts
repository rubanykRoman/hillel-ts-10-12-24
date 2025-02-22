import { TTodoStatuses, TTodoTypes } from '../constants';

export default interface ITodoItem {
  id: number;
  title?: string;
  text?: string;
  createdAt: Date;
  editAt: Date;
  status: TTodoStatuses;
  type: TTodoTypes;
}
