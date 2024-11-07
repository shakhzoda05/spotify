import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CodeContext } from './context/Context.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <CodeContext>
        <App />
      </CodeContext>
    </Provider>
  </BrowserRouter>

)
