import { useMemo, useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

type SortOption = 'createdAt' | 'priority' | 'dueDate';

export function TodoList() {
  const { todos, filter } = useTodo();
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');

  const filteredAndSortedTodos = useMemo(() => {
    // フィルタリング
    let filtered = todos.filter(todo => {
      // ステータスフィルター
      if (filter.status === 'active' && todo.completed) return false;
      if (filter.status === 'completed' && !todo.completed) return false;

      // カテゴリフィルター
      if (filter.category && !todo.categories.includes(filter.category)) return false;

      // タグフィルター
      if (filter.tag && !todo.tags.includes(filter.tag)) return false;

      // 優先度フィルター
      if (filter.priority && todo.priority !== filter.priority) return false;

      return true;
    });

    // ソート
    filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      if (sortBy === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }

      // デフォルト: 作成日順（新しい順）
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return filtered;
  }, [todos, filter, sortBy]);

  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white drop-shadow-md">
          📋 TODOリスト
          <span className="text-sm text-white/80 ml-2 font-semibold">
            (完了: {completedCount} / 全体: {todos.length})
          </span>
        </h2>

        <div className="flex items-center gap-2">
          <label htmlFor="sortBy" className="text-sm text-white font-semibold drop-shadow">
            並び順:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 bg-white/30 backdrop-blur border border-white/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/50 text-white font-medium transition-all"
          >
            <option value="createdAt" className="text-gray-800">作成日順</option>
            <option value="priority" className="text-gray-800">優先度順</option>
            <option value="dueDate" className="text-gray-800">期限順</option>
          </select>
        </div>
      </div>

      {filteredAndSortedTodos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/80 text-lg font-medium drop-shadow">
            {todos.length === 0
              ? '📝 TODOがありません。新しいTODOを追加してください。'
              : '🔍 フィルター条件に一致するTODOがありません。'}
          </p>
        </div>
      ) : (
        <div>
          {filteredAndSortedTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}

      {activeCount > 0 && (
        <div className="mt-4 text-center text-sm text-white/70 font-semibold drop-shadow">
          ⚡ 未完了のタスクが {activeCount} 件あります
        </div>
      )}
    </div>
  );
}
