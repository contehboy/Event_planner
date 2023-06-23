// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  let events = localStorage.getItem("events");
  if (events) {
    events = JSON.parse(events);
  } else {
    events = [];
  }
  console.log(dayjs().hour(9).minute(0).format());
  let timeBlocks = [];

  for (let i = 9; i <= 17; i++) {
    let time = dayjs().hour(i).minute(0).format("MMM-DD-YYYY-H");
    timeBlocks.push(time);
    let hour = i <= 12 ? i : i - 12;
    hour += hour <= 11 ? "AM" : "PM";
    let event = events.findLast((event) => {
      console.log(event.time, time);
      if (event.time == time) return true;
    });
    let status = null;
    if (dayjs().isBefore(dayjs().hour(i).minute(0))) {
      status = "future";
    } else if (dayjs().isAfter(dayjs().hour(i).minute(0))) {
      status = "past";
    } else {
      status = "present";
    }
    console.log(dayjs().isBefore(dayjs().hour(i).minute(0)));
    let timeBlock = `
      <div id="${time}" class="row time-block ${status}">
        <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
        <textarea class="col-8 col-md-10 description" rows="3">${
          event ? event.name : ""
        }</textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `;
    $(".time-container").append(timeBlock);
  }

  $(".saveBtn").each(function () {
    $(this).click(function () {
      console.log($(this).prev().val());
      console.log($(this).parent().attr("id"));
      let events = localStorage.getItem("events");
      if (events) {
        events = JSON.parse(events);
        events.push({
          time: $(this).parent().attr("id"),
          name: $(this).prev().val(),
        });
        localStorage.setItem("events", JSON.stringify(events));
      } else {
        events = [];
        events.push({
          time: $(this).parent().attr("id"),
          name: $(this).prev().val(),
        });
        localStorage.setItem("events", JSON.stringify(events));
      }
    });
  });

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
