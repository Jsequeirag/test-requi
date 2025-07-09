import { React, useState, useEffect, useCallback } from "react";
import RolesAdministrationStore from "../../../stores/RolesAdministrationStore";
import { getRolesByEmployeeId, createUserRole } from "../../api/urls/userRole";
import { getRoles } from "../../api/urls/roles"; // Assuming getRoles populates RolesAdministrationStore.roles
import { useApiGet } from "../../api/config/customHooks"; // Not directly used for fetching roles here, but kept for context if needed elsewhere.
import TextButton from "../../components/Button/TextButton"; // Make sure your TextButton component accepts style props
import { useApiSend } from "../../api/config/customHooks";
import { getLocalStorageKeyValue } from "../../utils/localstore"; // For getting the current logged-in user's ID

export default function SelectRoleEmployee({ setEmployeeModal }) {
  // Global state management from Zustand
  const userSelected = RolesAdministrationStore(
    (state) => state.employeeSelected
  );
  const roles = RolesAdministrationStore((state) => state.roles); // Assuming roles are pre-fetched and available
  const userRoles = RolesAdministrationStore((state) => state.userRoles); // Roles currently assigned to the selected user
  const setUserRoles = RolesAdministrationStore((state) => state.setUserRoles); // Function to update assigned roles

  // Handles adding or removing a role from the local `userRoles` state
  const handleRoleChange = (roleId, isChecked) => {
    // This `employeeId` likely refers to the ID of the *logged-in user* performing the action,
    // which might be used as `userId` in the user-role relationship for tracking who made the change.
    const loggedInUserId = getLocalStorageKeyValue(
      "requitool-employeeInfo",
      "id"
    );

    // The `userSelected.id` is the ID of the *employee whose roles are being modified*.
    const targetEmployeeId = userSelected?.id;

    if (!targetEmployeeId) {
      console.error("No employee selected for role change.");
      return;
    }

    if (isChecked) {
      // Add the role if it's not already in the list
      if (
        !userRoles.some(
          (ur) => ur.roleId === roleId && ur.employeeId === targetEmployeeId
        )
      ) {
        setUserRoles([
          ...userRoles,
          // Structure as per your original code's implied backend expectation
          {
            userId: loggedInUserId,
            roleId: roleId,
            employeeId: targetEmployeeId,
          },
        ]);
      }
    } else {
      // Remove the role
      setUserRoles(
        userRoles.filter(
          (role) =>
            !(role.roleId === roleId && role.employeeId === targetEmployeeId)
        )
      );
    }
  };

  // Callback for the API call to create/update user roles
  // Note: The `createUserRole` API should be designed to handle the array of `userRoles`
  // and update the backend state for the `userSelected.id` accordingly.
  const createUserRoleCallback = useCallback(
    () => createUserRole(userRoles, userSelected?.id), // Pass userSelected.id if the API expects it for context
    [userRoles, userSelected?.id]
  );
  const { isPending, mutateAsync } = useApiSend(createUserRoleCallback);

  // Function to initiate the role update
  const saveUserRoles = async () => {
    try {
      await mutateAsync();
      setEmployeeModal(false); // Close the modal on successful save
    } catch (error) {
      console.error("Error saving user roles:", error);
      // Implement user-friendly error feedback here (e.g., a toast notification)
    }
  };

  return (
    // Main container for the modal content, with adjusted padding for a cleaner look
    <div className="w-full px-6 py-8">
      <>
        {/* Title of the modal, prominent and well-spaced */}
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Roles asignados a{" "}
          <span className="font-extrabold text-blue-600">
            {userSelected?.nombre}
          </span>{" "}
        </h1>

        {/* Container for the list of roles, using gap for consistent vertical spacing */}
        <div className="flex flex-col gap-4">
          {roles && roles.length > 0 ? (
            roles.map((role) => (
              <div key={role.id} className="inline-flex items-center">
                {/* Custom checkbox label and input for iOS/Mac style */}
                <label
                  htmlFor={`role-${role.id}`} // Unique ID for accessibility linkage
                  className="flex items-center cursor-pointer relative group" // 'group' for hover effects on children
                >
                  <input
                    type="checkbox"
                    id={`role-${role.id}`} // Matches htmlFor of the label
                    className="
                      peer h-5 w-5                       
                      cursor-pointer transition-all    
                      appearance-none                 
                      rounded                          
                      border border-gray-300           
                      checked:bg-blue-500             
                      checked:border-blue-500           
                      focus:outline-none focus:ring-2 focus:ring-blue-500/50  
                      group-hover:shadow-md             
                    "
                    checked={userRoles?.some(
                      (userRole) =>
                        userRole.roleId === role.id &&
                        userRole.employeeId === userSelected?.id
                    )}
                    onChange={(e) =>
                      handleRoleChange(role.id, e.target.checked)
                    }
                  />
                  {/* Checkmark SVG, visible only when the checkbox is checked */}
                  <span
                    className="
                    absolute text-white opacity-0       // Hidden by default, white checkmark
                    peer-checked:opacity-100            // Visible when checked
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 // Centers the checkmark
                    pointer-events-none                 // Ensures clicks pass through to the actual checkbox
                    transition-opacity duration-200     // Smooth fade-in for the checkmark
                  "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                {/* Label for the role name */}
                <label
                  htmlFor={`role-${role.id}`} // Links to the checkbox for better UX
                  className="cursor-pointer ml-3 text-gray-700 text-lg" // Text color and size for readability
                >
                  {role.name}
                </label>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 mt-4">
              No hay roles disponibles.
            </p>
          )}

          {/* Container for the submit button, centered and with good vertical spacing */}
          <div className="flex justify-center mt-8">
            <div>
              {" "}
              {/* Fixed width for the button's container */}
              <TextButton
                // Primary action button style consistent with iOS/Mac
                bgColor="bg-blue-500"
                hoverBgColor="hover:bg-blue-600"
                textColor="text-white"
                hoverTextColor="hover:text-white" // Text color remains white on hover
                textSize="text-lg" // Consistent text size
                otherProperties="w-full py-3 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out active:scale-[0.98] rounded-xl" // Full width within container, more padding, added shadow, rounded for primary action
                text={isPending ? "Guardando..." : "Guardar Cambios"} // Clearer text for pending state
                onClick={saveUserRoles}
                disabled={isPending} // Disable button while API call is pending
              />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
