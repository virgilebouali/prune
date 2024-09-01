"use client";

import { Button } from "@/src/@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead
} from "../../@/components/ui/table";
import * as React from "react";
import Modal from "../components/delete-modal"; // Import your modal component
import { toast } from "sonner";
import { Flag, Cross } from "lucide-react";
import { useRouter } from 'next/navigation'

export function TableDemo() {
  const [prunes, setPrunes] = React.useState<{
    published_date: string;
    station: React.ReactNode;
    reportCount: number;
    ligne: React.ReactNode; id: number 
}[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [pruneToReport, setPruneToReport] = React.useState<number | null>(null);
  const REPORT_INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds
  const router = useRouter()

  React.useEffect(() => {
    const fetchPrunes = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/getprune');
        if (!res.ok) {
          throw new Error("Failed to fetch prunes");
        }
        const data = await res.json();

        // Assuming data is an array of prunes
        // Sort prunes by `published_date` from most recent to oldest
        const sortedPrunes = data.sort((a: any, b: any) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());

        setPrunes(sortedPrunes);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrunes();
  }, []);


  const openDeleteModal = (pruneId: number) => {
    setPruneToReport(pruneId); // Set the prune to be reported
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setPruneToReport(null); // Reset pruneToReport when closing modal
    setIsModalOpen(false);
  };
  const handleReport = async () => {
    if (pruneToReport === null) return;
  
    const lastReportTime = localStorage.getItem(`lastReportTime_${pruneToReport}`);
    const currentTime = new Date().getTime();
    const REPORT_INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds
  
    // Check if enough time has passed since the last report
    if (lastReportTime) {
      const timeSinceLastReport = currentTime - parseInt(lastReportTime, 10);
  
      if (timeSinceLastReport < REPORT_INTERVAL) {
        const timeLeft = Math.ceil((REPORT_INTERVAL - timeSinceLastReport) / 60000); // Convert to minutes
        toast.error(`Vous devez attendre ${timeLeft} minute(s) avant de pouvoir faire un autre rapport.`);
        return;
      }
    }
  
    try {
      const res = await fetch(`/api/reportpruno/${pruneToReport}`, {
        method: 'POST', // Use POST method to report
      });
  
      if (res.ok) {
        const data = await res.json();
  
        if (data.message.includes("deleted")) {
          setPrunes(prunes.filter(prune => prune.id !== pruneToReport));
          toast.success("Prune supprimée après 3 rapports!");
        } else {
          toast.success("Rapport ajouté avec succès!");
          setTimeout(() => {
            window.location.reload()
            router.push('/');
          }, 2000)

        }
  
        // Update the last report time in localStorage
        localStorage.setItem(`lastReportTime_${pruneToReport}`, currentTime.toString());
      } else {
        const data = await res.json();
        toast.error(data.message || "Erreur lors du rapport de la prune.");
      }
    } catch (error:any) {
      toast.error(`Erreur lors du rapport de la prune: ${error.message}`);
    } finally {
      closeDeleteModal();
    }
  };
  const formatTimeAgo = (publishedDate: string) => {
    const now = new Date();
    const publishedTime = new Date(publishedDate);
    const diffInMinutes = Math.floor((now.getTime() - publishedTime.getTime()) / (1000 * 60));
  
    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInMinutes < 1440) { // Less than a day
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    }
  };



  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Table className="max-w-screen ">
        <TableCaption className="text-2xl font-bold">Liste des Prunes</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[10px] font-bold">Ligne</TableHead>
            <TableHead className="w-[50px] font-bold">Status</TableHead>
            <TableHead className="w-[100px] font-bold">Station</TableHead>
            <TableHead className="text-right font-bold">Temps</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prunes.map((prune) => (
            <TableRow key={prune.id} className="h-36">
              <TableCell className="font-medium">{prune.ligne}</TableCell>
              <TableCell>
                <Button className="border-2 border-green-300" onClick={() => openDeleteModal(prune.id)}>
                  Signaler
                </Button>
              </TableCell>
              <TableCell className="text-purple-500 font-bold text-md">{prune.station}</TableCell>
              <TableCell className="text-right font-bold w-[10]">
                {formatTimeAgo(prune.published_date)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleReport}
        title="Confirmer le rapport"
        message="Êtes-vous sûr de vouloir signaler cette prune ? Trois rapports entraîneront sa suppression."
      />
    </>
  );
}
