
const API_URL = 'http://localhost:3000';

export async function loginUser(email, password) {
  const response = await fetch(
    `${API_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );

  if (!response.ok) {
    throw new Error('Unable to connect to server');
  }

  const users = await response.json();

  if (users.length === 0) {
    throw new Error('Invalid email or password');
  }

  return users[0];
}

export async function getEmployees() {
  const response = await fetch(`${API_URL}/employees`);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return await response.json();
}
export async function createEmployee(employee) {
  const response = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }

  return response.json();
}
// Get one employee
export async function getEmployeeById(id) {
  const response = await fetch(`${API_URL}/employees/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch employee");
  }

  return response.json();
}

// Update employee
export async function updateEmployee(id, employee) {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }

  return response.json();
}

// Delete employee
export async function deleteEmployee(id) {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
}