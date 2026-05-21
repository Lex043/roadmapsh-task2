import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodo } from './interfaces/update-todo';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
    constructor(private todosService: TodosService) {}

    @Get()
    async getTodos() {
        return this.todosService.findAll();
    }

    @Get(':id')
    async getTodo(@Param('id') id: number) {
        return this.todosService.findById(id);
    }

    @Post()
    async createTodo(@Body() data: CreateTodoDto) {
        return await this.todosService.create(data);
    }

    @Patch(':id')
    async updateTodo(@Param('id') id: number, @Body() data: UpdateTodo) {
        return await this.todosService.update(id, data);
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: number) {
        return await this.todosService.remove(id);
    }
}
