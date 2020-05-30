import React from 'react'

function SingleForm(props) {
    return (
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
                                onChange={props.OnChange}
                            />
                            <label htmlFor="file" className="custom-file-label">
                              { props.selectedFile ? `${props.selectedFile.name}` : "Choose File" }  
                            </label>
                        </div>
                    </div>
                    <input 
                     type="button" 
                     value="Submit" 
                     className="btn btn-primary btn-block" 
                     onClick={props.Submit} 
                    />
                </form>
            </div>
        </div>
    </div>
    )
}

export default SingleForm