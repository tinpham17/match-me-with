import LoginForm from 'components/LoginForm/LoginForm'
import { config } from 'config'
import { useAuth } from 'context/auth'
import { Redirect } from 'react-router-dom'

function Login() {
  const { user } = useAuth()

  if (user) {
    return <Redirect to={config.routes.login}/>
  }

  return (
    <LoginForm successRedirectUrl={config.routes.explore} />
  )
}
export default Login
