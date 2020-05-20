import React, { useState } from 'react'
import axios from 'axios'

function Single() {
    const [ selectedFile, setFile ] = useState(null)

    const submit = (e) =>{
        e.preventDefault();                
        const formData = new FormData()
     
        formData.append("single", selectedFile)

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        axios.post("/single", formData, config)
        .then((res)=> console.log(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div className="container">
        <div className="row">
            <div className="col-md-6 m-auto">
                <h3 className="text-center display-4 my-4">Single</h3>
                <form className="form-group">
                    <div className="input-group">
                        <div className="custom-file">
                            <input 
                                type="file"
                                name="img" 
                                id="file" 
                                accept="image/*"
                                className="custom-file-input"
                                onChange={ e => setFile(e.target.files[0]) }
                            />
                            <label htmlFor="file" className="custom-file-label">
                              { selectedFile ? `${selectedFile.name}` : "Choose File" }  
                            </label>
                        </div>
                    </div>
                    <input 
                     type="button" 
                     value="Submit" 
                     className="btn btn-primary btn-block" 
                     onClick={submit} 
                    />
                </form>
            </div>
        </div>
    </div>
    )
}

export default Single