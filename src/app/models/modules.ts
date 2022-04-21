import Categories from "./categories";

export default class Modules {
  constructor(
    public _id: string,
    public id: number,
    public name: string,
    public categories: Categories[],
    public numDoc: number
  ) { }
}
