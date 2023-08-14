import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { DateStringValidator } from '../../validators/date.validator';

export class CreateLessonsDto {
  /**
   * @example [1,2,3]
   */
  @IsOptional()
  @IsNumber(
    {},
    {
      each: true,
    },
  )
  teacherIds: number[];
  /**
   * @example "Title"
   */
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @Length(1, 255, { message: 'Title must be between 1 and 255 characters' })
  title: string;
  /**
   * @example [1,2,3]
   * TODO: add validation for days
   */
  @IsNumber(
    {},
    {
      each: true,
      message: 'Days must be a number',
    },
  )
  days: number[];
  /**
   * @example "2021-01-01"
   */
  @Validate(DateStringValidator)
  firstDate: string;
  /**
   * @example "2021-01-01"
   */
  @Validate(DateStringValidator)
  lastDate: string;
  /**
   * @example 10
   */
  @IsOptional()
  @IsNumber({}, { message: 'Lessons count must be a number' })
  lessonsCount: number;
}
