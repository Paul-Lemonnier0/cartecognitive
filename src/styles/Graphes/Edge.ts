import { Edge, MarkerType } from "reactflow"
import theme from "../../constantes/Colors"

export const edgeBase = (data: Edge): Edge => {
    const colors = theme.light

    const markerParams = {
        type: MarkerType.ArrowClosed, 
        width: 20, 
        height: 20,
        color: colors.EdgeColor
    }

    console.log("updated")

    return {
        type: "smoothstep",
        markerEnd: markerParams,
        style: {
            backgroundColor: "red",
            borderColor: "red",
            stroke: "#000000"
        },
        
        ...data
    }
}

// style : {
//     stroke: data.selected ? "red" : "blue"
// },