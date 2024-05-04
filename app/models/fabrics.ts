export interface Fabrics {
  guid: string;
  description: string;
  name: string;
  url: string;
}

export interface FabricsPanel extends Fabrics {
  isActive: boolean;
}
