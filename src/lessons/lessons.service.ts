import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonsModel } from './lessons.model';
import { LessonStudentModel } from './lesson-student.model';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { TeacherService } from '../teacher/teacher.service';
import { parseISO, differenceInYears } from 'date-fns';

/**
 * Type for condition function
 */
type ConditionType = () => boolean;

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonsModel)
    private lessonsRepository: Repository<LessonsModel>,
    @InjectRepository(LessonStudentModel)
    private lessonStudentRepository: Repository<LessonStudentModel>,
    private teacherService: TeacherService,
  ) {}

  async createLessons(createLessonsDto: CreateLessonsDto) {
    /**
     * Set max lessons count and max years range
     */
    const maxLessonsCount = 300;
    const maxYearsRange = 1;

    /**
     * Get data from DTO
     */
    const teacherIds = createLessonsDto.teacherIds;
    const title = createLessonsDto.title;
    const days = createLessonsDto.days;
    const firstDate = createLessonsDto.firstDate;
    const lastDate = createLessonsDto.lastDate;
    let lessonsCount = createLessonsDto.lessonsCount;

    const parsedFirstDate = parseISO(firstDate);
    const currentLessonDate = parsedFirstDate;

    /**
     * Get teachers by ids
     */
    const teachers = await this.teacherService.getTeachersByIds(teacherIds);

    /**
     * Create lessons array
     */
    const lessons = [];

    let condition: ConditionType;

    /**
     * If lessons count is set, set condition to check lessons count, else set condition to check last date
     */
    if (lessonsCount) {
      /**
       * If lessons count is more than max lessons count, set lessons count to max lessons count
       */
      lessonsCount =
        lessonsCount <= maxLessonsCount ? lessonsCount : maxLessonsCount;
      condition = () => lessons.length < lessonsCount;
    } else {
      let parsedLastDate = parseISO(lastDate);

      /**
       * If last date is more than 1 year, set last date to 1 year from first date
       */
      if (differenceInYears(parsedLastDate, parsedFirstDate) >= maxYearsRange) {
        parsedLastDate = new Date(
          parsedFirstDate.getFullYear() + maxYearsRange,
          parsedFirstDate.getMonth(),
          parsedFirstDate.getDate(),
        );
      }
      /**
       * Set condition to check last date
       */
      condition = () =>
        currentLessonDate <= parsedLastDate && lessons.length < maxLessonsCount;
    }
    /**
     * Lessons count is more priority than last date, so we check it first
     */
    while (condition()) {
      const currentDayOfWeek = new Date(currentLessonDate).getDay();

      /**
       * Check if current day of week is in days array
       */
      if (days.includes(currentDayOfWeek)) {
        /**
         * Format date to string like '2021-01-01'
         */
        const formattedDate = currentLessonDate.toISOString().split('T')[0];
        lessons.push({
          title,
          date: formattedDate,
          status: false,
          teachers,
        });
      }
      /**
       * Set next day
       */
      currentLessonDate.setDate(currentLessonDate.getDate() + 1);
    }

    const createdLessons = await this.lessonsRepository.save(lessons);
    return createdLessons.map((lesson) => lesson.id);
  }
}
