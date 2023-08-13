import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'DateString', async: false })
export class DateStringValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  defaultMessage(args: ValidationArguments) {
    return `The field ${args.property} must be a date string (YYYY-MM-DD)`;
  }
}
