export function createPlayerForm() {
  const form = document.createElement("form");
  form.action = "";
  form.className = "player-form";

  const mainFieldset = document.createElement("fieldset");
  mainFieldset.className = "main-form-fieldset";

  const legend = document.createElement("legend");
  legend.className = "form-title";
  legend.textContent = "Create new player:";
  mainFieldset.appendChild(legend);

  // Name Input Group
  const nameDiv = document.createElement("div");
  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "player-name");
  nameLabel.textContent = "Name:";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "player-name";
  nameInput.name = "name";
  nameInput.required = true;

  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(nameInput);
  mainFieldset.appendChild(nameDiv);

  // Opponent Choice Fieldset
  const opponentFieldset = document.createElement("fieldset");
  opponentFieldset.className = "opponent-choice";

  const opponentLegend = document.createElement("legend");
  opponentLegend.textContent = "Who will be your battle opponent?";
  opponentFieldset.appendChild(opponentLegend);

  // Helper to build radio options
  const createRadioOption = (id, value, labelText, isChecked = false) => {
    const div = document.createElement("div");
    const input = document.createElement("input");
    input.type = "radio";
    input.id = id;
    input.name = "opponent";
    input.value = value;
    input.required = true;
    if (isChecked) input.checked = true;

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.className = "opponent-option";
    label.textContent = labelText;

    div.appendChild(input);
    div.appendChild(label);
    return div;
  };

  opponentFieldset.appendChild(
    createRadioOption("computer-opponent", "computer", "Computer", true),
  );
  opponentFieldset.appendChild(
    createRadioOption("human-opponent", "human", "Human"),
  );
  mainFieldset.appendChild(opponentFieldset);

  // Submit Button
  const submitBtn = document.createElement("button");
  submitBtn.className = "btn-style submit-button";
  submitBtn.type = "submit";
  submitBtn.textContent = "Create Player";

  mainFieldset.appendChild(submitBtn);
  form.appendChild(mainFieldset);

  return form;
}
