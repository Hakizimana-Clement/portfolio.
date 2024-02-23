console.log("table working");
document.addEventListener("DOMContentLoaded", function () {
  // This code runs when the DOM (Document Object Model) has been fully loaded and parsed.

  var table = document.getElementById("myTable");
  // This line retrieves a reference to the table element with the ID "myTable" from the DOM.

  var rows = table.getElementsByClassName("table-data");
  // This line retrieves all elements with the class "table-data" that are descendants of the table element.

  Array.prototype.forEach.call(rows, function (row) {
    // This line converts the HTMLCollection (retrieved by getElementsByClassName) into an array and then loops through each element in the array.

    row.addEventListener("click", function () {
      // This line adds a click event listener to each table row.

      var href = this.getAttribute("data-href");
      // This line retrieves the value of the "data-href" attribute of the clicked table row.

      if (href) {
        // This line checks if the "data-href" attribute has a value (i.e., if it's not null or empty).

        window.location.href = href;
        // This line changes the location of the current page to the URL specified in the "data-href" attribute, effectively navigating to that page.
      }
    });
  });
});
