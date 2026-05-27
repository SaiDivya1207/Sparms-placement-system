async function fetchApplications() {

    try {

        const response = await fetch("http://127.0.0.1:5000/applications");

        const applications = await response.json();

        const table = document.getElementById("applicationTable");

        table.innerHTML = "";

        applications.forEach(app => {

            let statusClass = "";

            if(app.status === "Selected") {
                statusClass = "selected";
            }

            else if(app.status === "Shortlisted") {
                statusClass = "shortlisted";
            }

            else if(app.status === "Rejected") {
                statusClass = "rejected";
            }

            else {
                statusClass = "applied";
            }

            table.innerHTML += `

            <tr>

                <td>${app.student_name}</td>

                <td>${app.company_name}</td>

                <td>${app.round_name}</td>

                <td>
                    <span class="status ${statusClass}">
                        ${app.status}
                    </span>
                </td>

                <td>

                    <button class="action-btn view-btn">
                        View
                    </button>

                    <button class="action-btn reject-btn">
                        Reject
                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(error) {

        console.log("Error fetching applications:", error);

    }

}

fetchApplications();