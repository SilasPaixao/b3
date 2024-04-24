import { ValidationComposite, RequiredFieldValidation } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeAddStockValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['year', 'stock', 'acronym', 'profit']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
