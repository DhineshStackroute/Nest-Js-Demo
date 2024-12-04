import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Course, CourseStatus } from './schema/course.schema';
import { InjectModel } from '@nestjs/mongoose';

// services are used to interact with database
@Injectable()
export class CourseService {
  // inject the db Model
  constructor(
    @InjectModel(Course.name)
    private courseModel: mongoose.Model<Course>,
  ) {}

  //  add a new course
  async addCourse(newcourse: Course): Promise<Course> {
    //  check course already exist
    try {
      const existingCourse = await this.courseModel.findOne({
        name: newcourse.name,
      });
      if (existingCourse) {
        throw new ConflictException('Course already exist');
      } else {
        const res = await this.courseModel.create(newcourse);
        return res;
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
  // get all courses
  async getAllCourses(): Promise<Course[]> {
    const res = await this.courseModel.find();
    return res;
  }
  // get a course by id
  async getCourseById(id: string): Promise<Course> {
    const res = await this.courseModel.findOne({
      id: id,
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException('Course not found');
    }
  }

  // get all courses by price
  async getCourseByPrice(sprice: number): Promise<Course[]> {
    const res = await this.courseModel.find({
      price: sprice,
    });
    return res;
  }
  // update a course status

  // delete a course
  async deleteCourse(id: string): Promise<string> {
    const res = await this.courseModel.findOneAndDelete({ id: id });
  if (!res) {
    throw new NotFoundException('Course not found');
  }
  else{
    return "Deleted Successfully";
  }
    
   
  }
}
