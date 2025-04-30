import { useEffect, useState } from "react"

export default function App() {

  const [politicians, setPoliticians] = useState([]);

  const getPoliticians = async () => {
    const res = await fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
    const data = await res.json()
    setPoliticians(data)
    console.log(data)
    console.log(data[0].image)
  }

  useEffect(() => {
    getPoliticians();
  }, []);

  const PoliticianCard = ({ name, image, position, biography }) => {
    return (
      <div className="card">
        <h1>{name}</h1>
        <img src={image} alt={name} />
        <h4>{position}</h4>
        <p>{biography}</p>
      </div>
    )
  }


  return (
    <div className="container">
      {politicians.map((politician, i) => (
        <PoliticianCard
          key={i}
          name={politician.name}
          image={politician.image}
          position={politician.position}
          biography={politician.biography} />
      ))}
    </div>
  )
}

