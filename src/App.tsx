import { useMemo, useState } from 'react'
import './App.css'
import { FilePlus, FileTypeCorner, FolderPlus, Search } from 'lucide-react'

import type { FileNode, NodeType } from './types';

import { findNodeById, addNode } from './utils/TreeUtils';
import { initialData } from './data/mockData';
import FileTree from './components/FileTree';
import ContentArea from './components/ContentArea';
function App() {

  const [fileSystem, setFileSystem] = useState<FileNode>(initialData);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const [error, setError] = useState<string | null>(null);
  const selectedNode=useMemo(() => {
    return findNodeById(fileSystem, selectedNodeId || '') || fileSystem;
  }, [fileSystem, selectedNodeId]);

  const filteredChildren = useMemo(() => {
    if (selectedNode.type === 'folder' && selectedNode.children) {
      return selectedNode.children.filter(child =>
        child.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  }, [selectedNode, searchQuery]);

  const handleSelectNode = (id: string) => {
    setSelectedNodeId(id);
    setError(null); // Clear any previous errors when a node is selected
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    
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
    setFileSystem({ ...fileSystem });
  }


  const handleRenameNode = (id: string, newName: string) => {
    setError(null); // Clear any previous errors
    const node = findNodeById(fileSystem, id);
    if (node) {
      node.name = newName;
      setFileSystem({ ...fileSystem });
    }
  }

  const handleDeleteNode = (id: string) => {
    setError(null); // Clear any previous errors
    const parentNode = findNodeById(fileSystem, selectedNodeId!);
    if (parentNode && parentNode.type === 'folder') {
      const index = parentNode.children?.findIndex(child => child.id === id);
      if (index !== undefined && index !== -1) {
        parentNode.children?.splice(index, 1);
        setFileSystem({ ...fileSystem });
        setSelectedNodeId(null);
      }
    }
  }
  const displayNode: FileNode = selectedNode.type === 'folder' ? { ...selectedNode, children: filteredChildren } : selectedNode;
  return (
    <>
      <div className="App h-screen overflow-hidden bg-zinc-900 text-zinc-100">
        <header className="flex flex-col gap-3 min-h-16 border-b border-zinc-700 p-3 md:flex-row md:items-center md:justify-between md:px-5">
          <h1 className="text-lg shrink-0 font-semibold">React File Explorer</h1>
          <div className="flex flex-wrap  gap-2 items-center">
            <div className="flex items-center justify-center gap-4">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-1" onClick={() => handleCreate('file')}>
              <FilePlus size={16} className="text-gray-500" />
              New File
            </button>
            <button className="flex items-center gap-1" onClick={() => handleCreate('folder')}>
              <FolderPlus size={16} className="text-gray-500" />
              New Folder
            </button>
          </div>
        </header>
        {/* errors to show  */}
        <div className="fixed bottom-0 left-0 w-full bg-red-500 text-white p-2 text-center">
          {error && <div className='fixed right-4 top-20 flex max-w-sm items-center justify-center p-2 bg-red-500 text-white'> {error} </div>}
        </div>
        <div className="flex h-[calc(100vh-64px)] flex-col md:flex-row overflow-hidden" >

          {/* file tree */}
          <FileTree data={fileSystem} selectedNodeId={selectedNodeId} onSelectNode={handleSelectNode} />


          {/* content area */}
          <ContentArea selectedNode={displayNode}
            onSelectNode={handleSelectNode}
            onRenameNode={handleRenameNode}
            onDeleteNode={handleDeleteNode}
          />
        </div>
      </div>


    </>
  )
}

export default App
