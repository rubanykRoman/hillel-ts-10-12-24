import { ValidateField } from '../../homework-13-1/decoratorsPart3';
import { EMAIL_REGEX, PHONE_REGEX, URL_REGEX } from '../../homework-13-1/constants';

const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

describe('ValidateField decorator tests', () => {
  afterEach(() => {
    consoleLogMock.mockClear();
  });

  it('should log errors if constraints are violated', () => {
    class TestClass {
      @ValidateField({ minLength: 3 })
      name = 'ab';

      @ValidateField({ maxLength: 5 })
      shortText = 'abcdef';

      @ValidateField({ pattern: EMAIL_REGEX })
      email = 'invalid-email';

      @ValidateField({ pattern: PHONE_REGEX })
      phone = 'invalid-phone';

      @ValidateField({ pattern: URL_REGEX })
      website = 'invalid-url';
    }

    new TestClass();

    expect(consoleLogMock).toHaveBeenCalledWith("name can't be less than 3 symbols.");
    expect(consoleLogMock).toHaveBeenCalledWith("shortText can't be more than 5 symbols.");
    expect(consoleLogMock).toHaveBeenCalledWith('email does not match the required pattern.');
    expect(consoleLogMock).toHaveBeenCalledWith('phone does not match the required pattern.');
    expect(consoleLogMock).toHaveBeenCalledWith('website does not match the required pattern.');
  });

  it('should not log errors if constraints are respected', () => {
    class TestClass {
      @ValidateField({ minLength: 3, maxLength: 10 })
      name = 'validName';

      @ValidateField({ pattern: EMAIL_REGEX })
      email = 'test@example.com';

      @ValidateField({ pattern: PHONE_REGEX })
      phone = '+1234567890';

      @ValidateField({ pattern: URL_REGEX })
      website = 'https://example.com';
    }

    new TestClass();

    expect(consoleLogMock).not.toHaveBeenCalled();
  });
});
