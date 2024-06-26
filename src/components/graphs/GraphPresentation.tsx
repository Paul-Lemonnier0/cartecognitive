import React, { Dispatch, FC, useContext, useEffect, useState } from "react"
import "./GraphPresentation.css"
import { Link } from "react-router-dom"
import { GraphType } from "../../types/Graph/GraphType"
import { addPartageOtherUser, deleteGraph } from "../../firebase/FireStore.tsx/FirestoreDB"
import { AppContext, UtilisateurInterface } from "../../context/AppContext"
import { NormalText, TitleText } from "../Text/CustomText"
import { IconButton, IconText } from "../Buttons/IconButtons"
import { AiOutlineNodeIndex } from "react-icons/ai";
import { PiFlowArrowDuotone } from "react-icons/pi";
import { IoChevronForward } from "react-icons/io5"
import { FaRegStar, FaStar } from "react-icons/fa6"
import OtherUserProfile from "../Profil/OtherUserProfile"
import { UsualButton } from "../Buttons/Buttons"
import ExportToJSON from "../../data/ExportToJSON"

interface GraphPresentationProps {
    graph: GraphType
    style?: React.CSSProperties,
    favorites: string[],
    setFavorites: Dispatch<string[]>
}


const GraphPresentation: FC<GraphPresentationProps> = ({
    graph,
    style,
    favorites,
    setFavorites
}) => {
    const [isSelect, setIsSelect] = useState(false)
    const { user, graphsUser, setGraphsUser, graphsPartage, setGraphsPartage, ListUtilisateurs, personnalDataUser, setPersonnalDataUser } = useContext(AppContext)
    const [showUserListModal, setShowUserListModal] = useState(false);


    const handleClickEffacer = () => {
        if (user?.uid === "")
            console.log("utilisateur introuvable")
        else {
            deleteGraph(graph.id, user.uid)
            const updatedGraphsUser = graphsUser.filter((g) => g.id !== graph.id)
            const updatedGraphsUserPartage = graphsPartage.filter((g) => g.id !== graph.id)
            setGraphsUser(updatedGraphsUser)
            setGraphsPartage(updatedGraphsUserPartage)

            console.log("id : ", graph.id, "effacée !")
            setIsSelect(false)
        }
    }

    const handleClickPartage = () => {
        if (user?.uid === "")
            console.log("utilisateur introuvable")
        else {
            //TODO faire la fonction partagé
            setShowUserListModal(true);
            console.log("id : ", graph.id, "partagé !")
            setIsSelect(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleDeleteKeyDown);
        return () => {
            document.removeEventListener('keydown', handleDeleteKeyDown);
        };
    }, [isSelect]);

    const handleDeleteKeyDown = (e: KeyboardEvent) => {
        if ((e.key === "Delete" || e.key === "Backspace") && isSelect) {
            handleClickEffacer();
        }
        if ((e.key === "p" && isSelect)) {
            handleClickPartage()
        }
        if ((e.key === "t" && isSelect)) {
            ExportToJSON(graph)

        }
    }
    const handleSelectClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsSelect(!isSelect);
    };

    const isFavorite = favorites.includes(graph.id)

    const handleFavoriteState = async () => {
        if (isFavorite) {
            setFavorites(favorites.filter(fav => fav !== graph.id))
        }

        else {
            setFavorites([...favorites, graph.id])

        }

    }
    const closeUserListModal = () => {
        setShowUserListModal(false);
    };


    const handleClickOtherUser = (u: UtilisateurInterface) => {
        addPartageOtherUser(graph.id, u.uid)
    }

    return (
        <div className={`graphPresentationContainer ${isSelect ? 'selected' : ""}`} style={{
            flex: 1,
            borderRadius: 15,
            display: "flex",
        }} onClick={handleSelectClick}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 40,
                flex: 1,
                alignItems: "flex-start",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                    flex: 1,
                    width: "100%",
                    alignItems: "flex-start",
                }}>
                    <div style={{ flex: 1, boxSizing: "border-box" }} tabIndex={0}>
                        <TitleText text={graph.title} />
                        <NormalText bold text={graph.title} />
                    </div>

                    <Link to={'/graphDetails'} state={{ ...graph }}>
                        <IconButton Icon={IoChevronForward} onPress={() => { }} />
                    </Link>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                    width: "100%"
                }}>
                    <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                        <IconText contrast Icon={AiOutlineNodeIndex} text={graph.nodes.length.toString()} />
                        <IconText contrast Icon={PiFlowArrowDuotone} text={graph.edges.length.toString()} />
                    </div>

                    <IconButton Icon={isFavorite ? FaStar : FaRegStar}
                        contrast={isFavorite}
                        onPress={handleFavoriteState} stopPropagation />

                </div>
            </div>
            {showUserListModal && (
                //TODO améliorer le style
                <div className="modal-overlay">
                    <div className="modal-content" onClick={(e) => { e.stopPropagation() }}>
                        <h3>Liste des utilisateurs</h3>



                        <div id="ListUsers">
                            {ListUtilisateurs.List.map((u) => (

                                <div className="OtherUser" onClick={() => { handleClickOtherUser(u) }}>
                                    <OtherUserProfile
                                        key={u.uid}
                                        name={u.name}
                                        firstName={u.firstName}
                                        uid={u.uid}
                                    />
                                </div>

                            ))}
                        </div>


                        <UsualButton onPress={closeUserListModal} text="Fermer"></UsualButton>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GraphPresentation