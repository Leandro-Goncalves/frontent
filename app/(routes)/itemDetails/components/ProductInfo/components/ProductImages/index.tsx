"use client";
import env from "@/app/env";
import { Image as ImagesType } from "@/app/models/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  images: ImagesType[];
  selectedImageIndex: number;
  setSelectedImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductImages: React.FC<ProductImagesProps> = ({
  images,
  selectedImageIndex,
  setSelectedImageIndex,
}) => {
  const selectedImage = images[selectedImageIndex];

  return (
    <div className="flex">
      <div className="flex flex-col gap-2 h-[585px] overflow-y-auto pr-1 max-[1000px]:w-0">
        {images.map(({ imageId }, index) => (
          <button key={imageId} onClick={() => setSelectedImageIndex(index)}>
            <Image
              src={`${env.CDN_URL}/${imageId}`}
              alt="pequena imagem clicavel"
              width={68}
              height={101}
              style={{
                borderRadius: "8px",
                height: "101px",
                objectFit: "cover",
              }}
            />
          </button>
        ))}
      </div>
      {selectedImage && (
        <div className="relative">
          <Button
            disabled={selectedImageIndex === 0}
            onClick={() => {
              setSelectedImageIndex((i) => i - 1);
            }}
            size={"icon"}
            variant={"outline"}
            className="rounded-full absolute top-[50%] translate-y-[-50%] left-2 bg-transparent hover:bg-transparent min-[1000px]:hidden"
          >
            <ArrowLeft color="#DC024F" />
          </Button>
          <Button
            disabled={selectedImageIndex === images.length - 1}
            onClick={() => {
              setSelectedImageIndex((i) => i + 1);
            }}
            size={"icon"}
            variant={"outline"}
            className="rounded-full absolute  top-[50%] translate-y-[-50%] right-2 bg-transparent hover:bg-transparent min-[1000px]:hidden"
          >
            <ArrowRight color="#DC024F" />
          </Button>
          <Image
            src={`${env.CDN_URL}/${selectedImage.imageId}`}
            alt="imagem do produto"
            width={329}
            height={585}
            style={{
              borderRadius: "8px",
              height: "585px",
              objectFit: "cover",
              marginLeft: "4px",
            }}
          />
        </div>
      )}
    </div>
  );
};
