import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Exercise } from './exercise.entity';
import { Workout } from './workout.entity';

@Entity()
@ObjectType()
export class Circuit {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  rounds: number;

  @OneToMany(() => Exercise, (exercise) => exercise.circuit, { cascade: true })
  @Field(() => [Exercise])
  exercises: Exercise[];

  @ManyToOne(() => Workout, (workout) => workout.circuits)
  @Field(() => Workout)
  workout: Workout;
}
