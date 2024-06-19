import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { WorkoutsModule } from './workouts/workouts.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './schemas/workout.entity';
import { Exercise } from './schemas/exercise.entity';
import { Circuit } from './schemas/circuit.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'nulitestdb.sqlite',
      entities: [Workout, Exercise, Circuit],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src.schema.gql'),
    }),
    WorkoutsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
