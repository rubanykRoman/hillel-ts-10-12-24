export default interface IRemoveTodo {
  id: number;
  confirmRemoving?: () => boolean;
}
