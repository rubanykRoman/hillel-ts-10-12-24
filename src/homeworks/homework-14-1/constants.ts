export const TODO_STATUSES = {
  DONE: 'done',
  IN_PROGRESS: 'in progress',
} as const;
export type TTodoStatuses = (typeof TODO_STATUSES)[keyof typeof TODO_STATUSES];

export const TODO_TYPES = {
  DEFAULT: 'default',
  NEED_APPROVE: 'needApprove',
} as const;
export type TTodoTypes = (typeof TODO_TYPES)[keyof typeof TODO_TYPES];
