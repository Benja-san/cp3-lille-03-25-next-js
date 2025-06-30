export interface ICategory {
  id: number;
  title: string;
  image_path: string;
}

export class Category implements ICategory {
  constructor(
    private _id: number,
    private _title: string,
    private _image_path: string
  ) {}

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get image_path(): string {
    return this._image_path;
  }

  set image_path(value: string) {
    this._image_path = value;
  }
}
