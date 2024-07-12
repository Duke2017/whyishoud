import { ConfigProvider } from "antd"
import { theme } from "./theme.ts"
import { useState } from "react"
import { Page1 } from "./pages/Page1.tsx"
import { Page2 } from "./pages/Page2.tsx"

export const App = () => {
  const [yesNeeded, setYesNeeded] = useState(false)

  return (
    <ConfigProvider theme={theme}>
      {!yesNeeded ? <Page1 setYesNeeded={setYesNeeded} /> : <Page2 />}
    </ConfigProvider>
  )
}
