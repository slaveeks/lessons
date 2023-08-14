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

  async getLessons(getLessonsDto: GetLessonsDto) {
    let parsedTeacherIds;
    let parsedStudentsCount;
    let parsedDate;
    const { teacherIds, studentsCount, date, page, lessonsPerPage } =
      getLessonsDto;
    const parsedPage = page || 1;
    const parsedLessonsPerPage = lessonsPerPage || 5;
    if (teacherIds) {
      parsedTeacherIds = teacherIds.split(',').map((id) => +id);
    }

    console.log(getLessonsDto);

    if (studentsCount) {
      parsedStudentsCount = studentsCount.split(',');
      parsedStudentsCount =
        parsedStudentsCount.length > 1
          ? parsedStudentsCount
          : parsedStudentsCount[0];
    }

    if (date) {
      parsedDate = date.split(',');
      parsedDate = parsedDate.length > 1 ? parsedDate : parsedDate[0];
    }

    let query = this.lessonsRepository.createQueryBuilder('lessons');
    query = query.addSelect('COUNT(visits."lessonId")', 'lessons_visitCount');
    if (parsedTeacherIds) {
      query = query
        .innerJoinAndSelect('lessons.teachers', 'teachers')
        .where('teachers.id IN (:...teacherIds)', {
          teacherIds: parsedTeacherIds,
        })
        .addGroupBy('teachers.id');
    } else {
      query = query.leftJoinAndSelect('lessons.teachers', 'teachers');
      query = query.addGroupBy('teachers.id');
    }

    if (getLessonsDto.status) {
      query = query.andWhere('lessons.status = :status', {
        status: Boolean(getLessonsDto.status),
      });
    }

    if (parsedDate) {
      if (Array.isArray(parsedDate)) {
        console.log(parsedDate[1]);
        query = query.andWhere(
          'lessons.date BETWEEN :firstDate AND :lastDate',
          {
            firstDate: parsedDate[0],
            lastDate: parsedDate[1],
          },
        );
      } else {
        query = query.andWhere('lessons.date = :date', {
          date: parsedDate,
        });
      }
    }

    query = query.leftJoinAndSelect('lessons.lessonStudent', 'ls', 'lessons.id = ls.lessonId')
      .leftJoinAndSelect('ls.student', 'student');

    if (parsedStudentsCount || parsedStudentsCount === 0) {
      if (Array.isArray(parsedStudentsCount)) {
        query = query.having(
          'COUNT(ls.studentId) BETWEEN :min AND :max',
          {
            min: parsedStudentsCount[0],
            max: parsedStudentsCount[1],
          },
        );
      } else {
        query = query.having('COUNT(ls.studentId) = :count', {
          count: Number(parsedStudentsCount),
        });
      }
    }

    query = query.leftJoin((subQuery) => {
      return subQuery
        .select('ls.lessonId', 'lessonId')
        .from('lesson-student', 'ls')
        .where('ls.visited = true')
    }, 'visits', 'lessons.id = visits."lessonId"');

    query = query.addGroupBy('lessons.id');
    query = query.addGroupBy('ls.id');
    query = query.addGroupBy('student.id');

    query = query.offset(parsedLessonsPerPage * (parsedPage - 1));
    query = query.limit(parsedLessonsPerPage);
    const lessons = await query.getMany();

    const lessonsWithNumberVisitCount = lessons.map((lesson) => {
      lesson.visitCount = Number(lesson.visitCount);

      return lesson;
    });

    const lessonsWithStudents = lessonsWithNumberVisitCount.map((lesson) => {
      const students = lesson.lessonStudent.map((ls) => ls.student);
      delete lesson.lessonStudent;

      return {
        ...lesson,
        students: students,
      }
    });

    return lessonsWithStudents;
  }
}
