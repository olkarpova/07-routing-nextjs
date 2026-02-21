import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import type { FetchNotesResponse } from "@/lib/api";

interface NotesByCategoryProps {
    params: Promise<{slug: string[]}>;
};

const NotesByCategory = async ({ params }: NotesByCategoryProps) => {
    const { slug } = await params;
    console.log("slug: " + slug);
    // const category = slug[0];
    const category = slug[0] === 'all' ? undefined : slug[0];
    const response: FetchNotesResponse = await fetchNotes( 1, undefined, 12, category);
    return (
        <div>
            <h1>Notes { category ? `for "${category}"`: '(All)'}</h1>
            {response?.notes?.length > 0 && <NoteList
                items={response.notes} />}
        </div>
    );
};

export default NotesByCategory;
