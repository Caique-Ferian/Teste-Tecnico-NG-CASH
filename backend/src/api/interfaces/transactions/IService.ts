export type ITransaction = {
  balance: number,
  accountsIds: number[],
};
export type IResponse<T> = {
  code: number,
  data?: T | T[],
};

export default interface IService<T> {
  transaction(obj: ITransaction): Promise<IResponse<T>>;
  findAll(type: string | null, id:number): Promise<IResponse<T>>
}
