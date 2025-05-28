"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { useSession } from "@/lib/auth-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TableVehicule from "@/components/table_vehicule"
import { Car, Plus, TrendingUp, Users, Calendar, Euro } from "lucide-react"

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

const Dashboard: React.FC = () => {
  const sessionState = useSession()
  const [annonces, setAnnonces] = useState<Annonce[]>([])

  useEffect(() => {
    fetch("/api/annonces")
      .then((res) => res.json())
      .then(setAnnonces)
  }, [])

  // Calculs pour les statistiques
  const totalVehicules = annonces.length
  const prixMoyen =
    annonces.length > 0 ? Math.round(annonces.reduce((sum, annonce) => sum + annonce.prix, 0) / annonces.length) : 0
  const vehiculesRecents = annonces.filter((annonce) => {
    const dateCreation = new Date(annonce.createdAt)
    const maintenant = new Date()
    const diffJours = Math.floor((maintenant.getTime() - dateCreation.getTime()) / (1000 * 60 * 60 * 24))
    return diffJours <= 7
  }).length

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-amber-800 to-red-900 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Tableau de bord administrateur</h1>
              <p className="text-amber-100 text-lg">Bienvenue, {sessionState?.data?.user.name || "Administrateur"} !</p>
              <Badge variant="secondary" className="mt-3 bg-amber-500/20 text-amber-200 border-amber-500/30">
                <Car className="w-4 h-4 mr-2" />
                Gestion des véhicules
              </Badge>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-amber-100/20 rounded-full flex items-center justify-center">
                <Car className="w-10 h-10 text-amber-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-stone-600">Total véhicules</CardTitle>
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-amber-800" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-800">{totalVehicules}</div>
              <p className="text-xs text-stone-500 mt-1">Véhicules en stock</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-stone-600">Prix moyen</CardTitle>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Euro className="w-5 h-5 text-red-800" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-800">{prixMoyen.toLocaleString()}€</div>
              <p className="text-xs text-stone-500 mt-1">Prix moyen des véhicules</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-stone-600">Ajouts récents</CardTitle>
              <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-stone-800" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-stone-800">{vehiculesRecents}</div>
              <p className="text-xs text-stone-500 mt-1">Cette semaine</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-stone-600">Performance</CardTitle>
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-rose-800" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-rose-800">+12%</div>
              <p className="text-xs text-stone-500 mt-1">Vs mois dernier</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-stone-900">Actions rapides</CardTitle>
            <CardDescription className="text-stone-600">Gérez facilement vos véhicules et annonces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white h-12">
                <a href="/create" className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Nouvelle annonce
                </a>
              </Button>
              <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-50 h-12">
                <Car className="w-5 h-5 mr-2" />
                Gérer le stock
              </Button>
              <Button variant="outline" className="border-stone-800 text-stone-800 hover:bg-stone-50 h-12">
                <Users className="w-5 h-5 mr-2" />
                Voir les clients
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tableau des véhicules */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-stone-900">Gestion des véhicules</CardTitle>
            <CardDescription className="text-stone-600">Consultez et gérez tous vos véhicules en stock</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-lg overflow-hidden">
              <TableVehicule />
            </div>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-stone-900">Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm text-stone-600">Nouveau véhicule ajouté</span>
                  <span className="text-xs text-stone-400 ml-auto">Il y a 2h</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-stone-600">Annonce mise à jour</span>
                  <span className="text-xs text-stone-400 ml-auto">Il y a 4h</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-stone-500 rounded-full"></div>
                  <span className="text-sm text-stone-600">Véhicule vendu</span>
                  <span className="text-xs text-stone-400 ml-auto">Hier</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-stone-900">Conseils du jour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <p className="text-sm text-stone-700">
                    💡 Pensez à mettre à jour les photos de vos véhicules régulièrement
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <p className="text-sm text-stone-700">
                    📈 Les véhicules avec descriptions détaillées se vendent 30% plus vite
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
