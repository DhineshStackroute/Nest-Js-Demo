import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


// define enum for course Stayus
export enum CourseStatus {
  STARTED,
  IN_PROGRESS,
  COMPLETED,
}

// creata a class for Course
@Schema({
  timestamps: true,
  collection: 'courses',
})
export class Course {
  @Prop({
    type: String,
    unique: true,
  })
  id: string;
  @Prop({
    type: String,
    unique: true,
  })
  name: string;
  @Prop({
    type: String,
    required: true,
  })
  description: string;
  @Prop({
    type: Number,
  })
  price: number;
  @Prop({
    type: Number,
    required: true,
  })
  duration: number;
  @Prop()
  status: CourseStatus;
}

// create a  schema based on class
export const CourseSchema = SchemaFactory.createForClass(Course);