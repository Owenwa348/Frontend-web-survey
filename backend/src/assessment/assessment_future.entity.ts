// src/assessment/entities/assessment-future.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('assessment_future')
export class AssessmentFuture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column('json')
  answers: number[];

  @CreateDateColumn()
  createdAt: Date;
}
