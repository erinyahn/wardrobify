import { useEffect, useState } from 'react';

function HatsList() {
  const [hats, setHats] = useState([])
//   const [location, setLocations] = useState([])

  const getData = async () => {
    const response1 = await fetch('http://localhost:8090/api/hats/');

    if (response1.ok) {
      const data1 = await response1.json();
      setHats(data1.hats)
      console.log(data1)
    }

//     const response2 = await fetch('http://localhost:8100/api/locations/');

//     if (response2.ok) {
//         const data2 = await response2.json();
//         setLocations(data2.hats)
//         console.log(data2)
//     }
  }


  useEffect(()=>{
    getData()
  }, [])

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:8090/api/hats/${id}/`, {
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
          <th>Name</th>
          <th>Farbic</th>
          <th>Color</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {hats.map(hat => {
          return (
            <tr key={hat.href}>
              <td>{ hat.name }</td>
              <td>{ hat.fabric }</td>
              <td>{ hat.color }</td>
              <td>{ hat.location.name }</td>
              <td><button className="btn btn-danger" onClick={(e) => handleDelete(hat.id)}>Delete</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default HatsList;
