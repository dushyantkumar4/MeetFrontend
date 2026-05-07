export const clerkConfig = {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  // Add Clerk appearance overrides here if needed
  appearance: {
    variables: {
      colorPrimary: '#6366f1',
    },
  },
} as const;