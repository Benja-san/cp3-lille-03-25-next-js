export interface IRecipe {
  id: number
  title: string
  description: string
  ingredients: string
  picture: string
  categoryId: number | null
  categoryTitle?: string
}

export class Recipe implements IRecipe {
  constructor(
    private _id: number,
    private _title: string,
    private _description: string,
    private _ingredients: string,
    private _picture: string,
    private _categoryId: number | null,
    private _categoryTitle?: string
  ) {}

  get id(): number {
    return this._id
  }

  get title(): string {
    return this._title
  }

  set title(value: string) {
    this._title = value
  }

  get description(): string {
    return this._description
  }

  set description(value: string) {
    this._description = value
  }

  get ingredients(): string {
    return this._ingredients
  }

  set ingredients(value: string) {
    this._ingredients = value
  }

  get picture(): string {
    return this._picture
  }

  set picture(value: string) {
    this._picture = value
  }

  get categoryId(): number | null {
    return this._categoryId
  }

  set categoryId(value: number | null) {
    this._categoryId = value
  }

  get categoryTitle(): string | undefined {
    return this._categoryTitle
  }

  set categoryTitle(value: string | undefined) {
    this._categoryTitle = value
  }
}
