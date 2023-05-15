import { Layout } from 'antd'
import Projects from '~/features/projects/Projects'
import styles from './App.module.scss'

export default function App() {
  return (
    <Layout className={styles.root}>
      <Header headline='My projects' />
      <Layout.Content>
        <main className={styles.main}>
          <Projects />
        </main>
      </Layout.Content>
    </Layout>
  )
}

function Header({ headline }: { headline?: string }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerOuter}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className='sr-only'>Beaver Billy's App</span>
          </div>
          {headline && <h1 className={styles.headline}>{headline}</h1>}
        </div>
      </div>
    </header>
  )
}
