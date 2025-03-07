export type TTranslations = {
  [languageCode: string]: string | undefined;
};

export const appTranslations: TTranslations = {
  en: 'Hello!',
  ua: 'Привіт!',
  de: 'Hallo!',
  fr: 'Salut!',
  es: 'Hola!',
  br: 'Olá!',
  cn: undefined,
};

console.log(appTranslations['ua']); // Привіт!
console.log(appTranslations['de']); // Hallo!
// console.log(appTranslations.jp); --- Error: Property 'jp' does not exist on type 'TTranslations'.
console.log(appTranslations['jp']); // undefined

type TOptionalTranslations = {
  default?: string;
};

const extendedTranslations: TTranslations & TOptionalTranslations = {
  ...appTranslations,
  default: 'Hello world!',
};

console.log(extendedTranslations.default); // Hello world!
console.log(extendedTranslations['default']); // Hello world!

console.log(extendedTranslations['ua']); // Привіт!
console.log(extendedTranslations['de']); // Hallo!
// console.log(extendedTranslations.jp); --- Error: Property 'jp' does not exist on type 'TTranslations'.
console.log(extendedTranslations['jp']); // undefined
