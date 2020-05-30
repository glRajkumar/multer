import React from 'react'

function MultipleForm(props) {
    return (
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
                                onChange={props.OnChange}
                            />
                            <label htmlFor="file" className="custom-file-label">
                              {/* also use names.toString() it will include , automatic */}
                              { props.names.length > 0 ? props.names.join(" ,") : "Choose File" }
                              {/* { selectedFiles ? m.join(" ,") : "Choose File" }     */}
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

export default MultipleForm