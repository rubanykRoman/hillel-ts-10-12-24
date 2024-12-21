import IAuthor from './IAuthor';

export default interface IBook {
  id: number;
  title: string;
  genre: string;
  publicationYear: number;
  author: IAuthor;
}
