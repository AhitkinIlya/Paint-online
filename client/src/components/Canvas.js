import React, { useRef, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import '../styles/canvas.scss'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'

const Canvas = observer(() => {
    const canvasRef = useRef()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
    }, [])

    const mouseDown = () => {
        canvasState.pushToBack(canvasRef.current.toDataURL())
    }

    return (
        <div className='canvas'>
            <canvas onMouseDown={() => mouseDown()} ref={canvasRef} width={800} height={600}></canvas>
        </div>
    )
})

export default Canvas
