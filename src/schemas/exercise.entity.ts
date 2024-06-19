import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Workout } from './workout.entity';
import { Circuit } from './circuit.entity';

@Entity()
@ObjectType()
export class Exercise {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  sets: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  reps?: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  minReps?: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  maxReps?: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  secs?: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  minWeight?: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  maxWeight?: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  weight?: number;

  @ManyToOne(() => Workout, (workout) => workout.warmup)
  @Field(() => Workout, { nullable: true })
  workout?: Workout;

  @ManyToOne(() => Circuit, (circuit) => circuit.exercises)
  @Field(() => Circuit, { nullable: true })
  circuit?: Circuit;

  @Column({
    type: 'text',
    default: 'barbell',
  })
  @Field()
  equipmentType: string;
}
