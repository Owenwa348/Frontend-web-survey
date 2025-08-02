import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { AssessmentService } from './assessment.service';
import { AssessmentCurrent } from './assessment_current.entity';

@Controller('assessment')
@UseGuards(AuthGuard)
export class AssessmentController {
  constructor(
    private readonly assessmentService: AssessmentService,

    @InjectRepository(AssessmentCurrent)
    private readonly assessmentCurrentRepository: Repository<AssessmentCurrent>,
  ) {}

  @Post('current')
  async submitCurrent(
    @Req() req: Request,
    @Body() body: { answers: number[] },
  ) {
    const email = req.user?.email;
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.assessmentService.saveCurrentAssessment(email, body.answers);
  }

  @Post('future')
  async submitFuture(@Req() req: Request, @Body() body: { answers: number[] }) {
    const email = req.user?.email;
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.assessmentService.saveFutureAssessment(email, body.answers);
  }

  @Get('user-status')
  async getUserAssessmentStatus() {
    return this.assessmentService.getUserAssessmentStatuses();
  }

  @Get('check/:email')
  async checkAssessmentStatus(
    @Param('email') email: string,
  ): Promise<{ hasSubmitted: boolean }> {
    const existing = await this.assessmentCurrentRepository.findOne({
      where: { email },
    });
    return { hasSubmitted: !!existing };
  }
}
