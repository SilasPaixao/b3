export interface AddStockModel {
  year: string,
  stock: string,
  acronym: string,
  lucro: string
}

export interface AddStock {
  add (data: AddStockModel): Promise<void>
}
