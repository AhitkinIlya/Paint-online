import React from 'react'
import ToolBar from '../ToolBar'
import SettingsBar from '../SettingsBar'
import Canvas from '../Canvas'

export const MainLayout = () => {
    return (
        <>
            <ToolBar />
            <SettingsBar />
            <Canvas />
        </>
    )
}
