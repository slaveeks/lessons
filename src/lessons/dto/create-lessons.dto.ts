export class CreateLessonsDto {
  teacherIds: number[];
  title: string;
  days: number[];
  firstDate: string;
  lastDate: string;
  lessonsCount: number;
}
