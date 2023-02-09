export type ICreateTransaction<T> = {
  balance: number,
  accounts: T[],
};

export default interface IModel<T, G>{
  findOne(id: number): Promise<G | null>
  create(obj: ICreateTransaction<G>): Promise<T>;
  findAll(type:string | null, id:number): Promise<T[]>;
}
