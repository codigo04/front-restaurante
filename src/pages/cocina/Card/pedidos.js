const pedidos = [
    {
      id: 1,
      numeroMesa: 5,
      hora: "16:00 pm",
      estado: "pendiente",
      imagenUrl: "https://img.freepik.com/vector-gratis/plato-cubiertos_1284-42854.jpg?w=826&t=st=1728575728~exp=1728576328~hmac=efca64c35b19497c5366d3fc57cc9f3ceeeea5cc5bdd31e1fb897ad519bef057",
      platos: [
        { nombre: "Ceviche", cantidad: 2 },
        { nombre: "Arroz con Mariscos", cantidad: 1 },
        { nombre: "Jalea Mixta", cantidad: 3 },
      ],
    },
    {
      id: 2,
      numeroMesa: 3,
      hora: "16:30 pm",
      estado: "completado",
      imagenUrl: "https://img.freepik.com/vector-gratis/plato-cubiertos_1284-42854.jpg?w=826&t=st=1728575728~exp=1728576328~hmac=efca64c35b19497c5366d3fc57cc9f3ceeeea5cc5bdd31e1fb897ad519bef057",
      platos: [
        { nombre: "Lomo Saltado", cantidad: 1 },
        { nombre: "Pollo a la Brasa", cantidad: 2 },
      ],
    },
    {
      id: 3,
      numeroMesa: 8,
      hora: "17:00 pm",
      estado: "pendiente",
      imagenUrl: "https://img.freepik.com/vector-gratis/plato-cubiertos_1284-42854.jpg?w=826&t=st=1728575728~exp=1728576328~hmac=efca64c35b19497c5366d3fc57cc9f3ceeeea5cc5bdd31e1fb897ad519bef057",
      platos: [
        { nombre: "Ensalada César", cantidad: 1 },
        { nombre: "Pasta Alfredo", cantidad: 2 },
        { nombre: "Pizza Margarita", cantidad: 1 },
      ],
    },
  ];
  
  export default pedidos;
  
  