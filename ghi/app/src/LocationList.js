import { useEffect, useState } from 'react';

function LocationList() {
  const [locations, setLocations] = useState([])

  const getData = async () => {
    const response1 = await fetch('http://localhost:8100/api/locations/');

    if (response1.ok) {
      const data = await response1.json();
      setLocations(data.locations)
      console.log(data)
    }
  }


  useEffect(()=>{
    getData()
  }, [])

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:8100/api/locations/${id}/`, {
        method: "delete"
    })
    if (response.ok) {
        getData()
    } else {
        alert("Didn't Delete")
    }
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Closet Name</th>
          <th>Section Number</th>
          <th>Shelf Number</th>
        </tr>
      </thead>
      <tbody>
        {locations.map(location => {
          return (
            <tr key={location.href}>
              <td>{ location.closet_name }</td>
              <td>{ location.section_number }</td>
              <td>{ location.shelf_number }</td>
              <td><button className="btn btn-danger" onClick={(e) => handleDelete(location.id)}>Delete</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default LocationList;
