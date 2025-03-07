import { Email, MaxLength, MinLength } from '../../homework-13-1/decoratorsPart2';

const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

describe('Decorators tests', () => {
  afterEach(() => {
    consoleLogMock.mockClear();
  });

  it('should log error if MinLength constraint is violated', () => {
    class TestClass {
      @MinLength(3)
      text = 'ab';
    }

    new TestClass();

    expect(consoleLogMock).toHaveBeenCalledWith("text can't be less than 3 symbols");
  });

  it('should log error if MaxLength constraint is violated', () => {
    class TestClass {
      @MaxLength(5)
      text = 'abcdef';
    }

    new TestClass();

    expect(consoleLogMock).toHaveBeenCalledWith("text can't be more than 5 symbols");
  });

  it('should log error if email is not valid', () => {
    class TestClass {
      @Email()
      email = 'invalid-email';
    }

    new TestClass();

    expect(consoleLogMock).toHaveBeenCalledWith('email field must be a valid email address.');
  });

  it('should not log errors if constraints are respected', () => {
    class TestClass {
      @MinLength(3)
      @MaxLength(5)
      text = 'test';

      @Email()
      email = 'test@example.com';
    }

    new TestClass();

    expect(consoleLogMock).not.toHaveBeenCalled();
  });
});
