// src/assessment/entities/assessment-current.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('assessment_current')
export class AssessmentCurrent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column('json')
  answers: number[];

  @CreateDateColumn()
  createdAt: Date;
}
