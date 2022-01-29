import Layout from 'components/Layout/Layout'
import RegisterForm from 'components/RegisterForm/RegisterForm'

function Register() {
  return (
    <Layout>
      <RegisterForm successRedirectUrl="/home" />
    </Layout>
  )
}
export default Register
