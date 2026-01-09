import { useState, FormEvent } from 'react';
import { useTodo } from '../context/TodoContext';
import { Priority } from '../types/todo';

export function TodoForm() {
  const { addTodo, categories, tags, addCategory, addTag } = useTodo();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('タイトルを入力してください');
      return;
    }

    addTodo({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      priority,
      dueDate: dueDate || undefined,
      categories: selectedCategories,
      tags: selectedTags,
    });

    // フォームをリセット
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setSelectedCategories([]);
    setSelectedTags([]);
    setShowForm(false);
  };

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

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30 mb-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white drop-shadow-md">✨ 新しいTODOを追加</h2>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2 bg-white/30 backdrop-blur border border-white/40 hover:bg-white/40 rounded-xl text-white font-semibold transition-all"
        >
          {showForm ? '✖️ 閉じる' : '➕ 追加'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold text-white mb-2 drop-shadow">
              タイトル *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white/30 backdrop-blur border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60 text-white font-medium transition-all"
              placeholder="TODOのタイトルを入力"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold text-white mb-2 drop-shadow">
              説明
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-white/30 backdrop-blur border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60 text-white font-medium transition-all"
              placeholder="詳細な説明（オプション）"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-semibold text-white mb-2 drop-shadow">
                優先度
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white font-medium transition-all"
              >
                <option value="low" className="text-gray-800">低</option>
                <option value="medium" className="text-gray-800">中</option>
                <option value="high" className="text-gray-800">高</option>
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-semibold text-white mb-2 drop-shadow">
                期限
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white font-medium transition-all"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2 drop-shadow">
              カテゴリ
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                className="flex-1 px-4 py-3 bg-white/30 backdrop-blur border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60 text-white font-medium transition-all"
                placeholder="新しいカテゴリを追加"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-5 py-3 bg-white/30 backdrop-blur border border-white/40 hover:bg-white/40 rounded-xl text-white font-semibold transition-all"
              >
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategories.includes(category)
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                      : 'bg-white/30 backdrop-blur text-white border border-white/40 hover:bg-white/40'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2 drop-shadow">
              タグ
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 px-4 py-3 bg-white/30 backdrop-blur border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60 text-white font-medium transition-all"
                placeholder="新しいタグを追加"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-5 py-3 bg-white/30 backdrop-blur border border-white/40 hover:bg-white/40 rounded-xl text-white font-semibold transition-all"
              >
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                      : 'bg-white/30 backdrop-blur text-white border border-white/40 hover:bg-white/40'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            ✨ TODOを追加
          </button>
        </form>
      )}
    </div>
  );
}
