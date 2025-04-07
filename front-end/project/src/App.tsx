import React, { useState, useEffect } from 'react';
import { Library, UserPlus, BookPlus, ArrowLeftRight, RotateCcw } from 'lucide-react';
import { BookList } from './components/BookList';
import { RegisterBook } from './components/RegisterBook';
import { RegisterPerson } from './components/RegisterPerson';
import { RegisterLoan } from './components/RegisterLoan';
import { RegisterReturn } from './components/RegisterReturn';
import { fetchBooks } from './api';
import { Book } from './types';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeView, setActiveView] = useState<'home' | 'book' | 'person' | 'loan' | 'return'>('home');

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error loading books:', error);
      }
    };
    loadBooks();
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'book':
        return <RegisterBook />;
      case 'person':
        return <RegisterPerson />;
      case 'loan':
        return <RegisterLoan />;
      case 'return':
        return <RegisterReturn />;
      default:
        return <BookList books={books} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Library className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">College Library</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setActiveView('book')}
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md hover:bg-gray-50"
          >
            <BookPlus className="h-5 w-5 text-blue-600" />
            <span>Register Book</span>
          </button>
          <button
            onClick={() => setActiveView('person')}
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md hover:bg-gray-50"
          >
            <UserPlus className="h-5 w-5 text-blue-600" />
            <span>Register Person</span>
          </button>
          <button
            onClick={() => setActiveView('loan')}
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md hover:bg-gray-50"
          >
            <ArrowLeftRight className="h-5 w-5 text-blue-600" />
            <span>Register Loan</span>
          </button>
          <button
            onClick={() => setActiveView('return')}
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md hover:bg-gray-50"
          >
            <RotateCcw className="h-5 w-5 text-blue-600" />
            <span>Register Return</span>
          </button>
        </div>

        {activeView !== 'home' && (
          <button
            onClick={() => setActiveView('home')}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to Book List
          </button>
        )}

        {renderView()}
      </main>
    </div>
  );
}

export default App;