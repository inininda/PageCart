import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  fullName?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          // TODO: Replace with actual Supabase authentication
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // For demo purposes, accept any email/password combination
          const user: User = {
            id: `user_${Date.now()}`,
            email,
            fullName: localStorage.getItem('userName') || undefined
          };
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          // Store in localStorage for persistence (temporary solution)
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', email);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signUp: async (email: string, password: string, fullName: string) => {
        set({ isLoading: true });
        
        try {
          // TODO: Replace with actual Supabase authentication
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user: User = {
            id: `user_${Date.now()}`,
            email,
            fullName
          };
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          // Store in localStorage for persistence (temporary solution)
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', fullName);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signOut: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
        
        // Clear localStorage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
      },

      checkAuth: () => {
        // Check if user is authenticated from localStorage (temporary solution)
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName');
        
        if (isAuthenticated && userEmail) {
          const user: User = {
            id: `user_${Date.now()}`,
            email: userEmail,
            fullName: userName || undefined
          };
          
          set({ 
            user, 
            isAuthenticated: true 
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
