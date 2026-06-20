import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import NoteForm from '../NoteForm/NoteForm';
import { fetchNotes } from '../../services/noteService';

const App = () => {
  const [page, setPage] = useState(1);
  const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};
  const handlePageChange = (selectedPage: number) => {
  setPage(selectedPage);
  
};
  const [search, setSearch] = useState('');
  const handleSearch = useDebouncedCallback(
  (value: string) => {
    setSearch(value);
    setPage(1);
  },
  500
);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search }),
  });
  if (isLoading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>Something went wrong...</p>;
}




  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox onSearch={handleSearch} />}
        {data && data.totalPages > 1 && (
  <Pagination
    pageCount={data.totalPages}
    onPageChange={handlePageChange}
  />
)}
        {<button
  className={css.button}
  onClick={openModal}
>
  Create note +
</button>}
      </header>
      {data && data.notes.length > 0 && (
      <NoteList notes={data.notes} />
    )}
    {isModalOpen && (
  <Modal onClose={closeModal}>
    <NoteForm onClose={closeModal} />
  </Modal>
)}
    </div>
  );
};

export default App;