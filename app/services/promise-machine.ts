import { createMachine } from 'xstate'

type UserProfile = {
  name: string
  age: number
}

export const promiseMachine = createMachine({
  schema: {
    context: {} as { profile: UserProfile },
    events: {} as { type: 'next' | 'chat' },
  },
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
    chat: {
      type: 'final',
    },
    test: {},
  },
})
