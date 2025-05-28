"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Car, Menu, X, User, LogOut, Settings, Phone } from 'lucide-react'
import { useSession, signOut } from "@/lib/auth-client"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin"

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-white shadow-lg border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo et nom du garage */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-red-800 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                AutoPremium
              </h1>
              <p className="text-xs text-stone-500 -mt-1">Garage de confiance</p>
            </div>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-stone-700 hover:text-amber-800 font-medium transition-colors relative group"
            >
              Accueil
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-700 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/annonces/see"
              className="text-stone-700 hover:text-amber-800 font-medium transition-colors relative group"
            >
              Nos véhicules
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-700 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/services"
              className="text-stone-700 hover:text-amber-800 font-medium transition-colors relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-700 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="text-stone-700 hover:text-amber-800 font-medium transition-colors relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-700 transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Actions utilisateur */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-amber-700 text-amber-700 hover:bg-amber-50"
              asChild
            >
              <Link href="/contact">
                <Phone className="w-4 h-4 mr-2" />
                Nous appeler
              </Link>
            </Button>

            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-amber-800" />
                    </div>
                    <span className="text-stone-700">{session.user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/create" className="flex items-center">
                        <Car className="w-4 h-4 mr-2" />
                        Créer une annonce
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="flex items-center text-red-600 focus:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/sign-in">Se connecter</Link>
                </Button>
                <Button size="sm" className="bg-amber-700 hover:bg-amber-800" asChild>
                  <Link href="/sign-up">S'inscrire</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Menu mobile button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-stone-200 py-4 space-y-4">
            <Link
              href="/"
              className="block text-stone-700 hover:text-amber-800 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/annonces/see"
              className="block text-stone-700 hover:text-amber-800 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Nos véhicules
            </Link>
            <Link
              href="/services"
              className="block text-stone-700 hover:text-amber-800 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="block text-stone-700 hover:text-amber-800 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="border-t border-stone-200 pt-4 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-amber-700 text-amber-700 hover:bg-amber-50"
                asChild
              >
                <Link href="/contact">
                  <Phone className="w-4 h-4 mr-2" />
                  Nous appeler
                </Link>
              </Button>

              {session?.user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 py-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-amber-800" />
                    </div>
                    <span className="text-stone-700">{session.user.name}</span>
                  </div>
                  {isAdmin && (
                    <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                      <Link href="/admin/dashboard">
                        <Settings className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                  )}
                  {isAdmin && (
                    <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                      <Link href="/create">
                        <Car className="w-4 h-4 mr-2" />
                        Créer une annonce
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-600"
                    onClick={() => signOut()}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Se déconnecter
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href="/sign-in">Se connecter</Link>
                  </Button>
                  <Button size="sm" className="w-full bg-amber-700 hover:bg-amber-800" asChild>
                    <Link href="/sign-up">S'inscrire</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
