"use client"

import * as React from "react"
import { Flag, Cross } from "lucide-react";

interface Station {
  id: number;
  name: string;
}

export function ComboboxDemo() {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)
  const [stations, setStations] = React.useState<Station[]>([])
  const [selectedStation, setSelectedStation] = React.useState<string>("")

  // Utilisation de useEffect pour gérer l'appel asynchrone à l'API
  React.useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch('/api/stations')
        console.log(res)
        if (!res.ok) {
          throw new Error("Failed to fetch stations")
        }
        setLoading(false)
        setStations(await res.json())
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchStations()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center text-center text-purple-500 flex-col">
        <div className="animate-spin"></div>
        <p className="mt-2 animate-bounce"><Cross/></p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="p-4 w-full">
      <label htmlFor="station-select" className="block text-sm font-medium w-56">
        Rechercher par station
      </label>
      <select
        id="station-select"
        value={selectedStation}
        onChange={(e) => setSelectedStation(e.target.value)}
        className="h-12 w-72 p-2 "
      >
        {stations.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </select>
    </div>
  )
}
