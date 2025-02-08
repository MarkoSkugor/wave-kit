import { html } from 'lit-html';
import { Meta, StoryFn } from '@storybook/web-components';
import type { ButtonProps } from './Button';
import './Button';

export default {
  title: 'Example/Button',
  tags: ['autodocs'],
  component: 'wk-button',
  argTypes: {
    disabled: { control: 'boolean' },
  },
} as Meta<ButtonProps>;

const Template: StoryFn = ({ disabled }) => html`
  <div><wk-button ?disabled=${disabled}>Click Me</wk-button></div>
`;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
