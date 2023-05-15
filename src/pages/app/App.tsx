import { Button, Layout } from 'antd'
import { useAppDispatch, useIsMobile } from '~/app/hooks'
import { toggleNewProjectRequest } from '~/features/projects/Projects.state'
import Projects from '~/features/projects/Projects'
import { ReactComponent as IconPlus } from './icon-plus.svg'
import styles from './App.module.scss'
import { glue } from '~/app/utils'

export default function App() {
  const isMobile = useIsMobile()

  return (
    <Layout className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerOuter}>
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              <span className='sr-only'>Beaver Billy's App</span>
            </div>
            <h1 className={styles.headline}>My projects</h1>

            {!isMobile && <NewProjectButton className={styles.isOnEdge} />}
          </div>
        </div>
      </header>
      <Layout.Content>
        <main className={styles.main}>
          <Projects />
        </main>

        {isMobile && <NewProjectButton className={styles.isInCorner} />}
      </Layout.Content>
    </Layout>
  )
}

function NewProjectButton({ className }: { className?: string }) {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(toggleNewProjectRequest())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Button
      type='primary'
      shape='circle'
      size='large'
      aria-label='Create new project'
      onClick={handleClick}
      icon={<IconPlus />}
      rootClassName={glue(styles.newProjectButton, className)}
    />
  )
}
