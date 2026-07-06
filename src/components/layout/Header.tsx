import { FilePlus, FolderPlus } from "lucide-react";
import type { FileNode, SearchResult } from "../../types/filesystem";
import SearchBox from "../search/SearchBox";

interface HeaderProps {
    fileSystem: FileNode;
    onSelect: (node: FileNode) => void;
    onCreate: (type: 'file' | 'folder') => void;
}

export default function Header({ fileSystem, onSelect, onCreate }: HeaderProps) {
    return (
        <header className="flex items-center justify-between p-4  border-b border-gray-300">
            
            
            <div className="flex items-center space-x-2">
                <button
                    className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => onCreate('file')}
                >
                    <FilePlus className="mr-1" size={16} />
                    New File
                </button>
                <button
                    className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => onCreate('folder')}
                >
                    <FolderPlus className="mr-1" size={16} />
                    New Folder
                </button>
            </div>
            <SearchBox fileSystem={fileSystem} onSelectNode={onSelect} />
        </header>
    );
}