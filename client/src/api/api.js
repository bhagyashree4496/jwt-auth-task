export const SignUpApi = async (formData) => {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null); // Handle potential JSON parsing error
    throw new Error(
      errorData?.message || `HTTP error! Status: ${response.status}`
    );
  }

  return await response.json();
};
export const LogInApi = async (formdata) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formdata),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null); // Handle potential JSON parsing error
    throw new Error(
      errorData?.message || `HTTP error! Status: ${response.status}`
    );
  }
  return await response.json();
};
export const GetUserApi = async () => {
  const response = await fetch("http://localhost:5000/api/auth/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `HTTP error! Status: ${response.status}`
    );
  }
  return await response.json();
};
