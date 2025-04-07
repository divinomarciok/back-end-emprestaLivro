import React, { useState } from 'react';
import { createBook } from '../api';

export const RegisterBook: React.FC = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    categoria: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBook(formData);
      setFormData({ titulo: '', autor: '', categoria: '' });
      alert('Book registered successfully!');
    } catch (error) {
      alert('Error registering book');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.titulo}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          value={formData.autor}
          onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          value={formData.categoria}
          onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Register Book
      </button>
    </form>
  );
};