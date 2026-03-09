import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import App from './app/App.tsx'
import Dashboard from './Pages/Dashboard.tsx'
import NotFoundPage from './Pages/NotFoundPage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider} from '@react-oauth/google';

// Retrieve Google OAuth Client ID from Vite environment variables
const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Log client ID for debugging during development
console.log(VITE_GOOGLE_CLIENT_ID); 

// Define application routes for React Router
const router = createBrowserRouter([
  {path:"/",element:<App />}, // Login page
  {path:"/dashboard", element:<Dashboard />}, // Dashboard after successful login
  {path:"*", element:<NotFoundPage />} // Catch-all route for undefined pages
])

// Render the React application to the root DOM element
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider> 
  </StrictMode>,
)