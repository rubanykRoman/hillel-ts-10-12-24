type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: DeepRequireReadonly<T[K]>;
};

//example
type User = {
  id?: number;
  profile?: {
    name?: string;
    age?: number;
  };
};

const user: DeepRequireReadonly<User> = {
  id: 1,
  profile: {
    name: 'Alice',
    age: 25,
  },
};

// errors:
// user.id = 2;
// user.profile.name = 'Bob';

type UserWithPosts = {
  id?: number;
  posts?: string[];
};

const userWithPosts: DeepRequireReadonly<UserWithPosts> = {
  id: 1,
  posts: ['Hello', 'World'],
};

// errors:
// userWithPosts.id = 2;
// userWithPosts.posts.push('New post');

export {};
