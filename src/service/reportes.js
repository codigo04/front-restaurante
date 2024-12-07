const BASE_URL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem( "token" );
const configToken = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const obtenerPedioPDF = async ( pedidoId ) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/admin/comprobantes/${pedidoId}`, {
      method: 'GET',
      headers: {
        ...configToken.headers,
        "Content-Type": "application/pdf",
      },
    });

    if (!response.ok) {
      throw new Error('Error al generar el comprobante');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comprobante_${pedidoId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error:', error);
    alert('Error al generar el comprobante');
  }
};
