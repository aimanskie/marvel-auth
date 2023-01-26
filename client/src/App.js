import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Register, Login, Dashboard, ProtectedRoute } from './pages'
import { useGlobalContext } from './context'

function App() {
  
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <ProtectedRoute path='/dashboard' exact>
          <Dashboard />
        </ProtectedRoute>
      </Switch>
    </Router>
  )
}

export default App
