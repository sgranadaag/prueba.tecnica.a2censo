import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { ProjectUser } from "./projectUser.model";
import { Task } from "./task.model";

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "owner_id" })
  ownerId: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.project)
  projectUsers: ProjectUser[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @BeforeInsert()
  updateDateCreation() {
    const currentDate = new Date();
    this.createdAt = currentDate;
  }
}
