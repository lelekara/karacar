"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "@/lib/auth-client"
import { useParams, useRouter } from "next/navigation"
import {
  Car,
  FileText,
  Settings,
  Euro,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Save,
  ArrowLeft,
  Camera,
  Edit,
  AlertCircle,
} from "lucide-react"

const annonceSchema = z.object({
  titre: z.string().min(2, "Le titre est requis"),
  description: z.string().min(5, "La description est requise"),
  marque: z.string().min(1, "La marque est requise"),
  modele: z.string().min(1, "Le modèle est requis"),
  annee: z.coerce.number().int().min(1900).max(new Date().getFullYear()),
  kilometrage: z.coerce.number().int().min(0),
  prix: z.coerce.number().min(0),
  carburant: z.string().min(1, "Le carburant est requis"),
  boite: z.string().min(1, "La boîte est requise"),
})

type AnnonceForm = z.infer<typeof annonceSchema>

const EditAnnoncePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [annonceData, setAnnonceData] = useState<any>(null)
  const form = useForm<AnnonceForm>({
    resolver: zodResolver(annonceSchema),
  })
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = form
  const session = useSession()
  const params = useParams()
  const router = useRouter()
  const annonceId = params.id as string

  useEffect(() => {
    if (!annonceId) return
    setIsLoading(true)
    fetch(`/api/annonces?id=${annonceId}`)
      .then((res) => res.json())
      .then((annonce) => {
        if (annonce) {
          setAnnonceData(annonce)
          form.reset({
            titre: annonce.titre,
            description: annonce.description,
            marque: annonce.marque,
            modele: annonce.modele,
            annee: annonce.annee,
            kilometrage: annonce.kilometrage,
            prix: annonce.prix,
            carburant: annonce.carburant,
            boite: annonce.boite,
          })
        }
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [annonceId, form])

  const onSubmit = async (data: AnnonceForm) => {
    const userId = session?.data?.user?.id
    if (!userId) {
      alert("Vous devez être connecté pour modifier une annonce.")
      return
    }
    try {
      await fetch("/api/annonces", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId, id: annonceId }),
      })
      router.push("/admin/dashboard")
    } catch (error) {
      alert("Erreur lors de la modification de l'annonce")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-amber-800 animate-pulse" />
          </div>
          <p className="text-stone-600">Chargement de l'annonce...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-amber-800 to-red-900 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-4">
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
              <h1 className="text-3xl font-bold mb-2">Modifier l'annonce</h1>
              <p className="text-amber-100 text-lg">
                {annonceData
                  ? `${annonceData.marque} ${annonceData.modele} - ${annonceData.annee}`
                  : "Modification en cours"}
              </p>
              <div className="flex items-center space-x-3 mt-3">
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-200 border-amber-500/30">
                  <Edit className="w-4 h-4 mr-2" />
                  Modification
                </Badge>
                {isDirty && (
                  <Badge variant="secondary" className="bg-red-500/20 text-red-200 border-red-500/30">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Modifications non sauvegardées
                  </Badge>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-amber-100/20 rounded-full flex items-center justify-center">
                <Edit className="w-10 h-10 text-amber-200" />
              </div>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Informations générales */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-stone-900">
                  <FileText className="w-5 h-5 mr-2 text-amber-700" />
                  Informations générales
                </CardTitle>
                <CardDescription className="text-stone-600">
                  Modifiez les informations de base du véhicule
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={control}
                  name="titre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-stone-700 font-medium">Titre de l'annonce</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ex: BMW Série 3 320d - Excellent état"
                          className="h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-stone-700 font-medium">Description détaillée</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Décrivez le véhicule, son état, ses équipements, son historique..."
                          className="min-h-[120px] border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Caractéristiques du véhicule */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-stone-900">
                  <Car className="w-5 h-5 mr-2 text-red-700" />
                  Caractéristiques du véhicule
                </CardTitle>
                <CardDescription className="text-stone-600">
                  Modifiez les spécifications techniques et détails du véhicule
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={control}
                    name="marque"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-stone-700 font-medium flex items-center">
                          <Car className="w-4 h-4 mr-2 text-amber-600" />
                          Marque
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ex: BMW, Mercedes, Audi..."
                            className="h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="modele"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-stone-700 font-medium flex items-center">
                          <Settings className="w-4 h-4 mr-2 text-red-600" />
                          Modèle
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ex: Série 3, Classe C, A4..."
                            className="h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={control}
                    name="annee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-stone-700 font-medium flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-stone-600" />
                          Année
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            placeholder="2020"
                            className="h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="kilometrage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-stone-700 font-medium flex items-center">
                          <Gauge className="w-4 h-4 mr-2 text-rose-600" />
                          Kilométrage
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            placeholder="50000"
                            className="h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={control}
                    name="carburant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-stone-700 font-medium flex items-center">
                          <Fuel className="w-4 h-4 mr-2 text-amber-600" />
                          Carburant
                        </FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500">
                              <SelectValue placeholder="Sélectionner le carburant" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="essence">Essence</SelectItem>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="electrique">Électrique</SelectItem>
                              <SelectItem value="hybride">Hybride</SelectItem>
                              <SelectItem value="lpg">LPG</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="boite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-stone-700 font-medium flex items-center">
                          <Cog className="w-4 h-4 mr-2 text-red-600" />
                          Boîte de vitesses
                        </FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500">
                              <SelectValue placeholder="Sélectionner une boîte" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manuelle">Manuelle</SelectItem>
                              <SelectItem value="automatique">Automatique</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Prix */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-stone-900">
                  <Euro className="w-5 h-5 mr-2 text-stone-700" />
                  Prix de vente
                </CardTitle>
                <CardDescription className="text-stone-600">Modifiez le prix de vente du véhicule</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={control}
                  name="prix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-stone-700 font-medium">Prix (€)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            placeholder="25000"
                            className="h-12 pl-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Photos (Section future) */}
            <Card className="border-0 shadow-lg border-dashed border-stone-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-stone-900">
                  <Camera className="w-5 h-5 mr-2 text-stone-700" />
                  Photos du véhicule
                </CardTitle>
                <CardDescription className="text-stone-600">
                  Fonctionnalité à venir - Gestion des photos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                  <p className="text-stone-500">Gestion des photos - Fonctionnalité en développement</p>
                </div>
              </CardContent>
            </Card>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 border-stone-300 text-stone-700 hover:bg-stone-50"
                onClick={() => router.back()}
              >
                Annuler les modifications
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 bg-amber-700 hover:bg-amber-800 text-white"
              >
                {isSubmitting ? "Sauvegarde en cours..." : "Sauvegarder les modifications"}
                <Save className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default EditAnnoncePage
