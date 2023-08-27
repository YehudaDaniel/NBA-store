document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("personal-details-form");
    const submitButton = document.querySelector("#personal-details-form button[type='submit']");

    form.addEventListener("input", function() {
        if (areAllFieldsFilled()) {
            submitButton.removeAttribute("disabled");
        } else {
            submitButton.setAttribute("disabled", "true");
        }
    });

    function areAllFieldsFilled() {
        const requiredFields = form.querySelectorAll("[required]");
        for (const field of requiredFields) {
            if (!field.value) {
                return false;
            }
        }
        return true;
    }
});