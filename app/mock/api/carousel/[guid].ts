import { carouselImages } from "../_utils/carrousel";

export default function carouselHandler() {
  return [200, carouselImages.map((i) => i.guid)] as const;
}
