import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";


export const revalidate = 0;

interface SearchProps {
    searchParams: {
        title: string;
    }
};

const Search = async ({ searchParams }: SearchProps) => {
    
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div className="
     bg-neutral-900
     overflow-hidden
     overflow-y-auto
     w-full
     h-full
     rounded-lg
    ">
            <Header className="from-bg-neutral-800">
                <div className="
                 mb-2 
                 flex
                 flex-col
                 gap-y-6
                ">
                    <h1 className="text-3xl font-semibold text-white">
                        Search
                    </h1>
                    <SearchInput
                    />
                </div>
            </Header>
            <SearchContent songs={songs} />
        </div>
    )
};

export default Search;