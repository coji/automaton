import { Box, Button, Heading } from '@chakra-ui/react'
import { useMachine } from '@xstate/react'
import { promiseMachine } from '~/services/promise-machine'

export default function Index() {
  const [state, send] = useMachine(promiseMachine)

  const handleClick = () => {
    send('next')
    console.log(state)
  }

  return (
    <div>
      <Heading>こんにちは</Heading>
      <Box>
        <Button onClick={() => handleClick()}>Run</Button>
        <Box>state: {`${JSON.stringify(state.value)}`}</Box>
      </Box>
    </div>
  )
}
