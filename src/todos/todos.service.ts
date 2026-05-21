import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodo } from './interfaces/create-todo';
import { UpdateTodo } from './interfaces/update-todo';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

    findAll() {
        return this.todoRepo.find();
    }

    async findById(id: number) {
        const res = await this.todoRepo.findOne({ where: { id: id } });

        if (!res) {
            throw new NotFoundException('Id not found');
        }

        return res;
    }

    async create(data: CreateTodo) {
        const todo = this.todoRepo.create(data);
        return await this.todoRepo.save(todo);
    }

    async update(id: number, data: UpdateTodo) {
        const todo = await this.findById(id);

        if (!todo) {
            return new NotFoundException('Todo not found');
        }

        await this.todoRepo.update(id, data);

        return await this.findById(id);
    }

    async remove(id: number) {
        const todo = await this.findById(id);

        if (!todo) {
            return new NotFoundException('Todo not found');
        }
        await this.todoRepo.delete(id);

        return { sucess: true };
    }
}
