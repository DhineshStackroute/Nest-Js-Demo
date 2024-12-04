import { Injectable } from '@nestjs/common';
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
    const res = await this.courseModel.create(newcourse);
    return res;
  }
  // get all courses
  async getAllCourses(): Promise<Course[]> {
    const res = await this.courseModel.find();
    return res;
  }
  // get a course by id
  async getCourseById(id: string): Promise<Course> {
    const res = await this.courseModel.findOne({
        id: id
    });
    return res;
  }

  // get all courses by price
  async getCourseByPrice(sprice: number): Promise<Course[]> {
    const res = await this.courseModel.find(
        {
            price:sprice
        }
    )
    return res;
  }
  // update a course status
 
  // delete a course
  async deleteCourse(id: string): Promise<Course> {
    const res = await this.courseModel.findByIdAndDelete(id);
    return res;
  }
}
