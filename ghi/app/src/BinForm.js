import React, { useEffect, useState } from 'react';


const initialFormData = {
    closet_name: '',
    bin_number: '',
    bin_size: '',
}

function BinForm() {
    const [formData, setFormData] = useState(
        initialFormData
    )


    const handleSubmit = async (event) => {
        event.preventDefault();

        const binUrl = 'http://localhost:8100/api/bins/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const binResponse = await fetch(binUrl, fetchOptions);
        if (binResponse.ok) {
            setFormData(
                initialFormData
            )
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({
            ...formData,
            [inputName]: value
        })
    }
    
    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create bins</h1>
                    <form onSubmit={handleSubmit} id="create-shoe-form">
                        <div className="form-floating mb-3">
                            <input value={formData.closet_name} onChange={handleFormChange} placeholder="Closet Name" required type="text" name="closet_name" id="closet_name" className="form-control" />
                            <label htmlFor="name">Closet Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.bin_number} onChange={handleFormChange} placeholder="Bin Number" required type="text" name="bin_number" id="bin_number" className="form-control" />
                            <label htmlFor="bin_number">Bin Number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.bin_size} onChange={handleFormChange} placeholder="Bin Size" required type="text" name="bin_size" id="bin_size" className="form-control" />
                            <label htmlFor="bin_size">Bin Size</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default BinForm;