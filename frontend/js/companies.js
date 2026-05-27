async function fetchCompanies() {

    try {

        const response = await fetch("http://127.0.0.1:5000/companies");

        const companies = await response.json();

        const table = document.getElementById("companyTable");

        table.innerHTML = "";

        companies.forEach(company => {

            table.innerHTML += `

            <tr>

                <td>${company.company_name}</td>

                <td>${company.role_name}</td>

                <td>
                    <span class="package-badge">
                        ${company.package} LPA
                    </span>
                </td>

                <td>${company.eligibility_cgpa} CGPA</td>

                <td>
                    <span class="status-open">
                        Open
                    </span>
                </td>

                <td>

                    <button class="action-btn edit-btn">
                        Edit
                    </button>

                    <button class="action-btn delete-btn">
                        Delete
                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(error) {

        console.log("Error fetching companies:", error);

    }

}

fetchCompanies();