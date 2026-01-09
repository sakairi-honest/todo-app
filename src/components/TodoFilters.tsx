import { useTodo } from '../context/TodoContext';
import { FilterStatus, Priority } from '../types/todo';

export function TodoFilters() {
  const { filter, setFilter, categories, tags } = useTodo();

  const handleStatusChange = (status: FilterStatus) => {
    setFilter({ status });
  };

  const handleCategoryChange = (category: string) => {
    setFilter({ category: category === 'all' ? undefined : category });
  };

  const handleTagChange = (tag: string) => {
    setFilter({ tag: tag === 'all' ? undefined : tag });
  };

  const handlePriorityChange = (priority: string) => {
    setFilter({ priority: priority === 'all' ? undefined : (priority as Priority) });
  };

  const clearFilters = () => {
    setFilter({ status: 'all', category: undefined, tag: undefined, priority: undefined });
  };

  const hasActiveFilters = filter.category || filter.tag || filter.priority || filter.status !== 'all';

  return (
    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white drop-shadow-md">🔍 フィルター</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-white hover:text-blue-200 font-semibold transition-colors"
          >
            ✖️ クリア
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* ステータスフィルター */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2 drop-shadow">
            ステータス
          </label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleStatusChange('all')}
              className={`px-4 py-2 rounded-xl transition-all font-semibold ${
                filter.status === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                  : 'bg-white/30 backdrop-blur text-white border border-white/40 hover:bg-white/40'
              }`}
            >
              全て
            </button>
            <button
              onClick={() => handleStatusChange('active')}
              className={`px-4 py-2 rounded-xl transition-all font-semibold ${
                filter.status === 'active'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                  : 'bg-white/30 backdrop-blur text-white border border-white/40 hover:bg-white/40'
              }`}
            >
              未完了
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={`px-4 py-2 rounded-xl transition-all font-semibold ${
                filter.status === 'completed'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                  : 'bg-white/30 backdrop-blur text-white border border-white/40 hover:bg-white/40'
              }`}
            >
              完了
            </button>
          </div>
        </div>

        {/* カテゴリフィルター */}
        {categories.length > 0 && (
          <div>
            <label htmlFor="categoryFilter" className="block text-sm font-semibold text-white mb-2 drop-shadow">
              カテゴリ
            </label>
            <select
              id="categoryFilter"
              value={filter.category || 'all'}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-3 bg-white/30 backdrop-blur border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white font-medium transition-all"
            >
              <option value="all" className="text-gray-800">全てのカテゴリ</option>
              {categories.map(category => (
                <option key={category} value={category} className="text-gray-800">
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* タグフィルター */}
        {tags.length > 0 && (
          <div>
            <label htmlFor="tagFilter" className="block text-sm font-semibold text-white mb-2 drop-shadow">
              タグ
            </label>
            <select
              id="tagFilter"
              value={filter.tag || 'all'}
              onChange={(e) => handleTagChange(e.target.value)}
              className="w-full px-4 py-3 bg-white/30 backdrop-blur border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white font-medium transition-all"
            >
              <option value="all" className="text-gray-800">全てのタグ</option>
              {tags.map(tag => (
                <option key={tag} value={tag} className="text-gray-800">
                  #{tag}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 優先度フィルター */}
        <div>
          <label htmlFor="priorityFilter" className="block text-sm font-semibold text-white mb-2 drop-shadow">
            優先度
          </label>
          <select
            id="priorityFilter"
            value={filter.priority || 'all'}
            onChange={(e) => handlePriorityChange(e.target.value)}
            className="w-full px-4 py-3 bg-white/30 backdrop-blur border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white font-medium transition-all"
          >
            <option value="all" className="text-gray-800">全ての優先度</option>
            <option value="high" className="text-gray-800">高</option>
            <option value="medium" className="text-gray-800">中</option>
            <option value="low" className="text-gray-800">低</option>
          </select>
        </div>
      </div>
    </div>
  );
}
