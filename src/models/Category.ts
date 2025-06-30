export interface ICategory {
  id: number
  title: string
}

export class Category implements ICategory {
  constructor(private _id: number, private _title: string) {}

  get id(): number {
    return this._id
  }

  get title(): string {
    return this._title
  }

  set title(value: string) {
    this._title = value
  }
}
