const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

// Create a running total row
let totalAmount = 0;
const totalRow = document.createElement("tr");
totalRow.innerHTML = `<td colspan="2" style="font-weight:bold; text-align:right;">Total:</td>
                      <td style="font-weight:bold;">₹0</td>`;
expenseList.appendChild(totalRow);

expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (description && category && amount > 0) {
        // Create a new row
        const newRow = document.createElement("tr");

        const amountCell = document.createElement("td");
        amountCell.innerHTML = `₹${amount.toFixed(2)} <button class="delete-btn">Delete</button>`;

        newRow.innerHTML = `
            <td>${description}</td>
            <td>${category}</td>
        `;
        newRow.appendChild(amountCell);

        // Delete button functionality
        amountCell.querySelector(".delete-btn").addEventListener("click", () => {
            totalAmount -= amount;
            updateTotal();
            newRow.remove();
        });

        // Insert before the total row
        expenseList.insertBefore(newRow, totalRow);

        // Update total
        totalAmount += amount;
        updateTotal();

        // Reset form
        expenseForm.reset();
    } else {
        alert("Please fill out all fields with valid data");
    }
});

function updateTotal() {
    totalRow.innerHTML = `<td colspan="2" style="font-weight:bold; text-align:right;">Total:</td>
                          <td style="font-weight:bold;">₹${totalAmount.toFixed(2)}</td>`;
}
