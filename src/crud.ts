import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("crud-element")
export class CRUDElement extends LitElement {
  @property({ type: Array }) basket = ["test", "test2", "test3"];
  @property({ type: String }) inputId = "input-crud";

  @state() private list = this.basket;
  @state() private editingIdx = -1;
  @state() private item = "";

  render() {
    return html`
      <h1>CRUD Sample</h1>
      <div>
        <ul>
          ${this.list.map((i, idx) => {
            return html`<li>
              <span>${i}</span>
              <sl-button-group label="Alignment">
                <sl-button size="medium" @click=${() => this._onEditItem(idx)}>
                  Edit
                </sl-button>
                <sl-button
                  size="medium"
                  @click=${() => this._onRemoveItem(idx)}
                >
                  Delete
                </sl-button>
              </sl-button-group>
            </li>`;
          })}
        </ul>
      </div>
      <br />
      <div class="input-form">
        <sl-input
          type="text"
          @sl-change=${this._onInputChange}
          value=${this.item}
          id=${this.inputId}
        ></sl-input>
        <sl-button @click=${this._onSaveItem}>Save</sl-button>
      </div>
    `;
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    const inputId = this.shadowRoot?.getElementById(this.inputId);
    inputId?.focus();
  }

  _onInputChange = (e: { target: any }) => {
    const value = e.target.value as string;
    this.item = value;
  };

  _onSaveItem = () => {
    if (this.editingIdx > -1) {
      this.list[this.editingIdx] = this.item;
      this.editingIdx = -1;
      this.requestUpdate();
    } else {
      if (this.item !== "") {
        this.list = this.list.concat(this.item);
      }
    }

    this.item = "";
  };

  _onRemoveItem = (index: number) => {
    this.list = this.list.filter((_, idx) => idx !== index);
  };

  _onEditItem = (index: number) => {
    this.editingIdx = index;
    this.item = this.list[index];
  };

  static styles = css`
    .input-form {
      display: flex;
      gap: 0.5rem;
    }
  `;
}
