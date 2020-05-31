import React, { useState } from 'react'
import axios from 'axios'
import ProgressBar from './ProgressBar';
import Img from './Img';
import SingleForm from './SingleForm';
import MultipleForm from './MultipleForm'

function SaveInDb() {
    const [ selectedFile, setFile ] = useState(null)
    const [ selectedFiles, setFiles ] = useState(null)
    const [ id, setId ] = useState("")
    const [ img, setImg ] = useState("")
    const [ ids, setIds ] = useState("")
    const [ imgs, setImgs ] = useState("")
    const [ progress, setProgress ] = useState(0)
    const [ mprogress, setmProgress ] = useState(0)
    let names = []

    const handleChange = async () => {
        if(selectedFiles){
            for(const key of Object.keys(selectedFiles)){
                names.push(selectedFiles[key].name)
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
                if (percent < 100) setProgress(percent)
                if(percent === 100) setProgress(99) 
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
                if (percent < 100) setmProgress(percent)
                if(percent === 100) setmProgress(99)
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
        axios.post(`/saveInDb/getsingle`, {id})
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

        <SingleForm  
            OnChange={e => setFile(e.target.files[0])}
            selectedFile={selectedFile}
            Submit={Submit} 
        />

        { progress > 0 && <ProgressBar progress={progress} />}

        <div className="container text-center">
            <button className="btn btn-primary mb-1" onClick={getSingleImg}>click me to get the image</button>
        </div>

        { img && <Img Src={img} /> }

        <hr />

        <MultipleForm
            names={names}
            OnChange={e => setFiles(e.target.files)}
            selectedFiles={selectedFiles}
            Submit={MuSubmit} 
        />

        { mprogress > 0 && <ProgressBar progress={mprogress} />}

        <div className="container text-center">
            <button className="btn btn-primary mb-1" onClick={getMultipleImg}>click me to get the image</button>
        </div>

        { 
            imgs && 
            imgs.map((img, i)=>( <React.Fragment key={i}> <Img Src={img} /> </React.Fragment> )) 
        }

        <hr />
    </>
    )
}

export default SaveInDb