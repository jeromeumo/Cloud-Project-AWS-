const apiUrl = "your_elastic_beanstalk_domain_link";

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
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data.success) {
              alert(
                "Thank you for your inquiry! We will get back to you soon."
              );
              form.reset();
            } else {
              alert("An error occurred: " + (data.message || "Unknown error"));
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(
              "Thank you for your inquiry! We will get back to you soon. However, there was an issue submitting your form. Please try again later."
            );
          });
      } else {
        alert("Please fill out all fields.");
      }
    });
  } else {
    console.error("Form element not found");
  }
});
