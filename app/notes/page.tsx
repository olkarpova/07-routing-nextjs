import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
// import { NoteTag } from "@/types/note";
 
export default async function Notes() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, "", 12],
        queryFn: () => fetchNotes(1, "", 12, 'Todo'),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient/>
        </HydrationBoundary>
        
    )
}

