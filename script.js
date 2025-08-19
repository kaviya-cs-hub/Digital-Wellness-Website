
      

        // This part handles the form stuff 
        document.addEventListener('DOMContentLoaded', function() {
            var form = document.getElementById('pledgeForm');
            var pledgeTextarea = document.getElementById('pledge');
            var charCount = document.getElementById('charCount');
            
            // Count characters as user types (pretty cool feature!)
            pledgeTextarea.addEventListener('input', function() {
                var count = this.value.length;
                charCount.textContent = count;
                
                // Change color based on how many characters - red means almost full
                if (count > 450) {
                    charCount.style.color = '#dc3545'; // red
                } else if (count > 350) {
                    charCount.style.color = '#fd7e14'; // orange
                } else {
                    charCount.style.color = '#6c757d'; // gray
                }
            });
            
            // Check if fields are filled correctly as user types
            var inputs = form.querySelectorAll('input, select, textarea');
            for(var i = 0; i < inputs.length; i++) {
                inputs[i].addEventListener('blur', validateField);
                inputs[i].addEventListener('input', validateField);
            }
            
            function validateField(e) {
                var field = e.target;
                var isValid = field.checkValidity();
                
                // Make sure pledge has at least 20 characters (assignment requirement)
                if (field.id === 'pledge' && field.value.length < 20 && field.value.length > 0) {
                    field.setCustomValidity('Please write at least 20 characters');
                } else if (field.id === 'pledge') {
                    field.setCustomValidity('');
                }
                
                // Show green or red border based on if it's correct
                if (field.value.length > 0) {
                    if (isValid && (field.id !== 'pledge' || field.value.length >= 20)) {
                        field.classList.remove('is-invalid');
                        field.classList.add('is-valid'); // green border
                    } else {
                        field.classList.remove('is-valid');
                        field.classList.add('is-invalid'); // red border
                    }
                } else {
                    // No border if empty
                    field.classList.remove('is-valid', 'is-invalid');
                }
            }
            
            // When user clicks submit button
            form.addEventListener('submit', function(e) {
                e.preventDefault(); // stop normal form submission
                
                // Check if everything is filled out correctly
                var isFormValid = true;
                for(var i = 0; i < inputs.length; i++) {
                    if (!inputs[i].checkValidity() || (inputs[i].id === 'pledge' && inputs[i].value.length < 20)) {
                        isFormValid = false;
                        inputs[i].classList.add('is-invalid');
                    }
                }
                
                // Make sure they picked a device (radio buttons are tricky!)
                var deviceRadios = document.querySelectorAll('input[name="device"]');
                var deviceSelected = false;
                for(var j = 0; j < deviceRadios.length; j++) {
                    if(deviceRadios[j].checked) {
                        deviceSelected = true;
                        break;
                    }
                }
                if (!deviceSelected) {
                    isFormValid = false;
                }
                
                if (isFormValid) {
                    // Show loading spinner (looks professional!)
                    var submitBtn = form.querySelector('button[type="submit"]');
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
                    submitBtn.disabled = true;
                    
                    // Wait a bit then show success message (makes it feel real)
                    setTimeout(function() {
                        var formContainer = document.querySelector('.form-container');
                        formContainer.innerHTML = 
                            '<div class="text-center py-5" style="animation: bounceIn 0.8s ease-out;">' +
                                '<i class="fas fa-check-circle" style="font-size: 4rem; color: #198754; margin-bottom: 1rem;"></i>' +
                                '<h3 class="text-success">Pledge Submitted Successfully!</h3>' +
                                '<p class="lead">Thank you for committing to digital wellness and cyber safety.</p>' +
                                '<button class="btn btn-primary" onclick="location.reload()">Submit Another Pledge</button>' +
                            '</div>';
                    }, 1500);
                } else {
                    // Show error message if something is wrong
                    var existingError = form.querySelector('.alert-danger');
                    if (existingError) {
                        existingError.remove(); // remove old error first
                    }
                    
                    var errorDiv = document.createElement('div');
                    errorDiv.className = 'alert alert-danger mt-3';
                    errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Please fix the errors above and try again.';
                    form.appendChild(errorDiv);
                    
                    // Auto-remove error after 5 seconds
                    setTimeout(function() {
                        if(errorDiv.parentNode) {
                            errorDiv.remove();
                        }
                    }, 5000);
                }
            });
        });

        // Make the carousel auto-slide every 5 seconds
        document.addEventListener('DOMContentLoaded', function() {
            var carousel = new bootstrap.Carousel(document.getElementById('safetyCarousel'), {
                interval: 5000, // 5 seconds
                wrap: true 
            });
        });

        // Quiz questions and answers //content for the quiz 
        var quizData = [
            {
                question: "What makes a password strong and secure?",
                options: [
                    "Using your birthday and name",
                    "A mix of letters, numbers, and symbols with at least 8 characters",
                    "Using the same password for all accounts",
                    "Writing it down on a sticky note"
                ],
                correct: 1,
                explanation: "Strong passwords should be at least 8 characters long and include a mix of uppercase letters, lowercase letters, numbers, and symbols!"
            },
            {
                question: "What should you do if you receive a suspicious email asking for personal information?",
                options: [
                    "Reply immediately with your details",
                    "Click all the links to verify it's real",
                    "Delete it and report it as spam/phishing",
                    "Forward it to all your friends"
                ],
                correct: 2,
                explanation: "Never give personal information via email! Legitimate companies won't ask for sensitive data through email. Always delete and report suspicious emails."
            },
            {
                question: "Which of these is the safest way to use public Wi-Fi?",
                options: [
                    "Connect to any open network available",
                    "Avoid accessing sensitive accounts and use HTTPS websites",
                    "Share your personal hotspot password with strangers",
                    "Download files from unknown sources"
                ],
                correct: 1,
                explanation: "Public Wi-Fi can be risky! Avoid banking or accessing sensitive accounts, and always look for HTTPS (the lock icon) when browsing."
            },
            {
                question: "What is two-factor authentication (2FA)?",
                options: [
                    "Using two different passwords",
                    "Having two email accounts",
                    "An extra security step that requires a second form of verification",
                    "Logging in twice to the same account"
                ],
                correct: 2,
                explanation: "2FA adds an extra layer of security by requiring something you know (password) AND something you have (like your phone for a text code)."
            },
            {
                question: "How often should you update your privacy settings on social media?",
                options: [
                    "Never, they're fine as default",
                    "Only when you remember",
                    "Regularly, at least every few months",
                    "Only after something bad happens"
                ],
                correct: 2,
                explanation: "Social media platforms often update their privacy policies and settings. Regular reviews help ensure your personal information stays protected!"
            },
            {
                question: "How are you",
                options: [
                    "Never, they're fine as default",
                    "Only when you remember",
                    "Regularly, at least every few months",
                    "Only after something bad happens"
                ],
                correct: 3,
                explanation: "Social media platforms often update their privacy policies and settings. Regular reviews help ensure your personal information stays protected!"
            }
            
        ];

        var currentQuestion = 0; // which question we're on
        var score = 0; // how many correct answers
        var selectedAnswer = null; // the option put itnull till they select

        function initializeQuiz() {
            // Reset everything to start over
            currentQuestion = 0;
            score = 0;
            selectedAnswer = null;
            document.getElementById('quiz-question').classList.remove('hidden');
            document.getElementById('quiz-results').classList.add('hidden');
            // when u restatrt
            document.getElementById('submit-answer').classList.remove('hidden');
            loadQuestion();
        }

        function loadQuestion() {
            var question = quizData[currentQuestion];// extract the obj from the array
            document.getElementById('question-text').textContent = question.question;
            document.getElementById('current-question').textContent = currentQuestion + 1;  // we plus +1 cuz we started with 0
            document.getElementById('total-questions').textContent = quizData.length;
            
            // Clear old options and add new ones
            var optionsContainer = document.getElementById('quiz-options');
            optionsContainer.innerHTML = '';
            
            for(var i = 0; i < question.options.length; i++) {
                var optionDiv = document.createElement('div');
                optionDiv.className = 'quiz-option';
                optionDiv.textContent = question.options[i];
                optionDiv.onclick = function(index) {
                    return function() { selectOption(index, this); };
                }(i); // this closure thing was confusing but it works!
                optionsContainer.appendChild(optionDiv);
            }
            
            // Reset buttons and feedback
            document.getElementById('submit-answer').disabled = true; //we make sure that the submit is not unsed unitl we slect an option
            document.getElementById('next-question').classList.add('hidden');
            document.getElementById('quiz-feedback').innerHTML = ''; // clears the feedback area
            
            //*** */ Update the progress bar
            var progress = (currentQuestion / quizData.length) * 100;
            document.getElementById('progress-bar').style.width = progress + '%';
        }

        function selectOption(index, element) {
            // Remove previous selections
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Select current option
            element.classList.add('selected');
            selectedAnswer = index;
            document.getElementById('submit-answer').disabled = false;
        }

        function submitAnswer() {
            const question = quizData[currentQuestion];
            const isCorrect = selectedAnswer === question.correct;
            
            if (isCorrect) {
                score++;
            }
            
            // Show correct/incorrect styling
            document.querySelectorAll('.quiz-option').forEach((opt, index) => {
                if (index === question.correct) {
                    opt.classList.add('correct');
                } else if (index === selectedAnswer && !isCorrect) {
                    opt.classList.add('incorrect');
                }
                opt.onclick = null; // Disable clicking
            });
            
            // Show feedback
            const feedback = document.getElementById('quiz-feedback');
            feedback.innerHTML = `
                <div class="quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}">
                    <strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong><br>
                    ${question.explanation}
                </div>
            `;
            
            document.getElementById('submit-answer').classList.add('hidden');
            
            if (currentQuestion < quizData.length - 1) {
                document.getElementById('next-question').classList.remove('hidden');
            } else {
                setTimeout(showResults, 1500);
            }
        }

        function nextQuestion() {
            currentQuestion++;
            selectedAnswer = null;
            document.getElementById('submit-answer').classList.remove('hidden');
            loadQuestion();
        }

        function showResults() {
            document.getElementById('quiz-question').classList.add('hidden');
            document.getElementById('quiz-results').classList.remove('hidden');
            
            const percentage = Math.round((score / quizData.length) * 100);
            let message, className;
            
            if (percentage >= 80) {
                message = "Excellent! You're a cyber safety expert! 🎉";
                className = "score-excellent";
            } else if (percentage >= 60) {
                message = "Good job! You know the basics, but keep learning! 👍";
                className = "score-good";
            } else {
                message = "Keep studying! Cyber safety is important for everyone. 📚";
                className = "score-needs-improvement";
            }
            
            document.getElementById('final-score').innerHTML = `
                <div class="${className}">
                    <h2>${score}/${quizData.length}</h2>
                    <p class="lead">${percentage}% Correct</p>
                    <p>${message}</p>
                </div>
            `;
            
            // Complete progress bar
            document.getElementById('progress-bar').style.width = '100%';
        }

        // Cool cyber safety facts 
        var cyberFacts = [
            "Over 4.1 billion records were exposed in data breaches in the first half of 2019 alone. That's why practicing good cyber hygiene is essential for everyone!",
            "A new malware sample is created every 4.2 seconds! Cybercriminals are constantly developing new ways to attack systems.",
            "95% of successful cyber attacks are due to human error. This shows how important cybersecurity education really is!",
            "The average cost of a data breach in 2023 was $4.45 million globally. Prevention is definitely better than cure!",
            "Phishing attacks account for 90% of all breaches. Always double-check those suspicious emails!",
            "It takes an average of 277 days to identify and contain a data breach. Early detection is crucial!",
            "Cybercrime damages are predicted to cost the world $10.5 trillion annually by 2025. It's truly a global challenge!",
            "Only 38% of global organizations claim they are prepared to handle a sophisticated cyber attack. We all need to do better!",
            "The most common passwords are still '123456' and 'password'. Time to get creative with those passwords!",
            "Ransomware attacks occur every 11 seconds globally. That's faster than you can read this sentence!"
        ];

        var currentFactIndex = 0; // keep track of which fact we're showing

        function showNextFact() {
            currentFactIndex = (currentFactIndex + 1) % cyberFacts.length;
            
            var factElement = document.getElementById('cyber-fact');
            var counterElement = document.getElementById('fact-counter');
            var totalElement = document.getElementById('total-facts');
            
            // Fade out the old fact
            factElement.style.opacity = '0';
            factElement.style.transform = 'translateY(10px)';
            
            // Wait a bit then show new fact with fade in
            setTimeout(function() {
                factElement.textContent = cyberFacts[currentFactIndex];
                counterElement.textContent = currentFactIndex + 1;
                totalElement.textContent = cyberFacts.length;
                
                factElement.style.opacity = '1';
                factElement.style.transform = 'translateY(0)';
            }, 200); //200ms
        }

        // Set up all the click handlers when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Quiz button handlers
            document.getElementById('submit-answer').onclick = submitAnswer;
            document.getElementById('next-question').onclick = nextQuestion;
            document.getElementById('restart-quiz').onclick = initializeQuiz;
            
            // Set up the fact counter display
            document.getElementById('total-facts').textContent = cyberFacts.length;
            
            // Make the fact transitions smooth
            var factElement = document.getElementById('cyber-fact');
            factElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            // Start the quiz
            initializeQuiz();
        });
      

