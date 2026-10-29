
const SUPABASE_URL = "https://vbkaitbgnycgpcokwctq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Fs10aI-cp8RGSBUEUI8peQ_v1DL8LPo";

// Connect to Supabase
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");
const submitButton = document.getElementById("submit-btn");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (
        !name || !email || !subject || !message ||
        name.length > 100 ||
        email.length > 254 ||
        subject.length > 200 ||
        message.length > 5000
    ) {
        statusMessage.textContent =
            "Please check your details and try again.";
        return;
    }

    submitButton.disabled = true;
    statusMessage.textContent = "Sending your message...";

    try {
        const { error } = await supabaseClient
            .from("contact_messages")
            .insert([
                {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                }
            ]);

        if (error) {
            throw error;
        }

        statusMessage.textContent =
            "Your message has been sent successfully!";

        form.reset();

    } catch (error) {
        console.error("Contact form error:", error);

        statusMessage.textContent =
            "Sorry, your message could not be sent. Please try again.";
    } finally {
        submitButton.disabled = false;
    }
});
