import React from 'react'
import ReactDOM from 'react-dom'
import Family from './family'
import Member from './member'

ReactDOM.render((
    <Family >
        <Member name='Pedro' lastName='Pongelupe' />
        <Member name='Matheus' lastName='Pongelupe' />
    </Family>
)
    , document.getElementById('app'))