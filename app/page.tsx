import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Shield, Clock, Star, Wrench } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 sm:mb-6 bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs sm:text-sm">
            <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Garage de confiance depuis 1995
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-100 to-amber-50 bg-clip-text text-transparent leading-tight">
            Trouvez votre voiture idéale
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-amber-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Découvrez notre sélection de véhicules d'occasion soigneusement inspectés et garantis. Qualité, transparence
            et service client au cœur de notre métier.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-white px-6 sm:px-8 py-3 text-base sm:text-lg h-12 sm:h-auto">
              <a href="/annonces/see" className="flex items-center">
                Voir nos véhicules
                <Car className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </Button>
            <Button
              size="lg"
              className="border-amber-200 text-amber-100 hover:bg-amber-100 hover:text-amber-950 px-6 sm:px-8 py-3 text-base sm:text-lg h-12 sm:h-auto"
            >
              <a href="/contact">Nous contacter</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-3 sm:mb-4">Pourquoi choisir notre garage ?</h2>
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto px-4">
              Plus de 25 ans d'expérience dans la vente de véhicules d'occasion avec un service personnalisé
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-amber-800" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold">Garantie incluse</CardTitle>
              </CardHeader>
              <CardContent className="text-center px-4 sm:px-6">
                <CardDescription className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  Tous nos véhicules sont garantis et ont passé un contrôle technique rigoureux de 120 points
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Wrench className="w-7 h-7 sm:w-8 sm:h-8 text-red-800" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold">Service après-vente</CardTitle>
              </CardHeader>
              <CardContent className="text-center px-4 sm:px-6">
                <CardDescription className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  Atelier mécanique sur place pour l'entretien et les réparations de votre véhicule
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-stone-800" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold">Financement facilité</CardTitle>
              </CardHeader>
              <CardContent className="text-center px-4 sm:px-6">
                <CardDescription className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  Solutions de financement personnalisées avec nos partenaires bancaires de confiance
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-amber-800">500+</div>
              <div className="text-stone-600 font-medium text-sm sm:text-base">Véhicules vendus</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-red-800">25+</div>
              <div className="text-stone-600 font-medium text-sm sm:text-base">Années d'expérience</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-stone-800">98%</div>
              <div className="text-stone-600 font-medium text-sm sm:text-base">Clients satisfaits</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-rose-800">50+</div>
              <div className="text-stone-600 font-medium text-sm sm:text-base">Véhicules en stock</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-3 sm:mb-4">Ce que disent nos clients</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-stone-600 mb-3 sm:mb-4 italic text-sm sm:text-base">
                  "Service exceptionnel ! L'équipe m'a aidé à trouver la voiture parfaite dans mon budget."
                </p>
                <div className="font-semibold text-stone-900 text-sm sm:text-base">Marie Dubois</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-stone-600 mb-3 sm:mb-4 italic text-sm sm:text-base">
                  "Très professionnel, véhicule conforme à la description. Je recommande vivement !"
                </p>
                <div className="font-semibold text-stone-900 text-sm sm:text-base">Pierre Martin</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg md:col-span-2 xl:col-span-1">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-stone-600 mb-3 sm:mb-4 italic text-sm sm:text-base">
                  "Excellent suivi après-vente. Une équipe à l'écoute et de bon conseil."
                </p>
                <div className="font-semibold text-stone-900 text-sm sm:text-base">Sophie Laurent</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-amber-800 to-red-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Prêt à trouver votre prochaine voiture ?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-amber-100 px-4">
            Parcourez notre sélection de véhicules d'occasion et trouvez celui qui vous correspond
          </p>
          <Button size="lg" className="bg-amber-100 text-red-900 hover:bg-amber-200 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold h-12 sm:h-auto">
            <a href="/annonces/see" className="flex items-center">
              Découvrir nos annonces
              <Car className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
