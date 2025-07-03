import { Table, TableColumn } from '@/components/ui/table';
import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  isbn: string;
  pages: number;
}

const books: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    year: 1925,
    isbn: '978-0-7432-7356-5',
    pages: 180,
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    year: 1960,
    isbn: '978-0-06-112008-4',
    pages: 281,
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    year: 1949,
    isbn: '978-0-452-28423-4',
    pages: 328,
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    year: 1813,
    isbn: '978-0-14-143951-8',
    pages: 432,
  },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    year: 1951,
    isbn: '978-0-316-76948-0',
    pages: 277,
  },
  {
    id: 6,
    title: 'Lord of the Flies',
    author: 'William Golding',
    genre: 'Fiction',
    year: 1954,
    isbn: '978-0-571-05686-2',
    pages: 224,
  },
  {
    id: 7,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    year: 1937,
    isbn: '978-0-547-92822-7',
    pages: 366,
  },
  {
    id: 8,
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    year: 1997,
    isbn: '978-0-439-70818-8',
    pages: 309,
  },
  {
    id: 9,
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    genre: 'Mystery',
    year: 2003,
    isbn: '978-0-307-47427-5',
    pages: 689,
  },
  {
    id: 10,
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Science Fiction',
    year: 1932,
    isbn: '978-0-06-085052-4',
    pages: 268,
  },
];

const columns: TableColumn<Book>[] = [
  {
    id: 'title',
    header: 'Title',
    accessorKey: 'title',
    sortable: true,
    filterable: true,
    minWidth: 200,
  },
  {
    id: 'author',
    header: 'Author',
    accessorKey: 'author',
    sortable: true,
    filterable: true,
    minWidth: 150,
  },
  {
    id: 'genre',
    header: 'Genre',
    accessorKey: 'genre',
    sortable: true,
    filterable: true,
    minWidth: 120,
  },
  {
    id: 'year',
    header: 'Year',
    accessorKey: 'year',
    sortable: true,
    align: 'center',
    minWidth: 80,
  },
  {
    id: 'isbn',
    header: 'ISBN',
    accessorKey: 'isbn',
    filterable: true,
    minWidth: 150,
  },
  {
    id: 'pages',
    header: 'Pages',
    accessorKey: 'pages',
    sortable: true,
    align: 'right',
    minWidth: 80,
  },
];

export function TableSearch() {
  return (
    <Table
      data={books}
      columns={columns}
      pageSize={6}
      searchPlaceholder='Search books by title, author, genre, or ISBN...'
      searchable={true}
      filterable={true}
    />
  );
}
