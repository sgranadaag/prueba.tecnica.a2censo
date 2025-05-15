import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Comment } from "./comment.model";
import { Project } from "./project.model";
import { User } from "./user.model";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  title: string;

  @Column("text", { name: "email" })
  description: string;

  @Column("integer", { name: "project_id" })
  projectId: number;

  @Column("integer", { name: "assigned_to" })
  assignedTo: number;

  @Column("text", { name: "status" })
  status: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Project;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn([{ name: "assigned_to", referencedColumnName: "id" }])
  user: User;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @BeforeInsert()
  updateDateCreation() {
    const currentDate = new Date();
    this.createdAt = currentDate;
  }
}
