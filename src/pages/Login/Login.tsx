import Layout from 'components/Layout/Layout'
import LoginForm from 'components/LoginForm/LoginForm'
import { useAuth } from 'context/auth'
import { Redirect } from 'react-router-dom'

function Login() {
  const { user } = useAuth()

  if (user) {
    return <Redirect to="/home"/>
  }

  return (
    <Layout>
      <LoginForm successRedirectUrl="/home" />
    </Layout>
  )
}
export default Login
