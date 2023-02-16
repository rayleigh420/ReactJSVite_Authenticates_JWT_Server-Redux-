import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { Provider } from "react-redux"
import App from './App'
import './main.css';
import 'antd/dist/reset.css';
import { AuthProvider } from './context/AuthProvider';
import { store } from './app/store';

// if (process.env.NODE_ENV === 'production') {
// }
disableReactDevTools();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
