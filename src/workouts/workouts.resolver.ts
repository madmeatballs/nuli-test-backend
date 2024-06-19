import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { WorkoutsService } from './workouts.service';
import { Workout } from '../schemas/workout.entity';

@Resolver(() => Workout)
export class WorkoutsResolver {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Query(() => [Workout])
  async getWorkouts(): Promise<Workout[]> {
    return this.workoutsService.findAll();
  }

  //create mutation to swap exercise

  @Mutation(() => Workout)
  async createWorkout(): Promise<Workout> {
    return this.workoutsService.createWorkout();
  }
}
