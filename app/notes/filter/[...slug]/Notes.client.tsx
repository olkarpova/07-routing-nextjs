"use client";
import { fetchNotes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";


export default function NotesClient() {
  const { slug } = useParams<{ slug: string[] }>();
  const tag = slug[0] === "all" ? undefined : slug[0];
// useParams для того щоб був доступним tag в компоненті
  console.log("client tag:", tag);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", { tag, page: 1 }],
    queryFn: () => fetchNotes(1, undefined, 12, tag),
    refetchOnMount: false,
    // Використовуємо prefetch з сервера
    //при монтуванні компонента запит не буде виконуватись
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading notes</div>;

  return (
    <div className="styles.page">
      <main>
        <h1>Notes {tag ? `for "${tag}"` : "(All)"}</h1>
        {data?.notes?.length ? (
          <NoteList items={data.notes} />
        ) : (
          <p>No notes found</p>
        )}
      </main>
    </div>
  );
}

// import { fetchNotes } from "@/lib/api";
// import NoteList from "@/components/NoteList/NoteList";
// import type { FetchNotesResponse } from "@/lib/api";

// interface NotesByCategoryProps {
//     params: Promise<{slug: string[]}>;
// };

// const NotesByCategory = async ({ params }: NotesByCategoryProps) => {
//     const { slug } = await params;
//     console.log("slug: " + slug);
//     // const category = slug[0];
//     const category = slug[0] === 'all' ? undefined : slug[0];
//     const response: FetchNotesResponse = await fetchNotes( 1, undefined, 12, category);
//     return (
//         <div>
//             <h1>Notes { category ? `for "${category}"`: '(All)'}</h1>
//             {response?.notes?.length > 0 && <NoteList
//                 items={response.notes} />}
//         </div>
//     );
// };

// export default NotesByCategory;
