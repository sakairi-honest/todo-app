import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo, TodoContextType, TodoFilter, TodoState } from '../types/todo';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const initialState: TodoState = {
  todos: [],
  categories: [],
  tags: [],
  filter: {
    status: 'all',
  },
};

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<TodoState>('todo-app-state', initialState);

  const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newTodo: Todo = {
      ...todoData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    setState(prev => ({
      ...prev,
      todos: [...prev.todos, newTodo],
    }));
  };

  const updateTodo = (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>) => {
    setState(prev => ({
      ...prev,
      todos: prev.todos.map(todo =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      ),
    }));
  };

  const deleteTodo = (id: string) => {
    setState(prev => ({
      ...prev,
      todos: prev.todos.filter(todo => todo.id !== id),
    }));
  };

  const toggleTodo = (id: string) => {
    setState(prev => ({
      ...prev,
      todos: prev.todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      ),
    }));
  };

  const setFilter = (filter: Partial<TodoFilter>) => {
    setState(prev => ({
      ...prev,
      filter: { ...prev.filter, ...filter },
    }));
  };

  const addCategory = (category: string) => {
    if (!state.categories.includes(category)) {
      setState(prev => ({
        ...prev,
        categories: [...prev.categories, category],
      }));
    }
  };

  const deleteCategory = (category: string) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category),
      todos: prev.todos.map(todo => ({
        ...todo,
        categories: todo.categories.filter(c => c !== category),
      })),
    }));
  };

  const addTag = (tag: string) => {
    if (!state.tags.includes(tag)) {
      setState(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const deleteTag = (tag: string) => {
    setState(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
      todos: prev.todos.map(todo => ({
        ...todo,
        tags: todo.tags.filter(t => t !== tag),
      })),
    }));
  };

  const value: TodoContextType = {
    ...state,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    addCategory,
    deleteCategory,
    addTag,
    deleteTag,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}
