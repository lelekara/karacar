import Link from "next/link"
import { Car, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Informations du garage */}
          <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-700 to-red-800 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-amber-100">AutoPremium</h3>
                <p className="text-amber-200 text-xs sm:text-sm">Garage de confiance depuis 1995</p>
              </div>
            </div>
            <p className="text-amber-100 leading-relaxed text-sm sm:text-base">
              Votre partenaire de confiance pour l'achat de véhicules d'occasion de qualité. Plus de 25 ans
              d'expérience à votre service.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Link
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-700/20 rounded-full flex items-center justify-center hover:bg-amber-700/40 transition-colors"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-700/20 rounded-full flex items-center justify-center hover:bg-amber-700/40 transition-colors"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-700/20 rounded-full flex items-center justify-center hover:bg-amber-700/40 transition-colors"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-700/20 rounded-full flex items-center justify-center hover:bg-amber-700/40 transition-colors"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-base sm:text-lg font-semibold text-amber-100">Navigation</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/" className="text-amber-200 hover:text-amber-100 transition-colors text-sm sm:text-base">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/annonces/see" className="text-amber-200 hover:text-amber-100 transition-colors text-sm sm:text-base">
                  Nos véhicules
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-amber-200 hover:text-amber-100 transition-colors text-sm sm:text-base">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-amber-200 hover:text-amber-100 transition-colors text-sm sm:text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-base sm:text-lg font-semibold text-amber-100">Nos services</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/services/vente" className="text-amber-200 hover:text-amber-100 transition-colors text-sm sm:text-base">
                  Vente de véhicules
                </Link>
              </li>
              <li>
                <Link href="/services/financement" className="text-amber-200 hover:text-amber-100 transition-colors text-sm sm:text-base">
                  Financement
                </Link>
              </li>
              <li>
                <Link href="/services/garantie" className="text-amber-200 hover:text-amber-100 transition-colors text-sm sm:text-base">
                  Garantie
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold text-amber-100">Contact</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-200 text-sm sm:text-base">123 Avenue des Automobiles</p>
                  <p className="text-amber-200 text-sm sm:text-base">75001 Paris, France</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                <p className="text-amber-200 text-sm sm:text-base">01 23 45 67 89</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                <p className="text-amber-200 text-sm sm:text-base break-all">contact@autopremium.fr</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-200 text-sm sm:text-base">Lun - Ven: 8h - 19h</p>
                  <p className="text-amber-200 text-sm sm:text-base">Sam: 9h - 17h</p>
                  <p className="text-amber-200 text-sm sm:text-base">Dim: Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-amber-800/30 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
              <p className="text-amber-200 text-xs sm:text-sm">
                © 2025 AutoPremium. Tous droits réservés.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start space-x-3 sm:space-x-4 text-xs sm:text-sm">
                <Link href="/legal/mentions" className="text-amber-200 hover:text-amber-100 transition-colors">
                  Mentions légales
                </Link>
                <Link href="/legal/privacy" className="text-amber-200 hover:text-amber-100 transition-colors">
                  Confidentialité
                </Link>
                <Link href="/legal/cookies" className="text-amber-200 hover:text-amber-100 transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-amber-700 rounded flex items-center justify-center">
                <Car className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-amber-200 text-xs sm:text-sm">Garage certifié qualité</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
