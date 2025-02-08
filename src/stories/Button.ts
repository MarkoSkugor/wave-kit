import { html, css, LitElement } from 'lit';
import { ReactiveController, ReactiveControllerHost } from 'lit';

class ButtonController implements ReactiveController {
  private host: ReactiveControllerHost;
  active: boolean = false;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    this.host.addController(this);
  }

  hostConnected(): void { }

  hostDisconnected(): void { }

  handleClick() {
    const hostElement = this.host as Button;
    if (hostElement.disabled) return;

    this.active = true;
    this.host.requestUpdate(); // Trigger UI update

    setTimeout(() => {
      this.active = false;
      this.host.requestUpdate();
    }, 50);

    hostElement.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
  }
}

export interface ButtonProps {
  disabled?: boolean;
}

export class Button extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      border: none;
      margin: 0;
      padding: 0;
      width: auto;
      overflow: visible;
      background: transparent;
      color: inherit;
      font: inherit;
      line-height: normal;
      -webkit-font-smoothing: inherit;
      -moz-osx-font-smoothing: inherit;
      -webkit-appearance: none;

      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      align-items: center;
      background-color: #111;
      color: #e1e1e1;
      display: flex;
      font-family: monospace;
      justify-content: center;
      margin: 0;
      margin: auto;
    }

    .button {
      display: inline-block;
      padding: 25px;
      background-color: #222;
      position: relative;
      transform: translate3d(5px, -5px, 0);
      box-shadow: 0px 0px 0 #444, -1px 1px 0 #444, -2px 2px 0 #444, -3px 3px 0 #444, -4px 4px 0 #444, -5px 5px 0 #444;
      width: 100%;

      &__container {
        color: white;
        font-weight: normal;
        text-align: center;
        text-transform: uppercase;
        margin: 11px 10px 10px;
        position: relative;
      }

      &:disabled {
        // color: #5e5e5e;
        color: #acacac;
      }

      &:active,
      &:disabled,
      &.active {
        transition: all .001s ease;
        transform: translate3d(0, 0, 0);
        box-shadow: 0 0 0 0 #444;

        &:hover {
          box-shadow: 0 0 0 0 #5e5e5e;
        }
      }

      &:not(:active):not(.active) {
        transition: all .2s ease;
      }

      &:not(:disabled):hover {
        background-color: #2f2f2f;

        &:not(:active):not(.active) {
          box-shadow: 0px 0px 0 #5e5e5e, -1px 1px 0 #5e5e5e, -2px 2px 0 #5e5e5e, -3px 3px 0 #5e5e5e, -4px 4px 0 #5e5e5e, -5px 5px 0 #5e5e5e;
        }
      }
    }
  `;

  static properties = {
    disabled: { type: Boolean, reflect: true }
  };

  disabled: boolean;
  private controller: ButtonController;

  constructor() {
    super();
    this.disabled = false;
    this.controller = new ButtonController(this);
  }

  render() {
    return html`
      <div class="button__container">
        <button
          class="button ${this.controller.active ? 'active' : ''}"
          ?disabled=${this.disabled}
          @click=${() => this.controller.handleClick()}
        >
          <slot></slot>
        </button>
      </div>
    `;
  }
}

customElements.define('wk-button', Button);
