"use client"
import { PhoneInput } from "@/components/phone-number"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Mail, MapPin, Phone, Send, Clock, User, MessageSquare, Car, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export default function ContactPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          subject,
          message,
        }),
      })

      if (res.ok) {
        toast.success("Message envoyé avec succès !")
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setSubject("")
        setMessage("")
      } else {
        toast.error("Erreur lors de l'envoi du message.")
      }
    } catch (err) {
      toast.error("Erreur lors de l'envoi du message.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-4 sm:mb-6 bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs sm:text-sm"
          >
            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Nous sommes à votre écoute
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-100 to-amber-50 bg-clip-text text-transparent leading-tight">
            Contactez-nous
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-amber-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 mt-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 lg:gap-12 items-start">
          {/* Formulaire de contact */}
          <div>
            <Card className="border-0 shadow-xl bg-white overflow-hidden">
              <CardHeader className="pb-6 border-b border-stone-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-amber-800" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-stone-900">
                      Envoyez-nous un message
                    </CardTitle>
                    <CardDescription className="text-stone-600 text-sm sm:text-base">
                      Nous vous répondrons dans les plus brefs délais
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-stone-700 font-medium flex items-center text-sm">
                        <User className="w-4 h-4 mr-2 text-amber-600" />
                        Prénom
                      </Label>
                      <Input
                        id="first-name"
                        placeholder="Jean"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        className="h-11 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-stone-700 font-medium flex items-center text-sm">
                        <User className="w-4 h-4 mr-2 text-red-600" />
                        Nom
                      </Label>
                      <Input
                        id="last-name"
                        placeholder="Dupont"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        className="h-11 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-stone-700 font-medium flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-amber-600" />
                      Adresse email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jean.dupont@exemple.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="h-11 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-stone-700 font-medium flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-red-600" />
                      Numéro de téléphone
                    </Label>
                    <PhoneInput defaultCountry="BE" value={phone} onChange={setPhone} className="h-11" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-stone-700 font-medium flex items-center text-sm">
                      <Car className="w-4 h-4 mr-2 text-amber-600" />
                      Sujet
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Demande d'information"
                      required
                      onChange={(e) => setSubject(e.target.value)}
                      value={subject}
                      className="h-11 border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-stone-700 font-medium flex items-center text-sm">
                      <MessageSquare className="w-4 h-4 mr-2 text-red-600" />
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Votre message ici..."
                      rows={5}
                      required
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      className="min-h-[120px] border-stone-200 focus:border-amber-500 focus:ring-amber-500 resize-y"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-amber-700 hover:bg-amber-800 text-white font-medium"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin mr-2" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white overflow-hidden">
              <CardHeader className="pb-6 border-b border-stone-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-amber-800" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-stone-900">Nos coordonnées</CardTitle>
                    <CardDescription className="text-stone-600 text-sm sm:text-base">
                      Venez nous rencontrer ou contactez-nous
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mt-1">
                      <MapPin className="w-5 h-5 text-amber-800" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-900 mb-1">Adresse</h3>
                      <p className="text-stone-600">Addresse</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <Mail className="w-5 h-5 text-red-800" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-900 mb-1">Email</h3>
                      <Link
                        href="mailto:contact@autopremium.fr"
                        className="text-amber-700 hover:text-amber-800 hover:underline"
                      >
                        contact@autopremium.fr
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center mt-1">
                      <Phone className="w-5 h-5 text-stone-800" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-900 mb-1">Téléphone</h3>
                      <Link href="tel:+32XXXXXXXXX" className="text-amber-700 hover:text-amber-800 hover:underline">
                        +32 XX XX XX XX
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mt-1">
                      <Clock className="w-5 h-5 text-amber-800" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-900 mb-1">Horaires d'ouverture</h3>
                      <div className="space-y-1 text-stone-600">
                        <div className="flex justify-between">
                          <span>Lundi - Vendredi:</span>
                          <span className="font-medium">9h00 - 18h00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Samedi:</span>
                          <span className="font-medium">10h00 - 16h00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dimanche:</span>
                          <span className="font-medium text-red-600">Fermé</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carte Google Maps */}
            <Card className="border-0 shadow-xl bg-white overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-stone-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-amber-700" />
                  Notre emplacement
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-[16/12] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?"
                    width="100%"
                    height="100%"
                    className="border-0"
                    loading="lazy"
                    title="Carte Google Maps"
                    style={{ height: "100%", width: "100%", display: "block" }}
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            {/* Pourquoi nous contacter */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-stone-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-stone-900 mb-4">Pourquoi nous contacter ?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-amber-700 mt-0.5" />
                    <p className="text-stone-700">Demande d'informations sur un véhicule spécifique</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-amber-700 mt-0.5" />
                    <p className="text-stone-700">Prise de rendez-vous pour un essai routier</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-amber-700 mt-0.5" />
                    <p className="text-stone-700">Renseignements sur nos services de financement</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-amber-700 mt-0.5" />
                    <p className="text-stone-700">Questions sur nos garanties et services après-vente</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 sm:mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">Questions fréquentes</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Retrouvez les réponses aux questions les plus courantes concernant nos services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-stone-900 mb-2">
                  Comment puis-je prendre rendez-vous pour un essai ?
                </h3>
                <p className="text-stone-600">
                  Vous pouvez prendre rendez-vous en nous contactant par téléphone, en remplissant le formulaire de
                  contact ci-dessus ou en vous rendant directement à notre garage pendant les heures d'ouverture.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-stone-900 mb-2">
                  Proposez-vous des solutions de financement ?
                </h3>
                <p className="text-stone-600">
                  Oui, nous proposons différentes solutions de financement adaptées à vos besoins. Notre équipe
                  financière peut vous aider à trouver la meilleure option pour votre budget.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-stone-900 mb-2">
                  Quelle est la durée de garantie sur vos véhicules ?
                </h3>
                <p className="text-stone-600">
                  Tous nos véhicules sont garantis minimum 12 mois, pièces et main d'œuvre. Des extensions de garantie
                  sont également disponibles pour une tranquillité d'esprit supplémentaire.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-stone-900 mb-2">
                  Puis-je faire entretenir mon véhicule chez vous ?
                </h3>
                <p className="text-stone-600">
                  Absolument ! Notre atelier mécanique est à votre disposition pour tous les entretiens et réparations
                  de votre véhicule, qu'il ait été acheté chez nous ou non.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-amber-800 to-red-900 text-white overflow-hidden">
            <CardContent className="p-8 sm:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Besoin d'une réponse rapide ?</h2>
              <p className="text-lg text-amber-100 mb-6 max-w-2xl mx-auto">
                Notre équipe est disponible pour vous répondre immédiatement par téléphone
              </p>
              <Button
                size="lg"
                className="bg-amber-100 text-red-900 hover:bg-amber-200 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold h-12 sm:h-auto"
              >
                <Phone className="w-5 h-5 mr-2" />
                Appelez-nous maintenant
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
