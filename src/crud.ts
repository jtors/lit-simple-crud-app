import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

// state === state
// property === props

@customElement("crud-element")
export class CRUDElement extends LitElement {
  @property({ type: Array }) basket = ["test", "test2", "test3"];

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
              <span>
                <button type="button" @click=${() => this._onEditItem(idx)}>
                  Edit
                </button>
              </span>
              <span>
                <button type="button" @click=${() => this._onRemoveItem(idx)}>
                  Delete
                </button>
              </span>
            </li>`;
          })}
        </ul>
      </div>
      <br />
      <div>
        <input type="text" @change=${this._onInputChange} value=${this.item} />
        <button @click=${this._onSaveItem}>Save</button>
      </div>
    `;
  }

  _onInputChange = (e: { target: any }) => {
    const value = e.target.value as string;
    this.item = value;
  };

  _onSaveItem = () => {
    if (this.editingIdx > -1) {
      this.list[this.editingIdx] = this.item;
      this.requestUpdate();
    } else {
      if (this.item !== "") {
        this.list = this.list.concat(this.item);
      }
    }
  };

  _onRemoveItem = (index: number) => {
    this.list = this.list.filter((_, idx) => idx !== index);
  };

  _onEditItem = (index: number) => {
    this.editingIdx = index;
    this.item = this.list[index];
  };
}
