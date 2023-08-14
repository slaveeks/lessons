import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonsModel } from './lessons.model';
import { LessonStudentModel } from './lesson-student.model';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { TeacherService } from '../teacher/teacher.service';
import { parseISO, differenceInYears } from 'date-fns';
import { GetLessonsDto } from './dto/get-lessons.dto';

/**
 * Set defaults for lessons per page and page
 */
const DefaultLessonsPerPage = 5;
const DefaultPage = 1;

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

    let teachers = [];
    /**
     * Get teachers by ids
     */
    if (teacherIds && teacherIds.length > 0) {
      teachers = await this.teacherService.getTeachersByIds(teacherIds);
    }

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

  /**
   * Get lessons with pagination and filters
   * @param getLessonsDto - DTO with filters
   */
  async getLessons(getLessonsDto: GetLessonsDto) {
    const {
      teacherIds = [],
      studentsCount = [],
      date = [],
      status,
      lessonsPerPage = DefaultLessonsPerPage,
      page = DefaultPage,
    } = getLessonsDto;

    /**
     * Create query builder for lessons
     */
    let query = this.lessonsRepository.createQueryBuilder('lessons');

    /**
     * Add select for count of visits
     */
    query = query.addSelect('COUNT(visits."lessonId")', 'lessons_visitCount');

    /**
     * Left join with teachers table to show teachers in response
     */
    query = query.leftJoinAndSelect('lessons.teachers', 'teachers');

    /**
     * Filter by teacher ids, if they are provided in request
     */
    if (teacherIds.length > 0) {
      query = query.where('teachers.id IN (:...teacherIds)', {
        teacherIds: teacherIds,
      });
    }
    query = query.addGroupBy('teachers.id');

    /**
     * Filter lessons by status, if it is provided in request, it can be 0, so we check it
     */
    if (status || status === 0) {
      query = query.andWhere('lessons.status = :status', {
        status: getLessonsDto.status,
      });
    }

    /**
     * Filter lessons by date, if it is provided in request
     */
    if (date.length > 0) {
      /**
       * If dates array length more than 1, it means that we have date range, else we have only one date
       */
      if (date.length > 1) {
        query = query.andWhere(
          'lessons.date BETWEEN :firstDate AND :lastDate',
          {
            firstDate: date[0],
            lastDate: date[1],
          },
        );
      } else {
        query = query.andWhere('lessons.date = :date', {
          date: date[0],
        });
      }
    }

    /**
     * Left join with lesson-student table to show lessonStudent in response, then left join with student table to show student in response
     */
    query = query
      .leftJoinAndSelect(
        'lessons.lessonStudent',
        'ls',
        'lessons.id = ls.lessonId',
      )
      .leftJoinAndSelect('ls.student', 'student');

    /**
     * Check if students count array is provided in request, it can be range or one number
     */
    if (studentsCount.length > 0) {
      if (studentsCount.length > 1) {
        query = query.having('COUNT(ls.studentId) BETWEEN :min AND :max', {
          min: studentsCount[0],
          max: studentsCount[1],
        });
      } else {
        query = query.having('COUNT(ls.studentId) = :count', {
          count: studentsCount[0],
        });
      }
    }

    /**
     * Add select for count of visits
     */
    query = query.leftJoin(
      (subQuery) => {
        return subQuery
          .select('ls.lessonId', 'lessonId')
          .from('lesson-student', 'ls')
          .where('ls.visited = true');
      },
      'visits',
      'lessons.id = visits."lessonId"',
    );

    query = query.addGroupBy('lessons.id');
    query = query.addGroupBy('ls.id');
    query = query.addGroupBy('student.id');

    query = query.offset(lessonsPerPage * (page - 1));
    query = query.limit(lessonsPerPage);

    /**
     * Get lessons from database
     */
    const lessons = await query.getMany();

    /**
     * Parse visit count to number, because it is string after query
     */
    const lessonsWithNumberVisitCount = lessons.map((lesson) => {
      lesson.visitCount = Number(lesson.visitCount);

      return lesson;
    });

    /**
     * Add students array to lesson object, remove lessonStudent array
     */
    return lessonsWithNumberVisitCount.map((lesson) => {
      const students = lesson.lessonStudent.map((ls) => ls.student);
      delete lesson.lessonStudent;

      return {
        ...lesson,
        students: students,
      };
    });
  }
}
