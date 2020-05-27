import React, { useState } from 'react'
import axios from 'axios'

function SaveInDb() {
    const [ selectedFile, setFile ] = useState(null)
    const [ selectedFiles, setFiles ] = useState(null)
    const [ id, setId ] = useState("")
    const [ img, setImg ] = useState("")
    const [ ids, setIds ] = useState("")
    const [ imgs, setImgs ] = useState("")
    const [ progress, setProgress ] = useState(0)
    const [ mprogress, setmProgress ] = useState(0)
    let m = []

    const handleChange = async () => {
        if(selectedFiles){
            for(const key of Object.keys(selectedFiles)){
                m.push(selectedFiles[key].name)
            }    
        }
    }
    handleChange()

    const ArrayBufferToBase64 = (buffer) => {
        let binary = ""
        let bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b) => binary += String.fromCharCode(b))

        return window.btoa(binary)
    }

    const Submit = (e) =>{
        e.preventDefault();                
        const formData = new FormData()
     
        formData.append("single", selectedFile)

        const config = {
            header: { 'content-type': 'multipart/form-data' },
            onUploadProgress : progEvent => {
                let percent = Math.floor((progEvent.loaded * 100) / progEvent.total)
                if (percent < 100) {
                    setProgress(percent)
                }
                if(percent === 100){
                    setProgress(99)
                    console.log("i am 100 at onupload");
                }
            }
        }

        axios.post('/saveInDb/single', formData, config)
        .then((res)=> {
            setProgress(0)
            setId(res.data.id)
        })
        .catch(err => console.log(err))
    }

    const MuSubmit = (e) =>{
        e.preventDefault();                
        const formData = new FormData()

        for(const key of Object.keys(selectedFiles)){
            formData.append("multiple", selectedFiles[key])
        }

        const config = {
            header: { 'content-type': 'multipart/form-data' },
            onUploadProgress : progEvent => {
                let percent = Math.floor((progEvent.loaded * 100) / progEvent.total)
                if (percent < 100) {
                    setmProgress(percent)
                }
                if(percent === 100){
                    setmProgress(99)
                }
            }
        }

        axios.post("/saveInDb/multiple", formData, config)
        .then((res)=> {
            setmProgress(0)
            setIds(res.data.ids)
        })
        .catch(err => console.log(err))
    }

    const getSingleImg = () => {
        const config = {
            onDownloadProgress : progEvent => {                
                let percent = Math.floor((progEvent.loaded * 100) / progEvent.total)
                if (percent < 100) {
                    setProgress(percent)
                }
                if(percent === 100){
                    setProgress(99)
                    console.log("i am 100 at ondownload");
                }
            }
        }

        axios.post(`/saveInDb/getsingle`, {id}, config)
        .then((res)=>{
            setProgress(0)
            let base64Flag = `data:${res.data.img.contentType};base64,`
            let imgStr = ArrayBufferToBase64(res.data.img.data.data)
            setImg(base64Flag + imgStr)
        })
    }

    const getMultipleImg = () => {
        axios.post(`/saveInDb/getmultiple`, {ids})
        .then((res)=>{
            let imgsList = []
            res.data.forEach((img)=> {
                let base64Flag = `data:${img.img.contentType};base64,`
                let imgStr = ArrayBufferToBase64(img.img.data.data)
                imgsList.push(base64Flag+imgStr)
            })
            setImgs(imgsList)
        })    
    }

    return (
        <>
            <div className="col-md-6 m-auto mb-2">
                <h3 className="text-center display-4 my-4">Save In Db</h3>
            </div>

            <hr />

            <div className="container mb-2">
            <div className="row">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center display-4 my-4"> Single </h3>
                    <form className="form-group">
                        <div className="input-group mb-2">
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
                        onClick={Submit} 
                        />
                    </form>
                </div>

                {progress > 0 && 
                <div className="container mb-4">
                <div className="progress">
                    <div 
                     className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                     role="progressbar"
                     aria-valuenow={progress}
                     aria-valuemin="0"
                     aria-valuemax="100"
                     style={{ width : progress + "%" }}
                    >
                        {progress} %
                    </div>
                </div>
                </div>
                }

                <div className="container text-center">
                   <button className="btn btn-primary mb-1" onClick={getSingleImg}>click me to get the image</button>
                </div>

                { img && 
                    <div className="container text-center">
                        <img src={img} width="200" height="200" />
                    </div>
                }
            </div>
        </div>

            <hr />

            <div className="container mb-2">
            <div className="row">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center display-4 my-4"> Multiple </h3>
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
                        onClick={MuSubmit} 
                        />
                    </form>
                </div>

                {mprogress > 0 && 
                <div className="container mb-4">
                <div className="progress">
                    <div 
                     className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                     role="progressbar"
                     aria-valuenow={mprogress}
                     aria-valuemin="0"
                     aria-valuemax="100"
                     style={{ width : mprogress + "%" }}
                    >
                        {mprogress} %
                    </div>
                </div>
                </div>
                }

                <div className="container text-center">
                   <button className="btn btn-primary mb-1" onClick={getMultipleImg}>click me to get the image</button>
                </div>

                {imgs && 
                  imgs.map((img, i)=>(
                    <div key={i} className="container mb-2">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src={img} width="200" height="200" className="mx-auto d-block" />
                    </div>
                    </div>
                  ))
                }

            </div>
        </div>
        <hr />
    </>
    )
}

export default SaveInDb