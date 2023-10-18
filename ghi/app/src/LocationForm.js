import React, {useState, useEffect} from 'react';

function LocationForm() {
    const [formData, setFormData] = useState({
        closet_name: '',
        section_number: '',
        shelf_number: '',
    })

    const [locations, setLocations] = useState([])

    const fetchData = async() => {
        const url = 'http://localhost:8100/api/locations/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setLocations(data.locations)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const hatUrl = 'http://localhost:8100/api/locations/';

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(hatUrl, fetchConfig);

        if (response.ok) {
            setFormData({
                closet_name: '',
                section_number: '',
                shelf_number: '',
            });
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

        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a new hat</h1>
                <form onSubmit={handleSubmit} id="create-hat-form">
                <div className="form-floating mb-3">
                    <input value={formData.closet_name} onChange={handleFormChange} placeholder="closet_name" required type="text" name="closet_name" id="closet_name" className="form-control" />
                    <label htmlFor="name">Closet Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.section_number} onChange={handleFormChange} placeholder="section_number" required type="text" name="section_number" id="section_number" className="form-control" />
                    <label htmlFor="fabric">Section Number</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.shelf_number} onChange={handleFormChange} placeholder="shelf_number" required type="shelf_number" name="shelf_number" id="shelf_number" className="form-control" />
                    <label htmlFor="Shelf Number">Shelf Number</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default LocationForm;
