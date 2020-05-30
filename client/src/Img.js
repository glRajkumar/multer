import React from 'react'

function Img({Src, id}) {
    return (
    <div key={id} className="container mb-2">
        <div className="d-flex flex-column justify-content-center align-items-center">
            <img src={Src} alt="" width="200" height="200" className="mx-auto d-block" />
        </div>
    </div>
    )
}

export default Img