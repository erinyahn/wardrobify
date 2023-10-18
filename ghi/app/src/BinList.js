import { useState, useEffect } from 'react';

function BinList (props) {
    const [bins, setBins] = useState([]);

    async function loadData() {
        const request = await fetch('http://localhost:8100/api/bins/')
        const response = await request.json();
        setBins(response.bins)
    }

    useEffect(() => {
        loadData();
    }, []);

    async function handleDelete(id) {
        const response = await fetch(`http://localhost:8100/api/bins/${id}/`, {
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
                <th>Closet Name</th>
                <th>Bin Number</th>
                <th>Bin Size</th>
            </tr>
        </thead>
        <tbody>
            {bins?.map(bin => {
                return (
                    <tr key={bin.href}>
                        <td>{bin.closet_name}</td>
                        <td>{bin.bin_number}</td>
                        <td>{bin.bin_size}</td>
                        <td><button className="btn btn-danger" onClick={(e) => handleDelete(bin.id)}>Delete</button></td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    );
}

export default BinList