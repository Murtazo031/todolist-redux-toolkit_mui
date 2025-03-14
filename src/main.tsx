import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Todolist from './todolist/todolist'
import { store } from './store/store'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Todolist/>
    </Provider>
  </StrictMode>,
)
