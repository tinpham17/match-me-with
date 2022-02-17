import Loader from 'components/Loader/Loader'
import { config } from 'config'
import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { register } from 'services'
import styles from './RegisterForm.module.scss'

type Props = {
  successRedirectUrl?: string
}

function RegisterForm(props: Props) {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [photo, setPhoto] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      await register({ email, password, age, name, photo })
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
        <h1>Register</h1>
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
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={age}
          required
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={photo}
          required
          onChange={(e) => setPhoto(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          <Loader loading={loading} size="small"/>
          <span>Submit</span>
        </button>
      </form>
      <div className={styles.extra}>
        <Link to={config.routes.explore}>Back</Link>
      </div>
    </div>
  )
}

export default RegisterForm
