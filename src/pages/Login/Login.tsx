import Layout from 'components/Layout/Layout'
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
    <Layout>
      <LoginForm successRedirectUrl={config.routes.explore} />
    </Layout>
  )
}
export default Login
