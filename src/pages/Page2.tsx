import { Flex, Typography, Button, Form, Input, Radio } from "antd"
import { useState } from "react"

const margin1 = { margin: "1rem" }
const width100 = { width: "100%" }

const { Title } = Typography
const { TextArea } = Input

type sendValues = Record<
  "organization" | "salaryRange" | "requirements" | "contactInfo",
  string
>

export const Page2 = () => {
  const [form] = Form.useForm()
  const [position, setPosition] = useState({ top: "15%", left: "0%" })
  const [saved, setSaved] = useState(false)

  const handleMouseEnter = () => {
    const newTop = Math.random() * 80 + 10 + "%"
    const newLeft = Math.random() * 80 + 10 + "%"
    setPosition({ top: newTop, left: newLeft })
  }

  const onFinish = (values: sendValues) => {
    console.log("Success:", values)
    setSaved(true)
  }

  return (
    <>
      {!saved ? (
        <Flex vertical style={margin1}>
          <Title level={3}>Отлично, тогда ответьте на пару вопросов:</Title>
          <Form
            form={form}
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Организация"
              name="organization"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите название организации!",
                },
                {
                  max: 50,
                  message: "А можно сокращенное название организации?",
                },
              ]}
            >
              <Input style={{ width: "20rem" }} />
            </Form.Item>

            <Form.Item
              label="Необходимость выполнения тестового задания"
              name="testTask"
            >
              <Flex>
                <Radio
                  tabIndex={-1}
                  value="yes"
                  checked={false}
                  style={{
                    position: "absolute",
                    top: position.top,
                    left: position.left,
                  }}
                  onMouseEnter={handleMouseEnter}
                >
                  Да
                </Radio>
                <Radio value="no" defaultChecked style={{ marginLeft: "4rem" }}>
                  Нет
                </Radio>
              </Flex>
            </Form.Item>

            <Form.Item label="Зарплатная вилка" name="salaryRange">
              <Input style={{ width: "20rem" }} />
            </Form.Item>

            <Form.Item
              label="Что требуется от кандидата"
              name="requirements"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, опишите требования к кандидату!",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder={
                  'Не шаблонный копипаст про знание HTML и CSS, а конкретные софт и хард скиллы, стек и прочее, чтобы не было "да, вы очень хорошо знаете React, но нам не нравится Ваш знак зодиака и цвет глаз" или "вы водили 9 лет КАМАЗ? извините, нам нужен водитель ЗИЛа"'
                }
              />
            </Form.Item>

            <Form.Item
              label="Ваши контактные данные для связи (в свободной форме)"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, укажите контактные данные!",
                },
              ]}
              name="contactInfo"
            >
              <Input style={{ maxWidth: "40rem" }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Далее
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      ) : (
        <Flex style={{...width100, ...{marginTop: '5rem'}}} vertical align="center" justify="center">
           <Title level={5}>Большое спасибо за интерес, проявленный к кандидатуре разработчика.</Title>
          <Typography>
            К сожалению, в настоящий момент вы не готовы чтобы он работал у вас на
            данной вакансии.<br/>Мы внимательно ознакомились с вашей вакансией и,
            возможно, вернемся к вашей компании, когда у нас возникнет такая
            потребность.
          </Typography>
        </Flex>
      )}
    </>
  )
}
