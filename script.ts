document
  .getElementById("resumeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get references to form elements using their IDs
    const ProfilePictureInput = document.getElementById(
      "ProfilePicture"
    ) as HTMLInputElement;
    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");
    const phoneElement = document.getElementById("phone");
    const educationElement = document.getElementById("education");
    const experienceElement = document.getElementById("experience");
    const skillsElement = document.getElementById("skills");

    if (
    //   username &&
      ProfilePictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      experienceElement &&
      skillsElement
    ) {

        // get values from 
      const name = (nameElement as HTMLInputElement).value;
      const email = (emailElement as HTMLInputElement).value;
      const phone = (phoneElement as HTMLInputElement).value;
      const education = (educationElement as HTMLInputElement).value;
      const experience = (experienceElement as HTMLInputElement).value;
      const skills = (skillsElement as HTMLInputElement).value;


      // picture element
      const ProfilePictureFile = ProfilePictureInput.files?.[0];
      const ProfilePictureURL = ProfilePictureFile
        ? URL.createObjectURL(ProfilePictureFile)
        : "";

      // resume output
      const resumeOutput = `
        <h2>Resume</h2>
        ${
          ProfilePictureURL
            ? `<img src="${ProfilePictureURL}" alt="profile picture" class="profilepicture">`
            : ""
        }
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong>${email}</p>
        <p><strong>Phone Number:</strong>${phone}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Work Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
        `;
      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        resumeOutputElement.classList.remove("hidden");

        // create container for buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer)

        //Add Download PDF button

        const downloadButton = document.createElement("button");
        downloadButton.textContent =  "Download as PDF";
        downloadButton.addEventListener("click", () => {
            window.print();
        });
        buttonsContainer.appendChild(downloadButton)

        //Add Shareable Link button
        const shareLinkButton  = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click", async () => {
            try {
                // Create a unique shareable link (simulate it in this case)
                const shareableLink = `https://yourdomain.com/resumes/${name.replace(
                    /\s+/g,
                    "_"
                )}_cv.html`;
                //Use Clipboard API to copy the link to the shareable link
                await navigator.clipboard.writeText(shareableLink);
                alert("Shareable link copied to clipboard");
            } catch(err) {
                console.error("Failed to copy link: ", err)
                alert("Failed to copy link to clipboard. please try again");
            }
        });
        buttonsContainer.appendChild(shareLinkButton);
    }else {
        console.error("Resume output container not found")
    } 
}else {
    console.error("From elements are missing");
}

  });