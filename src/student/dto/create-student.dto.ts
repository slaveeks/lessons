import { IsString, Length } from "class-validator";

export class CreateStudentDto {
  @IsString({ message: 'Name must be a string' })
  @Length(1, 255, { message: 'Name is required' })
  readonly name: string;
}
