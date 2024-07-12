import { Flex, Typography, Button } from "antd"
import { type Dispatch, type SetStateAction, useState } from "react"

const width100 = { width: "100%" }
const margin1 = { margin: "1rem" }

const { Title } = Typography

interface Props {
  setYesNeeded: Dispatch<SetStateAction<boolean>>
}

export const Page1 = ({ setYesNeeded }: Props) => {
  const [notHappy, setNotHappy] = useState(false)

  return (
    <>
      {!notHappy ? (
        <Flex vertical style={margin1}>
          <Title level={3}>
            Требуется фронтенд разработчик? <br /> Чтобы с большим опытом и прям
            мог в React (или даже в SAP UI5)?
          </Title>
          <Title level={4}>Вот это совпадение! У нас есть такой, нужен?</Title>
          <Flex style={width100} align="center" justify="space-between">
            <Button
              type="primary"
              style={{ margin: "1rem", width: "20rem", height: "5rem" }}
              onClick={() => {
                setYesNeeded(true)
              }}
            >
              Да!
            </Button>
            <Button
              style={margin1}
              onClick={() => {
                setNotHappy(true)
              }}
            >
              Нет
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex style={width100} vertical align="center">
          <Title>Плохого эйчара ответ!</Title>
          <Typography>(Вам тут не рады)</Typography>
        </Flex>
      )}
    </>
  )
}
