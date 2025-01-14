type TCreateUser = { type: 'CREATE_USER'; payload: { name: string; age: number } };
type TDeleteUser = { type: 'DELETE_USER'; payload: { userId: number } };
type TUpdateUser = {
  type: 'UPDATE_USER';
  payload: { userId: number; name?: string; age?: number };
};
type TBlockUser = { type: 'BLOCK_USER'; payload: { userId: number; reason: string } };

type TAction = TCreateUser | TDeleteUser | TUpdateUser | TBlockUser;

const handleUpdateUser = (action: TUpdateUser) => {
  const updates: string[] = [];
  if (action.payload.name) updates.push('name');
  if (action.payload.age) updates.push('age');
  console.log(updates.length > 0 ? `User ${updates.join(' and ')} updated` : 'No updates');
};

const handleAction = (action: TAction): void => {
  switch (action.type) {
    case 'CREATE_USER':
      console.log(`User name ${action.payload.name}. User age ${action.payload.age}`);
      break;
    case 'DELETE_USER':
      console.log(`User with id ${action.payload.userId} is deleted`);
      break;
    case 'UPDATE_USER':
      handleUpdateUser(action);
      break;
    case 'BLOCK_USER':
      console.log(`User with id ${action.payload.userId} is blocked`);
      break;
    default:
      const _check: never = action;
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
  }
};

//examples
handleAction({
  type: 'CREATE_USER',
  payload: { name: 'Alice', age: 30 },
});

handleAction({
  type: 'DELETE_USER',
  payload: { userId: 123 },
});

handleAction({
  type: 'UPDATE_USER',
  payload: { userId: 123, name: 'Alice', age: 31 },
});

handleAction({
  type: 'UPDATE_USER',
  payload: { userId: 123, name: 'Alice' },
});

handleAction({
  type: 'UPDATE_USER',
  payload: { userId: 123, age: 31 },
});

handleAction({
  type: 'UPDATE_USER',
  payload: { userId: 123 },
});

handleAction({
  type: 'BLOCK_USER',
  payload: { userId: 123, reason: 'Spamming' },
});

handleAction({
  type: 'OWNER',
  payload: {},
} as unknown as TAction);
