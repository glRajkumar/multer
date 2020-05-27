import React, { useState } from 'react'
import axios from 'axios'

function UsingGFS() {
    const [ selectedFiles, setFiles ] = useState(null)
    const [ picsSrc, setPicsSrc ] = useState([])
    let m = []

    const handleChange = async () => {
        if(selectedFiles){
            for(const key of Object.keys(selectedFiles)){
                m.push(selectedFiles[key].name)
            }    
        }
    }
    handleChange()

    const Submit = (e) =>{
        e.preventDefault();                
        const formData = new FormData()

        for(const key of Object.keys(selectedFiles)){
            formData.append("gfs", selectedFiles[key])
        }

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        axios.post("/usinggfs", formData, config)
        .then((res)=> {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    const getMultipleImg = () => {
        axios.get("/usinggfs")
        .then((res)=>{
            console.log(res.data);
        })    
    }
    
    return (
        <div className="container mb-2">
        <div className="row">
            <div className="col-md-6 m-auto">
                <h3 className="text-center display-4 my-4"> Using GFS </h3>
                <form className="form-group">
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input 
                                type="file"
                                name="img" 
                                id="file" 
                                accept="image/*"
                                multiple
                                className="custom-file-input"
                                onChange={(e) => setFiles(e.target.files)}
                            />
                            <label htmlFor="file" className="custom-file-label">
                              { selectedFiles ? m.join(" ,") : "Choose File" }  
                            </label>
                        </div>
                    </div>
                    <input 
                     type="button" 
                     value="Submit" 
                     className="btn btn-primary btn-block" 
                     onClick={Submit} 
                    />
                </form>
            </div>

            <div className="container text-center">
                <button className="btn btn-primary mb-1" onClick={getMultipleImg}>click me to get the image</button>
            </div>

            { picsSrc && 
            <>
            { picsSrc.map((pic, i)=>(
                <div key={i} className="container mb-2">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src={pic} width="200" height="200" className="mx-auto d-block" />
                    </div>
                </div>
              ))    
            }
            </>
            }
        </div>
    </div>
    )
}

export default UsingGFS
