import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Exercise {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  sets: number;

  @Field()
  reps: number;
}

@ObjectType()
export class Circuit {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Exercise])
  exercises: Exercise[];
}

@ObjectType()
export class WarmUp {
  @Field(() => [Exercise])
  exercises: Exercise[];
}

@ObjectType()
export class Workout {
  @Field(() => ID)
  id: string;

  @Field()
  instructor: string;

  @Field()
  title: string;

  @Field(() => WarmUp, { nullable: true })
  warmup?: WarmUp;

  @Field(() => [Exercise])
  exercises: Exercise[];

  @Field(() => [Circuit])
  circuits: Circuit[];
}
