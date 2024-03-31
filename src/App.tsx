import { ReactFlowProvider } from 'reactflow';
import './App.css';
import GraphTest from './components/graphs/GraphTest';
import theme from './constantes/Colors';
import { AppContextProvider } from './context/AppContext';
import React, { useEffect } from 'react';
import SideBar from './components/SideBar/SibeBar';
import TopBar from './components/TopBar/TopBar';

function App() {
  useEffect(()=>{
    document.title = "CarteCognitive"
    }
  )
  return (
    <AppContextProvider>
      <ReactFlowProvider>
        <div className="App" style={{
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          }}>
            <TopBar/>
            <div style={{          
              display: "flex",
              flexDirection: "row", flex: 1}}>
              <SideBar/>
              <GraphTest/>
            </div>
        </div>
      </ReactFlowProvider>
    </AppContextProvider>
  );
}

export default App;
