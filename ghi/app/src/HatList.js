import { useEffect, useState } from 'react';

function HatsList() {
  const [hats, setHats] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8090/api/hats/');

    if (response.ok) {
      const data = await response.json();
      setHats(data.hats)
      console.log(data.hats)
    }
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
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {hats.map(hat => {
          return (
            <tr key={hat.href}>
              <td>{ hat.name }</td>
              <td>{ hat.fabric }</td>
              <td>{ hat.location }</td>
              <td><button className="btn btn-danger" onClick={(e) => handleDelete(hat.id)}>Delete</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default HatsList;
