
import type { FileNode } from '../types';

interface ContentAreaProps {
    selectedNode: FileNode;
    onSelectNode: (id: string) => void;
    onRenameNode: (id: string, newName: string) => void;
    onDeleteNode: (id: string) => void;
}

export default function ContentArea({ selectedNode, onSelectNode, onRenameNode, onDeleteNode }: ContentAreaProps) {

    if (!selectedNode) {
        return (
            <div className="flex-1 p-4">
                <p>No file or folder selected.</p>
            </div>
        );
    }

    if (selectedNode.type === 'file') {
        return (
            <main className="flex-1 p-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold mb-2">{selectedNode.name}</h2>
                    {/* rename */}
                    <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => {
                            const newName = prompt("Enter new name:", selectedNode.name);
                            if (newName) {
                                onRenameNode(selectedNode.id, newName);
                            }
                        }}
                    >
                        Rename
                    </button>
                    {/* delete */}
                    {/* <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => {
                            if (confirm(`Are you sure you want to delete ${selectedNode.name}?`)) {
                                onDeleteNode(selectedNode.id);
                            }
                        }}
                    >
                        Delete
                    </button> */}
                </div>
                <pre
                    className="min-h-80 overflow-auto whitespace-pre-wrap bg-black p-5 border border-zinc-600 leading-6 test-zinc-300 rounded"
                >
                    {selectedNode.content}
                </pre>
            </main>
        );
    } else if (selectedNode.type === 'folder') {
        return (
            <main className="flex-1 p-4">
                <h2 className="text-lg font-bold mb-2">{selectedNode.name}</h2>
                <p>This is a folder. You can add files or folders inside it.</p>
            </main>
        );
    } else {
        return (
            <main className="flex-1 p-4">
                <p>Unknown node type.</p>
            </main>
        );
    }

}