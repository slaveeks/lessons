import { IsString, Length } from "class-validator";

export class CreateTeacherDto {
  @IsString({ message: 'Name must be a string' })
  @Length(1, 255, { message: 'Name is required' })
  readonly name: string;
}
