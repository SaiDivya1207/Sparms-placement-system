let editStudentId = null;


// FETCH STUDENTS

async function fetchStudents() {

    const response = await fetch(
        "http://127.0.0.1:5000/students"
    );

    const students = await response.json();

    const table =
    document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `

        <tr>

            <td>${student.name}</td>

            <td>${student.branch}</td>

            <td>${student.cgpa}</td>

            <td>

                <span class="skill-badge">
                    ${student.skills}
                </span>

            </td>

            <td>${student.email}</td>

            <td>

                <button
                class="btn btn-primary btn-sm"

                onclick="editStudent(
                    ${student.student_id},
                    '${student.name}',
                    '${student.branch}',
                    '${student.cgpa}',
                    '${student.skills}',
                    '${student.email}',
                    '${student.phone}'
                )">

                    Edit

                </button>

                <button
                class="btn btn-danger btn-sm"

                onclick="deleteStudent(
                    ${student.student_id}
                )">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

fetchStudents();


// EDIT STUDENT

function editStudent(
    id,
    name,
    branch,
    cgpa,
    skills,
    email,
    phone
) {

    editStudentId = id;

    document.getElementById("name").value = name;

    document.getElementById("branch").value = branch;

    document.getElementById("cgpa").value = cgpa;

    document.getElementById("skills").value = skills;

    document.getElementById("email").value = email;

    document.getElementById("phone").value = phone;

    const modal =
    new bootstrap.Modal(
        document.getElementById("studentModal")
    );

    modal.show();

}


// DELETE STUDENT

async function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete?"
    );

    if(confirmDelete) {

        try {

            const response = await fetch(

                `http://127.0.0.1:5000/students/${id}`,

                {

                    method: "DELETE"

                }

            );

            const result = await response.json();

            alert(result.message);

            fetchStudents();

        }

        catch(error) {

            console.log(
                "Delete Error:",
                error
            );

        }

    }

}


// FORM SUBMIT

const studentForm =
document.getElementById("studentForm");

studentForm.addEventListener(
"submit",

async (e) => {

    e.preventDefault();

    const studentData = {

        name:
        document.getElementById("name").value,

        branch:
        document.getElementById("branch").value,

        cgpa:
        document.getElementById("cgpa").value,

        skills:
        document.getElementById("skills").value,

        email:
        document.getElementById("email").value,

        phone:
        document.getElementById("phone").value

    };

    try {

        let url =
        "http://127.0.0.1:5000/students";

        let method = "POST";

        // UPDATE MODE

        if(editStudentId) {

            url =
            `http://127.0.0.1:5000/students/${editStudentId}`;

            method = "PUT";

        }

        const response = await fetch(url, {

            method: method,

            headers: {

                "Content-Type":
                "application/json"

            },

            body: JSON.stringify(studentData)

        });

        const result =
        await response.json();

        alert(result.message);

        fetchStudents();

        studentForm.reset();

        editStudentId = null;

    }

    catch(error) {

        console.log(
            "Error:",
            error
        );

    }

});