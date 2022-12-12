"use strict";

function getEl(selector) {
  return document.querySelector(selector);
}

const updateBtn = document.getElementById("update-day");

updateBtn.addEventListener("click", function () {
  const [sql, js, react, dsa, hackerRank, project] = [
    getEl("#sql").checked,
    getEl("#javascript").checked,
    getEl("#reactjs").checked,
    getEl("#dsa").checked,
    getEl("#hackerrank").checked,
    getEl("#project").checked,
  ];

  const currentDate = new Date();
  const [day, month, year] = [currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()];
  const date = `${day}/${month + 1}/${year}`;

  fetch("/update-day", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      sql,
      javaScript: js,
      reactJs: react,
      dsa,
      hackerRank,
      project,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch(() => console.error("Failed to update -> public/index.js"));
});
