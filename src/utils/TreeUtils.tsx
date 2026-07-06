import type { FileNode } from '../types/filesystem';

export function findNodeById(node: FileNode, id: string): FileNode | null {
    if (node.id === id) {
        return node;
    }

    if (node.type === 'folder' && node.children) {
        for (const child of node.children) {
            const found = findNodeById(child, id);
            if (found) {
                return found;
            }
        }
    }

    return null;
}

export function addNode(parent: FileNode, newNode: FileNode): void {
    if (parent.type === 'folder') {
        if (!parent.children) {
            parent.children = [];
        }
        parent.children.push(newNode);
    } else {
        throw new Error("Cannot add a node to a file. Only folders can contain children.");
    }
}

export function removeNode(parent: FileNode, id: string): boolean {
    if (parent.type === 'folder' && parent.children) {
        const index = parent.children.findIndex(child => child.id === id);
        if (index !== -1) {
            parent.children.splice(index, 1);
            return true;
        } else {
            for (const child of parent.children) {
                const removed = removeNode(child, id);
                if (removed) {
                    return true;
                }
            }
        }
    }
    return false;
}

export function renameNode(node: FileNode,nodeId: string, newName: string): void {
    if (node.id === nodeId) {
        node.name = newName;
        return;
    }

    if (node.type === 'folder' && node.children) {
        for (const child of node.children) {
            renameNode(child, nodeId, newName);
        }
    }
}
    

export function updateFileContent(node: FileNode, newContent: string): void {
    if (node.type === 'file') {
        node.content = newContent;
    } else {
        throw new Error("Cannot update content of a folder. Only files can have content.");
    }
}   

