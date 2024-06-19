import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Exercise } from './exercise.entity';
import { Circuit } from './circuit.entity';

@Entity()
@ObjectType()
export class Workout {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  instructor: string;

  @Column('simple-array')
  @Field(() => [String])
  equipments: string[];

  @OneToMany(() => Exercise, (exercise) => exercise.workout, { cascade: true })
  @Field(() => [Exercise])
  warmup: Exercise[];

  @OneToMany(() => Circuit, (circuit) => circuit.workout, { cascade: true })
  @Field(() => [Circuit])
  circuits: Circuit[];

  @Column()
  @Field(() => Int)
  duration: number;
}
