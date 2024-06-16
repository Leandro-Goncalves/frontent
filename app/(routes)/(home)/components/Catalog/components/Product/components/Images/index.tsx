import Image from "next/image";
import { Image as ProductImage } from "@/app/models/products";
import env from "@/app/env";

interface ImagesProps {
  isHover: boolean;
  ProductImages: ProductImage[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  children?: React.ReactNode;
  disable?: boolean;
}

export const Images: React.FC<ImagesProps> = ({
  isHover,
  ProductImages,
  onMouseEnter,
  onMouseLeave,
  onClick,
  children,
  disable,
}) => {
  const firstImage = ProductImages[0];
  const lastImage = ProductImages[ProductImages.length - 1];
  const isMoreThanOneImage = ProductImages.length > 1;

  return (
    <div
      onClick={() => {
        if (!disable) onClick();
      }}
      onMouseEnter={() => {
        if (!disable) onMouseEnter();
      }}
      onMouseLeave={() => {
        if (!disable) onMouseLeave();
      }}
      style={{
        display: "flex",
        borderRadius: "0.5rem",
        overflow: "hidden",
        position: "relative",
        height: "400px",
        width: "100%",
        cursor: disable ? "auto" : "pointer",
      }}
    >
      {children}
      {firstImage && (
        <Image
          src={`${env.CDN_URL}/${firstImage.imageId}`}
          alt="productImage"
          width={300}
          height={400}
          style={{
            width: "auto",
            height: "100%",
            margin: "auto",
            position: "absolute",
            transition: "opacity 0.5s",
            opacity: isHover && isMoreThanOneImage ? 0 : 1,
            top: "50%",
            transform: "translateY(-50%)",
            borderRadius: "0.5rem",
          }}
        />
      )}
      {isMoreThanOneImage && (
        <Image
          src={`${env.CDN_URL}/${lastImage.imageId}`}
          alt="productImage"
          width={300}
          height={400}
          style={{
            width: "auto",
            height: "100%",
            margin: "auto",
            position: "absolute",
            transition: "opacity 0.5s",
            opacity: !isHover ? 0 : 1,
            top: "50%",
            transform: "translateY(-50%)",
            borderRadius: "0.5rem",
          }}
        />
      )}
    </div>
  );
};
