import { Controller, Get, Post } from '@nestjs/common';

@Controller('teacher')
export class TeacherController {
  @Post()
  create() {
    return 'This action adds a new teacher';
  }

  @Get()
  findAll() {
    return `This action returns all teacher`;
  }

  @Get(':id')
  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

}
