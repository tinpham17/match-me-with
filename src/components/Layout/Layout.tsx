import { ReactNode } from 'react'
import Header from 'components/Header/Header'
import NavBar from 'components/NavBar/NavBar'
import styles from './Layout.module.scss'

type Props = {
  children: ReactNode
  hasHeader?: boolean
}

function Layout(props: Props) {
  return (
    <>
      {
        props.hasHeader && <Header/>
      }
      <div className={styles.body}>
        {props.children}
      </div>
      <NavBar/>
    </>
  )
}
export default Layout
