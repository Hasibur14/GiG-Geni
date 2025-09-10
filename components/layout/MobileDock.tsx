"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, Trophy, Award, Bell, Menu, Plus, Info, MessageCircle, UserCircle, Settings, FilePlus2, FileCog, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavLink } from "./NavLink"
import { AuthModal } from "@/components/auth/AuthModal"
import { usePathname } from "next/navigation"
import { EmailVerificationModal } from "@/components/auth/EmailVerificationModal"
import { useAuthStore } from "@/store/authStore"

export function MobileDock() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  const handleAuthSuccess = (email: string, needsVerification: boolean) => {
    if (needsVerification) {
      setVerificationEmail(email);
      setIsAuthModalOpen(false);
      setIsVerificationModalOpen(true);
    } else {
      setIsAuthModalOpen(false);
    }
    setIsSheetOpen(false);
  };

  const handleVerificationComplete = () => {
    setIsVerificationModalOpen(false);
    setVerificationEmail('');
  };

  const handleBackToAuth = () => {
    setIsVerificationModalOpen(false);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setIsSheetOpen(false);
    router.push('/');
  };
  return (
    <div className="lg:hidden">
      {/* Bottom Navigation Dock */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-2 py-0 z-50 overflow-hidden">
        <div className="flex items-center justify-between max-w-full">
          {/* Home */}
          <NavLink 
            href="/" 
            className={`flex flex-col items-center p-2 text-xs rounded-xl min-w-0 transition-all duration-200 ${
              pathname === "/" ? "flex-[2] px-2 bg-orange-50 text-primary" : "flex-[2] px-2 hover:bg-orange-50/50 hover:text-primary/70"
            }`}
          >
            <Home className="h-5 w-5 mb-1 flex-shrink-0" />
            <span className="text-[10px] leading-tight font-medium">Home</span>
          </NavLink>

          {/* Competitions */}
          <NavLink 
            href="/competitions" 
            className={`flex flex-col items-center p-2 text-xs rounded-xl min-w-0 transition-all duration-200 ${
              pathname === "/competitions" ? "flex-[2] px-2 bg-orange-50 text-primary" : "flex-[2] px-2 hover:bg-orange-50/50 hover:text-primary/70"
            }`}
          >
            <Trophy className="h-5 w-5 mb-1 flex-shrink-0" />
            <span className="text-[10px] leading-tight font-medium">Competitions</span>
          </NavLink>

          {/* My Competitions or Create Competition based on user role */}
          {user ? (
            user.role === "employer" ? (
              <NavLink 
                href="/competitions/create" 
                className={`flex flex-col items-center p-2 text-xs rounded-xl min-w-0 transition-all duration-200 ${
                  pathname === "/competitions/create" ? "flex-[2] px-2 bg-orange-50 text-primary" : "flex-[2] px-2 hover:bg-orange-50/50 hover:text-primary/70"
                }`}
              >
                <Plus className="h-5 w-5 mb-1 flex-shrink-0" />
                <span className="text-[10px] leading-tight font-medium">Create</span>
              </NavLink>
            ) : (
              <NavLink 
                href="/competitions/my" 
                className={`flex flex-col items-center p-2 text-xs rounded-xl min-w-0 transition-all duration-200 ${
                  pathname === "/competitions/my" ? "flex-[2] px-2 bg-orange-50 text-primary" : "flex-[2] px-2 hover:bg-orange-50/50 hover:text-primary/70"
                }`}
              >
                <Target className="h-5 w-5 mb-1 flex-shrink-0" />
                <span className="text-[10px] leading-tight font-medium">My Competitions</span>
              </NavLink>
            )
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="flex flex-col items-center p-2 text-xs rounded-xl min-w-0 transition-all duration-200 flex-[2] px-2 hover:bg-orange-50/50 hover:text-primary/70"
            >
              <Target className="h-5 w-5 mb-1 flex-shrink-0" />
              <span className="text-[10px] leading-tight font-medium">Login</span>
            </button>
          )}



          {/* Menu */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="flex flex-col items-center p-2 text-xs rounded-xl min-w-0 transition-all duration-200 flex-[2] px-2 hover:bg-orange-50/50 hover:text-primary/70 h-16">
                <Menu className="h-5 w-5 mb-1 flex-shrink-0" />
                <span className="text-[10px] leading-tight font-medium">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0 bg-white dark:bg-gray-900" onInteractOutside={() => setIsSheetOpen(false)}>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#FC5602]/5 to-[#FF7B02]/5">
                  {user ? (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FC5602] to-[#FF7B02] flex items-center justify-center text-white font-bold text-lg">
                        {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                          {user.name || 'User'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
                        <span className="inline-block px-2 py-1 text-xs bg-[#FC5602]/10 text-[#FC5602] rounded-full mt-1 capitalize">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Navigate through the app</p>
                    </div>
                  )}
                </div>
                <div className="flex-1 p-4 pb-20">
                  <nav className="space-y-2">
                    <Link href="/leaderboards" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 border border-transparent hover:border-[#FC5602]/20" onClick={() => setIsSheetOpen(false)}>
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <Award className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Leaderboards</span>
                    </Link>
                    <Link href="/contact" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 border border-transparent hover:border-[#FC5602]/20" onClick={() => setIsSheetOpen(false)}>
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Contact Us</span>
                    </Link>
                    
                    {user && (
                      <Link href="/notifications" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 border border-transparent hover:border-[#FC5602]/20" onClick={() => setIsSheetOpen(false)}>
                        <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                          <Bell className="h-4 w-4" />
                        </div>
                        <span className="font-medium">Notifications</span>
                      </Link>
                    )}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                
                {!user ? (
                  <button 
                    onClick={() => {
                      setIsSheetOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="text-lg hover:text-primary text-left"
                  >
                    Login
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Link href="/profile" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 border border-transparent hover:border-[#FC5602]/20" onClick={() => setIsSheetOpen(false)}>
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <UserCircle className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Profile</span>
                    </Link>
                    <Link href="/settings" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 border border-transparent hover:border-[#FC5602]/20" onClick={() => setIsSheetOpen(false)}>
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Settings</span>
                    </Link>
                    
                    {user.role === "employer" && (
                      <>
                       <Link href="/competitions/create" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 border border-transparent hover:border-[#FC5602]/20" onClick={() => setIsSheetOpen(false)}>
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <FilePlus2 className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Create Competition</span>
                    </Link>
                    <Link href="/competitions/manage" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 border border-transparent hover:border-[#FC5602]/20" onClick={() => setIsSheetOpen(false)}>
                      <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                        <FileCog className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Manage Competitions</span>
                    </Link>
                    </>
                    )}
                    
                    {user.role === "employee" && (
                      <>
                        <Link href="/competitions/join" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 border border-transparent hover:border-[#FC5602]/20" onClick={() => setIsSheetOpen(false)}>
                          <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                            <Users className="h-4 w-4" />
                          </div>
                          <span className="font-medium">Join Competitions</span>
                        </Link>
                        <Link href="/competitions/my" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#FC5602]/10 hover:text-[#FC5602] transition-all duration-200 border border-transparent hover:border-[#FC5602]/20" onClick={() => setIsSheetOpen(false)}>
                          <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FC5602]/20 transition-colors">
                            <Trophy className="h-4 w-4" />
                          </div>
                          <span className="font-medium">My Competitions</span>
                        </Link>
                      </>
                    )}
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                    <button onClick={handleLogout} className="group flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 border border-transparent hover:border-red-200 dark:hover:border-red-800 w-full text-left">
                      <div className="p-1.5 rounded-md bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                        <UserCircle className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
                  </nav>
                </div>
                
                {/* Close button at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white dark:from-gray-900 to-transparent">
                  <Button 
                    onClick={() => setIsSheetOpen(false)}
                    variant="outline" 
                    className="w-full py-3 border-2 border-gray-200 dark:border-gray-700 hover:border-[#FC5602] hover:text-[#FC5602] transition-all duration-200 rounded-xl font-medium"
                  >
                    Close Menu
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      
      {/* Spacer to prevent content from being hidden behind dock */}
      <div className="h-24" />

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
    </div>
  )
}