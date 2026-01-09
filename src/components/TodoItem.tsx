import { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { Todo, Priority } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { updateTodo, deleteTodo, toggleTodo, categories, tags } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  const [editCategories, setEditCategories] = useState<string[]>(todo.categories);
  const [editTags, setEditTags] = useState<string[]>(todo.tags);

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert('タイトルを入力してください');
      return;
    }

    updateTodo(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      priority: editPriority,
      dueDate: editDueDate || undefined,
      categories: editCategories,
      tags: editTags,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate || '');
    setEditCategories(todo.categories);
    setEditTags(todo.tags);
    setIsEditing(false);
  };

  const toggleCategory = (category: string) => {
    setEditCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag: string) => {
    setEditTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const priorityColors = {
    low: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white',
    medium: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
    high: 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
  };

  const priorityLabels = {
    low: '低',
    medium: '中',
    high: '高',
  };

  if (isEditing) {
    return (
      <div className="bg-white/30 backdrop-blur-lg p-4 rounded-2xl shadow-xl mb-3 border-2 border-white/50">
        <div className="mb-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="タイトル"
          />
        </div>

        <div className="mb-3">
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="説明"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as Priority)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">低</option>
            <option value="medium">中</option>
            <option value="high">高</option>
          </select>

          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-1">カテゴリ</div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`px-2 py-1 rounded-full text-xs ${
                  editCategories.includes(category)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-1">タグ</div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-2 py-1 rounded-full text-xs ${
                  editTags.includes(tag)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            保存
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md"
          >
            キャンセル
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/20 backdrop-blur-lg p-4 rounded-2xl shadow-lg mb-3 border border-white/30 hover:shadow-xl transition-all duration-300 ${todo.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="mt-1 w-5 h-5 cursor-pointer"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`text-lg font-bold ${todo.completed ? 'line-through text-white/50' : 'text-white drop-shadow-md'}`}>
              {todo.title}
            </h3>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-white hover:text-blue-200 text-sm font-semibold transition-colors"
                disabled={todo.completed}
              >
                ✏️ 編集
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-white hover:text-red-200 text-sm font-semibold transition-colors"
              >
                🗑️ 削除
              </button>
            </div>
          </div>

          {todo.description && (
            <p className="text-white/90 text-sm mb-2 drop-shadow">{todo.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${priorityColors[todo.priority]}`}>
              ⭐ {priorityLabels[todo.priority]}
            </span>

            {todo.dueDate && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                isOverdue ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white animate-pulse' : 'bg-white/30 backdrop-blur text-white border border-white/40'
              }`}>
                📅 {new Date(todo.dueDate).toLocaleDateString('ja-JP')}
                {isOverdue && ' ⚠️'}
              </span>
            )}

            {todo.categories.map(category => (
              <span key={category} className="px-3 py-1 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-full text-xs font-semibold shadow-md">
                {category}
              </span>
            ))}

            {todo.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-xs font-semibold shadow-md">
                #{tag}
              </span>
            ))}
          </div>

          <div className="text-xs text-white/60 font-medium drop-shadow">
            作成: {new Date(todo.createdAt).toLocaleString('ja-JP')}
          </div>
        </div>
      </div>
    </div>
  );
}
