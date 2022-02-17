import WelcomeForm from 'components/WelcomeForm/WelcomeForm'
import { config } from 'config'
import { useAuth } from 'context/auth'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

function Header() {
  const { user } = useAuth()
  return (
    <header className={styles.container}>
      <div className={styles.branding}>
        <Link to={config.routes.explore}>Match Me With</Link>
      </div>
      {
        user && <WelcomeForm/>
      }
    </header>
  )
}
export default Header
