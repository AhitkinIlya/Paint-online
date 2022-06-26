import React from 'react'
import '../styles/settingsbar.scss'
import toolState from '../store/toolState'

const SettingsBar = () => {
    return (
        <div className='settingsBar'>
            <label htmlFor='line-width'>Толщина линия</label>
            <input 
                onChange={e => toolState.setLineWidth(e.target.value)}
                className='settingsBar__lineWidth' 
                id='line-width' 
                type='number' 
                defaultValue={1} 
                min={1} 
                max={50} 
            />
            <label htmlFor='line-stroke'>Цвет обводки</label>
            <input 
                onChange={e => toolState.setStrokeColor(e.target.value)}
                className='settingsBar__lineWidth' 
                id='line-stroke' 
                type='color' 
            />
        </div>
    )
}

export default SettingsBar

