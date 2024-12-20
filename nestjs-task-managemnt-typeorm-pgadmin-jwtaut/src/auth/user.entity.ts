import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ unique: true })
    username: string;
    @Column()
    password: string;
    // provide relationship for data
    @OneToMany((_type)=>Task, (task)=>task.user,{eager:false})
    tasks:Task[]
}