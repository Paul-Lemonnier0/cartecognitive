import React from "react"
import { GraphType } from "../types/Graph/GraphType"
import { useLocation } from "react-router-dom";

import "./GraphDetailsScreen.css"
import SideBar from "../components/SideBar/SibeBar";
import { GraphContextProvider } from "../context/GraphContext";
import Graph from "../components/graphs/Graph";
import GraphDetailsSideBar from "../components/SideBar/GraphDetailsSideBar";
import { GraphTopBar } from "../components/TopBar/TopBar";

const GraphDetailsScreen = () => {
    const location = useLocation();
    const graph = location.state as GraphType;

    if(!graph) return null

    return(
        <GraphContextProvider autoUpgrade={graph.upgrade} defaultNodes={graph.nodes} defaultEdges={graph.edges} graphName={graph.title} id={graph.id}>
            <div style={{display: "flex", flexDirection: "column", flex: 1}}>
                <GraphTopBar title="e"/>
                <div style={{ display: "flex", flexDirection: "row", flex: 1 }}
                    className="graphDetailsContainer">
                    
                        
                        <GraphDetailsSideBar/>
                        <Graph/>    
                        <SideBar/>
                </div>
            </div>
        </GraphContextProvider>

    )
}

export default GraphDetailsScreen