const apiUrl =
  "http://flaskapp-env.eba-y6y2pqxn.us-east-1.elasticbeanstalk.com/";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("projectForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const projectType = document.getElementById("project-type").value;
      const message = document.getElementById("message").value;

      if (name && email && projectType && message) {
        const formData = new FormData(this);

        fetch(`${apiUrl}/form`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert(
                "Thank you for your inquiry! We will get back to you soon."
              );
              form.reset();
            } else {
              alert(
                "Thank you for your inquiry! Jerome will get back to you soon: " +
                  data.message
              );
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
          });
      } else {
        alert("Please fill out all fields.");
      }
    });
  }
});
