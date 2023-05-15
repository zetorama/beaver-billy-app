import { List } from 'antd'
import { useAppDispatch, useAppSelector, useIsMobile } from '~/app/hooks'
import ProjectCard, { NewProjectCard } from './ProjectCard'
import { selectAllProjects, selectIsNewProjectRequested, toggleNewProjectRequest } from './Projects.state'
import styles from './Projects.module.scss'

export default function Projects() {
  const isMobile = useIsMobile()
  const projects = useAppSelector(selectAllProjects)
  const isAddingNewProject = useAppSelector(selectIsNewProjectRequested)

  if (!projects.length && !isAddingNewProject) {
    return <ProjectsPlaceholder />
  }

  // TODO: figure out reordering (drag'n'drop) and pagination (infinite scroll?)

  return (
    <List
      bordered
      className={styles.root}
      dataSource={projects}
      renderItem={(project) => (
        <List.Item key={project.id} className={styles.row}>
          <ProjectCard project={project} isCompact={isMobile} />
        </List.Item>
      )}
      header={
        isAddingNewProject && (
          <List.Item className={styles.row}>
            <NewProjectCard isCompact={isMobile} />
          </List.Item>
        )
      }
      locale={{ emptyText: 'No projects yet' }}
    />
  )
}

function ProjectsPlaceholder() {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(toggleNewProjectRequest())
  }

  return (
    <div className={styles.placeholder}>
      <h1>No projects yet</h1>
      <p>
        Click{' '}
        <button onClick={handleClick} aria-label='Create new project'>
          ➕
        </button>{' '}
        to create your first project.
      </p>
    </div>
  )
}
