import React, { useState } from 'react'
import axios from 'axios'
import MultipleForm from './MultipleForm'
import SingleForm from './SingleForm';
import ProgressBar from './ProgressBar';
import Img from './Img';

function UsingGFS() {
    const [ selectedFile, setFile ] = useState(null)
    const [ selectedFiles, setFiles ] = useState(null)
    const [ pic, setPic ] = useState(false)
    const [ pics, setPics ] = useState(false)
    const [ name, setName ] = useState("")
    const [ names, setNames ] = useState("")
    const [ progress, setProgress ] = useState(0)
    const [ mprogress, setmProgress ] = useState(0)
    let fileNnames = []

    const handleChange = async () => {
        if(selectedFiles){
            for(const key of Object.keys(selectedFiles)){
                fileNnames.push(selectedFiles[key].name)
            }    
        }
    }
    handleChange()

    const Submit = (e) =>{
        e.preventDefault();                
        const formData = new FormData()
     
        formData.append("sin_gfs", selectedFile)

        const config = {
            header: { 'content-type': 'multipart/form-data' },
            onUploadProgress : progEvent => {
                let percent = Math.floor((progEvent.loaded * 100) / progEvent.total)
                if (percent < 100) setProgress(percent)
                if(percent === 100) setProgress(99) 
            }
        }

        axios.post("/usinggfs/single", formData, config)
        .then((res)=> {
            setProgress(0)
            setName(res.data.fileName)
        })
        .catch(err => console.log(err))
    }

    const MuSubmit = (e) =>{
        e.preventDefault();                
        const formData = new FormData()

        for(const key of Object.keys(selectedFiles)){
            formData.append("mul_gfs", selectedFiles[key])
        }

        const config = {
            header: { 'content-type': 'multipart/form-data' },
            onUploadProgress : progEvent => {
                let percent = Math.floor((progEvent.loaded * 100) / progEvent.total)
                if (percent < 100) setmProgress(percent)
                if(percent === 100) setmProgress(99) 
            }
        }

        axios.post("/usinggfs/multiple", formData, config)
        .then((res)=> {
            setmProgress(0)
            setNames(res.data.fileNames)
        })
        .catch(err => console.log(err))
    }

    const getAllImg = () => {
        axios.get("/usinggfs")
        .then((res)=>{ console.log(res.data) })    
    }

    return (
    <>
        <div className="col-md-6 m-auto mb-2">
            <h3 className="text-center display-4 my-4"> Using GFS </h3>
        </div>

        <hr />
        <SingleForm  
            OnChange={e => setFile(e.target.files[0])}
            selectedFile={selectedFile}
            Submit={Submit} 
        />

        { progress > 0 && <ProgressBar progress={progress} />}

        <div className="container text-center">
            <button 
                className="btn btn-primary mb-1"
                onClick={ ()=> setPic(true) }
            >click me to get the image by name</button>
        </div>

        { pic && <Img Src={`/usinggfs/image/${name}`} />}

        <hr />

        <MultipleForm
            names={fileNnames}
            OnChange={e => setFiles(e.target.files)}
            selectedFiles={selectedFiles}
            Submit={MuSubmit} 
        />

        { mprogress > 0 && <ProgressBar progress={mprogress} />}

        <div className="container text-center">
            <button 
                className="btn btn-primary mb-1" 
                onClick={ ()=> setPics(true) }
            >click me to get multiple images in DB</button>
        </div>

        {
            pics && 
            names.map((name, i)=>(<React.Fragment key={i}> <Img Src={`/usinggfs/image/${name}`} /> </React.Fragment>)) 
        }

        <hr />

        <div className="container text-center">
            <button className="btn btn-primary mb-1" onClick={getAllImg}>click me to get all images in DB</button>
        </div>
    </>
    )
}

export default UsingGFS