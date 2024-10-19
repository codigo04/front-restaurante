




const fetchEmployeeByDNI = async (dni) => {
    try {
      const response = await fetchetch(`/api/employees/${dni}`);
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
      // alert('CONCECTATE A TU SERVIDOR')
    }
  };