import React, { useState } from 'react';
import { createLoan } from '../api';

export const RegisterLoan: React.FC = () => {
  const [formData, setFormData] = useState({
    pessoaId: '',
    livroId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLoan({
        pessoaId: parseInt(formData.pessoaId),
        livroId: parseInt(formData.livroId),
      });
      setFormData({ pessoaId: '', livroId: '' });
      alert('Loan registered successfully!');
    } catch (error) {
      alert('Error registering loan');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Person ID</label>
        <input
          type="number"
          value={formData.pessoaId}
          onChange={(e) => setFormData({ ...formData, pessoaId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Book ID</label>
        <input
          type="number"
          value={formData.livroId}
          onChange={(e) => setFormData({ ...formData, livroId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Register Loan
      </button>
    </form>
  );
};