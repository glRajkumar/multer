import React, { useState } from 'react'
import axios from 'axios'

function MultipleForm(props) {
    const [ selectedFiles, setFiles ] = useState(null)
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
            formData.append("multiple", selectedFiles[key])
        }

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        axios.post(props.url, formData, config)
        .then((res)=> console.log(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div className="container mb-2">
        <div className="row">
            <div className="col-md-6 m-auto">
                <h3 className="text-center display-4 my-4"> {props.Name} </h3>
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
                              {/* also use m.toString() it will include , automatic */}
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
        </div>
    </div>
    )
}

export default MultipleForm