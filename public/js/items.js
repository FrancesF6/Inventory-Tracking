function addItem() {
    let newItem = {};
    let formInputs = document.getElementsByClassName("add-form-inputs");
    for (let node of formInputs) {
        if (node.id === "name") {
            if (node.value.trim().length === 0) {
                alert(`New item's ${node.name} is required!`);
                return;
            }
            newItem.name = node.value.trim();
        }
        else if (node.id === "description") newItem.description = node.value.trim();
        else if (node.id === "unit_cost" || node.id === "quantity") {
            if (isNaN(Number(node.value))) {
                alert(`New item's ${node.name} should be a number!`);
                return;
            }
            newItem[node.id] = Number(node.value);
        }
    }
    // console.log("new item: ", newItem);

    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 201) {
                let newID = this.responseText;
                window.location.href = `/${newID}`;  // redirect to the page to view the newly created item
            } else {
                alert(this.responseText);
            }
        }
    }
    req.open("POST", '/', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Accept", "application/json");
    req.send(JSON.stringify(newItem));
}


function searchItems() {
    let query = {};
    query.name = document.getElementById("filter-name").value.trim();
    query.min_cost = document.getElementById("filter-mincost").value.trim();
    query.max_cost = document.getElementById("filter-maxcost").value.trim();
    query.min_quantity = document.getElementById("filter-minquantity").value.trim();
    query.max_quantity = document.getElementById("filter-maxquantity").value.trim();

    let queryString = "";
    if (query.name) queryString += `name=${query.name}&`;
    if (query.min_cost && !isNaN(Number(query.min_cost))) queryString += `min_cost=${Number(query.min_cost)}&`;
    if (query.max_cost && !isNaN(Number(query.max_cost))) queryString += `max_cost=${Number(query.max_cost)}&`;
    if (query.min_quantity && !isNaN(Number(query.min_quantity))) queryString += `min_quantity=${Number(query.min_quantity)}&`;
    if (query.max_quantity && !isNaN(Number(query.max_quantity))) queryString += `max_quantity=${Number(query.max_quantity)}&`;
    // console.log("query: ", query);

    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            renderItemList(JSON.parse(this.responseText));
        }
    }
    req.open("GET", `/items?${queryString}`, true);
    req.setRequestHeader("Accept", "application/json");
    req.send();
}


// itemsData - [{_id, name}, ...]
function renderItemList(itemsData) {
    let container = document.getElementById("list");
    container.innerHTML = "";
    for (let itemData of itemsData) {
        container.innerHTML += `<a class="item-link" href="/${itemData._id}">${itemData.name}</a><br>`;
    }
}