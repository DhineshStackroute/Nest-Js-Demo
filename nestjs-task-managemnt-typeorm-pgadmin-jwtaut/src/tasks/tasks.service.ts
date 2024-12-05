import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreatetaskDTO } from './dto/create-task';
import { TaskFilterDTO } from './dto/task-filter';

import { Task } from './task.entity';


import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRespository: Repository<Task>,
  ) {}

  // service to get all tasks
  async getAllTasks(): Promise<Task[]> {
    return await this.taskRespository.find();
  }

  // add a new task with dto

  async createTask(createtaskDTO: CreatetaskDTO, user:User): Promise<Task> {
    const { title, description } = createtaskDTO;
    const task = this.taskRespository.create({
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    return await this.taskRespository.save(task);
  }
  // getalltask by user
  async getAllTaskByUser(user:User): Promise<Task[]> {
    return await this.taskRespository.find({
      where: { user },
    });
  }

  // get the task by id
  async getTaskById(id: string, user:User): Promise<Task> {
    return await this.taskRespository.findOne({
      where: { id , user },
    });
  }

  // delete a task

  async deleteTask(id: string, user:User): Promise<void> {
    await this.taskRespository.delete({ id , user});
  }

  // update task status

  async updateTaskStatus(id: string, status: TaskStatus, user:User): Promise<Task> {
    let found = await this.getTaskById(id,user);

    found.status = status;
    return await this.taskRespository.save(found);
  }

  // searrch or filter task
  async getTaskFilter(filterDTO: TaskFilterDTO, user:User): Promise<Task[]> {
    const { status, search } = filterDTO;
    if (status || search) {
      return await this.taskRespository.find({
        where: {
          ...(status && { status }),
          ...(search && { title: search }),
          ...(search && { description: search }),
          user

        },
      });
    } else {
      return await this.taskRespository.find();
    }
  }
}
