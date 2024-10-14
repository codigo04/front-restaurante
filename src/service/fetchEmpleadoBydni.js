const fetchEmployeeByDNI = async (dni) => {
    try {
      const response = await fetch(`/api/employees/${dni}`);
      const employeeData = await response.json();
      if (employeeData) {
        setFormData({
          ...formData,
          ...employeeData,
          dni: dni // Mantener el DNI
        });
      } else {
        alert("Empleado no encontrado");
      }
    } catch (error) {
      console.error("Error al buscar empleado:", error);
    }
  };