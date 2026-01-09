export type Priority = 'low' | 'medium' | 'high';

export type FilterStatus = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  categories: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilter {
  status: FilterStatus;
  category?: string;
  tag?: string;
  priority?: Priority;
}

export interface TodoState {
  todos: Todo[];
  categories: string[];
  tags: string[];
  filter: TodoFilter;
}

export interface TodoContextType extends TodoState {
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: Partial<TodoFilter>) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
}
