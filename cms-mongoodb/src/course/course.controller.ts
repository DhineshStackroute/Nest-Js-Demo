import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course, CourseStatus } from './schema/course.schema';
import { CreateCourseDto } from './dto/create-course';
import { v4 as uuidv4 } from 'uuid';
@Controller('course')
export class CourseController {
    // add a service a dpencey
    constructor(private courseService: CourseService) {}

    // create a controller to add a new Course
    @Post()
    async addCourse(@Body() newcourse: CreateCourseDto): Promise<Course> {

        const course:Course={
            id:uuidv4(),
            name: newcourse.name,
            description: newcourse.description,
            price: newcourse.price,
            duration: newcourse.duration,
            status: CourseStatus.STARTED
        }
        const res = await this.courseService.addCourse(course);
        return res;
    }

    // Get ALl Cources
    @Get()
    async getAllCourses(): Promise<Course[]> {
        const res = await this.courseService.getAllCourses();
        return res;
    }
    //  Get the Course by Id
    @Get(':id')
    async getCourseById(@Param("id") id: string): Promise<Course> {
        const res = await this.courseService.getCourseById(id);
        return res;
    }
    // Delete the Course by Id
    @Delete(':id')
    async deleteCourse(@Param("id") id: string): Promise<string> {
        const res = await this.courseService.deleteCourse(id);
        return res;
    }
}
