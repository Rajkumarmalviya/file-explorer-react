
import {useMemo, useState} from "react";

import {initialData} from "../data/mockData";
import type {FileNode, NodeType} from "../types/filesystem";
import {findNodeById, addNode ,renameNode, removeNode} from "../utils/TreeUtils";

export function useFileExplorer() {
    const [fileSystem, setFileSystem] = useState<FileNode>(initialData);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const selectedNode = useMemo(() => {
        return findNodeById(fileSystem, selectedNodeId || '') || fileSystem;
    }, [fileSystem, selectedNodeId]);

    const handleSelectNode = (node: FileNode) => {
        setSelectedNodeId(node.id);
        setError(null); // Clear any previous errors when a node is selected
    };

    const handleCreate = (type: NodeType) => {
        setError(null); // Clear any previous errors
        if (!selectedNodeId) {
            setError("Please select a folder to create a new file or folder.");
            return;
        }
        const selectedNode = findNodeById(fileSystem, selectedNodeId);
        if (!selectedNode) {
            setError("Selected node not found.");
            return;
        }
        if (selectedNode.type !== 'folder') {
            setError("Cannot create a new file or folder inside a file. Please select a folder.");
            return;
        }
        const newNode: FileNode = {
            type: type,
            name: type === 'file' ? 'NewFile.txt' : 'NewFolder',
            id: `${type}-${Date.now()}`,
            children: type === 'folder' ? [] : undefined,
            content: type === 'file' ? '' : undefined,
        };
        addNode(selectedNode, newNode);
        setFileSystem({...fileSystem}); // Trigger re-render
    };

    const handleRename = (node: FileNode) => {
        setError(null); // Clear any previous errors
        const newName = prompt("Enter new name:", node.name);
        if (!newName) {
            setError("Rename operation cancelled or no name provided.");
            return;
        }
        if (!selectedNodeId) {
            setError("Please select a node to rename.");
            return;
        }
        const selectedNode = findNodeById(fileSystem, selectedNodeId);
        if (!selectedNode) {
            setError("Selected node not found.");
            return;
        }
        renameNode(selectedNode, selectedNodeId, newName);
        setFileSystem({...fileSystem}); // Trigger re-render
    };

    const handleDelete = () => {
        if (!selectedNodeId) {
            setError("Please select a node to delete.");
            return;
        }
        if (selectedNodeId === 'root') {
            setError("Cannot delete the root folder.");
            return;
        }
        const parentNode = findParentNode(fileSystem, selectedNodeId);
        if (!parentNode) {
            setError("Parent node not found.");
            return;
        }
        const removed = removeNode(parentNode, selectedNodeId);
        if (removed) {
            setSelectedNodeId(null); // Clear selection after deletion
            setFileSystem({...fileSystem}); // Trigger re-render
        } else {
            setError("Failed to delete the selected node.");
        }
    };

    return {
        fileSystem,
        selectedNode,
        error,
        handleSelectNode,
        handleCreate,
        handleRename,
        handleDelete,
    };
}

// Helper function to find the parent node of a given node ID
function findParentNode(node: FileNode, childId: string): FileNode | null {
    if (node.type === 'folder' && node.children) {
        for (const child of node.children) {
            if (child.id === childId) {
                return node;
            }
            const found = findParentNode(child, childId);
            if (found) {
                return found;
            }
        }
    }
    return null;
}