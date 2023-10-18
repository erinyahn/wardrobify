import React, { useEffect, useState } from 'react';


const initialFormData = {
    manufacturer: '',
    model_name: '',
    color: '',
    picture_url: '',
    bin: '', 
}

function ShoeForm() {
    const [formData, setFormData] = useState({
        manufacturer: '',
        model_name: '',
        color: '',
        picture_url: '',
        bin: '',        
    })

    const [bins, setBins] = useState([])

    const fetchData = async() => {
        const url = 'http://localhost:8100/api/bins/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setBins(data.bins)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const shoeUrl = 'http://localhost:8080/api/shoes/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const shoeResponse = await fetch(shoeUrl, fetchOptions);
        if (shoeResponse.ok) {
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
                    <h1>Create shoes</h1>
                    <form onSubmit={handleSubmit} id="create-shoe-form">
                        <div className="form-floating mb-3">
                            <input value={formData.manufacturer} onChange={handleFormChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                            <label htmlFor="name">Manufacturer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.model_name} onChange={handleFormChange} placeholder="Model Name" required type="text" name="model_name" id="model_name" className="form-control" />
                            <label htmlFor="model_name">Model Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.color} onChange={handleFormChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.picture_url} onChange={handleFormChange} placeholder="Picture URL" required type="url" name="picture_url" id="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <select value={formData.bin} onChange={handleFormChange} required name="bin" id="bin" className="form-select">
                                <option value="">Select bin</option>
                                {bins.map(bin => {
                                    return (
                                        <option key={bin.href} value={bin.href}>
                                            {bin.closet_name} - {bin.bin_number}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default ShoeForm;