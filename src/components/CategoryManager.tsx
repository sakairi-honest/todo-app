import { useState } from 'react';
import { useTodo } from '../context/TodoContext';

export function CategoryManager() {
  const { categories, tags, addCategory, deleteCategory, addTag, deleteTag } = useTodo();
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [showManager, setShowManager] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTag(newTag.trim());
      setNewTag('');
    }
  };

  const handleDeleteCategory = (category: string) => {
    if (confirm(`カテゴリ「${category}」を削除しますか？\n（関連するTODOからも削除されます）`)) {
      deleteCategory(category);
    }
  };

  const handleDeleteTag = (tag: string) => {
    if (confirm(`タグ「${tag}」を削除しますか？\n（関連するTODOからも削除されます）`)) {
      deleteTag(tag);
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white drop-shadow-md">🏷️ カテゴリ・タグ管理</h2>
        <button
          onClick={() => setShowManager(!showManager)}
          className="text-sm text-white hover:text-blue-200 font-semibold transition-colors"
        >
          {showManager ? '🔼 閉じる' : '🔽 開く'}
        </button>
      </div>

      {showManager && (
        <div className="space-y-6">
          {/* カテゴリ管理 */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-white drop-shadow">📂 カテゴリ</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                className="flex-1 px-4 py-3 bg-white/30 backdrop-blur border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60 text-white font-medium transition-all"
                placeholder="新しいカテゴリ名"
              />
              <button
                onClick={handleAddCategory}
                className="px-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg transition-all"
              >
                追加
              </button>
            </div>

            {categories.length === 0 ? (
              <p className="text-white/70 text-sm font-medium drop-shadow">カテゴリはまだありません</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <div
                    key={category}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-full shadow-md font-semibold"
                  >
                    <span>{category}</span>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="hover:text-red-200 font-bold transition-colors"
                      title="削除"
                    >
                      ✖️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* タグ管理 */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-white drop-shadow">🔖 タグ</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                className="flex-1 px-4 py-3 bg-white/30 backdrop-blur border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60 text-white font-medium transition-all"
                placeholder="新しいタグ名"
              />
              <button
                onClick={handleAddTag}
                className="px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg transition-all"
              >
                追加
              </button>
            </div>

            {tags.length === 0 ? (
              <p className="text-white/70 text-sm font-medium drop-shadow">タグはまだありません</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full shadow-md font-semibold"
                  >
                    <span>#{tag}</span>
                    <button
                      onClick={() => handleDeleteTag(tag)}
                      className="hover:text-red-200 font-bold transition-colors"
                      title="削除"
                    >
                      ✖️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {!showManager && (
        <div className="text-sm text-white/80 font-semibold drop-shadow">
          カテゴリ: {categories.length} 個 | タグ: {tags.length} 個
        </div>
      )}
    </div>
  );
}
