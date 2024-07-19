// src/api/todoApi.ts
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

// Function to list all Todos
export const listTodos = async () => {
    const { data: todos, errors } = await client.models.Todo.list();
    if (errors) {
        console.error(errors);
        throw new Error('Failed to fetch todos');
    }
    return todos;
};

// Function to get a specific Todo by ID
export const getTodo = async (id: string) => {
    const { data: todo, errors } = await client.models.Todo.get({ id });
    // First, check for API-reported errors
    if (errors) {
        console.error(errors);
        throw new Error(`Failed to fetch todo with ID ${id}`);
    }

    // Check if the data returned is null
    if (!todo) {
        throw new Error(`Todo with ID ${id} not found`);
    }

    return todo;
};

