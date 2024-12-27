let subjectCount = 1; 

        function addSubject() {
            subjectCount++;
            const subjectsContainer = document.getElementById('subjects-container');
            const subjectDiv = document.createElement('div');
            subjectDiv.className = 'subject';

            subjectDiv.innerHTML = `
                <label>Subject ${subjectCount} Grade:</label> 
                <select class="grade" required>
                    <option value="10">A+</option>
                    <option value="9">A</option>
                    <option value="8">B+</option>
                    <option value="7">B</option>
                    <option value="6">C+</option>
                    <option value="5">C</option>
                    <option value="4">D</option>
                </select>
                <label>Credits:</label>
                <input type="number" class="credit" step="1" min="1" required>
                <button type="button" class="remove-subject">Remove</button> 
            `;

            subjectsContainer.appendChild(subjectDiv);
            subjectDiv.querySelector('.grade').focus(); 
        }

        function removeSubject(event) {
            const subjectDiv = event.target.parentNode;
            subjectDiv.remove();

            const subjects = document.querySelectorAll('.subject');
            subjects.forEach((subject, index) => {
                subject.querySelector('label').textContent = `Subject ${index + 1} Grade:`;
            });
            subjectCount = subjects.length; 
        }

        document.getElementById('subjects-container').addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-subject')) {
                removeSubject(event);
            }
        });

        function calculateCGPA() {
            const grades = document.querySelectorAll('.grade');
            const credits = document.querySelectorAll('.credit');
          
            let totalGradePoints = 0;
            let totalCredits = 0;
          
            for (let i = 0; i < grades.length; i++) {
              const gradePoint = parseFloat(grades[i].value);
              const credit = parseFloat(credits[i].value);
          
              if (isNaN(gradePoint) || isNaN(credit)) {
                alert('Please enter valid grades and credits.');
                return;
              }
          
              const subjectGradePoints = gradePoint * credit;
              totalGradePoints += subjectGradePoints;
              totalCredits += credit;
            }
          
            if (totalCredits === 0) {
              alert('Please enter at least one subject with credits.');
              return;
            }
          
            const cgpa = totalGradePoints / totalCredits;
            document.getElementById('result').textContent = `Your CGPA is: ${cgpa}`;
          }

        document.getElementById('add-subject').addEventListener('click', addSubject);
        document.getElementById('cgpa-form').addEventListener('submit', function(event) {
            event.preventDefault();
            calculateCGPA();
        });