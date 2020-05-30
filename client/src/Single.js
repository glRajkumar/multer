import React, { useState } from 'react'
import axios from 'axios'
import SingleForm from './SingleForm';
import ProgressBar from './ProgressBar';
import Img from './Img';

function Single() {
    const [ selectedFile, setFile ] = useState(null)
    const [ pic, setPic ] = useState("")
    const [ progress, setProgress ] = useState(0)

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

        axios.post("/single", formData, config)
        .then((res)=> {
            console.log(res.data);
            setProgress(0)
            setPic(res.data.url)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        <SingleForm  
            OnChange={e => setFile(e.target.files[0])}
            selectedFile={selectedFile}
            Submit={Submit} 
        />

        { progress > 0 && <ProgressBar progress={progress} />}

        { pic && <Img Src={pic} id="1" />}

        </>
    )
}

export default Single