
export type NodeType = 'file' | 'folder';

export interface FileNode {
    type: NodeType;
    name: string;
    id: string;
    children?: FileNode[];
    content?: string; // Only for files, not folders
}