import type { Project } from './Projects.types'
import { Button, Form, Input } from 'antd'
import { glue } from '~/app/utils'
import styles from './ProjectNameEditor.module.scss'

export type FormValues = {
  id: string | undefined
  title: string
}

export default function ProjectNameEditor({
  project,
  onFinish,
  onCancel,
  className,
}: {
  project?: Project
  onFinish: (values: FormValues) => void
  onCancel?: () => void
  className?: string
}) {
  const [form] = Form.useForm<FormValues>()

  return (
    <Form
      name='projectTitle'
      form={form}
      layout='inline'
      onFinish={onFinish}
      initialValues={{ id: project?.id, title: project?.title ?? '' }}
      className={glue(styles.root, className)}
    >
      {project?.id && <Form.Item name='id' hidden />}
      <Form.Item
        className={styles.formItem}
        name='title'
        rules={[{ required: true, message: 'Please input project title' }]}
      >
        <Input
          autoFocus
          placeholder={project?.id ? 'Name your project' : 'New project name'}
          aria-label='Project name'
          addonAfter={
            <Button
              type='link'
              size='small'
              htmlType='submit'
              className={styles.submitButton}
              disabled={
                !form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
              aria-label='Submit'
            >
              ✔️
            </Button>
          }
        />
      </Form.Item>
      {onCancel && (
        <Button type='ghost' size='small' htmlType='button' className={styles.submitButton} onClick={onCancel}>
          Cancel
        </Button>
      )}
    </Form>
  )
}
