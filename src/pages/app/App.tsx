import { Counter } from '~/features/counter/Counter'
import { Layout } from 'antd'
import styles from './App.module.scss'

export default function App() {
  return (
    <Layout className={styles.root}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div>Logo</div>
        </div>
      </header>
      <Layout.Content>
        <div className={styles.container}>
          <Counter />
        </div>
      </Layout.Content>
    </Layout>
  )
}
