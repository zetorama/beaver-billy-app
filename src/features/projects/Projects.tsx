import { List } from 'antd'
import { useIsMobile } from '~/app/hooks'

import styles from './Projects.module.scss'

import projects from './__mocks__/projects-list.json'
import ProjectCard, { NewProjectCard } from './ProjectCard'

export default function Projects() {
  const isMobile = useIsMobile()
  const isAddingNewProject = true

  // TODO: show "no projects" placeholder
  // TODO: show new project row
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
    />
  )
}
