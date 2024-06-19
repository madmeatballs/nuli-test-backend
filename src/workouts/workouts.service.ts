import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from '../schemas/workout.entity';
import { Exercise } from '../schemas/exercise.entity';
import { Circuit } from '../schemas/circuit.entity';

@Injectable()
export class WorkoutsService implements OnModuleInit {
  constructor(
    @InjectRepository(Workout)
    private workoutsRepository: Repository<Workout>,
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
    @InjectRepository(Circuit)
    private circuitsRepository: Repository<Circuit>,
  ) {}

  async onModuleInit() {
    const existingExercisesCount = await this.exercisesRepository.count();

    if (existingExercisesCount > 0) {
      //this is to stop initialization and creating multiple copies of exercise and workout
      console.log('Exercises already exist. Skipping initialization.');
      return;
    }

    await this.initializeExercises();
    await this.createWorkout();
  }

  async findAll(): Promise<Workout[]> {
    return this.workoutsRepository.find({
      relations: ['warmup', 'circuits', 'circuits.exercises'],
    });
  }

  //create mutation to swap exercise

  async initializeExercises() {
    const supersetExercises = [
      {
        name: 'cable kickback (left)',
        sets: 3,
        reps: 15,
        equipmentType: 'cable',
      },
      {
        name: 'cable kickback (right)',
        sets: 3,
        reps: 15,
        equipmentType: 'cable',
      },
      {
        name: 'sumo deadlift',
        sets: 4,
        minReps: 10,
        maxReps: 12,
        weight: 90,
        equipmentType: 'deadlift',
      },
      {
        name: 'dumbbell shoulder press',
        sets: 4,
        reps: 8,
        minWeight: 18,
        maxWeight: 25,
        equipmentType: 'dumbbell',
      },
    ];

    const trisetExercises = [
      {
        name: 'single arm cable row (left)',
        sets: 4,
        minReps: 10,
        maxReps: 12,
        equipmentType: 'cable',
      },
      {
        name: 'single arm cable row (right)',
        sets: 4,
        minReps: 10,
        maxReps: 12,
        equipmentType: 'cable',
      },
      {
        name: 'cable seated row',
        sets: 4,
        minReps: 6,
        maxReps: 8,
        equipmentType: 'cable',
      },
    ];

    const circuitExercises = [
      {
        name: 'dumbbell jump squat',
        sets: 1,
        reps: 1,
        equipmentType: 'dumbbell',
      },
      { name: 'barbell lunge', sets: 1, reps: 1, equipmentType: 'barbell' },
      {
        name: 'plank with stability ball',
        sets: 1,
        secs: 20,
        equipmentType: 'stabilityball',
      },
      {
        name: 'glute bridge hold',
        sets: 1,
        secs: 40,
        equipmentType: 'glutebridge',
      },
    ];

    await this.exercisesRepository.save([
      ...supersetExercises,
      ...trisetExercises,
      ...circuitExercises,
    ]);
  }

  async createWorkout(): Promise<Workout> {
    const warmup = await this.exercisesRepository.save([
      {
        name: 'barbell lunge (left)',
        sets: 2,
        minReps: 6,
        maxReps: 8,
        equipmentType: 'barbell',
      },
      {
        name: 'barbell lunge (right)',
        sets: 2,
        minReps: 6,
        maxReps: 8,
        equipmentType: 'barbell',
      },
      { name: 'sumo deadlift', sets: 2, reps: 10, equipmentType: 'deadlift' },
    ]);

    const circuits = await this.circuitsRepository.save([
      {
        name: 'Superset',
        rounds: 3,
        exercises: [
          {
            name: 'cable kickback (left)',
            sets: 3,
            reps: 15,
            equipmentType: 'cable',
          },
          {
            name: 'cable kickback (right)',
            sets: 3,
            reps: 15,
            equipmentType: 'cable',
          },
          {
            name: 'sumo deadlift',
            sets: 4,
            minReps: 10,
            maxReps: 12,
            weight: 90,
            equipmentType: 'deadlift',
          },
          {
            name: 'dumbbell shoulder press',
            sets: 4,
            reps: 8,
            minWeight: 18,
            maxWeight: 25,
            equipmentType: 'dumbbell',
          },
        ],
      },
      {
        name: 'Triset',
        rounds: 4,
        exercises: [
          {
            name: 'single arm cable row (left)',
            sets: 4,
            minReps: 10,
            maxReps: 12,
            equipmentType: 'cable',
          },
          {
            name: 'single arm cable row (right)',
            sets: 4,
            minReps: 10,
            maxReps: 12,
            equipmentType: 'cable',
          },
          {
            name: 'cable seated row',
            sets: 4,
            minReps: 6,
            maxReps: 8,
            equipmentType: 'cable',
          },
        ],
      },
      {
        name: 'Circuit',
        rounds: 1,
        exercises: [
          {
            name: 'dumbbell jump squat',
            sets: 1,
            reps: 1,
            equipmentType: 'dumbbell',
          },
          { name: 'barbell lunge', sets: 1, reps: 1, equipmentType: 'barbell' },
          {
            name: 'plank with stability ball',
            sets: 1,
            secs: 20,
            equipmentType: 'stabilityball',
          },
          {
            name: 'glute bridge hold',
            sets: 1,
            secs: 40,
            equipmentType: 'glutebridge',
          },
        ],
      },
    ]);

    const workout = this.workoutsRepository.create({
      name: 'Full Body',
      instructor: 'Candice',
      equipments: [
        'barbell',
        'cable',
        'dumbbell',
        'resistanceband',
        'smithmachine',
      ],
      warmup,
      circuits,
      duration: 60,
    });

    return this.workoutsRepository.save(workout);
  }
}
