import {
  Entity,
  Column,
  ManyToOne,
  JoinTable,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./project.model";
import { User } from "./user.model";
import { EUserRole } from "~/enums/roles.enum";

@Entity("project_users")
export class ProjectUser {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id" })
  userId: number;

  @Column("integer", { name: "project_id" })
  projectId: number;

  @Column({
    type: "enum",
    enum: EUserRole,
    default: EUserRole.EDITOR,
  })
  role: EUserRole;

  @ManyToOne(() => Project, (project) => project.projectUsers)
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Project;

  @ManyToOne(() => User, (user) => user.projectUsers)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
