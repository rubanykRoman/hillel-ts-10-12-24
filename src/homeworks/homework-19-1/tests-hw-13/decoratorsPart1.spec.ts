import { DeprecatedMethod } from '../../homework-13-1/decoratorsPart1';

class TestClass {
  @DeprecatedMethod({ reason: 'Use newMethod instead', alternative: 'newMethod' })
  oldMethod() {
    return 'Old method executed';
  }

  @DeprecatedMethod({ reason: 'Legacy method' })
  legacyMethod() {
    return 'Legacy method executed';
  }

  newMethod() {
    return 'New method executed';
  }
}

describe('DeprecatedMethod decorator', () => {
  let instance: TestClass;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    instance = new TestClass();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  it('should call console.warn with the correct message for oldMethod', () => {
    const result = instance.oldMethod();
    expect(result).toBe('Old method executed');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'oldMethod is deprecated: Use newMethod instead. You should use newMethod.'
    );
  });

  it('should call console.warn with the correct message for legacyMethod', () => {
    const result = instance.legacyMethod();
    expect(result).toBe('Legacy method executed');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'legacyMethod is deprecated: Legacy method. You should use another method.'
    );
  });

  it('should not trigger a warning for newMethod', () => {
    const result = instance.newMethod();
    expect(result).toBe('New method executed');
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});
