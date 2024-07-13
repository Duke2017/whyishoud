import { Flex, Typography, Button, Form, Input, Radio } from "antd"
import { useState } from "react"
import { initializeApp } from "firebase/app"
import { addDoc, collection, getFirestore } from "firebase/firestore"

const margin1 = { margin: "1rem" }
const width100 = { width: "100%" }

const { Title } = Typography
const { TextArea } = Input

// Вот даже не буду в .env прятать, если так нужно - держите)
const firebaseConfig = {
  apiKey: "AIzaSyD1pCTgKnkn5sf0gM_AGqY8YBRjyqwvJLI",
  authDomain: "whyishoud.firebaseapp.com",
  projectId: "whyishoud",
  storageBucket: "whyishoud.appspot.com",
  messagingSenderId: "343993143072",
  appId: "1:343993143072:web:4946d27460fdce6ea91145",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

type sendValues = Record<
  "organization" | "salaryRange" | "requirements" | "contactInfo",
  string
>

async function writeUserData(obj: sendValues & { userIP: string }) {
  try {
    const docRef = await addDoc(collection(db, "records"), obj)

    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

let userIP = ""
const getUserIPAddress = () => {
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      userIP = data.ip.replace(/\./g, "")
    })
    .catch((error) => console.error("Error fetching user info:", error))
}
getUserIPAddress()

export const Page2 = () => {
  const [form] = Form.useForm()
  const [position, setPosition] = useState({ top: "15%", left: "0%" })
  const [saved, setSaved] = useState(false)

  const handleMouseEnter = () => {
    const newTop = Math.random() * 80 + 10 + "%"
    const newLeft = Math.random() * 80 + 10 + "%"
    setPosition({ top: newTop, left: newLeft })
  }

  const handleYesClick = () => {
    setPosition({ top: "-100rem", left: "-100rem" })
  }

  const onFinish = (values: sendValues) => {
    console.log("Success:", values)
    writeUserData({
      userIP: userIP,
      organization: values.organization,
      salaryRange: values.salaryRange,
      requirements: values.requirements,
      contactInfo: values.contactInfo,
    })
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
                  onClick={handleYesClick}
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
                  'Не шаблонный копипаст про знание HTML и CSS, а конкретные софт и хард скиллы, стек и прочее, чтобы не было "да, вы очень хорошо знаете React, но нам не нравится Ваш знак зодиака и цвет глаз" или "Вы водили 9 лет КАМАЗ? извините, но нам нужен водитель ЗИЛа"'
                }
              />
            </Form.Item>

            <Form.Item
              label="Ваши контактные данные для обратной связи (в свободной форме)"
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
        <Flex
          style={{ ...width100, ...{ marginTop: "5rem" } }}
          vertical
          align="center"
          justify="center"
        >
          <Title level={5}>
            Большое спасибо за интерес, проявленный к кандидатуре разработчика.
          </Title>
          <Typography>
            К сожалению, в настоящий момент вы не готовы чтобы он работал у вас
            на данной вакансии.
            <br />
            Мы внимательно ознакомились с вашей вакансией и, возможно, вернемся
            к вашей компании, когда у нас возникнет такая потребность.
          </Typography>
        </Flex>
      )}
    </>
  )
}
