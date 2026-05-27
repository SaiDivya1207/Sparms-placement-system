from flask import Flask, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask import request
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

# MYSQL CONFIGURATION

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1206'
app.config['MYSQL_DB'] = 'placement_system'

mysql = MySQL(app)

# HOME ROUTE

@app.route('/')

def home():
    return "SPARMS Backend Running"

# GET STUDENTS API

@app.route('/students', methods=['GET'])

def get_students():

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM students")

    data = cur.fetchall()

    students = []

    for row in data:

        students.append({

            "student_id": row[0],
            "name": row[1],
            "branch": row[2],
            "cgpa": float(row[3]),
            "skills": row[4],
            "email": row[5],
            "phone": row[6]

        })

    cur.close()

    return jsonify(students)
# ADD STUDENT API

@app.route('/students', methods=['POST'])

def add_student():

    data = request.get_json()

    name = data['name']
    branch = data['branch']
    cgpa = data['cgpa']
    skills = data['skills']
    email = data['email']
    phone = data['phone']

    cur = mysql.connection.cursor()

    cur.execute("""

    INSERT INTO students
    (name, branch, cgpa, skills, email, phone)

    VALUES (%s,%s,%s,%s,%s,%s)

    """,

    (name, branch, cgpa, skills, email, phone)

    )

    mysql.connection.commit()

    cur.close()

    return jsonify({

        "message": "Student Added Successfully"

    })
# GET COMPANIES API

@app.route('/companies', methods=['GET'])

def get_companies():

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM companies")

    data = cur.fetchall()

    companies = []

    for row in data:

        companies.append({

            "company_id": row[0],
            "company_name": row[1],
            "role_name": row[2],
            "package": float(row[3]),
            "eligibility_cgpa": float(row[4])

        })

    cur.close()

    return jsonify(companies)

# GET APPLICATIONS API

@app.route('/applications', methods=['GET'])

def get_applications():

    cur = mysql.connection.cursor()

    cur.execute("""

    SELECT
    s.name,
    c.company_name,
    a.status,
    a.round_name

    FROM applications a

    JOIN students s
    ON a.student_id = s.student_id

    JOIN companies c
    ON a.company_id = c.company_id

    """)

    data = cur.fetchall()

    applications = []

    for row in data:

        applications.append({

            "student_name": row[0],
            "company_name": row[1],
            "status": row[2],
            "round_name": row[3]

        })

    cur.close()

    return jsonify(applications)
# ANALYTICS API

@app.route('/analytics', methods=['GET'])

def analytics():

    cur = mysql.connection.cursor()

    # Total Students
    cur.execute("SELECT COUNT(*) FROM students")
    total_students = cur.fetchone()[0]

    # Total Companies
    cur.execute("SELECT COUNT(*) FROM companies")
    total_companies = cur.fetchone()[0]

    # Total Applications
    cur.execute("SELECT COUNT(*) FROM applications")
    total_applications = cur.fetchone()[0]

    # Selected Students
    cur.execute("""

    SELECT COUNT(*)

    FROM applications

    WHERE status = 'Selected'

    """)

    selected_students = cur.fetchone()[0]

    # Placement Percentage

    placement_percentage = 0

    if total_students > 0:

        placement_percentage = (
        selected_students / total_students
    ) * 100

    else:

        placement_percentage = 0

    analytics_data = {

        "total_students": total_students,

        "total_companies": total_companies,

        "total_applications": total_applications,

        "selected_students": selected_students,

        "placement_percentage":
        round(placement_percentage, 2)

    }

    cur.close()

    return jsonify(analytics_data)
# DELETE STUDENT API

@app.route('/students/<int:id>', methods=['DELETE'])

def delete_student(id):

    cur = mysql.connection.cursor()

    cur.execute("""

    DELETE FROM students

    WHERE student_id = %s

    """, (id,))

    mysql.connection.commit()

    cur.close()

    return jsonify({

        "message": "Student Deleted Successfully"

    })
# UPDATE STUDENT API

@app.route('/students/<int:id>', methods=['PUT'])

def update_student(id):

    data = request.get_json()

    name = data['name']
    branch = data['branch']
    cgpa = data['cgpa']
    skills = data['skills']
    email = data['email']
    phone = data['phone']

    cur = mysql.connection.cursor()

    cur.execute("""

    UPDATE students

    SET
    name=%s,
    branch=%s,
    cgpa=%s,
    skills=%s,
    email=%s,
    phone=%s

    WHERE student_id=%s

    """,

    (name, branch, cgpa,
     skills, email, phone, id)

    )

    mysql.connection.commit()

    cur.close()

    return jsonify({

        "message": "Student Updated Successfully"

    })
import os

if __name__ == '__main__':

    port = int(os.environ.get("PORT", 5000))

    app.run(host='0.0.0.0', port=port)