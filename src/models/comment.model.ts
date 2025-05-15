import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Task } from "./task.model";
import { User } from "./user.model";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "task_id" })
  taskId: number;

  @Column("text", { name: "user_id" })
  userId: number;

  @Column("text", { name: "content" })
  content: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Task, (task) => task.comments)
  @JoinColumn([{ name: "task_id", referencedColumnName: "id" }])
  task: Task;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @BeforeInsert()
  updateDateCreation() {
    const currentDate = new Date();
    this.createdAt = currentDate;
  }
}
