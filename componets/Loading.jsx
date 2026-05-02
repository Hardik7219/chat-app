import React from 'react'
import '@/style/loading.css'
function Loading() {
    return (
        <div>
            <div className="loading-wave">
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
            </div>
        </div>
    )
}

export default Loading
