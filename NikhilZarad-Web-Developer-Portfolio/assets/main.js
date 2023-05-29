/*=============== SHOW MENU ===============*/

/*=============== REMOVE MENU MOBILE ===============*/

/*=============== SWIPER PROJECTS ===============*/

/*=============== SWIPER TESTIMONIAL ===============*/

/*=============== EMAIL JS ===============*/
// Initialize EmailJS with your service ID
// emailjs.init("QDP345ono7NpH-gvi");

// Function to send the email
function sendEmail() {
  // Get form values
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  // Set email parameters
  var params = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
  };

  // Send the email
  emailjs
    .send("service_ap9umr5", "template_1cqn2mj", params)
    .then(function (response) {
      alert("Email sent successfully!");
      // Optionally, clear the form fields
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
    })
    .catch(function (error) {
      alert("Failed to send email. Please try again later.");
      console.log(error);
    });
}

// Add event listener to the form submit event
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting
    sendEmail(); // Call the sendEmail function
  });

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

/*=============== SHOW SCROLL UP ===============*/

/*=============== DARK LIGHT THEME ===============*/

/*=============== CHANGE BACKGROUND HEADER ===============*/

/*=============== SCROLL REVEAL ANIMATION ===============*/
