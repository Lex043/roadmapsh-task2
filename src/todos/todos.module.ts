import { Module } from '@nestjs/common';
import { Todo } from 'src/entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Todo])],
    controllers: [TodosController],
    providers: [TodosService],
    exports: [TodosService, TypeOrmModule],
})
export class TodosModule {}
