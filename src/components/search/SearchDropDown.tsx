import type { FileNode, SearchResult } from "../../types/filesystem";

interface SearchDropDownProps {
    search:string;
    searchResults: SearchResult[];
    onSelect: (node: FileNode) => void;
}
export default function SearchDropDown({ search, searchResults, onSelect }: SearchDropDownProps) {
    return (
        <div className="absolute left-0 right-0 mt-2 shadow-2xl top-full max-h-80 z-10 w-full bg-zinc-900 border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
            {searchResults.length === 0 ? (
                <div className="p-2 text-gray-500">No results found</div>
            ) : (
                searchResults.map((result, index) => (
                    <div
                        key={index}
                        className="p-2 hover:bg-zinc-700 cursor-pointer"
                        onClick={() => onSelect(result.node)}
                    >
                        {result.path.join(' / ')}
                    </div>
                ))
            )}

            {/* IF FILE NOT FOUND */}
            {searchResults.length === 0 && search && (
                <div className="p-2 text-gray-500">File not found</div>
            )}
        </div>
    );
}