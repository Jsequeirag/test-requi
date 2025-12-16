import React, { useState, useEffect } from "react";
import RolesAdministrationStore from "../../../stores/RolesAdministrationStore";
import AsyncSelect from "../../components/AsyncComponents/AsyncSelect.jsx"; // Assuming this component exists
import TextButton from "../../components/Button/TextButton"; // Assuming TextButton accepts styling props like bgColor, textColor etc.
// You might need to import your API functions here for creating/updating roles
// import { createRole, updateRole } from "../../api/urls/roles";
import { useApiSend } from "../../api/config/customHooks"; // Assuming this hook manages API sending state

export default function SelectRole({ action, setModalOpen }) {
  // Added setModalOpen to close the modal
  // Global state from Zustand store
  const roleSelected = RolesAdministrationStore((state) => state.roleSelected);
  const setRoleSelected = RolesAdministrationStore(
    (state) => state.setRoleSelected
  ); // Assuming you have a setter for roleSelected

  // Local state for managing form input values
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    departmentId: null, // Initialize with null or appropriate default for your AsyncSelect
  });

  // Effect to populate form data when `roleSelected` changes (for 'Edit' action)
  useEffect(() => {
    if (action === "Edit" && roleSelected) {
      setFormData({
        name: roleSelected.name || "",
        description: roleSelected.description || "",
        departmentId: roleSelected.departmentId || null,
      });
    } else if (action === "New") {
      // Reset form data for 'New' action
      setFormData({
        name: "",
        description: "",
        departmentId: null,
      });
    }
  }, [action, roleSelected]); // Depend on action and roleSelected for re-initialization

  // Handles changes for standard input fields (name, description)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles changes for the AsyncSelect component
  // Assuming AsyncSelect's onChange provides 'name' and 'value' directly
  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // --- API Integration ---
  // Replace this placeholder with your actual API calls (createRole or updateRole)
  const { isPending, mutateAsync } = useApiSend(async () => {
    // Example: Call your actual API functions here
    if (action === "Edit") {
      // await updateRole(roleSelected.id, formData); // Assuming updateRole needs ID and data
      console.log(
        "Simulating API call: Updating role",
        roleSelected.id,
        formData
      );
      return new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
    } else {
      // await createRole(formData); // Assuming createRole takes form data
      console.log("Simulating API call: Creating new role", formData);
      return new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
    }
  });

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission
    try {
      await mutateAsync(); // Execute the API call
      // On success, you might want to refresh lists or update global state
      if (setModalOpen) {
        setModalOpen(false); // Close the modal
      }
    } catch (error) {
      console.error("Error submitting role form:", error);
      // You can add user feedback here, e.g., a toast notification
    }
  };

  return (
    // Main container with adjusted padding for a cleaner modal look
    <div className="w-full px-6 py-8">
      {/* Main Title */}
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">
        {action === "Edit" ? "Editar Rol" : "Nuevo Rol"}
      </h1>

      {/* Display role name when in 'Edit' mode */}
      {action === "Edit" && roleSelected?.name && (
        <h2 className="text-center text-xl font-semibold text-blue-600 mb-6">
          {roleSelected.name}
        </h2>
      )}

      {/* Form section, using flexbox gap for consistent spacing between elements */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Role Name Input */}
        <div>
          <label
            className="block text-gray-700 text-base font-semibold mb-2"
            htmlFor="roleNameInput" // Unique ID for this input
          >
            Nombre
          </label>
          <input
            className="
              w-full py-2.5 px-4            
              border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500/50 
              shadow-sm                  
              text-gray-900 placeholder-gray-500 
              bg-white 
              transition-all duration-200 ease-in-out  
            "
            id="roleNameInput" // Matches htmlFor
            type="text"
            name="name" // Matches formData key
            placeholder="Ej. Administrador de Contenido" // More descriptive placeholder
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        {/* Role Description Input */}
        <div>
          <label
            className="block text-gray-700 text-base font-semibold mb-2"
            htmlFor="roleDescriptionInput" // Unique ID for this input
          >
            Descripción
          </label>
          <input
            className="
              w-full py-2.5 px-4
              border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              shadow-sm
              text-gray-900 placeholder-gray-500
              bg-white
              transition-all duration-200 ease-in-out
            "
            id="roleDescriptionInput" // Matches htmlFor
            type="text"
            name="description" // Matches formData key
            placeholder="Ej. Encargado de la gestión y publicación de contenido." // More descriptive placeholder
            value={formData.description}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        {/* Department AsyncSelect */}
        <div>
          <label
            className="block text-gray-700 text-base font-semibold mb-2"
            htmlFor="roleDepartmentSelect" // ID for the underlying select/input in AsyncSelect
          >
            Departamento
          </label>
          <AsyncSelect
            url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.netgetDepartments`}
            name={"departmentId"} // Matches formData key
            value={formData.departmentId}
            onChange={handleSelectChange} // Custom handler for AsyncSelect
            customNameParam="descriptionDepartamento"
            // You might need to pass additional styling props to AsyncSelect if its internal
            // input/select elements don't automatically pick up global styles.
            // Example: inputClasses="border border-gray-300 rounded-lg focus:ring-blue-500/50"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          {/* Increased top margin for separation */}
          <div>
            {/* Fixed width container for button */}
            <TextButton
              // Primary action button styling, consistent with iOS/Mac
              bgColor="bg-blue-500"
              hoverBgColor="hover:bg-blue-600"
              textColor="text-white"
              hoverTextColor="hover:text-white"
              textSize="text-lg"
              otherProperties="w-full py-3 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out active:scale-[0.98] rounded-xl"
              text={
                isPending
                  ? "Guardando..."
                  : action === "Edit"
                  ? "Guardar Cambios"
                  : "Crear Rol"
              }
              onClick={handleSubmit}
              disabled={isPending}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
