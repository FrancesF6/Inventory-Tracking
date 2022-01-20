let itemID = "";

function saveItemChanges() {
    let modifiedItemData = {};
    let formInputs = document.getElementsByClassName("item-info-inputs");
    for (let node of formInputs) {
        if (node.id === "name") {
            if (node.value.trim().length === 0) {
                alert(`Item's ${node.name} is required!`);
                return;
            }
            modifiedItemData.name = node.value.trim();
        }
        else if (node.id === "description") modifiedItemData.description = node.value.trim();
        else if (node.id === "unit_cost" || node.id === "quantity") {
            if (isNaN(Number(node.value))) {
                alert(`Item's ${node.name} should be a number!`);
                return;
            }
            modifiedItemData[node.id] = Number(node.value);
        }
    }
    // console.log("Modified item: ", modifiedItemData);

    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert("Saved!");
            } else {
                alert(this.responseText);
            }
        }
    }
    req.open("PUT", `/${itemID}`, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(modifiedItemData));
}


function deleteItem() {
    if (!confirm("Are you sure you want to delete this item (not undoable)?")) {
        return;
    }
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href = '/';  // redirect to the list page
        }
    }
    req.open("DELETE", `/${itemID}`, true);
    req.send();
}


function init() {
    itemID = document.getElementById("item-id").innerText.split('ID: ')[1];
    // console.log(itemID);
}