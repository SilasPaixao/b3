import { ValidationComposite, RequiredFieldValidation } from '../../../../validation/validators'
import { makeAddStockValidation } from './add-stock-validation-factory'
import { Validation } from '../../../../presentation/protocols/validation'

jest.mock('../../../../validation/validators/validation-composite')

describe('AddStockValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddStockValidation()
    const validations: Validation[] = []
    for (const field of ['year', 'stock', 'acronym', 'profit']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
