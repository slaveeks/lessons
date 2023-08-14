import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'numberArray', async: false })
export class StringNumberListValidator implements ValidatorConstraintInterface {
  validate(value: any[]) {
    if (value.some(isNaN) || value.some((item) => item < 0)) {
      return false;
    }

    return value.length >= 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `The field ${args.property} must be a comma-separated list of numbers (e.g. 1,2,3)`;
  }
}
