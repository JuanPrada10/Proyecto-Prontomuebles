export interface User {
  id_usuario: number;
  username: string;
  role: string;
  id_vendedor?: number;
}

export interface Provider {
  id_proveedor: number;
  nombre: string;
  direccion: string;
  telefono: string;
  persona_contacto: string;
}

export interface Furniture {
  id_mueble: number;
  tipo_mueble: string;
  material: string;
  alto: number;
  ancho: number;
  profundidad: number;
  color: string;
  precio: number;
  id_proveedor: number;
}

export interface Customer {
  id_cliente: number;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}

export interface Employee {
  id_vendedor: number;
  nombre: string;
  telefono: string;
}

export interface Sale {
  id_venta: number;
  fecha: string;
  total: number;
  id_cliente: number;
  id_vendedor: number;
}

export interface SaleDetail {
  id_detalle: number;
  id_venta: number;
  id_mueble: number;
  cantidad: number;
  subtotal: number;
}
