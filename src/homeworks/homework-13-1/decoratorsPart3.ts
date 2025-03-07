import { EMAIL_REGEX, PHONE_REGEX, URL_REGEX } from './constants';
import IValidateField from './interfaces/IValidateField';

export function ValidateField({ minLength, maxLength, pattern }: IValidateField) {
  return function <T, V>(originalProperty: undefined, context: ClassFieldDecoratorContext<T, V>) {
    if (context.kind !== 'field') throw new Error('Field-only decorator');

    function updatedProperty(this: T, originalValue: V): V {
      if (typeof originalValue !== 'string' && typeof originalValue !== 'number') {
        console.log(`${String(context.name)} must be a string or a number.`);
      }

      const valueAsString = `${originalValue}`;

      if (minLength !== undefined && valueAsString.length < minLength) {
        console.log(`${String(context.name)} can't be less than ${minLength} symbols.`);
      }
      if (maxLength !== undefined && valueAsString.length > maxLength) {
        console.log(`${String(context.name)} can't be more than ${maxLength} symbols.`);
      }
      if (pattern && !pattern.test(valueAsString)) {
        console.log(`${String(context.name)} does not match the required pattern.`);
      }

      return originalValue;
    }

    return updatedProperty;
  };
}

//example
class CorrectSignUpForm {
  @ValidateField({ minLength: 2, maxLength: 50 })
  name: string = 'John';

  @ValidateField({ minLength: 10, maxLength: 100, pattern: EMAIL_REGEX })
  email: string = 'test@test.com';

  @ValidateField({ pattern: PHONE_REGEX })
  phone: number = 1234567890;

  @ValidateField({ pattern: URL_REGEX })
  website: string = 'https://example.com';
}

class ExampleFailForm {
  @ValidateField({ minLength: 5, maxLength: 50 })
  name: string = 'J';

  @ValidateField({ minLength: 10, maxLength: 100, pattern: EMAIL_REGEX })
  email: string = 'invalid-email';

  @ValidateField({ minLength: 11, maxLength: 14, pattern: PHONE_REGEX })
  phone: string = '12345';

  @ValidateField({ pattern: URL_REGEX })
  website: string = 'invalid-url';
}

const exampleCorrectForm = new CorrectSignUpForm();
const exampleFailForm = new ExampleFailForm();
