import React, { useState } from 'react'
import axios from 'axios'

function SaveInDb() {
    const [ selectedFile, setFile ] = useState(null)
    const [ mselectedFile, setMFile ] = useState(null)

    const submit = (e) =>{
        e.preventDefault();                
        const formData = new FormData()

        formData.append("single", selectedFile)

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        axios.post("/saveInDb/single", formData, config)
        .then((res)=> console.log(res.data))
        .catch(err => console.log(err))
    }

    const msubmit = (e) =>{
        e.preventDefault();                
        const formData = new FormData()
        
        for(const key of Object.keys(selectedFiles)){
            formData.append("multiple", selectedFiles[key])
        }

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        axios.post("/saveInDb/multiple", formData, config)
        .then((res)=> console.log(res.data))
        .catch(err => console.log(err))
    }

    return (
        <>
        <div className="container mb-5">
        <div className="row">
            <div className="col-md-6 m-auto">
                <h3 className="text-center display-4 my-4">Save In Db</h3>
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

    <div className="container">
    <div className="row">
        <div className="col-md-6 m-auto">
            <h3 className="text-center display-4 my-4">Multiple</h3>
            <form className="form-group">
                <div className="input-group">
                    <div className="custom-file">
                        <input 
                            type="file"
                            name="img" 
                            id="file" 
                            accept="image/*"
                            multiple
                            className="custom-file-input"
                            onChange={ e => setMFile(e.target.files) }
                        />
                        <label htmlFor="file" className="custom-file-label">
                        { mselectedFile ? "l" : "Choose File" }  
                        </label>
                    </div>
                </div>
                <input 
                type="button" 
                value="Submit" 
                className="btn btn-primary btn-block" 
                onClick={msubmit} 
                />
            </form>
        </div>
    </div>
    </div>
    </>
    )
}

export default SaveInDb