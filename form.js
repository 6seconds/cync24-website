function updateNameFields() {
    var select = document.getElementById("event_selection");
    var nameFieldsContainer = document.getElementById("name-fields-container");
    nameFieldsContainer.innerHTML = '';

    var numFields;
    switch (select.value) {
        case "content_creation":
            numFields = 5;
            document.getElementById("bg_container").style.backgroundImage = "url('https://images.unsplash.com/photo-1635830625698-3b9bd74671ca?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
            break;
        case "photography":
            numFields = 3;
            document.getElementById("bg_container").style.backgroundImage = "url('https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";

            break;
        case "videography":
            numFields = 2;
            document.getElementById("bg_container").style.backgroundImage = "url('https://images.unsplash.com/photo-1551302175-952301267d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmlkZW8lMjBlZGl0aW5nfGVufDB8MHwwfHx8MA%3D%3D')";

            break;
        case "chatbot_creation":
            numFields = 2;
            document.getElementById("bg_container").style.backgroundImage = "url('https://images.unsplash.com/photo-1607706189992-eae578626c86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHB5dGhvbiUyMHByb2dyYW1taW5nfGVufDB8MHwwfHx8MA%3D%3D')";

            break;
        case "comic_design":
            numFields = 2;
            document.getElementById("bg_container").style.backgroundImage = "url('https://png.pngtree.com/thumb_back/fh260/background/20221228/pngtree-comic-explosion-background-design-image_1503386.jpg')";

            break;
        case "valorant_tournament":
            numFields = 6;
            document.getElementById("bg_container").style.backgroundImage = "url('https://wallpapers.com/images/featured/valorant-305kescxw5dpup7y.jpg')";

            break;
        default:
            numFields = 0;
    }

    for (var i = 1; i <= numFields; i++) {
        var formGroup = document.createElement("div");
        formGroup.className = "form-group";

        var label = document.createElement("label");
        label.setAttribute("for", "name" + i);
        label.textContent = "Participant " + i + ":";

        var input = document.createElement("input");
        input.type = "text";
        input.id = "name" + i;
        input.name = "name" + i;
        input.required = true;

        formGroup.appendChild(label);
        formGroup.appendChild(input);

        nameFieldsContainer.appendChild(formGroup);
    }
}

window.onload = function () {
    updateNameFields(); // Initialize with the default selection
};
