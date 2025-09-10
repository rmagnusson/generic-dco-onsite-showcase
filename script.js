(async () => {
    try {
        // Fetch data from API
        const response = await fetch("https://bannerflow-feed-builder.azurewebsites.net/api/googlesheet/?user=2&spreadsheetId=1LwAfS4QOLtXcMm7FCEFHAcmeeZcByrQLuqvFJfniRFI");
        const data = await response.json();

        // Extract unique Audience values
        const audiences = [...new Set(data.map(item => item.audience))];

        // Create a dropdown
        const select = document.createElement("select");
        select.id = "audienceDropdown";

        // Add a default option
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "Select Audience";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);

        // Populate options from Audience list
        audiences.forEach(audience => {
            const option = document.createElement("option");
            option.value = audience;
            option.textContent = audience;
            select.appendChild(option);
        });

        // Append dropdown to body
        document.body.appendChild(select);

        // Create a container to display info
        const infoDiv = document.createElement("div");
        infoDiv.id = "audienceInfo";
        infoDiv.style.marginTop = "1em";
        document.body.appendChild(infoDiv);

        // Listen for changes
        select.addEventListener("change", e => {
            const selectedAudience = e.target.value;

            // Find all items matching the selected audience
            const matches = data.filter(item => item.audience === selectedAudience);
            console.log(matches)

            // Display data
            infoDiv.innerHTML = ""; // clear previous
            
            matches.forEach(match => {
                const pre = document.createElement("pre");
                pre.textContent = JSON.stringify(match, null, 2);
                infoDiv.appendChild(pre);
                console.log(match.ad.split("=")[1])
                infoDiv.innerHTML = '<div class="bf-promo" style="height: 100%;"></div>';
            });
        });

    } catch (error) {
        console.error("Error fetching or rendering dropdown:", error);
    }
})();

