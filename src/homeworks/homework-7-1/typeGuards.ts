type TUser = {
  username: string;
  password: string;
};

type TGuest = {
  sessionId: string;
};

type TAdmin = TUser & {
  role: 'admin';
};

type TExternalUser = {
  oauthToken: string;
};

type TPossibleUsersTypes = TUser | TGuest | TAdmin | TExternalUser;

const login = (entity: TPossibleUsersTypes) => {
  if ('role' in entity && entity.role === 'admin') {
    console.log('Authenticating with admin rights');
  } else if ('username' in entity) {
    console.log('Authenticating user with username');
  } else if ('sessionId' in entity) {
    console.log('Authenticating guest with sessionId');
  } else if ('oauthToken' in entity) {
    console.log('Authenticating external user with oauthToken');
  } else {
    throw new Error('Unknown user type');
  }
};

login({ username: 'user', password: '123' });
login({ sessionId: '123' });
login({ role: 'admin', username: 'admin', password: 'admin' });
login({ oauthToken: '123' });
