import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreatetaskDTO } from './dto/create-task';
import {  TaskStatus } from './task.model';

import { TaskFilterDTO } from './dto/task-filter';
import { UpdateTaskStatusDTO } from './dto/update-stays';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/custum-decorder/get-user.decorder';
import { User } from 'src/auth/user.entity';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  // Create  a controoler endpoint to access all tasks

  // @Get()
  // getAllTasks() {
  //   return this.taskService.getAllTasks();
  // }
  // Creat  a controller endpoint to add a new task

  // @Post()
  // createTask(@Body('title') title: string, @Body('description') description: string) {
  //   console.log(title, description);

  //   return this.taskService.createTask(title, description);
  // }

  // creata  acontroller using dto

  @Post()
  createTask(@Body() createtaskDTO: CreatetaskDTO,
  @GetUser() user:User
  ) {
    console.log("Welcome to controller");
    
    return this.taskService.createTask(createtaskDTO, user);
  }
  @Get('/taskByUser')
  getAllTaskByUser(@GetUser() user:User) {
    return this.taskService.getAllTaskByUser(user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user:User) {
    return this.taskService.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user:User) {
    return this.taskService.deleteTask(id,user);
  }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status') status: TaskStatus,
  // ) {
  //   console.log(id, status);

  //   return this.taskService.updateTaskStatus(id, status);
  // }

  @Patch('/:id/updateTask')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTask: UpdateTaskStatusDTO,
    @GetUser() user:User
  ) {
    const status = updateTask.status;

    return this.taskService.updateTaskStatus(id, status, user);
  }


  //  get task by filter

  @Get()
  getTaskFilter(@Query() filterDTO: TaskFilterDTO, @GetUser() user:User) {
    console.log(filterDTO);
    
    if (Object.keys(filterDTO).length) {
      return this.taskService.getTaskFilter(filterDTO, user);
    } else {
      return this.taskService.getAllTaskByUser(user);
    }
  }
}
