export default interface IModel<T>{
  create(obj: Partial<T>): Promise<T | null>;
  findOne(username: string): Promise<T | null>;
}
