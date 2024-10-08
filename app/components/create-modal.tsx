import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/src/@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/@/components/ui/card";
import { Label } from "@/src/@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/@/components/ui/select";
import { Input } from "@/src/@/components/ui/input"; // Ensure this component exists
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

interface ModalCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

interface Station {
  id: number; // or `string`, depending on your actual type
  name: string;
}

const ModalCard: React.FC<ModalCardProps> = ({ isOpen, onClose, onSubmit }) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<string>("");
  const [filterText, setFilterText] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("/api/stations");
        if (!response.ok) {
          throw new Error("Failed to fetch stations");
        }
        const data: Station[] = await response.json();
        setStations(data);
        setFilteredStations(data); // Initialize filteredStations with all stations
      } catch (error) {
        toast.error(`Error fetching stations: ${(error as Error).message}`);
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    // Filter stations based on the input text
    const filtered = stations.filter(station =>
      station.name.toLowerCase().includes(filterText.toLowerCase())
    );
    
    setFilteredStations(filtered);
  }, [filterText, stations]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if a station is selected
    if (!selectedStation) {
      toast.error("Veuillez sélectionner une station");
      return; // Prevent form submission
    }

    const lastCreationTime = localStorage.getItem("lastCreationTime");
    const currentTime = new Date().getTime();

    if (lastCreationTime && currentTime - parseInt(lastCreationTime) < 15 * 60 * 1000) {
      toast.error("Vous devez attendre 15 minutes avant de créer une nouvelle prune.");
      return; // Prevent prune creation
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/prunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: Math.random().toString(36).substring(7),
          ligne: 1,
          station: selectedStation,
          token,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("lastCreationTime", currentTime.toString());
        toast.success("Pruno créé avec succès!");
        setSelectedStation(""); // Reset selected station
        onClose(); // Close the modal
        setTimeout(() => {
          router.push('/'); // Redirect to home page
        }, 2000);
      } else {
        toast.error("Vous devez être connecté pour créer une prune et choisir une station.");
      }
    } catch (error) {
      toast.error(`Erreur lors de la création de la prune: ${(error as Error).message}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-2xl">
      <Card className="relative w-[400px] h-[350px] rounded-lg shadow-lg p-4 gap-y-2 bg-black text-white">
        <CardHeader>
          <CardTitle>Créer une prune</CardTitle>
          <CardDescription>
            Alertez les autres utilisateurs en 30 secondes.
          </CardDescription>
          <button
            onClick={onClose}
            className="absolute top-4 right-2 w-12"
          >
            X
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4 gap-y-8 mt-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="filter">Rechercher une station</Label>
                <Input
                  id="filter"
                  placeholder="Tapez pour filtrer"
                  className="h-10 p-2 border border-gray-300 rounded-md text-white"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="station">Station</Label>
                <Select onValueChange={(value) => setSelectedStation(value)}>
                  <SelectTrigger id="station" className="p-2">
                    <SelectValue placeholder="Choisir une station" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-black p-4 w-full h-96 text-white">
                    {filteredStations.map((station) => (
                      <SelectItem key={station.id} value={station.name} className="p-4 ml-4">
                        {station.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline" onClick={onClose} className="bg-red-500">
                Annuler
              </Button>
              <Button type="submit" className="bg-purple-500">Poster</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModalCard;
