"use client";

import { useState, useRef } from "react";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const GetFoodImage = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewLink, setPreviewLink] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const openBrowse = () => fileInputRef.current?.click();

  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("upload_preset", "food-delivery"); 
    formData.append("file", file);

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dhvup7uyy/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.url;

      onUpload(imageUrl);
      setPreviewLink(imageUrl);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) uploadToCloudinary(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) uploadToCloudinary(file);
  };

  const deleteImage = () => {
    setPreviewLink("");
    onUpload(""); 
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-sm font-medium">Image</Label>
      <Input hidden type="file" ref={fileInputRef} onChange={handleFileSelect} />

      <div
        className={`bg-gray-200 rounded-md flex justify-center items-center w-full h-44 border cursor-pointer ${
          isDragging ? "border-dashed" : "border-solid"
        }`}
        onClick={openBrowse}
        onDrop={handleDrop}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        {previewLink ? (
          <div className="relative w-full h-full">
            <img
              src={previewLink}
              alt="Food"
              className="rounded-md object-cover w-[452px] h-[176px] "
            />
            <Button
              className="absolute top-2 right-2 text-red-400 w-5 h-5 rounded-full"
              onClick={(event) => {
                event.stopPropagation();
                deleteImage();
              }}
              type="button"
            >
              <X />
            </Button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            {uploading ? "Uploading..." : "Click or drag an image here"}
          </p>
        )}
      </div>
    </div>
  );
};

