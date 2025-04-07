import React, { useState } from 'react';
import { registerReturn } from '../api';

export const RegisterReturn: React.FC = () => {
  const [formData, setFormData] = useState({
    loanId: '',
    data_devolucao: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerReturn(parseInt(formData.loanId), {
        data_devolucao: new Date(formData.data_devolucao).toISOString(),
      });
      setFormData({ loanId: '', data_devolucao: '' });
      alert('Return registered successfully!');
    } catch (error) {
      alert('Error registering return');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Loan ID</label>
        <input
          type="number"
          value={formData.loanId}
          onChange={(e) => setFormData({ ...formData, loanId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Return Date</label>
        <input
          type="datetime-local"
          value={formData.data_devolucao}
          onChange={(e) => setFormData({ ...formData, data_devolucao: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Register Return
      </button>
    </form>
  );
};