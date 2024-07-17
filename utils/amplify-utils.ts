import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource'; // Ensure this path is correct

const client = generateClient<Schema>();

// List all Todos
export const fetchTodos = async () => {
    try {
        const { data: todos, errors } = await client.models.Todo.list();
        if (errors) {
            console.error('Errors fetching todos:', errors);
            throw new Error('Error fetching todos');
        }
        return todos;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

// Get a single Todo by ID
export const fetchTodo = async (id: string) => {
    try {
        const { data: todo, errors } = await client.models.Todo.get({ id });
        if (errors) {
            console.error('Errors fetching todo:', errors);
            throw new Error('Error fetching todo');
        }
        return todo;
    } catch (error) {
        console.error('Error fetching todo:', error);
        throw error;
    }
};

// Create a new Todo
export const createTodo = async (todo: Partial<Schema['Todo']>) => {
    try {
        const { data: newTodo, errors } = await client.models.Todo.create(todo);
        if (errors) {
            console.error('Errors creating todo:', errors);
            throw new Error('Error creating todo');
        }
        return newTodo;
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
};

// Update an existing Todo
export const updateTodo = async (id: string, todo: Partial<Schema['Todo']>) => {
    try {
        const { data: updatedTodo, errors } = await client.models.Todo.update({ id, ...todo });
        if (errors) {
            console.error('Errors updating todo:', errors);
            throw new Error('Error updating todo');
        }
        return updatedTodo;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
};

// Delete a Todo
export const deleteTodo = async (id: string) => {
    try {
        const { data: deletedTodo, errors } = await client.models.Todo.delete({ id });
        if (errors) {
            console.error('Errors deleting todo:', errors);
            throw new Error('Error deleting todo');
        }
        return deletedTodo;
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};
