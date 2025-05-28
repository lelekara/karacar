"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Loader2, Key, Mail, Lock, Car, Shield, Users, Clock } from 'lucide-react'
import { signIn } from "@/lib/auth-client"
import Link from "next/link"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white py-16 px-6">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
            <Key className="w-4 h-4 mr-2" />
            Espace membre
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-100 to-amber-50 bg-clip-text text-transparent">
            Connectez-vous à votre espace
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Accédez à votre compte pour gérer vos annonces et profiter de nos services exclusifs
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="p-4 gap-12 items-start">
          {/* Formulaire de connexion */}
          <div className="order-2 lg:order-1">
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-amber-800" />
                </div>
                <CardTitle className="text-2xl font-bold text-stone-900">Connexion</CardTitle>
                <CardDescription className="text-stone-600">
                  Entrez vos informations de connexion pour accéder à votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-stone-700 font-medium">
                    Adresse email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      required
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                      value={email}
                      className="pl-12 h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-stone-700 font-medium">
                      Mot de passe
                    </Label>
                    <Link href="#" className="text-sm text-amber-700 hover:text-amber-800 hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Votre mot de passe"
                      autoComplete="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-12 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-stone-300 data-[state=checked]:bg-amber-700 data-[state=checked]:border-amber-700"
                  />
                  <Label htmlFor="remember" className="text-stone-700 cursor-pointer">
                    Se souvenir de moi
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-amber-700 hover:bg-amber-800 text-white font-medium"
                  disabled={loading}
                  onClick={async () => {
                    await signIn.email(
                      {
                        email,
                        password,
                      },
                      {
                        onRequest: (ctx) => {
                          setLoading(true)
                        },
                        onResponse: (ctx) => {
                          setLoading(false)
                          window.location.href = "/"
                        },
                      }
                    )
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      Connexion en cours...
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4 mr-2" />
                      Se connecter
                    </>
                  )}
                </Button>

                <div className="text-center pt-4 border-t border-stone-200">
                  <span className="text-stone-600">Pas encore de compte ? </span>
                  <Link href="/sign-up" className="text-amber-700 hover:text-amber-800 font-medium hover:underline">
                    Créer un compte
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
