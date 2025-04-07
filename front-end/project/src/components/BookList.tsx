import React from 'react';
import { Book } from '../types';
import { BookOpen } from 'lucide-react';

interface BookListProps {
  books: Book[];
}

export const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div key={book.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">{book.titulo}</h3>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Author:</span> {book.autor}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Category:</span> {book.categoria}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};