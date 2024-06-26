import React, { useContext, useState } from "react"
import "./MainSideBar.css"
import { GoBackButton, IconButton } from "../Buttons/IconButtons"
import { useNavigate } from "react-router-dom"
import { IoChevronForward } from "react-icons/io5"
import { FiEdit3, FiSettings, FiCpu } from "react-icons/fi"
import { VscSymbolOperator } from "react-icons/vsc";
import { HiOutlineCog } from "react-icons/hi";
import EditSideBar from "./EditSideBar"
import CalculSideBar from "./CalculSideBar"
import SettingsSideBar from "./SettingsSideBar"
import AutomatingSideBar from "./AutomatingSideBar"
import { SlCalculator } from "react-icons/sl"
import { GraphContext } from "../../context/GraphContext"
import { GraphType } from "../../types/Graph/GraphType"
import { setGraph } from "../../firebase/FireStore.tsx/FirestoreDB"
import { AppContext } from "../../context/AppContext"

enum SideBarMenuType {
    Edit = "Edit",
    Calcul = "Calcul",
    Settings = "Settings",
    Auto = "Auto"
}

const MainSideBar = () => {

    const {isCalculating, setIsCalculating, graphCalculType, propagationValue, agregationValue, isGraphModified, nodes, edges, id, graphTitle, upgrade, proprio} = useContext(GraphContext)
    const {personnalDataUser, user} = useContext(AppContext)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const [selectedMenu, setSelectedMenu] = useState<SideBarMenuType>(SideBarMenuType.Edit)

    const navigate = useNavigate()

    const handleGoBack = () => {
        let newGraph: GraphType = {
                     nodes: nodes,
                     edges: edges,
                     id: id,
                     title: graphTitle,
                     upgrade: upgrade,
                     proprio : proprio,
                     graphCalculType,
                     propagation: propagationValue,
                     aggregation: agregationValue
                 }
        
                 if (isGraphModified) {
                     const shouldSave = window.confirm("Voulez-vous sauvegarder les modifications ?");
                     if (shouldSave) {
                         setGraph(newGraph, personnalDataUser)
                     }
                 }
        navigate(-1)
    }

    const handleChangeExpandState = () => {
        setIsExpanded(!isExpanded)
    }

    const handleChangeMenu = (menu: SideBarMenuType) => {
        // if(!isExpanded) {
        //     setIsExpanded(true)
        // }

        if(menu === SideBarMenuType.Calcul) {
            setIsCalculating(true)
        }

        else setIsCalculating(false)

        setSelectedMenu(menu)
    }

    return (
        <div className="mainSideBarContainer">
            <div className={`mainSideBarSubContainer ${isExpanded ? "expanded" : ""}`}>
                <div id="header">
                    <div>
                        <GoBackButton onPress={handleGoBack} />
                    </div>
                </div>

                <div id="body">
                    <div className="mainSideBarListItem">
                        <IconButton 
                            isSelected={selectedMenu === SideBarMenuType.Edit}
                            onPress={() => handleChangeMenu(SideBarMenuType.Edit)}
                            Icon={FiEdit3} />
                        <span className="tooltip">Modifier</span>
                    </div>
                    <div className="mainSideBarListItem">
                        <IconButton 
                            isSelected={selectedMenu === SideBarMenuType.Calcul} 
                            onPress={() => handleChangeMenu(SideBarMenuType.Calcul)}
                            Icon={SlCalculator}/>
                        <span className="tooltip">Calculer</span>
                    </div>
                    <div className="mainSideBarListItem">
                        <IconButton 
                            isSelected={selectedMenu === SideBarMenuType.Settings} 
                            onPress={() => handleChangeMenu(SideBarMenuType.Settings)}
                            Icon={FiSettings} />
                        <span className="tooltip">Paramètres</span>
                    </div>
                    <div className="mainSideBarListItem">
                        <IconButton 
                            isSelected={selectedMenu === SideBarMenuType.Auto} 
                            onPress={() => handleChangeMenu(SideBarMenuType.Auto)}
                            Icon={FiCpu} />
                        <span className="tooltip">Automatisation</span>
                    </div>
                </div>

                <div id="footer">
                    <li className="utilsSideBarItem" onClick={handleChangeExpandState}>
                        <span style={{ marginLeft: -15 }}>
                            <IconButton onPress={handleChangeExpandState}>
                                <IoChevronForward size={20} id="developIcon" />
                            </IconButton>
                        </span>
                        {/* <div id="title" style={{ marginLeft: 15 }}>
                            Réduire
                        </div> */}

                    </li>
                </div>
            </div>


            <div className={`mainSideBarContentContainer ${isExpanded ? "expanded" : ""}`}>
                {(selectedMenu == SideBarMenuType.Edit) && <EditSideBar isExpanded={isExpanded}/>}
                {(selectedMenu == SideBarMenuType.Calcul) && <CalculSideBar isExpanded={isExpanded}/>}
                {(selectedMenu == SideBarMenuType.Settings) && <SettingsSideBar isExpanded={isExpanded}/>}
                {(selectedMenu == SideBarMenuType.Auto) && <AutomatingSideBar isExpanded={isExpanded}/>}
            </div>
        </div>
    )
}

export default MainSideBar