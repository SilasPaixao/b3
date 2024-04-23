export interface AddStockModel {
  year: string,
  stock: string,
  acronym: string,
  profit: string
}

export interface AddStock {
  add (data: AddStockModel): Promise<void>
}
