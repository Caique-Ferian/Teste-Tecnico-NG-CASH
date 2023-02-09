export type IResponse<T> = {
  code: number,
  data?: T | T[],
  token?: string,
};

export default interface IService<T> {
  register(obj: Partial<T>): Promise<IResponse<T>>;
  login(obj: Partial<T>): Promise<IResponse<T>>
  findOne(username:string): Promise<IResponse<T | null>>
}
