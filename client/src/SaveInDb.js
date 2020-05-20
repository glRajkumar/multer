import React from 'react'
import SingleForm from './SingleForm'
import MultipleForm from './MultipleForm';

function SaveInDb() {
    return (
        <>
            <div className="col-md-6 m-auto mb-2">
                <h3 className="text-center display-4 my-4">Save In Db</h3>
            </div>

            <hr />

            <SingleForm Name="Single" url="/saveInDb/single" />

            <hr />

            <MultipleForm Name="Multiple" url="/saveInDb/multiple" />

            <hr />
    </>
    )
}

export default SaveInDb