import { Button, Form, Input } from 'antd'
import { Project } from './ProjectCard'
import { glue } from '~/app/utils'
import styles from './ProjectNameEditor.module.scss'

export default function ProjectNameEditor({
  project,
  onFinish,
  className,
}: {
  project: Project
  onFinish?: () => void
  className?: string
}) {
  const [form] = Form.useForm()

  const handleFinish = ({ title }: { title: string }) => {
    console.log('TODO: handle project name change', { title })
    onFinish?.()
  }

  return (
    <Form
      name='projectTitle'
      form={form}
      layout='inline'
      onFinish={handleFinish}
      initialValues={{ title: project.title }}
      className={glue(styles.root, className)}
    >
      <Form.Item
        className={styles.formItem}
        name='title'
        rules={[{ required: true, message: 'Please input project title' }]}
      >
        <Input
          autoFocus
          placeholder='Name your project'
          addonAfter={
            <Button
              type='link'
              size='small'
              htmlType='submit'
              className={styles.submitButton}
              disabled={
                !form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              ✔️
            </Button>
          }
        />
      </Form.Item>
    </Form>
  )
}
