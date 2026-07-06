import type { FileNode } from "../types/filesystem";
import TreeNode from "./TreeNode";

interface FileTreeProps {
    data:FileNode;
    selectedNodeId: string | null;
    onSelectNode: (node: FileNode) => void;
}

export default function FileTree({ data, selectedNodeId, onSelectNode }: FileTreeProps){

    return (
        <aside className="w-full md:w-1/4 h-full overflow-y-auto border-r border-gray-300 p-2">
            <div className="font-bold mb-2">Explorer</div>
            <TreeNode node={data} selectedNodeId={selectedNodeId} onSelect={onSelectNode} />
        </aside>
    );

}