import { LitElement, html } from "@polymer/lit-element";

export default class Login extends LitElement {
  _render() {
    return html`
      <style>
        :host {
            font-family: roboto;
        }

        :host * {
            box-sizing: border-box;
        }


      .modal {
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    /* Modal Content/Box */
    .modal-content {
        background-color: #191b3b;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 50%;
        max-width: 300px;
        height: 50vh;
        color: #fff;
        overflow: auto;
    }
    .form-control label {
        display: block;
        margin-bottom: 8px;
    }

    .form-control input {
        outline: none;
    border-radius: 16px;
    padding: 10px;
    width: 100%;
    margin-bottom: 16px;
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,1);
    color: #fff;

    }

    form button {
        width: 100%;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    border: none;
    }

      </style>
      <div class="modal">
        <div class="modal-content">
          <h1>Welcome to the world of diff</h1>
          <form>
            <div class="form-control">
                <label>Username</label>
                <input type="text" />
            </div>
            <div class="form-control">
                <label>Password</label>
                <input type="password" />
            </div>
            <button type="submit">Submit</button>
          </form>
          
        </div>
      </div>
    `;
  }
}
