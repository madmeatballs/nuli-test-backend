import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsService } from './workouts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Workout } from '../schemas/workout.entity';
import { Exercise } from '../schemas/exercise.entity';
import { Circuit } from '../schemas/circuit.entity';
import { Repository } from 'typeorm';

describe('WorkoutsService', () => {
  let service: WorkoutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutsService,
        {
          provide: getRepositoryToken(Workout),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Exercise),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Circuit),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<WorkoutsService>(WorkoutsService);
  });

  describe('findAll', () => {
    it('should return all workouts with related entities', async () => {
      jest.spyOn(service['workoutsRepository'], 'find').mockResolvedValue([]);

      expect(await service.findAll()).toEqual([]);
    });
  });
});
