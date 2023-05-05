import { Box, Button, Heading } from '@chakra-ui/react'
import type { LoaderArgs } from '@remix-run/node'
import { createMachine, interpret, type StateMachine } from '@xstate/fsm'
import { useMachine } from '@xstate/react/fsm'
import { useMemo } from 'react'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'

const states = [{ id: 'welcome' }, { id: 'onboard' }, { id: 'chat' }, { id: 'test' }]
const stateTransition = [{ state: 'welcome', event: 'next', target: 'onboard' }]
const stateAction = [
  {
    state: 'welcome',
    on: 'entry',
    action: [{ type: 'message', text: 'こんにちは' }],
  },
]
export const loader = (args: LoaderArgs) => {
  const machineDefinition: StateMachine.Config<
    object,
    { type: 'next' } | { type: 'chat' },
    | { value: 'welcome'; context: object }
    | { value: 'onboard'; context: object }
    | { value: 'chat'; context: object }
    | { value: 'test'; context: object }
  > = {
    id: 'chatbot',
    initial: 'welcome',
    states: {
      welcome: {
        on: {
          next: { target: 'onboard' },
          chat: { target: 'chat' },
        },
        entry: () => console.log('welcome entry'),
        exit: () => console.log('welcome exit'),
      },
      onboard: {
        on: { next: { target: 'chat' } },
        entry: { type: 'next' },
      },
      chat: {},
      test: {},
    },
  }

  const stateMachine = interpret(createMachine(machineDefinition)).start()
  stateMachine.subscribe((state) => console.log('subscribed:', state.value))
  console.log('send next')
  stateMachine.send('next')

  return typedjson({ machineDefinition })
}

export default function Index() {
  const { machineDefinition } = useTypedLoaderData<typeof loader>()
  const chatbotMachine = useMemo(() => createMachine(machineDefinition), [machineDefinition])
  const [state, send] = useMachine(chatbotMachine)

  const handleClick = () => {
    send('next')
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
