document.addEventListener('DOMContentLoaded', () => {
    const courseTableBody = document.getElementById('courses-table');
    const addCourseForm = document.getElementById('add-course');

    // Fetch courses from the server
    fetch('http://localhost:3000/courses')
    .then(response => response.json())
    .then(courses => {
        courses.forEach(course => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${course.kurskod}</td>
                <td>${course.kursnamn}</td>
                <td><a href="${course.kursplan}" target="_blank">Länk</a></td>
                <td>${course.progression}</td>
                <td>${course.termin}</td>
                <td><input type="checkbox" class="checkbox" data-course-id="${course.id}"></td>
            `;
            courseTableBody.appendChild(tableRow);
        });

            // Listen for changes in checkboxes and call deleteCourse if needed
            const checkboxes = document.querySelectorAll('.checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        const courseId = checkbox.getAttribute('data-course-id');
                        deleteCourse(courseId);
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching courses:', error));

    // Function for deleting a course
    function deleteCourse(courseId) {
        // Call the server to delete the course with the specified courseId
        fetch(`http://localhost:3000/courses/${courseId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting course');
            }
            return response.json();
        })
        .then(data => {
            // Reload the page
            location.reload();
        })
        .catch(error => console.error('Error deleting course:', error));
    }

    // Listen for form submission
    addCourseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(addCourseForm);
        const courseData = {};
        formData.forEach((value, key) => {
            courseData[key] = value;
        });

        // Add the new course to the table
        fetch('http://localhost:3000/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
        })
        .then(response => response.json())
        .then(newCourse => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${newCourse.kurskod}</td>
                <td>${newCourse.kursnamn}</td>
                <td><a href="${newCourse.kursplan}" target="_blank">Länk</a></td>
                <td>${newCourse.progression}</td>
                <td>${newCourse.termin}</td>
                <td><input type="checkbox" class="checkbox" data-course-id="${newCourse._id}"></td>
            `;
            courseTableBody.appendChild(tableRow);

            // Clear the form
            addCourseForm.reset();
        })
        .catch(error => console.error('Error adding course:', error));
    });
});
