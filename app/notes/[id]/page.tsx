import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from "@/lib/api";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";

type NoteDetailsProps = {
    params: Promise<{ id: string }>;
    //===important!!! id = name of folder [id]====
};

const NoteDetails = async ({ params }: NoteDetailsProps) => {
    //===== we need to do await for object=====
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
    // <NoteDetailsClient note={note}/>
};

export default NoteDetails;