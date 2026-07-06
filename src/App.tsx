import './App.css'

import Header from './components/layout/Header';
import FileTree from './components/FileTree';
import ContentArea from './components/ContentArea';
import { useFileExplorer } from './hooks/useFileExplorer';
function App() {

  const {fileSystem, selectedNode, error, handleSelectNode, handleCreate, handleRename, handleDelete} = useFileExplorer();

  return (
    <>
      <div className="App h-screen overflow-hidden bg-zinc-900 text-zinc-100">
      <Header fileSystem={fileSystem} onSelect={handleSelectNode} onCreate={handleCreate} />
        {/* errors to show  */}
        <div className="fixed bottom-0 left-0 w-full bg-red-500 text-white p-2 text-center">
          {error && <div className='fixed right-4 top-20 flex max-w-sm items-center justify-center p-2 bg-red-500 text-white'> {error} </div>}
        </div>
        <div className="flex h-[calc(100vh-64px)] flex-col md:flex-row overflow-hidden" >

          {/* file tree */}
          <FileTree data={fileSystem} selectedNodeId={selectedNode.id} onSelectNode={handleSelectNode} />


          {/* content area */}
          <ContentArea selectedNode={selectedNode}
            onSelectNode={handleSelectNode}
            onRenameNode={handleRename}
            onDeleteNode={handleDelete}
          />
        </div>
      </div>


    </>
  )
}

export default App
