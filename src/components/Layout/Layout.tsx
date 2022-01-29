import { ReactNode } from 'react'
import Header from 'components/Header/Header'
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
    </>
  )
}
export default Layout
