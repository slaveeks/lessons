import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'daysOfWeekArray', async: false })
export class DaysOfWeekArray implements ValidatorConstraintInterface {
  validate(value: any) {
    if (!Array.isArray(value)) {
      return false;
    }

    for (const num of value) {
      if (isNaN(num) || num < 0 || num > 6) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `The field ${args.property} must be an array of valid days of week`;
  }
}
