export function structureEmployees (employees) {
  const employeesArray = employees.map((employee) => `

  <div class="employee-card">
    <p class="employee-card-id">${employee.employ_id}</p>
    <p class="employee-card-name">${employee.employ_alias}</p>
    <p class="employee-card-entry"><img src="../svg/edit-icon.svg" class="edit-icon"></p>
  </div>
`);
  const employeesHtml = employeesArray.join('');
  return employeesHtml;
}
