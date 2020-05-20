import React, { useState } from 'react'
import axios from 'axios'
import Form from './Form'
import SingleForm from './SingleForm'
import MultipleForm from './MultipleForm'

function Input() {
    const [ selectedFile, setFile ] = useState(null)

    const Submit = (e) =>{
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
        <>
            <Form 
            Name="Test" 
            OnChange={ e => setFile(e.target.files[0])}
            selectedFile={selectedFile}
            Submit={Submit} 
            />

            <hr />

            <SingleForm
            Name="sinl"
            url="/single"
            />

            <hr />

            <MultipleForm 
            Name="multi"
            url="/multiple"
            />
        </>
    )
}

export default Input
