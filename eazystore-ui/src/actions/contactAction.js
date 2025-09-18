export async function contactAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};

  if (!data.name || data.name.length < 5) {
    errors.name = "Name must be at least 5 characters.";
  }

  if (!data.email || !data.email.includes("@")) {
    errors.email = "Email is invalid.";
  }

  if (!data.mobileNumber || !/^\d{10}$/.test(data.mobileNumber)) {
    errors.mobileNumber = "Mobile number must be exactly 10 digits.";
  }

  if (!data.message || data.message.length < 5) {
    errors.message = "Message must be at least 5 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // 模拟提交成功
  console.log("Contact form submitted:", data);

  return { success: true };
}