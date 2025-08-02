import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcelUploadModule } from './excel-upload/excel-upload.module';
import { UserExcel } from './userexcel/userexcel.entity';
import { UserExcelModule } from './userexcel/userexcel.module';
import { AdminUser } from './admin-user/admin-user.entity';
import { AdminUserModule } from './admin-user/admin-user.module';
import { AuthModule } from './auth/auth.module';
import { AssessmentCurrent } from './assessment/assessment_current.entity';
import { AssessmentFuture } from './assessment/assessment_future.entity';
import { AssessmentModule } from './assessment/assessment.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Tunwalolza10',
      database: 'testproject',
      entities: [UserExcel, AdminUser, AssessmentCurrent, AssessmentFuture],
      synchronize: true,
    }),
    ExcelUploadModule,
    UserExcelModule,
    AdminUserModule,
    AuthModule,
    AssessmentModule, // เพิ่มโมดูล Assessment
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
