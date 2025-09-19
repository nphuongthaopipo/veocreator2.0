import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { UserCookie } from '../../types';

const ManageCookiesView: React.FC = () => {
    const { cookies, addCookie, updateCookie, deleteCookie } = useAppContext();
    const { showToast } = useToast();

    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [editingCookie, setEditingCookie] = useState<UserCookie | null>(null);

    useEffect(() => {
        if (editingCookie) {
            setName(editingCookie.name);
            setValue(editingCookie.value);
        } else {
            setName('');
            setValue('');
        }
    }, [editingCookie]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !value.trim()) {
            showToast('Vui lòng nhập đủ Tên gợi nhớ và Giá trị Cookie.', 'error');
            return;
        }

        if (editingCookie) {
            // Cập nhật cookie
            updateCookie(editingCookie.id, { name, value });
            showToast('Đã cập nhật cookie thành công!', 'success');
        } else {
            // Thêm cookie mới
            addCookie({
                id: new Date().toISOString(),
                name,
                value,
            });
            showToast('Đã thêm cookie thành công!', 'success');
        }
        setEditingCookie(null);
    };

    const handleEdit = (cookie: UserCookie) => {
        setEditingCookie(cookie);
    };

    const handleCancelEdit = () => {
        setEditingCookie(null);
    };

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-light mb-2">Quản lý Cookie</h1>
            <p className="text-dark-text mb-6">Thêm, sửa hoặc xóa cookie cá nhân của bạn để sử dụng cho các tính năng nâng cao.</p>

            {/* Form Thêm/Sửa Cookie */}
            <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg shadow-md mb-8 space-y-4">
                <h2 className="text-xl font-bold text-light">{editingCookie ? 'Chỉnh sửa Cookie' : 'Thêm Cookie Mới'}</h2>
                <div>
                    <label htmlFor="cookie-name" className="block text-dark-text font-bold mb-2">Tên gợi nhớ</label>
                    <input
                        id="cookie-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ví dụ: Tài khoản Google chính"
                        className="w-full p-3 bg-primary rounded-md border border-border-color focus:ring-2 focus:ring-accent focus:outline-none transition"
                    />
                </div>
                <div>
                    <label htmlFor="cookie-value" className="block text-dark-text font-bold mb-2">Giá trị Cookie</label>
                    <textarea
                        id="cookie-value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Dán giá trị cookie của bạn vào đây"
                        className="w-full h-24 p-3 bg-primary rounded-md border border-border-color focus:ring-2 focus:ring-accent focus:outline-none transition font-mono text-sm"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button type="submit" className="flex-1 bg-accent hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        {editingCookie ? 'Lưu Thay đổi' : 'Thêm Cookie'}
                    </button>
                    {editingCookie && (
                        <button type="button" onClick={handleCancelEdit} className="flex-1 bg-gray-200 hover:bg-gray-300 text-dark-text font-bold py-3 px-4 rounded-lg transition-colors">
                            Hủy
                        </button>
                    )}
                </div>
            </form>

            {/* Danh sách Cookie đã lưu */}
            <div>
                <h2 className="text-2xl font-bold text-light mb-4">Danh sách Cookie</h2>
                <div className="space-y-4">
                    {cookies.length === 0 ? (
                        <p className="text-dark-text text-center py-8">Chưa có cookie nào được lưu.</p>
                    ) : (
                        cookies.map(cookie => (
                            <div key={cookie.id} className="bg-secondary p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1 overflow-hidden">
                                   <h3 className="font-bold text-light">{cookie.name}</h3>
                                   <p className="text-sm text-gray-500 mt-1 line-clamp-2 font-mono" title={cookie.value}>{cookie.value}</p>
                                </div>
                                 <div className="flex items-center gap-2 flex-shrink-0">
                                    <button onClick={() => handleEdit(cookie)} title="Sửa" className="p-2 rounded-md hover:bg-hover-bg transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                    <button onClick={() => deleteCookie(cookie.id)} title="Xóa" className="p-2 rounded-md hover:bg-red-100 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageCookiesView;