import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

export default {
    title: 'Components/Button',
    component: Button,
    parameters: {
        docs: {
            page: () => Docs()
        }
    }

} satisfies Meta<typeof Button>
type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        children: <p>Hello</p>
    }
}

export function Docs() {
    return <div>
        <h1>Replacing DocsPage with a custom component</h1>
        <p>
        The Docs page can be customized with your own custom content written as a React Component.
        </p>
        <p>
       Write your own code here👇
        </p>
        <Button color='red'>Hello</Button>
    </div>
}