import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssessmentCurrent } from './assessment_current.entity';
import { AssessmentFuture } from './assessment_future.entity';
import { UserExcel } from '../userexcel/userexcel.entity';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectRepository(AssessmentCurrent)
    private currentRepo: Repository<AssessmentCurrent>,
    @InjectRepository(AssessmentFuture)
    private futureRepo: Repository<AssessmentFuture>,
    @InjectRepository(UserExcel)
    private userRepo: Repository<UserExcel>,
  ) {}

  async saveCurrentAssessment(email: string, answers: number[]) {
    const current = this.currentRepo.create({ email, answers });
    return await this.currentRepo.save(current);
  }

  async saveFutureAssessment(email: string, answers: number[]) {
    const future = this.futureRepo.create({ email, answers });
    return await this.futureRepo.save(future);
  }

  async getUserAssessmentStatuses() {
    const users = await this.userRepo.find();
    const currents = await this.currentRepo.find();
    const futures = await this.futureRepo.find();

    const answeredEmails = new Set<string>();
    currents.forEach((c) => answeredEmails.add(c.email));
    futures.forEach((f) => answeredEmails.add(f.email));

    return users.map((user) => ({
      name: user.name,
      email: user.email,
      agency: {
        EVP: user.agencyEVP,
        SVP: user.agencySVP,
        DM: user.agencyDM,
      },
      status: answeredEmails.has(user.email) ? 'ทำแล้ว' : 'ยังไม่ได้ทำ',
    }));
  }
}
