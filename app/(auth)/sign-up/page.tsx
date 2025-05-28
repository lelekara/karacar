"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Image from "next/image"
import { Loader2, X, UserPlus, Mail, Lock, User, Upload, Shield, CheckCircle2, Clock, Users } from 'lucide-react'
import { signUp } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUp() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white py-16 px-6">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
            <UserPlus className="w-4 h-4 mr-2" />
            Créer un compte
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-100 to-amber-50 bg-clip-text text-transparent">
            Rejoignez notre communauté
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Créez votre compte pour accéder à des services exclusifs et gérer vos annonces en toute simplicité
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto ">
        <div className=" p-4 gap-12 items-start">
          {/* Formulaire d'inscription */}
          <div className="order-2 lg:order-1">
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-amber-800" />
                </div>
                <CardTitle className="text-2xl font-bold text-stone-900">Inscription</CardTitle>
                <CardDescription className="text-stone-600">
                  Créez votre compte en quelques étapes simples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-stone-700 font-medium flex items-center">
                      <User className="w-4 h-4 mr-2 text-amber-600" />
                      Prénom
                    </Label>
                    <Input
                      id="first-name"
                      placeholder="Jean"
                      required
                      onChange={(e) => {
                        setFirstName(e.target.value)
                      }}
                      value={firstName}
                      className="h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-stone-700 font-medium flex items-center">
                      <User className="w-4 h-4 mr-2 text-red-600" />
                      Nom
                    </Label>
                    <Input
                      id="last-name"
                      placeholder="Dupont"
                      required
                      onChange={(e) => {
                        setLastName(e.target.value)
                      }}
                      value={lastName}
                      className="h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-stone-700 font-medium flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-stone-600" />
                    Adresse email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@exemple.com"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    value={email}
                    className="h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-stone-700 font-medium flex items-center">
                    <Lock className="w-4 h-4 mr-2 text-amber-600" />
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Choisissez un mot de passe sécurisé"
                    className="h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password_confirmation" className="text-stone-700 font-medium flex items-center">
                    <Lock className="w-4 h-4 mr-2 text-red-600" />
                    Confirmer le mot de passe
                  </Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Confirmez votre mot de passe"
                    className="h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-stone-700 font-medium flex items-center">
                    <Upload className="w-4 h-4 mr-2 text-stone-600" />
                    Photo de profil (optionnelle)
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-stone-100 overflow-hidden flex items-center justify-center border border-stone-200">
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <Image src={imagePreview || "/placeholder.svg"} alt="Profile preview" layout="fill" objectFit="cover" />
                        </div>
                      ) : (
                        <User className="w-8 h-8 text-stone-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 w-full">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                        />
                        {imagePreview && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="flex-shrink-0"
                            onClick={() => {
                              setImage(null)
                              setImagePreview(null)
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-amber-700 hover:bg-amber-800 text-white font-medium"
                  disabled={loading}
                  onClick={async () => {
                    if (password !== passwordConfirmation) {
                      toast.error("Les mots de passe ne correspondent pas")
                      return
                    }

                    await signUp.email({
                      email,
                      password,
                      name: `${firstName} ${lastName}`,
                      image: image ? await convertImageToBase64(image) : "",
                      callbackURL: "/admin/dashboard",
                      fetchOptions: {
                        onResponse: () => {
                          setLoading(false)
                        },
                        onRequest: () => {
                          setLoading(true)
                        },
                        onError: (ctx) => {
                          toast.error(ctx.error.message)
                        },
                        onSuccess: async () => {
                          router.push("/sing-in")
                        },
                      },
                    })
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Créer mon compte
                    </>
                  )}
                </Button>

                <div className="text-center pt-4 border-t border-stone-200">
                  <span className="text-stone-600">Déjà un compte ? </span>
                  <Link href="/sign-in" className="text-amber-700 hover:text-amber-800 font-medium hover:underline">
                    Se connecter
                  </Link>
                </div>
              </CardContent>
 
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
