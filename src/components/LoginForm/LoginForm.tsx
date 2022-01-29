import Loader from 'components/Loader/Loader'
import { useAuth } from 'context/auth'
import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from './LoginForm.module.scss'

type Props = {
  successRedirectUrl?: string
}

function LoginForm(props: Props) {
  const { login } = useAuth()
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      await login(email, password)
      if (props.successRedirectUrl) {
        history.push(props.successRedirectUrl)
      }
    } catch (e) {
      alert(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Match Me With</h1>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          <Loader loading={loading} size="small"/>
          <span>Login</span>
        </button>
      </form>
      <div className={styles.extra}>
        <Link to="/register">Not a member yet?</Link>
      </div>
    </div>
  )
}

export default LoginForm
