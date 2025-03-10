import { appTranslations, TTranslations } from '../../homework-6-1/translations';

describe('Translations', () => {
  let translations: TTranslations;
  let extendedTranslations: TTranslations & { default: string };

  beforeAll(() => {
    translations = { ...appTranslations };
    extendedTranslations = {
      ...translations,
      default: 'Hello world!',
    };
  });

  it('should return correct translations', () => {
    expect(translations['en']).toBe('Hello!');
    expect(translations['ua']).toBe('Привіт!');
    expect(translations['de']).toBe('Hallo!');
    expect(translations['fr']).toBe('Salut!');
    expect(translations['es']).toBe('Hola!');
    expect(translations['br']).toBe('Olá!');
  });

  it('should return undefined for unknown language codes', () => {
    expect(translations['jp']).toBeUndefined();
    expect(translations['ru']).toBeUndefined();
  });

  it('should handle extendedTranslations with a default value', () => {
    expect(extendedTranslations.default).toBe('Hello world!');
    expect(extendedTranslations['default']).toBe('Hello world!');
    expect(extendedTranslations['ua']).toBe('Привіт!');
    expect(extendedTranslations['de']).toBe('Hallo!');
    expect(extendedTranslations['jp']).toBeUndefined();
  });
});
