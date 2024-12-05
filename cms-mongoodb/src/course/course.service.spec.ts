// test our Course Service

import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Model } from 'mongoose';
import { Course, CourseStatus } from './schema/course.schema';

describe('CourseService', () => {
  // defien the service
  let courseService: CourseService;
  let model: Model<Course>;

  const mockCourse = {    
    _id: '1223131241jhdfkjsdhfkb',
    id: '1223131241jhdfkjsdhfkb',
    name: 'Test Course',
    description: 'Test Description',
    price: 100,
    duration: 10,
    status: CourseStatus.STARTED,
  };

  // define the MockCourseService values
  const mockCourseService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    // define the testing Module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getModelToken(Course.name),
          useValue: mockCourseService,
        },
      ],
    }).compile();

    // defien the serice to call
    courseService = module.get<CourseService>(CourseService);
    // define the data
    model = module.get<Model<Course>>(getModelToken(Course.name));
  });

  //  write the test case for creating (pasitive, failed)
  describe('addCourse', () => {
    it('should create a course', async () => {
      const course = {
        id: '1223131241jhdfkjsdhfkb',
        name: 'Test Course',
        description: 'Test Description',
        price: 100,
        duration: 10,
        status: CourseStatus.STARTED,
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockCourse));

      const result = await courseService.addCourse(course);

      expect(result).toEqual(mockCourse);

    });
  });
});
