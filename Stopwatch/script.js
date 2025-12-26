const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("history");

let currentInput = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        // ✅ C = DELETE HISTORY ONLY
        if (value === "C") {
            historyList.innerHTML = "";
            return; // ⛔ stop everything here
        }

        // delete input
        if (value === "DEL") {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
            return;
        }

        // calculate
        if (value === "=") {
            if (!currentInput) return;

            try {
                const result = eval(currentInput);
                addHistory(currentInput, result);
                currentInput = result.toString();
                display.value = currentInput;
            } catch {
                display.value = "Error";
                currentInput = "";
            }
            return;
        }

        // numbers & operators only
        currentInput += value;
        display.value = currentInput;
    });
});

function addHistory(expression, result) {
    const li = document.createElement("li");
    li.textContent = `${expression} = ${result}`;
    historyList.prepend(li);
}
