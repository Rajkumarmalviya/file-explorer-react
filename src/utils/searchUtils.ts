import type { FileNode, SearchResult } from '../types/filesystem';


export function searchNodes(node: FileNode, query: string, parentPath=""): SearchResult[] {
    // normalize query 
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return [];
    }
    let results: SearchResult[] = [];

    // current path 
    const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
    
    // check if current node matches the query
    if (node.name.toLowerCase().includes(normalizedQuery)) {
        results.push({ node, path: currentPath.split('/') });
    }

    if (node.type === 'folder' && node.children) {
        for (const child of node.children) {
            const childResults = searchNodes(child, query, currentPath);
            results = results.concat(childResults);
        }
    }

    return results;
}