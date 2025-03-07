import IDeprecatedMethod from './interfaces/IDeprecatedMethod';

export function DeprecatedMethod({ reason, alternative }: IDeprecatedMethod) {
  return function <T, A extends any[], R>(
    originalMethod: (...args: A) => R,
    context: ClassMethodDecoratorContext<T, (...args: A) => R>
  ) {
    if (context.kind !== 'method') throw new Error('Method-only decorator');

    function replacementMethod(this: T, ...args: A): R {
      console.warn(
        `${String(context.name)} is deprecated: ${reason}. You should use ${alternative ?? 'another method'}.`
      );
      return originalMethod.apply(this, args);
    }

    return replacementMethod;
  };
}

//example
class SomeLibraryClass {
  @DeprecatedMethod({
    reason: 'Method is outdated',
    alternative: 'newMethod',
  })
  firstOldMethod() {
    console.log('First old method');
  }

  @DeprecatedMethod({ reason: 'Legacy support only' })
  secondOldMethod() {
    console.log('Second old method');
  }

  newMethod() {
    console.log('New method');
  }
}

const example = new SomeLibraryClass();
example.firstOldMethod();
example.secondOldMethod();
example.newMethod();
