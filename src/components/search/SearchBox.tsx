import { useState } from "react";
import type { FileNode, SearchResult } from "../../types/filesystem";
import SearchDropDown from "./SearchDropDown";
import { searchNodes } from "../../utils/searchUtils";

interface Props{
    fileSystem: FileNode;
    onSelectNode: (node: FileNode) => void;
}

export default function SearchBox({ fileSystem, onSelectNode }: Props) {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearch(query);
        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }
        const results = searchNodes(fileSystem, query);
        setSearchResults(results);
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search files and folders..."
                className="w-full p-2 border border-gray-300 rounded"
            />
            {search && (
                <SearchDropDown
                    search={search}
                    searchResults={searchResults}
                    onSelect={onSelectNode}
                />
            )}
        </div>
    );
}