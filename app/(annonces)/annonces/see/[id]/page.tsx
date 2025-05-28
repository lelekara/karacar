"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Calendar, Gauge, Fuel, Cog, ArrowLeft, Phone, MessageSquare, Share2, Heart, Info, Shield, FileText, CheckCircle2, XCircle } from 'lucide-react'

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

const AnnonceDetail: React.FC = () => {
  const params = useParams()
  const router = useRouter()
  const annonceId = params.id as string
  const [annonce, setAnnonce] = useState<Annonce | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    if (!annonceId) return
    setIsLoading(true)
    fetch(`/api/annonces?id=${annonceId}`)
      .then((res) => res.json())
      .then((data) => {
        setAnnonce(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [annonceId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-amber-800 animate-pulse" />
          </div>
          <p className="text-stone-600">Chargement du véhicule...</p>
        </div>
      </div>
    )
  }

  if (!annonce) {
    return (
      <div className="min-h-screen bg-stone-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-800" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Véhicule non trouvé</h2>
          <p className="text-stone-600 mb-6">Ce véhicule n'existe pas ou a été supprimé.</p>
          <Button onClick={() => router.push("/annonces/see")} className="bg-amber-700 hover:bg-amber-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux annonces
          </Button>
        </div>
      </div>
    )
  }

  // Caractéristiques du véhicule
  const caracteristiques = [
    { label: "Marque", value: annonce.marque, icon: Car },
    { label: "Modèle", value: annonce.modele, icon: Car },
    { label: "Année", value: annonce.annee, icon: Calendar },
    { label: "Kilométrage", value: `${annonce.kilometrage.toLocaleString()} km`, icon: Gauge },
    { label: "Carburant", value: annonce.carburant, icon: Fuel },
    { label: "Boîte de vitesses", value: annonce.boite, icon: Cog },
  ]

  // Équipements fictifs (à adapter selon vos données réelles)
  const equipements = [
    "Climatisation",
    "GPS",
    "Bluetooth",
    "Régulateur de vitesse",
    "Caméra de recul",
    "Sièges chauffants",
    "Jantes alliage",
    "Vitres électriques",
    "Fermeture centralisée",
    "Aide au stationnement",
    "Système audio premium",
    "Toit ouvrant",
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header avec bouton retour */}
      <div className="bg-gradient-to-r from-amber-800 to-red-900 text-white py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-amber-100 hover:bg-amber-700/50 hover:text-white"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{annonce.titre}</h1>
              <div className="flex items-center mt-2 space-x-2">
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                  <Car className="w-3 h-3 mr-1" />
                  {annonce.marque} {annonce.modele}
                </Badge>
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                  <Calendar className="w-3 h-3 mr-1" />
                  {annonce.annee}
                </Badge>
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                  <Gauge className="w-3 h-3 mr-1" />
                  {annonce.kilometrage.toLocaleString()} km
                </Badge>
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-amber-300">{annonce.prix.toLocaleString()} €</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galerie d'images */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                  {annonce.photos && annonce.photos.length > 0 ? (
                    <img
                      src={annonce.photos[activeImageIndex] || "/placeholder.svg"}
                      alt={annonce.titre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Car className="w-24 h-24 text-stone-400" />
                  )}
                </div>

                {/* Miniatures (si des photos existent) */}
                {annonce.photos && annonce.photos.length > 1 && (
                  <div className="grid grid-cols-5 gap-2 p-4">
                    {annonce.photos.map((photo, index) => (
                      <div
                        key={index}
                        className={`aspect-video bg-stone-100 cursor-pointer ${
                          index === activeImageIndex ? "ring-2 ring-amber-500" : ""
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img src={photo || "/placeholder.svg"} alt={`${annonce.titre} - Photo ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Onglets d'information */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6 ">
                <TabsTrigger value="description" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Description
                </TabsTrigger>
                <TabsTrigger value="caracteristiques" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                  <Info className="w-4 h-4 mr-2" />
                  Caractéristiques
                </TabsTrigger>
                <TabsTrigger value="equipements" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Équipements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-0">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-stone-900 mb-4">À propos de ce véhicule</h3>
                    <div className="prose text-stone-700">
                      <p className="whitespace-pre-line">{annonce.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="caracteristiques" className="mt-0">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-stone-900 mb-4">Caractéristiques techniques</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {caracteristiques.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                            <item.icon className="w-5 h-5 text-amber-800" />
                          </div>
                          <div>
                            <div className="text-sm text-stone-500">{item.label}</div>
                            <div className="font-medium text-stone-900">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="equipements" className="mt-0">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-stone-900 mb-4">Équipements et options</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {equipements.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle2 className="w-5 h-5 text-amber-700 mr-2" />
                          <span className="text-stone-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Carte de contact */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-stone-900 mb-4">Intéressé par ce véhicule ?</h3>
                <div className="space-y-4">
                  <Button className="w-full bg-amber-700 hover:bg-amber-800 h-12">
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler le vendeur
                  </Button>
                  <Button variant="outline" className="w-full border-amber-700 text-amber-700 hover:bg-amber-50 h-12">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Envoyer un message
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-stone-300 text-stone-700 hover:bg-stone-50"
                      size="sm"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Partager
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-stone-300 text-stone-700 hover:bg-stone-50"
                      size="sm"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Favoris
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Garantie et services */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-stone-900 mb-4">Garanties et services</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Shield className="w-5 h-5 text-amber-800" />
                    </div>
                    <div>
                      <div className="font-medium text-stone-900">Garantie 12 mois</div>
                      <div className="text-sm text-stone-600">
                        Tous nos véhicules sont garantis minimum 12 mois, pièces et main d'œuvre.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-red-800" />
                    </div>
                    <div>
                      <div className="font-medium text-stone-900">Contrôle technique</div>
                      <div className="text-sm text-stone-600">
                        Contrôle technique à jour et révision complète avant livraison.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Cog className="w-5 h-5 text-stone-800" />
                    </div>
                    <div>
                      <div className="font-medium text-stone-900">Service après-vente</div>
                      <div className="text-sm text-stone-600">
                        Atelier mécanique sur place pour l'entretien et les réparations.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations supplémentaires */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-stone-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info className="w-8 h-8 text-amber-800" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">Besoin de plus d'informations ?</h3>
                  <p className="text-sm text-stone-600 mb-4">
                    Notre équipe est à votre disposition pour répondre à toutes vos questions.
                  </p>
                  <Button variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-50">
                    Demander plus d'infos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Véhicules similaires - Section préparée pour le futur */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-stone-900">Véhicules similaires</h2>
            <Button variant="link" className="text-amber-700 hover:text-amber-800">
              Voir plus
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder pour les véhicules similaires */}
            {[1, 2, 3].map((item) => (
              <Card key={item} className="border-0 shadow-lg opacity-50 hover:opacity-100 transition-opacity">
                <div className="h-40 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                  <Car className="w-12 h-12 text-stone-400" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-stone-900">Véhicule similaire</h3>
                  <p className="text-sm text-stone-600">Fonctionnalité à venir</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnonceDetail
