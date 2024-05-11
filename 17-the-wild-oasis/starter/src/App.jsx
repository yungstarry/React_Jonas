import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles"
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";




const App = () => {
  return (
    <>
    <GlobalStyles />
    <div>

    <Heading>App</Heading>
    <Button>star</Button>

    <Input type="number" name="" placeholder="number of quest" />
    </div>
    </>
  )
}

export default App