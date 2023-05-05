import { Box, Button, Heading } from '@chakra-ui/react'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createMachine } from '@xstate/fsm'
import { useMachine } from '@xstate/react/fsm'
import { useMemo } from 'react'

export const loader = () => {
  const machineDefinition = {
    id: 'promise',
    initial: 'welcome',
    states: {
      welcome: {
        on: {
          next: { target: 'onboard' },
          chat: { target: 'chat' },
        },
        entry: () => {
          console.log('welcome!')
        },
      },
      onboard: {
        on: { next: { target: 'chat' } },
        entry: () => {
          console.log('onboard!')
        },
      },
      chat: {},
      test: {},
    },
  }
  return json({ machineDefinition })
}

export default function Index() {
  const { machineDefinition } = useLoaderData<typeof loader>()
  const chatbotMachine = useMemo(() => createMachine(machineDefinition), [machineDefinition])
  const [state, send] = useMachine(chatbotMachine)

  const handleClick = () => {
    console.log(state.value, state.changed)
    send('next')
    console.log(state.value, state.changed)
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
