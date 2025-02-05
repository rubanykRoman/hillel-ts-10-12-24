import { EMAIL_REGEX } from './constants';

function MinLength(minLength: number) {
  return function <T, V>(originalProperty: undefined, context: ClassFieldDecoratorContext<T, V>) {
    if (context.kind !== 'field') throw new Error('Field-only decorator');

    function updatedProperty(this: T, originalValue: V): V {
      if (typeof originalValue === 'string' && originalValue.length < minLength) {
        throw new Error(`${String(context.name)} can't be less then ${minLength} symbols`);
      }
      return originalValue;
    }

    return updatedProperty;
  };
}

function MaxLength(maxLength: number) {
  return function <T, V>(originalProperty: undefined, context: ClassFieldDecoratorContext<T, V>) {
    if (context.kind !== 'field') throw new Error('Field-only decorator');

    function updatedProperty(this: T, originalValue: V): V {
      if (typeof originalValue === 'string' && originalValue.length > maxLength) {
        throw new Error(`${String(context.name)} can't be more then ${maxLength} symbols`);
      }
      return originalValue;
    }

    return updatedProperty;
  };
}

function Email() {
  return function <T, V>(originalProperty: undefined, context: ClassFieldDecoratorContext<T, V>) {
    if (context.kind !== 'field') throw new Error('Field-only decorator');

    function updatedProperty(this: T, originalValue: V): V {
      if (typeof originalValue === 'string' && !EMAIL_REGEX.test(originalValue)) {
        throw new Error(`${String(context.name)} field must be a valid email address.`);
      }
      return originalValue;
    }

    return updatedProperty;
  };
}

//example
class CorrectSignUpForm {
  @MinLength(2)
  @MaxLength(50)
  name: string = 'John';

  @MinLength(10)
  @MaxLength(100)
  @Email()
  email: string = 'test@test.com';
}

class FailSignUpForm {
  @MinLength(2)
  @MaxLength(50)
  name: string = 'J';

  @MinLength(5)
  @MaxLength(100)
  @Email()
  email: string = '@com';
}

const exampleCorrectForm = new CorrectSignUpForm();
const exampleFailForm = new FailSignUpForm();
