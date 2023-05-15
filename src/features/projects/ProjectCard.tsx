import type { Project } from './Projects.types'
import { ComponentProps, useState } from 'react'
import { Button, Tooltip, Modal } from 'antd'
import { glue } from '~/app/utils'
import { useAppDispatch } from '~/app/hooks'
import { createProject, deleteProject, toggleNewProjectRequest, updateProject } from './Projects.state'
import { ReactComponent as IconEdit } from './icon-edit.svg'
import { ReactComponent as IconDelete } from './icon-delete.svg'
import { ReactComponent as IconConfirm } from './icon-confirm.svg'
import ProjectNameEditor, { FormValues } from './ProjectNameEditor'
import defaultProjectPicture from './project-default-picture.png'
import styles from './ProjectCard.module.scss'

const askDeleteConfirmation = () =>
  new Promise((resolve, reject) => {
    try {
      Modal.confirm({
        className: styles.modal,
        icon: <IconConfirm className={styles.confirmIcon} />,
        content: (
          <div className={styles.confirmation}>
            <strong className={styles.confirmationTitle}>Are you sure you want to delete this project?</strong>
            <p className={styles.confirmationText}>This action can't be undone.</p>
          </div>
        ),
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          resolve(true)
        },
        onCancel() {
          resolve(false)
        },
      })
    } catch (err) {
      reject(err)
    }
  })

export function NewProjectCard({ isCompact, className }: { isCompact?: boolean; className?: string }) {
  const dispatch = useAppDispatch()
  const handleFinish = ({ title }: Omit<FormValues, 'id'>) => {
    dispatch(createProject({ title }))
    dispatch(toggleNewProjectRequest(false))
  }

  const handleCancel = () => {
    dispatch(toggleNewProjectRequest(false))
  }

  return (
    <div className={glue(styles.root, isCompact && styles.isCompact, styles.isNew, className)}>
      <div className={styles.picture}>
        <ProjectPicture className={styles.pictureImg} />
      </div>

      <div className={styles.identity}>
        <ProjectNameEditor onFinish={handleFinish} onCancel={handleCancel} />
      </div>
    </div>
  )
}

export default function ProjectCard({
  project,
  isCompact,
  className,
}: {
  project: Project
  isCompact?: boolean
  className?: string
}) {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const toggleIsEditing = () => setIsEditing((flag) => !flag)

  const handleEditFinish = ({ id, title }: FormValues) => {
    if (id && title) {
      dispatch(updateProject({ id, title }))
    }
    toggleIsEditing()
  }

  const handleDeleteClick = async () => {
    const confirmed = await askDeleteConfirmation()
    if (confirmed) {
      dispatch(deleteProject(project.id))
    }
  }

  return (
    <div className={glue(styles.root, isCompact && styles.isCompact, isEditing && styles.isEditing, className)}>
      <div className={styles.picture}>
        <ProjectPicture className={styles.pictureImg} />
      </div>

      {isCompact ? (
        <>
          <div className={styles.description}>
            {isEditing ? (
              <ProjectNameEditor project={project} onFinish={handleEditFinish} />
            ) : (
              <>
                <h2 className={styles.descriptionTitle}>{project.title}</h2>
                <div className={styles.descriptionTimestamp}>
                  <Timestamp date={project.createdAt} />
                </div>
              </>
            )}
          </div>

          <div className={styles.actions}>
            <RenameButton onClick={toggleIsEditing} />
            <DeleteButton onClick={handleDeleteClick} />
          </div>
        </>
      ) : (
        <>
          <div className={styles.identity}>
            {isEditing ? (
              <ProjectNameEditor project={project} onFinish={handleEditFinish} />
            ) : (
              <>
                <h2 className={styles.identityTitle}>{project.title}</h2>
                <div className={styles.identityEdit}>
                  <RenameButton onClick={toggleIsEditing} />
                </div>
              </>
            )}
          </div>
          <div className={styles.timestamp}>
            <Timestamp date={project.createdAt} />
          </div>
          <div className={styles.deleteAction}>
            <DeleteButton onClick={handleDeleteClick} />
          </div>
        </>
      )}
    </div>
  )
}

function ProjectPicture({ className }: { className?: string }) {
  return <img src={defaultProjectPicture} alt='' className={className} />
}

function RenameButton({
  onClick,
  className,
}: {
  onClick: ComponentProps<typeof Button>['onClick']
  className?: string
}) {
  return (
    <Tooltip title='Rename'>
      <Button
        onClick={onClick}
        className={className}
        type='link'
        shape='circle'
        icon={<IconEdit className={styles.icon} />}
        aria-label='Rename project'
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
        aria-label='Delete project'
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
