import { Store, BarChart, Shield, Sofa } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Store,
      title: "Inventario",
      description:
        "Administre su inventario de muebles con facilidad. Supervise los niveles de existencias, los precios y los detalles de los productos.",
    },

    {
      icon: BarChart,
      title: "Reportes y Analisis",
      description:
        "Tome decisiones basadas en datos con informes completos sobre ventas e inventario",
    },

    {
      icon: Shield,
      title: "Seguridad",
      description:
        "El control de acceso basado en roles garantiza que sus datos estén seguros y sean accesibles solo para el personal autorizado.",
    },
  ];

  return (
    <div className="max-h-80 ">
      <header className="container mx-auto px-4 py-3 text-center">
        <div className="flex justify-center mb-6">
          <img src="icons8.png" className="h-[100px] w-[100px]" />
        </div>
        <h1 className="text-4xl text-gray-800 md:text-6xl font-bold  mb-6">
          Sistema ProntoMuebles
        </h1>
        <p className="text-xl  text-gray-600 mb-8 max-w-2xl mx-auto">
          Una solución integral para la gestión de la propiedad de tu tienda de
          muebles inventario, ventas, clientes y proveedores, todo en un solo
          lugar.
        </p>
      </header>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl text-gray-800 font-bold  text-center mb-10">
          Funciones
        </h2>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className=" rounded-lg p-6 text-white bg-blue-900 border "
            >
              <feature.icon className="h-10 w-10  mb-4" />
              <h3 className="text-xl font-semibold  mb-2">{feature.title}</h3>
              <p className="">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
