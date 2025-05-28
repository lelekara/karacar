import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Delete, Pencil } from "lucide-react";

interface Annonce {
  id: string;
  titre: string;
  description: string;
  marque: string;
  modele: string;
  annee: number;
  kilometrage: number;
  prix: number;
  carburant: string;
  boite: string;
  photos: string[];
  createdAt: string;
  userId: string;
}

const TableVehicule: React.FC = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  useEffect(() => {
    fetch("/api/annonces")
      .then((res) => res.json())
      .then(setAnnonces);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Marque</TableHead>
          <TableHead>Modèle</TableHead>
          <TableHead>Année</TableHead>
          <TableHead>Kilométrage</TableHead>
          <TableHead>Prix (€)</TableHead>
          <TableHead>Carburant</TableHead>
          <TableHead>Boîte</TableHead>
          <TableHead>supprimer</TableHead>
          <TableHead>Modifier</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {annonces.map((a) => (
          <TableRow key={a.id}>
            <TableCell>{a.titre}</TableCell>
            <TableCell>{a.marque}</TableCell>
            <TableCell>{a.modele}</TableCell>
            <TableCell>{a.annee}</TableCell>
            <TableCell>{a.kilometrage}</TableCell>
            <TableCell>{a.prix}</TableCell>
            <TableCell>{a.carburant}</TableCell>
            <TableCell>{a.boite}</TableCell>
            <TableCell >
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  if (
                    window.confirm(
                      "Êtes-vous sûr de vouloir supprimer cette annonce ?"
                    )
                  ) {
                    fetch("/api/annonces", {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ id: a.id }),
                    }).then((res) => {
                      if (res.ok) {
                        setAnnonces((prev) =>
                          prev.filter((annonce) => annonce.id !== a.id)
                        );
                      }
                    });
                  }
                }}
              >
                <Delete />
              </Button>
            </TableCell>
              <TableCell >
              <Button variant="outline" className="w-full">
                <a href={`/annonces/${a.id}/edit`}>
                  Modifier
                </a>
                <Pencil />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableVehicule;
