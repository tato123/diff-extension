export default function addNotes(element, text) {
  const note = `
          <div>   
              ${text}
          </div>
      `;
  element.insertAdjacentHTML("afterend", note);
}
