"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, User, UserCircle, Settings, FileCog2, FileCog, Plus, Trophy, MessageCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavLink } from "./NavLink"
import { AuthModal } from "@/components/auth/AuthModal"
import { EmailVerificationModal } from "@/components/auth/EmailVerificationModal"
import { useAuthStore } from "@/store/authStore"

export function DesktopNav() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState('')

  const handleAuthSuccess = (email: string, needsVerification: boolean) => {
    if (needsVerification) {
      setVerificationEmail(email)
      setIsAuthModalOpen(false)
      setIsVerificationModalOpen(true)
    } else {
      setIsAuthModalOpen(false)
    }
  }

  const handleVerificationComplete = () => {
    setIsVerificationModalOpen(false)
    setVerificationEmail('')
  }

  const handleBackToAuth = () => {
    setIsVerificationModalOpen(false)
    setIsAuthModalOpen(true)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="hidden lg:flex w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            GiG Geni
          </Link>
        </div>

        {/* Center Navigation */}
        <div className="flex items-center space-x-8">
          <NavLink href="/" className="px-3 py-2 rounded-lg" activeClassName="bg-orange-50 text-primary">Home</NavLink>
          <NavLink href="/competitions" className="px-3 py-2 rounded-lg" activeClassName="bg-orange-50 text-primary">Competitions</NavLink>
          <NavLink href="/leaderboards" className="px-3 py-2 rounded-lg" activeClassName="bg-orange-50 text-primary">Leaderboards</NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
              {!user ? (
                <>
                  <DropdownMenuItem className="p-0">
                    <button onClick={() => setIsAuthModalOpen(true)} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 w-full text-left">
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Login</span>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-0">
                    <button onClick={() => setIsAuthModalOpen(true)} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 w-full text-left">
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <UserCircle className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Sign Up</span>
                    </button>
                  </DropdownMenuItem>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                </>
              ) : (
                <>
                  <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-700 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FC5602] to-[#FF7B02] flex items-center justify-center text-white font-bold text-sm">
                        {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                        <span className="inline-block px-1.5 py-0.5 text-xs bg-[#FC5602]/10 text-[#FC5602] rounded mt-1 capitalize">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuItem asChild className="p-0">
                    <Link href="/notifications" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 w-full">
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <Bell className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Notifications</span>
                    </Link>
                  </DropdownMenuItem>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  
                  {user.role === "employer" && (
                    <>
                      <DropdownMenuItem asChild className="p-0">
                        <Link href="/competitions/my" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 w-full">
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <FileCog className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Manage Competitions</span>
                    </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="p-0">
                        <Link href="/competitions/create" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 w-full">
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <Plus className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Create Competitions</span>
                    </Link>
                      </DropdownMenuItem>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    </>
                  )}
                  
                  {user.role === "employee" && (
                    <>
                      <DropdownMenuItem asChild className="p-0">
                        <Link href="/competitions/join" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 w-full">
                          <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                            <Users className="h-4 w-4" />
                          </div>
                          <span className="font-medium">Join Competitions</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="p-0">
                        <Link href="/competitions/my" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 w-full">
                          <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                            <Trophy className="h-4 w-4" />
                          </div>
                          <span className="font-medium">My Competitions</span>
                        </Link>
                      </DropdownMenuItem>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    </>
                  )}
                </>
              )}
              
              <DropdownMenuItem asChild className="p-0">
                <Link href="/contact" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 w-full">
                  <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Contact Us</span>
                </Link>
              </DropdownMenuItem>
              
              {user && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <DropdownMenuItem asChild className="p-0">
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 w-full">
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <UserCircle className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0">
                    <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 w-full">
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <DropdownMenuItem className="p-0">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full text-left">
                      <div className="p-1.5 rounded-md bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                        <UserCircle className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Logout</span>
                    </button>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={handleVerificationComplete}
        email={verificationEmail}
        onBackToAuth={handleBackToAuth}
      />
    </nav>
  )
}