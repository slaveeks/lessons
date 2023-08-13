import { IsIn, IsNumber, IsOptional, Validate } from "class-validator";
import { DateStringArrayValidator } from "../../validators/string-date-list.validator";
import { StringNumberListValidator } from "../../validators/string-number-list.validator";
import { Transform } from "class-transformer";

export class GetLessonsDto {
  @IsOptional()
  @Validate(DateStringArrayValidator)
  date: string;
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber({}, { message: 'Status must be a number' })
  @IsIn([0, 1], { message: 'Status must be 0 or 1' })
  status: number;
  @IsOptional()
  @Validate(StringNumberListValidator)
  teacherIds: string;
  @IsOptional()
  @Validate(StringNumberListValidator)
  studentsCount: string;
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber({}, { message: 'Page must be a number' })
  page: number = 1;
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber({}, { message: 'Lessons per page value must be a number' })
  lessonsPerPage: number = 5;
}
