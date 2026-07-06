
import {
    Folder, File,
    ChevronDown, ChevronRight,
    FolderOpen, FileText,
} from 'lucide-react';
import type { FileNode } from '../types';
import { useState } from 'react';

interface Props {
    node: FileNode;
    selectedNodeId: string | null;
    onSelect: (id: string) => void;
}
export default function TreeNode({ node, selectedNodeId, onSelect }: Props) {

    const [isOpen, setIsOpen] = useState(node.id === 'root');

    const isFolder = node.type === 'folder';
    const isSelected = selectedNodeId === node.id;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(node.id);
        if (isFolder) {
            setIsOpen(!isOpen);
        }
    }

    return (
    <div>
        <div
            className={`flex items-center cursor-pointer p-1 ${selectedNodeId === node.id ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}
            onClick={handleClick}
        >
            <span className="mr-1">
                {isFolder ? (
                    isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                ) : (
                    <span style={{ width: '16px', display: 'inline-block' }}></span>
                )}
            </span>
            {isFolder ? (
                isOpen ? <FolderOpen size={16} className="mr-1" /> : <Folder size={16} className="mr-1" />
            ) : (
                <FileText size={16} className="mr-1" />
            )}
            <span>{node.name}</span>
        </div>
        {isFolder && isOpen && node.children && (
            <div className="ml-4">
                {node.children.map((child) => (
                    <TreeNode
                        key={child.id}
                        node={child}
                        selectedNodeId={selectedNodeId}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        )}
    </div>)
}