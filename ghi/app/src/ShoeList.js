import { useState, useEffect } from 'react';

function ShoeList (props) {
    const [shoes, setShoes] = useState([]);

    async function loadData() {
        const request = await fetch('http://localhost:8080/api/shoes/')
        const response = await request.json();
        setShoes(response.shoes)
    }

    useEffect(() => {
        loadData();
    }, []);

    async function handleDelete(id) {
        const response = await fetch(`http://localhost:8080/api/shoes/${id}/`, {
            method: "delete"
        })
        if (response.ok) {
            loadData()
        } else {
            alert("Didn't Delete!")
        }
    }

    return(
        <table className="table table-striped">
        <thead>
            <tr>
                <th>Manufacturer</th>
                <th>Name</th>
                <th>Color</th>
                <th>Bin</th>
                <th>Picture URL</th>
            </tr>
        </thead>
        <tbody>
            {shoes?.map(shoe => {
                return (
                    <tr key={shoe.href}>
                        <td>{shoe.manufacturer}</td>
                        <td>{shoe.model_name}</td>
                        <td>{shoe.color}</td>
                        <td>{shoe.bin.name}</td>
                        <td>{shoe.picture_url}</td>
                        <td><button className="btn btn-danger" onClick={(e) => handleDelete(shoe.id)}>Delete</button></td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    );
}

export default ShoeList