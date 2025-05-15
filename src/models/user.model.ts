import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { ProjectUser } from "./projectUser.model";
import { Comment } from "./comment.model";
import { Task } from "./task.model";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "email" })
  email: string;

  @Column("text", { name: "password_hash" })
  passwordHash: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.project)
  projectUsers: ProjectUser[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @BeforeInsert()
  updateDateCreation() {
    const currentDate = new Date();
    this.createdAt = currentDate;
  }
}
