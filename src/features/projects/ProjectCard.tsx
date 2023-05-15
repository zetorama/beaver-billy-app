import type { ComponentProps } from 'react'
import { Button, Tooltip } from 'antd'
import { glue } from '~/app/utils'
import { ReactComponent as IconEdit } from './icon-edit.svg'
import { ReactComponent as IconDelete } from './icon-delete.svg'
import defaultProjectPicture from './project-default-picture.png'
import styles from './ProjectCard.module.scss'

type Project = {
  id: number
  title: string
  picture: string | null
  createdAt: string
}

export default function ProjectCard({ project, compact }: { project: Project; compact?: boolean }) {
  const handleEditClick = () => console.log('Edit')
  const handleDeleteClick = () => console.log('Delete')

  return (
    <div className={glue(styles.root, compact && styles.isCompact)}>
      <div className={styles.picture}>
        <ProjectPicture className={styles.pictureImg} project={project} />
      </div>

      {compact ? (
        <>
          <div className={styles.description}>
            <h2 className={styles.descriptionTitle}>{project.title}</h2>
            <div className={styles.descriptionTimestamp}>
              <Timestamp date={project.createdAt} />
            </div>
          </div>

          <div className={styles.actions}>
            <EditButton onClick={handleEditClick} />
            <DeleteButton onClick={handleDeleteClick} />
          </div>
        </>
      ) : (
        <>
          <h2 className={styles.title}>{project.title}</h2>
          <div className={styles.timestamp}>
            <Timestamp date={project.createdAt} />
          </div>
          <div className={styles.edit}>
            <EditButton onClick={handleEditClick} />
          </div>
          <div className={styles.delete}>
            <DeleteButton onClick={handleDeleteClick} />
          </div>
        </>
      )}
    </div>
  )
}

function ProjectPicture({ project, className }: { project: Project; className?: string }) {
  const src = project.picture || defaultProjectPicture
  return <img src={src} alt='' className={className} />
}

function EditButton({ onClick, className }: { onClick: ComponentProps<typeof Button>['onClick']; className?: string }) {
  return (
    <Tooltip title='Edit'>
      <Button
        onClick={onClick}
        className={className}
        type='link'
        shape='circle'
        icon={<IconEdit className={styles.icon} />}
      />
    </Tooltip>
  )
}

function DeleteButton({
  onClick,
  className,
}: {
  onClick: ComponentProps<typeof Button>['onClick']
  className?: string
}) {
  return (
    <Tooltip title='Delete project'>
      <Button
        onClick={onClick}
        className={className}
        type='link'
        shape='circle'
        icon={<IconDelete className={styles.icon} />}
      />
    </Tooltip>
  )
}

function Timestamp({ date }: { date: Date | string | null }) {
  if (!date) return null

  const d = new Date(date)
  const displayDate = d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  const displayTime = d.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <>
      <span style={{ marginRight: '1.5ch' }}>{displayDate}</span>
      <span>{displayTime}</span>
    </>
  )
}
