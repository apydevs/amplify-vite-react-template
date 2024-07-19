import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getTodo, listTodos } from '../api/todoApi.ts'; // Ensure the path is correct
import { Link } from "react-router-dom";

interface Todo {
    id: string;
    createdAt: string;
    updatedAt: string;
    content?: string | null;
}

function Information() {
    const [isLoading, setIsLoading] = useState(true);
    const [dataTodo, setDataTodo] = useState<Todo | null>(null);
    const [dataTodos, setDataTodos] = useState<Todo[]>([]);
    const { informationId } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (informationId) {
                try {
                    const todo = await getTodo(informationId);
                    setDataTodo(todo);
                } catch (error) {
                    console.error('Error fetching todo:', error);
                    setError(true);
                }
            } else {
                try {
                    const todos = await listTodos();
                    setDataTodos(todos);
                } catch (error) {
                    console.error('Error fetching todos:', error);
                    setError(true);
                }
            }
            setIsLoading(false);
        };

        fetchData();
    }, [informationId]); // Depend on informationId to re-fetch when it changes

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading the data.</div>;
    }

    if (!informationId && dataTodos.length > 0) {
        return (
            <div>
                <h1>Info Page Results</h1>
                <ul>
                    {dataTodos.map(todo => (
                        <li key={todo.id} className="cursor-pointer font-semibold underline">
                            <Link to={`/information/${todo.id}`}>{todo.content}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else if (informationId && dataTodo) {
        return (
            <div>
                <h1>Info Page Results</h1>
                <p>{dataTodo.content || 'No content available'}</p>
            </div>
        );
    } else {
        return (
            <div>
                <h1>404</h1>
            </div>
        );
    }
}

export default Information;
