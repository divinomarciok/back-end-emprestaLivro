import React from 'react';
import { Book } from '../types';
import { BookOpen } from 'lucide-react';

interface BookListProps {
  books: Book[];
}

export const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div key={book.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{book.titulo}</h3>
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
        </div>
      ))}
      {books.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No books available</p>
        </div>
      )}
    </div>
  );
};