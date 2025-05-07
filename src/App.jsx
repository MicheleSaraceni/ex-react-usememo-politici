import React, { useEffect, useState, useMemo } from "react"

function PoliticianCard({ name, image, position, biography }) {
  return (
    <div className="card" >
      <h1>{name}</h1>
      <img src={image} alt={name} />
      <h4>{position}</h4>
      <p>{biography}</p>
    </div>
  )
}

const MemoPoliticianCard = React.memo(PoliticianCard);

export default function App() {

  const [politicians, setPoliticians] = useState([]);

  const getPoliticians = async () => {
    const res = await fetch("http://localhost:5000/politicians")
    const data = await res.json()
    setPoliticians(data)
    console.log(data)
  }

  useEffect(() => {
    getPoliticians();
  }, []);



  const [search, setSearch] = useState("");

  const filteredPoliticians = useMemo(() => {
    return politicians.filter((politician) => {
      return politician.name.toLowerCase().includes(search.toLowerCase()) || politician.biography.toLowerCase().includes(search.toLowerCase())
    })
  }, [politicians, search])

  return (
    <div className="container">

      <input
        type="text"
        value={search}
        placeholder="Cerca nel nome e nella biografia"
        onChange={(e) => setSearch(e.target.value)} />

      {filteredPoliticians.map((politician) => (
        <MemoPoliticianCard
          key={politician.id}
          name={politician.name}
          image={politician.image}
          position={politician.position}
          biography={politician.biography} />
      ))}

    </div>
  )
}