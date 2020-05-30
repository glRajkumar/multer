import React, { useState } from 'react'
import axios from 'axios'
import MultipleForm from './MultipleForm'
import ProgressBar from './ProgressBar';
import Img from './Img';

function Multiple() {
    const [ selectedFiles, setFiles ] = useState(null)
    const [ picsSrc, setPicsSrc ] = useState([])
    const [ progress, setProgress ] = useState(0)
    let names = []

    const handleChange = async () => {
        if(selectedFiles){
            for(const key of Object.keys(selectedFiles)){
                names.push(selectedFiles[key].name)
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
            header: { 'content-type': 'multipart/form-data' },
            onUploadProgress : progEvent => {
                let percent = Math.floor((progEvent.loaded * 100) / progEvent.total)
                if (percent < 100) setProgress(percent)
                if(percent === 100) setProgress(99) 
            }
        }

        axios.post("/multiple", formData, config)
        .then((res)=> {
            console.log(res.data)
            setProgress(0)
            setPicsSrc(res.data.listUrl)
        })
        .catch(err => console.log(err))
    }
    
    return (
        <>
            <MultipleForm
                names={names}
                OnChange={e => setFiles(e.target.files)}
                selectedFiles={selectedFiles}
                Submit={Submit} 
            />

            { progress > 0 && <ProgressBar progress={progress} />}

            { 
              picsSrc && <> { picsSrc.map((pic, i)=>( <Img Src={pic} id={i} /> )) } </>
            }
        </>
    ) 
}

export default Multiple