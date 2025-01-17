interface IUsersMap {
  user: { username: string; password: string };
  guest: { sessionId: string };
  admin: { username: string; password: string; role: 'admin' };
  externalUser: { oauthToken: string };
}

class UsersUtils {
  private constructor() {}

  public static isUser(user: unknown): user is IUsersMap['user'] {
    return (
      UsersUtils.isUserObj(user) &&
      'username' in user &&
      typeof user.username === 'string' &&
      'password' in user &&
      typeof user.password === 'string'
    );
  }

  public static isGuest(user: unknown): user is IUsersMap['guest'] {
    return UsersUtils.isUserObj(user) && 'sessionId' in user && typeof user.sessionId === 'string';
  }

  public static isAdmin(user: unknown): user is IUsersMap['admin'] {
    return (
      UsersUtils.isUserObj(user) &&
      'username' in user &&
      typeof user.username === 'string' &&
      'password' in user &&
      typeof user.password === 'string' &&
      'role' in user &&
      typeof user.role === 'string' &&
      user.role === 'admin'
    );
  }
  public static isExternalUser(user: unknown): user is IUsersMap['externalUser'] {
    return (
      UsersUtils.isUserObj(user) && 'oauthToken' in user && typeof user.oauthToken === 'string'
    );
  }

  private static isUserObj(user: unknown): user is Record<string, unknown> {
    return (
      typeof user === 'object' &&
      user !== null &&
      !Array.isArray(user) &&
      Object.keys(user).length > 0
    );
  }
}

const login = (entity: unknown): void => {
  if (UsersUtils.isAdmin(entity)) {
    console.log('Authenticating with admin rights');
  } else if (UsersUtils.isUser(entity)) {
    console.log('Authenticating user with username');
  } else if (UsersUtils.isGuest(entity)) {
    console.log('Authenticating guest with sessionId');
  } else if (UsersUtils.isExternalUser(entity)) {
    console.log('Authenticating external user with oauthToken');
  } else {
    throw new Error('Unknown user type');
  }
};

//examples
login({ username: 'user', password: '123' });
login({ sessionId: '123' });
login({ role: 'admin', username: 'admin', password: 'admin' });
login({ oauthToken: '123' });
