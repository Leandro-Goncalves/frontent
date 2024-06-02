export interface StoreCarousel {
  uuid: string;
  title: string;
  url: string;
}

export interface StoreCarouselPainel extends StoreCarousel {
  isActive: boolean;
}
