import { AddStock, AddStockModel, AddStockRepository } from './db-add-stock-protocols'

export class DbAddStock implements AddStock {
  constructor (private readonly addStockRepository: AddStockRepository) {}

  async add (data: AddStockModel): Promise<void> {
    await this.addStockRepository.add(data)
  }
}
