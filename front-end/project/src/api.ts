const API_URL = 'http://localhost:3000/api';

export const fetchBooks = async () => {
  const response = await fetch(`${API_URL}/livros`);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
};

export const createBook = async (book: Omit<Book, 'id'>) => {
  const response = await fetch(`${API_URL}/livros`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error('Failed to create book');
  return response.json();
};

export const createPerson = async (person: Omit<Person, 'id'>) => {
  const response = await fetch(`${API_URL}/pessoas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(person),
  });
  if (!response.ok) throw new Error('Failed to create person');
  return response.json();
};

export const createLoan = async (loan: Loan) => {
  const response = await fetch(`${API_URL}/emprestimo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loan),
  });
  if (!response.ok) throw new Error('Failed to create loan');
  return response.json();
};

export const registerReturn = async (loanId: number, returnData: Return) => {
  const response = await fetch(`${API_URL}/emprestimos/${loanId}/devolucao`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(returnData),
  });
  if (!response.ok) throw new Error('Failed to register return');
  return response.json();
};