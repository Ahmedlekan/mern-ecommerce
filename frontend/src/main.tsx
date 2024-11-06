import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { AppContextProvider } from './contexts/AppContext'
import { CartProvider } from './contexts/CartContext.tsx'
import store from './store/store.ts'
import { Provider } from 'react-redux'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AppContextProvider>
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
