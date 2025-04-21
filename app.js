let subjectCount = 0;

function createSubjectField(index) {
  return `
    <div class="subject">
      <input type="text" class="subject-name" placeholder="Subject Name" data-tooltip="Enter subject name (optional)" />

      <select class="grade" data-tooltip="Select grade received (A+, A, B+, etc.)">
        <option value="10">A+</option>
        <option value="9">A</option>
        <option value="8">B+</option>
        <option value="7">B</option>
        <option value="6">C+</option>
        <option value="5">C</option>
        <option value="4">D</option>
      </select>

      <input type="number" class="credit" min="1" placeholder="Credits" required data-tooltip="Enter credit value for the subject" />

      <button type="button" class="remove-subject" data-tooltip="Remove this subject">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
}


function addSubject() {
  subjectCount++;
  const container = document.getElementById('subjects-container');
  container.insertAdjacentHTML('beforeend', createSubjectField(subjectCount));
}

function removeSubject(event) {
  if (event.target.classList.contains('remove-subject')) {
    event.target.parentElement.remove();
  }
}

function calculateSGPA() {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'flex'; // Show spinner

  setTimeout(() => {
    const grades = document.querySelectorAll('.grade');
    const credits = document.querySelectorAll('.credit');

    let totalGradePoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < grades.length; i++) {
      const grade = parseFloat(grades[i].value);
      const credit = parseFloat(credits[i].value);

      if (isNaN(grade) || isNaN(credit)) {
        alert("Please fill all fields correctly.");
        spinner.style.display = 'none';
        return;
      }

      totalGradePoints += grade * credit;
      totalCredits += credit;
    }

    if (totalCredits === 0) {
      alert("Please add at least one subject.");
      spinner.style.display = 'none';
      return;
    }

    const sgpa = (totalGradePoints / totalCredits).toFixed(2);

    // Animate SGPA number
    let currentSGPA = 0;
    const resultElement = document.getElementById('result');
    const targetSGPA = parseFloat(sgpa);

    const animateSGPA = () => {
      if (currentSGPA < targetSGPA) {
        currentSGPA += 0.01; // Increase the SGPA by a small increment
        resultElement.textContent = `🎓 Your SGPA is: ${currentSGPA.toFixed(2)}`;
        setTimeout(animateSGPA, 5); // Repeat the animation
      } else {
        resultElement.textContent = `🎓 Your SGPA is: ${sgpa}`; // Ensure final value is set correctly
      }
    };

    animateSGPA(); // Start the animation

    spinner.style.display = 'none'; // Hide spinner after calculation
  }, 1000); // simulate loading delay
}


// Event Listeners
document.getElementById('add-subject').addEventListener('click', addSubject);
document.getElementById('subjects-container').addEventListener('click', removeSubject);
document.getElementById('sgpa-form').addEventListener('submit', function(e) {
  e.preventDefault();
  calculateSGPA();
});

document.getElementById('year').textContent = new Date().getFullYear();
window.onload = addSubject;

// Modal Functionality
const modal = document.getElementById('info-modal');
const closeModal = document.getElementById('close-modal');

// Display the modal when the page loads
window.onload = function() {
  modal.style.display = "block";
};

// Close the modal when the user clicks the close button
closeModal.onclick = function() {
  modal.style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Dark Mode Toggle + Icon Change
const toggle = document.getElementById('dark-toggle');
const body = document.body;
const moonIcon = document.querySelector('.dark-mode-toggle .fa-moon');
const sunIcon = document.querySelector('.dark-mode-toggle .fa-sun');

// Check local storage on load
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggle.checked = true;
    sunIcon.style.display = 'inline-block'; // Show sun
    moonIcon.style.display = 'none'; // Hide moon
  } else {
    moonIcon.style.display = 'inline-block'; // Show moon
    sunIcon.style.display = 'none'; // Hide sun
  }
});

// Toggle dark mode and icon
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    sunIcon.style.display = 'inline-block'; // Show sun
    moonIcon.style.display = 'none'; // Hide moon
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    moonIcon.style.display = 'inline-block'; // Show moon
    sunIcon.style.display = 'none'; // Hide sun
  }
});
