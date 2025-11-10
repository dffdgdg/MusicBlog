"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, 
    UserPlus, 
    Mail, 
    Edit2, 
    Trash2, 
    Shield, 
    UserCheck, 
    UserX,
    Search,
    Filter,
    MoreVertical
} from 'lucide-react';
import type { User, UserFormData } from '@/types/user';
import { getAllUsersAction, createUserAction, updateUserAction, deleteUserAction } from '@/lib/actions/users';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState<UserFormData>({
        email: '',
        name: '',
        role: 'reader',
        bio: '',
        isActive: true
    });

    // Загрузка пользователей через Server Action
    useEffect(() => {
        loadUsers();
    }, []);

    // Фильтрация пользователей
    useEffect(() => {
        let result = users;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(user => 
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.bio?.toLowerCase().includes(query)
            );
        }

        if (roleFilter !== 'all') {
            result = result.filter(user => user.role === roleFilter);
        }

        if (statusFilter !== 'all') {
            result = result.filter(user => 
                statusFilter === 'active' ? user.isActive : !user.isActive
            );
        }

        setFilteredUsers(result);
    }, [users, searchQuery, roleFilter, statusFilter]);

    const loadUsers = async () => {
        setIsLoading(true);
        try {
            const usersData = await getAllUsersAction();
            setUsers(usersData);
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await createUserAction(formData);
        
        if (result.success) {
            await loadUsers();
            setIsCreateModalOpen(false);
            setFormData({
                email: '',
                name: '',
                role: 'reader',
                bio: '',
                isActive: true
            });
        } else {
            alert(result.message);
        }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;

        const result = await updateUserAction(editingUser.id, formData);
        
        if (result.success) {
            await loadUsers();
            setEditingUser(null);
            setFormData({
                email: '',
                name: '',
                role: 'reader',
                bio: '',
                isActive: true
            });
        } else {
            alert(result.message);
        }
    };

    const handleDelete = async (userId: string) => {
        if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            const result = await deleteUserAction(userId);
            
            if (result.success) {
                await loadUsers();
            } else {
                alert(result.message);
            }
        }
    };

    const startEdit = (user: User) => {
        setEditingUser(user);
        setFormData({
            email: user.email,
            name: user.name,
            role: user.role,
            bio: user.bio || '',
            isActive: user.isActive
        });
    };

    const cancelEdit = () => {
        setEditingUser(null);
        setFormData({
            email: '',
            name: '',
            role: 'reader',
            bio: '',
            isActive: true
        });
    };

    // Статистика
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.isActive).length;
    const adminUsers = users.filter(u => u.role === 'admin').length;
    const totalArticles = users.reduce((sum, user) => sum + (user.articlesCount || 0), 0);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Заголовок и действия */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                        <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
                            Управление пользователями
                        </span>
                    </h1>
                    <p className="text-slate-400">
                        Создание и управление учетными записями пользователей
                    </p>
                </div>
                
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                >
                    <UserPlus className="w-5 h-5" />
                    Новый пользователь
                </button>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-2xl p-6 border border-orange-500/20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Всего пользователей</p>
                            <p className="text-2xl font-bold text-white">{totalUsers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl p-6 border border-green-500/20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <UserCheck className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Активных</p>
                            <p className="text-2xl font-bold text-white">{activeUsers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Администраторов</p>
                            <p className="text-2xl font-bold text-white">{adminUsers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-2xl p-6 border border-cyan-500/20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                            <Mail className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Всего статей</p>
                            <p className="text-2xl font-bold text-white">{totalArticles}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Фильтры и поиск */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Поиск пользователей..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300"
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-4 py-3 bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 rounded-2xl text-white focus:outline-none focus:border-orange-500/50 transition-all duration-300"
                        >
                            <option value="all">Все роли</option>
                            <option value="admin">Администратор</option>
                            <option value="author">Автор</option>
                            <option value="reader">Читатель</option>
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-3 bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 rounded-2xl text-white focus:outline-none focus:border-orange-500/50 transition-all duration-300"
                        >
                            <option value="all">Все статусы</option>
                            <option value="active">Активные</option>
                            <option value="inactive">Неактивные</option>
                        </select>
                    </div>
                </div>
                
                <div className="text-slate-400 text-sm">
                    Найдено: <span className="text-orange-400 font-semibold">{filteredUsers.length}</span>
                </div>
            </div>

            {/* Таблица пользователей */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border-2 border-orange-500/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-orange-500/20">
                                <th className="text-left p-6 text-slate-400 font-semibold">Пользователь</th>
                                <th className="text-left p-6 text-slate-400 font-semibold">Роль</th>
                                <th className="text-left p-6 text-slate-400 font-semibold">Статьи</th>
                                <th className="text-left p-6 text-slate-400 font-semibold">Статус</th>
                                <th className="text-left p-6 text-slate-400 font-semibold">Дата регистрации</th>
                                <th className="text-left p-6 text-slate-400 font-semibold">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <motion.tr 
                                    key={user.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-b border-orange-500/10 last:border-0 hover:bg-white/5 transition-colors group"
                                >
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">{user.name}</h3>
                                                <p className="text-slate-400 text-sm">{user.email}</p>
                                                {user.bio && (
                                                    <p className="text-slate-500 text-xs mt-1">{user.bio}</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                                            user.role === 'admin'
                                                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                                : user.role === 'author'
                                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                                : 'bg-green-500/20 text-green-400 border-green-500/30'
                                        }`}>
                                            {user.role === 'admin' ? 'Администратор' : 
                                             user.role === 'author' ? 'Автор' : 'Читатель'}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-white font-semibold">
                                            {user.articlesCount || 0}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${
                                                user.isActive ? 'bg-green-400' : 'bg-red-400'
                                            }`} />
                                            <span className={user.isActive ? 'text-green-400' : 'text-red-400'}>
                                                {user.isActive ? 'Активен' : 'Неактивен'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-slate-400">
                                        {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button
                                                onClick={() => startEdit(user)}
                                                className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-300"
                                                title="Редактировать"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300"
                                                title="Удалить"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Состояние пустого списка */}
                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-xl font-bold text-slate-300 mb-2">
                            {searchQuery || roleFilter !== 'all' || statusFilter !== 'all' 
                                ? 'Пользователи не найдены' 
                                : 'Пользователей пока нет'
                            }
                        </h3>
                        <p className="text-slate-400 mb-6">
                            {searchQuery || roleFilter !== 'all' || statusFilter !== 'all'
                                ? 'Попробуйте изменить параметры поиска'
                                : 'Создайте первого пользователя'
                            }
                        </p>
                        {(searchQuery || roleFilter !== 'all' || statusFilter !== 'all') ? (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setRoleFilter('all');
                                    setStatusFilter('all');
                                }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300"
                            >
                                Сбросить фильтры
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300"
                            >
                                <UserPlus className="w-5 h-5" />
                                Создать пользователя
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Модальное окно создания/редактирования */}
            <AnimatePresence>
                {(isCreateModalOpen || editingUser) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-900 rounded-3xl border-2 border-orange-500/20 p-6 w-full max-w-md"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">
                                {editingUser ? 'Редактирование пользователя' : 'Новый пользователь'}
                            </h2>

                            <form onSubmit={editingUser ? handleEditSubmit : handleCreateSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">
                                        Имя пользователя *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300"
                                        placeholder="Введите имя"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300"
                                        placeholder="user@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">
                                        Роль *
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                                        className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white focus:outline-none focus:border-orange-500/50 transition-all duration-300"
                                    >
                                        <option value="reader">Читатель</option>
                                        <option value="author">Автор</option>
                                        <option value="admin">Администратор</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">
                                        Описание
                                    </label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300 resize-none"
                                        rows={3}
                                        placeholder="Краткое описание пользователя..."
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                                    />
                                    <label htmlFor="isActive" className="text-sm font-semibold text-white">
                                        Активный пользователь
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
                                    >
                                        {editingUser ? 'Сохранить' : 'Создать'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={editingUser ? cancelEdit : () => setIsCreateModalOpen(false)}
                                        className="px-6 py-3 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border-2 border-orange-500/20 rounded-2xl transition-all duration-300"
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}