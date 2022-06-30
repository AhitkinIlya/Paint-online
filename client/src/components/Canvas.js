import React, { useRef, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button } from 'react-bootstrap'
import { useParams  } from 'react-router-dom'
import axios from 'axios'

import '../styles/canvas.scss'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'

const Canvas = observer(() => {
    const canvasRef = useRef()
    const userNameRef = useRef()
    const [ isShow, setIsShow ] = useState(true)
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        let ctx = canvasRef.current.getContext('2d')
        axios.get(`http://localhost:5000/image?id=${params.id}`)
            .then(res => {
                const image = new Image()
                image.src = res.data
                image.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
    }, [])

    useEffect(() => {
        if (canvasState.userName) {
            const socket = new WebSocket(`ws://localhost:5000/`)
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    userName: canvasState.userName,
                    method: 'connection'
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case 'connection':
                        console.log(`Пользователь ${msg.userName} присоединился`)
                        break
                    case 'draw':
                        drawHandler(msg)
                        break
                }
            }
        }
    }, [canvasState.userName])

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case 'brush':
                Brush.draw(ctx, figure.x, figure.y)
                break
            case 'finish':
                ctx.beginPath()
                break
            case 'rect':
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
                break
        }
    }

    const mouseDown = () => {
        canvasState.pushToBack(canvasRef.current.toDataURL())
        axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
            .then(res => console.log('res', res.data))
    }

    const connectionHandler = () => {
        canvasState.setUserName(userNameRef.current.value)
        setIsShow(false)
    }

    return (
        <div className='canvas'>
            <Modal show={isShow} onHide={() => {}}>
                <Modal.Header>
                    <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type='text' ref={userNameRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => connectionHandler()}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={() => mouseDown()} ref={canvasRef} width={800} height={600}></canvas>
        </div>
    )
})

export default Canvas
