"use client";

import {
  useQuery,
  keepPreviousData
} from "@tanstack/react-query";
import NoteList from "../../components/NoteList/NoteList";
import css from "./page.module.css";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

// import { createNote } from "@/lib/api";
// import { NoteTag } from "@/types/note";

import Pagination from "@/components/Pagination/Pagination";

// type NoteFormValues = {
//   title: string;
//   content: string;
//   tag: NoteTag;
// };

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, perPage],
    queryFn: () => fetchNotes(page, search || undefined, perPage),
    placeholderData: keepPreviousData,
  });

  // Mutation для створення нотатки==============
  // const createNoteMutation = useMutation({
  //   mutationFn: createNote,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["notes"] });
  //     setIsModalOpen(false);
  //   },
  //   onError: (error) => {
  //     console.error("Error creating note:", error);
  //     alert("Failed to create note. Please try again.");
  //   },
  // });
  //=============================================

  // const handleCreateNote = (values: NoteFormValues) => {
  //   createNoteMutation.mutate(values);
  // };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleSearchChange = (newSearch: string) => {
    debouncedSearch(newSearch);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages || 0}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        <button className={css.button} onClick={() => {
          // console.log("Button clicked!")
          setIsModalOpen(true);
          console.log("🔵 isModalOpen set to TRUE");
        }}>
          Create note +
        </button>
      </header>

      {isLoading && <strong>Loading...</strong>}
      {isError && <strong>Error!!!</strong>}
      {data && data.notes.length > 0 && <NoteList items={data.notes} />}
      {data && data?.notes.length === 0 && <p>No notes found</p>}

      {/* console.log("CURRENT isModalOpen =", isModalOpen); */}
      {isModalOpen && (
        <>
          {/* {console.log("Modal rendering!")} */}
          <Modal>
            <NoteForm
              // onSubmit={handleCreateNote}
              onCancel={() => {
                setIsModalOpen(false);
              }}
            />
          </Modal>
        </>
      )}
    </div>
  );
}
