import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employer' | 'employee';
  avatar?: string;
  company?: string;
  title?: string;
  isEmailVerified?: boolean;
  isProfileComplete?: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'employer' | 'employee';
  companyName?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pendingEmailVerification: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUserVerificationStatus: (isEmailVerified: boolean, isProfileComplete?: boolean) => void;
  setTokenAndUser: (token: string) => void;
  getTokenFromCookie: () => string | null;
}

// Dummy user credentials for testing
const DUMMY_USERS: Record<string, User> = {
  'admin@giggeni.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@giggeni.com',
    role: 'admin',
    title: 'System Administrator'
  },
  'employer@giggeni.com': {
    id: '2',
    name: 'John Smith',
    email: 'employer@giggeni.com',
    role: 'employer',
    company: 'TechCorp Solutions',
    title: 'HR Manager'
  },
  'employee@giggeni.com': {
    id: '3',
    name: 'Sarah Johnson',
    email: 'employee@giggeni.com',
    role: 'employee',
    title: 'Frontend Developer'
  },
  // Additional test users
  'hr@techcorp.com': {
    id: '4',
    name: 'Mike Wilson',
    email: 'hr@techcorp.com',
    role: 'employer',
    company: 'TechCorp Inc',
    title: 'Senior Recruiter'
  },
  'dev@example.com': {
    id: '5',
    name: 'Alex Rodriguez',
    email: 'dev@example.com',
    role: 'employee',
    title: 'Full Stack Developer'
  }
};

// Helper function to decode JWT token
function decodeJWT(token: string): any {
  try {
    const base64Payload = token.split('.')[1];
    return JSON.parse(atob(base64Payload));
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

// Helper function to check if token is expired
function isTokenExpired(token: string): boolean {
  try {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true;
  }
}

// Helper function to create a mock JWT token for testing
function createMockJWT(user: User): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    company: user.company,
    title: user.title,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      pendingEmailVerification: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check dummy credentials
        const user = DUMMY_USERS[email.toLowerCase()];
        
        if (user && password === 'password123') {
          // Create JWT token
          const accessToken = createMockJWT(user);
          
          // Store token in cookie
          if (typeof document !== 'undefined') {
            document.cookie = `auth-token=${accessToken}; path=/; max-age=${24 * 60 * 60}`;
          }
          
          set({ 
            user, 
            accessToken,
            isAuthenticated: true, 
            isLoading: false 
          });
          return { success: true };
        } else {
          set({ isLoading: false });
          return { 
            success: false, 
            error: 'Invalid email or password' 
          };
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check if user already exists
        if (DUMMY_USERS[data.email.toLowerCase()]) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: 'User with this email already exists' 
          };
        }
        
        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          name: data.name,
          email: data.email,
          role: data.role,
          company: data.companyName,
          title: data.role === 'admin' ? 'Administrator' : 
                 data.role === 'employer' ? 'Recruiter' : 'Job Seeker',
          isEmailVerified: false,
          isProfileComplete: false
        };
        
        // Add to dummy users (in real app, this would be an API call)
        DUMMY_USERS[data.email.toLowerCase()] = newUser;
        
        // Create JWT token
        const accessToken = createMockJWT(newUser);
        
        // Store token in cookie
        if (typeof document !== 'undefined') {
          document.cookie = `auth-token=${accessToken}; path=/; max-age=${24 * 60 * 60}`;
        }
        
        set({ 
          user: newUser, 
          accessToken,
          isAuthenticated: true, 
          isLoading: false,
          pendingEmailVerification: true
        });
        
        return { success: true };
      },

      logout: () => {
        // Clear token cookie
        if (typeof document !== 'undefined') {
          document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
        
        set({ 
          user: null, 
          accessToken: null,
          isAuthenticated: false, 
          isLoading: false,
          pendingEmailVerification: false
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      updateUserVerificationStatus: (isEmailVerified: boolean, isProfileComplete?: boolean) => {
        const currentState = get();
        if (currentState.user) {
          const updatedUser = {
            ...currentState.user,
            isEmailVerified,
            ...(isProfileComplete !== undefined && { isProfileComplete })
          };
          
          // Update the dummy users data as well
          DUMMY_USERS[currentState.user.email.toLowerCase()] = updatedUser;
          
          set({
            user: updatedUser,
            pendingEmailVerification: !isEmailVerified
          });
        }
      },

      setTokenAndUser: (token: string) => {
        if (isTokenExpired(token)) {
          // Token is expired, logout
          get().logout();
          return;
        }
        
        const payload = decodeJWT(token);
        if (payload) {
          const user: User = {
            id: payload.sub || payload.userId,
            name: payload.name,
            email: payload.email,
            role: payload.role,
            company: payload.company,
            title: payload.title,
            isEmailVerified: payload.isEmailVerified,
            isProfileComplete: payload.isProfileComplete
          };
          
          set({
            user,
            accessToken: token,
            isAuthenticated: true
          });
        }
      },

      getTokenFromCookie: () => {
        if (typeof document === 'undefined') return null;
        
        try {
          const cookies = document.cookie.split(';');
          const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
          
          if (authCookie) {
            const cookieValue = authCookie.split('=')[1];
            return cookieValue || null;
          }
        } catch (error) {
          console.error('Error reading token from cookie:', error);
        }
        
        return null;
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        pendingEmailVerification: state.pendingEmailVerification
      }),
    }
  )
);