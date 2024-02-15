import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCallback, useEffect, useMemo, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImage } from "./getCroppedImage";

interface ImageCropperProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  imagePath: File;
  onSave: (cropImage: File) => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  isOpen,
  onOpenChange,
  imagePath,
  onSave,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [initCrop, setInitCrop] = useState(false);

  const onCropComplete = useCallback((_: Area, area: Area) => {
    setCroppedAreaPixels(area);
  }, []);

  const image = useMemo(() => {
    return URL.createObjectURL(imagePath);
  }, [imagePath]);

  const handleSave = async () => {
    const croppedImage = await getCroppedImage(
      image,
      croppedAreaPixels!,
      rotation
    );

    if (!croppedImage) return;

    const file = new File([croppedImage], imagePath.name, {
      type: imagePath.type,
    });
    onSave(file);
  };

  useEffect(() => {
    setTimeout(() => {
      setInitCrop(true);
    }, 100);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <div
          className="relative"
          style={{
            height: "501px",
          }}
        >
          {initCrop && (
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={3 / 4}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
            />
          )}
        </div>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogContent>
    </Dialog>
  );
};
