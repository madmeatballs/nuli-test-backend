import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsService } from './workouts.service';
import { WorkoutsResolver } from './workouts.resolver';
import { Workout } from '../schemas/workout.entity';
import { Exercise } from '../schemas/exercise.entity';
import { Circuit } from '../schemas/circuit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Exercise, Circuit])],
  providers: [WorkoutsService, WorkoutsResolver],
})
export class WorkoutsModule {}
