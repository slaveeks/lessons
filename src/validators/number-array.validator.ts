import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'numberArray', async: false })
export class NumberArrayValidator implements ValidatorConstraintInterface {
  validate(value: any[]) {
    if (!Array.isArray(value)) {
      return false;
    }

    for (const num of value) {
      if (isNaN(num) || typeof num !== 'number') {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `The field ${args.property} must be an array of valid numbers`;
  }
}
