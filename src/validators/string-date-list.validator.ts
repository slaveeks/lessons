import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'DateStringArray', async: false })
export class DateStringArrayValidator implements ValidatorConstraintInterface {
  validate(value: any[]) {
    for (const dateString of value) {
      if (!this.isValidDate(dateString.trim())) {
        return false;
      }
    }

    return true;
  }

  isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  defaultMessage(args: ValidationArguments) {
    return `The field ${args.property} must be a comma-separated list of valid date strings (YYYY-MM-DD)`;
  }
}
