import React, { useState } from 'react';
import { createPerson } from '../api';

export const RegisterPerson: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPerson(formData);
      setFormData({ nome: '', matricula: '', email: '' });
      alert('Person registered successfully!');
    } catch (error) {
      alert('Error registering person');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Registration Number</label>
        <input
          type="text"
          value={formData.matricula}
          onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Register Person
      </button>
    </form>
  );
};