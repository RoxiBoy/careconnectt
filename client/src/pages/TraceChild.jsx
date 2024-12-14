import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TraceChild = () => {
  const [childData, setChildData] = useState({});
  const [formData, setFormData] = useState({
    phoneNo: window.localStorage.getItem('phone'),
    name: "",
    dateOfBirth: "",
    gender: "",
    parentName: "",
    birthWeight: "",
    healthStatus: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create Infant
      const response = await fetch("http://localhost:3000/api/infant/createInfant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to create infant");

      console.log("Infant created successfully:", result);
      setChildData(result);

      // Step 2: Get user email
      const email = window.localStorage.getItem("email");
      if (!email) throw new Error("User email not found in local storage");

      // Step 3: Link child to user
      const updateUserResponse = await fetch("http://localhost:3000/api/user/addchild", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, childId: result.data._id }),
      });

      const updateUserData = await updateUserResponse.json();
      if (!updateUserResponse.ok)
        throw new Error(updateUserData.message || "Failed to link child to user");

      console.log("User updated successfully:", updateUserData);

      // Navigate to Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during process:", error.message || error);
      alert(error.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-indigo-900">Trace Child Information</h2>
        <p className="text-center text-gray-600 mb-6">
          Please fill in the details to trace a child
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "dateOfBirth", label: "Date of Birth", type: "date" },
              { id: "parentName", label: "Parent Name", type: "text" },
              {
                id: "birthWeight",
                label: "Birth Weight (kg)",
                type: "number",
                step: "0.01",
                min: "0",
              },
            ].map(({ id, label, ...props }) => (
              <div key={id} className="space-y-2">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  {...props}
                />
              </div>
            ))}

            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="healthStatus" className="block text-sm font-medium text-gray-700">
                Health Status
              </label>
              <select
                id="healthStatus"
                name="healthStatus"
                value={formData.healthStatus}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select health status</option>
                <option value="Healthy">Healthy</option>
                <option value="Critical">Critical</option>
                <option value="Needs_attention">Needs Attention</option>
                <option value="Recovered">Recovered</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TraceChild;
