const fetchData = (): unknown => ({
  name: 'John',
  age: 25,
});

type TUser = {
  name: string;
  age: number;
};

const user: TUser = fetchData() as TUser;
const anotherUser: TUser = <TUser>fetchData();

function isUserAsserts(person: any): asserts person is TUser {
  if (!('name' in person && 'age' in person)) {
    throw new Error(`This person is not a user`);
  }
}

const printPersonInfo = (person: unknown) => {
  isUserAsserts(person);
  console.log('This person is', person.name, 'and he is', person.age, 'years old');
};

printPersonInfo(fetchData());
printPersonInfo(user);
printPersonInfo(anotherUser);
