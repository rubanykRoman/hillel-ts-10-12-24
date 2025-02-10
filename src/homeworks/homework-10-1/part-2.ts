type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>;
};

//example
type UserWithPosts = {
  id: number;
  posts: string[];
  profile: {
    name?: string;
    age?: number;
  };
};

const userWithPosts: DeepReadonly<UserWithPosts> = {
  id: 1,
  posts: ['Hello', 'World'],
  profile: {
    name: 'Alice',
    age: 25,
  },
};

//errors:
// userWithPosts.id = 2;
// userWithPosts.posts.push('New post');
// userWithPosts.profile.name = 'Bob';

export {};
