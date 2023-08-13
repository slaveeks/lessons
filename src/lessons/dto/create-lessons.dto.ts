import { IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { DateStringValidator } from "../../validators/date.validator";

export class CreateLessonsDto {
  @IsOptional()
  @IsNumber({},{each: true})
  teacherIds: number[];
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;
  @IsNumber({},{each: true, message: 'Days must be a number'})
  days: number[];
  @Validate(DateStringValidator)
  firstDate: string;
  @Validate(DateStringValidator)
  lastDate: string;
  @IsOptional()
  @IsNumber({}, { message: 'Lessons count must be a number' })
  lessonsCount: number;
}
