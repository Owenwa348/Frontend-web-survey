// src/assessment/assessment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { AssessmentCurrent } from './assessment_current.entity';
import { AssessmentFuture } from './assessment_future.entity';
import { AuthModule } from '../auth/auth.module';
import { UserExcel } from '../userexcel/userexcel.entity';
import { UserExcelModule } from '../userexcel/userexcel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssessmentCurrent, AssessmentFuture, UserExcel]),
    AuthModule,
    UserExcelModule,
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {}
