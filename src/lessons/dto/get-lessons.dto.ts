import { IsIn, IsNumber, IsOptional, IsPositive, Min, Validate } from "class-validator";
import { DateStringArrayValidator } from '../../validators/string-date-list.validator';
import { StringNumberListValidator } from '../../validators/string-number-list.validator';
import { Transform } from 'class-transformer';

export class GetLessonsDto {
  /**
   * @example 2021-01-01,2021-01-02
   */
  @IsOptional()
  @Validate(DateStringArrayValidator)
  @Transform(({ value }) => {
    return value.split(',');
  })
  date: string[];
  /**
   * @example 0
   */
  @IsNumber({}, { message: 'Status must be a number' })
  @IsOptional()
  @IsIn([0, 1], { message: 'Status must be 0 or 1' })
  @Transform(({ value }) => {
    return Number(value);
  })
  status: number;
  /**
   * @example 1,2,3
   */
  @IsOptional()
  @Validate(StringNumberListValidator)
  @Transform(({ value }) => {
    return value.split(',').map(Number);
  })
  teacherIds: string;
  /**
   * @example 1,2,3
   */
  @IsOptional()
  @Validate(StringNumberListValidator)
  @Transform(({ value }) => {
    return value.split(',').map(Number);
  })
  studentsCount: number[];
  /**
   * @example 1
   */
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be greater than 0' })
  page: number;
  /**
   * @example 5
   */
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber({}, { message: 'Lessons per page value must be a number' })
  @IsPositive({ message: 'Lessons per page value must be greater than 0' })
  lessonsPerPage: number;
}
