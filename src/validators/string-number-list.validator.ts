import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'numberArray', async: false })
export class StringNumberListValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    const parsedArray = value.split(',').map(Number);

    if (parsedArray.some(isNaN)) {
      return false;
    }

    return parsedArray.length >= 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `The field ${args.property} must be a comma-separated list of numbers`;
  }
}