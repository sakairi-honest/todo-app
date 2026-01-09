import { TodoProvider } from './context/TodoContext';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { CategoryManager } from './components/CategoryManager';

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
        {/* 背景のアニメーション要素 */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
          <header className="mb-10 text-center">
            <h1 className="text-6xl font-black text-white mb-3 drop-shadow-lg tracking-tight">
              ✨ TODO App
            </h1>
            <p className="text-white/90 text-lg font-medium drop-shadow">
              タスクを整理して、生産性を向上させよう
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <TodoForm />
              <TodoList />
            </div>

            <div className="space-y-6">
              <CategoryManager />
              <TodoFilters />
            </div>
          </div>

          <footer className="mt-10 text-center text-sm text-white/70 font-medium">
            <p>© 2026 TODO App - React + TypeScript + Tailwind CSS</p>
          </footer>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
