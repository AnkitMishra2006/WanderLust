(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  // Enhanced search functionality
  const searchInput = document.querySelector('input[name="search"]');
  if (searchInput) {
    // Popular search suggestions (limited to most popular ones)
    const suggestions = [
      "New York",
      "Greece",
      "Italy",
      "Japan",
      "Switzerland",
      "United States",
      "beachfront",
      "luxury",
      "cabin",
      "villa",
    ];

    // Add search suggestions on focus
    searchInput.addEventListener("focus", function () {
      this.setAttribute("list", "search-suggestions");

      // Create datalist if it doesn't exist
      let datalist = document.getElementById("search-suggestions");
      if (!datalist) {
        datalist = document.createElement("datalist");
        datalist.id = "search-suggestions";
        suggestions.forEach((suggestion) => {
          const option = document.createElement("option");
          option.value = suggestion;
          datalist.appendChild(option);
        });
        document.body.appendChild(datalist);
      }
    });

    // Add search on Enter key
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const form = this.closest("form");
        if (form) {
          form.submit();
        }
      }
    });
  }

  // Add smooth scrolling for pagination links
  const paginationLinks = document.querySelectorAll(".pagination a");
  paginationLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Let the navigation happen, then scroll to top
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    });
  });
})();
