"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Car, Search, Gauge, Fuel, Cog, Star, Grid3X3, List } from "lucide-react"

interface Annonce {
  id: string
  titre: string
  description: string
  marque: string
  modele: string
  annee: number
  kilometrage: number
  prix: number
  carburant: string
  boite: string
  photos: string[]
  createdAt: string
  userId: string
}

const SeeAnnonces: React.FC = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([])
  const [filteredAnnonces, setFilteredAnnonces] = useState<Annonce[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMarque, setSelectedMarque] = useState("all")
  const [selectedCarburant, setSelectedCarburant] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    fetch("/api/annonces")
      .then((res) => res.json())
      .then((data) => {
        setAnnonces(data)
        setFilteredAnnonces(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  // Filtrage et tri
  useEffect(() => {
    const filtered = annonces.filter((annonce) => {
      const matchesSearch =
        annonce.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        annonce.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
        annonce.modele.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesMarque = selectedMarque === "all" || annonce.marque === selectedMarque
      const matchesCarburant = selectedCarburant === "all" || annonce.carburant === selectedCarburant

      return matchesSearch && matchesMarque && matchesCarburant
    })

    // Tri
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.prix - b.prix)
        break
      case "price-desc":
        filtered.sort((a, b) => b.prix - a.prix)
        break
      case "year-desc":
        filtered.sort((a, b) => b.annee - a.annee)
        break
      case "km-asc":
        filtered.sort((a, b) => a.kilometrage - b.kilometrage)
        break
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    setFilteredAnnonces(filtered)
  }, [annonces, searchTerm, selectedMarque, selectedCarburant, sortBy])

  // Obtenir les marques uniques
  const marques = Array.from(new Set(annonces.map((annonce) => annonce.marque))).sort()
  const carburants = Array.from(new Set(annonces.map((annonce) => annonce.carburant))).sort()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-amber-800 animate-pulse" />
          </div>
          <p className="text-stone-600">Chargement des véhicules...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-800 to-red-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
              <Car className="w-4 h-4 mr-2" />
              {annonces.length} véhicules disponibles
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre sélection de véhicules</h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Découvrez notre gamme de véhicules d'occasion soigneusement sélectionnés et garantis
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-200" />
              <Input
                placeholder="Rechercher par marque, modèle ou titre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 bg-white/10 border-amber-300/30 text-white placeholder:text-amber-200 focus:bg-white/20 focus:border-amber-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filtres et contrôles */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <Select value={selectedMarque} onValueChange={setSelectedMarque}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Toutes les marques" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les marques</SelectItem>
                    {marques.map((marque) => (
                      <SelectItem key={marque} value={marque}>
                        {marque}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCarburant} onValueChange={setSelectedCarburant}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Tous les carburants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les carburants</SelectItem>
                    {carburants.map((carburant) => (
                      <SelectItem key={carburant} value={carburant}>
                        {carburant.charAt(0).toUpperCase() + carburant.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Plus récents</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="year-desc">Plus récents (année)</SelectItem>
                    <SelectItem value="km-asc">Kilométrage croissant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-amber-700 hover:bg-amber-800" : ""}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-amber-700 hover:bg-amber-800" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {(searchTerm !== "" || selectedMarque !== "all" || selectedCarburant !== "all") && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchTerm !== "" && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    Recherche: {searchTerm}
                  </Badge>
                )}
                {selectedMarque !== "all" && (
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    Marque: {selectedMarque}
                  </Badge>
                )}
                {selectedCarburant !== "all" && (
                  <Badge variant="secondary" className="bg-stone-100 text-stone-800">
                    Carburant: {selectedCarburant}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedMarque("all")
                    setSelectedCarburant("all")
                  }}
                  className="text-stone-600 hover:text-stone-800"
                >
                  Effacer les filtres
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Résultats */}
        <div className="mb-6">
          <p className="text-stone-600">
            {filteredAnnonces.length} véhicule{filteredAnnonces.length > 1 ? "s" : ""} trouvé
            {filteredAnnonces.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Grille des annonces */}
        {filteredAnnonces.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Car className="w-16 h-16 text-stone-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-900 mb-2">Aucun véhicule trouvé</h3>
              <p className="text-stone-600 mb-4">
                Essayez de modifier vos critères de recherche ou de supprimer les filtres.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedMarque("all")
                  setSelectedCarburant("all")
                }}
              >
                Voir tous les véhicules
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredAnnonces.map((annonce) => (
              <Link href={`/annonces/see/${annonce.id}`} key={annonce.id} className="block group">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden">
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                    <Car className="w-16 h-16 text-stone-400" />
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {annonce.titre}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800 ml-2">
                        {annonce.annee}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-stone-600">
                      <Car className="w-4 h-4 mr-1" />
                      {annonce.marque} {annonce.modele}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-stone-600 text-sm mb-4 line-clamp-2">{annonce.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-amber-800">{annonce.prix.toLocaleString()} €</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-amber-500 fill-current" />
                          <span className="text-sm text-stone-600">Garanti</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center text-stone-600">
                          <Gauge className="w-3 h-3 mr-1 text-rose-600" />
                          {annonce.kilometrage.toLocaleString()} km
                        </div>
                        <div className="flex items-center text-stone-600">
                          <Fuel className="w-3 h-3 mr-1 text-amber-600" />
                          {annonce.carburant}
                        </div>
                        <div className="flex items-center text-stone-600">
                          <Cog className="w-3 h-3 mr-1 text-red-600" />
                          {annonce.boite}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SeeAnnonces
