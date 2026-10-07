"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, UploadCloud, X, Loader2, User, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useChangeProfilePhoto } from "@/hooks/user.hook"; // আপনার হুকের পাথ দিন
import { useUserStore } from "@/store/useUserStore";

const ChangeProfilePicture = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Zustand Store থেকে ইউজারের তথ্য
  const { user } = useUserStore();
  const currentProfileURL = user?.profileURL;

  // 2. লোকাল স্টেট
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  // 3. মিউটেশন হুক
  const { mutate: changeProfilePhoto, isPending } = useChangeProfilePhoto();

  // ফাইল সিলেক্ট হ্যান্ডলার
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ফাইল সাইজ ও টাইপ ভ্যালিডেশন (Max 5MB)
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid File", {
        description: "Please select a valid image file (PNG, JPG, WebP).",
        position: "top-right",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File Too Large", {
        description: "Image size should be less than 5MB.",
        position: "top-right",
      });
      return;
    }

    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  // সিলেকশন ক্লিয়ার করা
  const handleCancelSelection = () => {
    setSelectedFile(null);
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
      setPreviewURL(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
  if (!selectedFile) {
    toast.error("No Image Selected", {
      description: "Please choose a new profile picture to update.",
      position: "top-right",
    });
    return;
  }

  // FormData-r bodole type onujayi object pathan:
  changeProfilePhoto(
    { profileImage: selectedFile },
    {
      onSuccess: () => {
        toast.success("Profile Updated", {
          description: "Your profile photo has been changed successfully.",
          position: "top-right",
        });
        handleCancelSelection();
        router.push("/");
      },
      onError: (err: any) => {
        const errorMsg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to update profile picture.";

        toast.error("Update Failed", {
          description: errorMsg,
          position: "top-right",
        });
      },
    }
  );
};
  // বর্তমান ডিসপ্লে ইমেজ
  const displayImage = previewURL || currentProfileURL;

  return (
    <div className="max-w-xl mx-auto px-4 py-10 sm:py-16">
      <div className="rounded-[12px] border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Profile Picture
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Update your visual identity across sessions and mentor cards.
            </p>
          </div>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="rounded-[12px] text-xs font-semibold text-zinc-500 hover:text-zinc-900"
          >
            <Link href="/" className="flex items-center gap-1.5">
              <ArrowLeft className="size-3.5" />
              <span>Back</span>
            </Link>
          </Button>
        </div>

        {/* Avatar Preview & File Input Section */}
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <div className="relative group">
            <div className="relative size-36 sm:size-40 rounded-[12px] overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 shadow-inner">
              {displayImage ? (
                <Image
                  src={displayImage}
                  alt={user?.name || "Profile Picture"}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="size-full flex flex-col items-center justify-center text-zinc-400 gap-1">
                  <User className="size-12 stroke-[1.5]" />
                  <span className="text-[11px] font-semibold">No Image</span>
                </div>
              )}
            </div>

            {/* Quick Upload Trigger Overlay */}
            <button
              type="button"
              disabled={isPending}
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 p-2.5 rounded-[12px] bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all cursor-pointer active:scale-95 disabled:pointer-events-none"
              title="Upload new image"
            >
              <Camera className="size-4" />
            </button>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="text-center space-y-1">
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              {selectedFile ? selectedFile.name : "Recommended: Square JPG, PNG (Max 5MB)"}
            </p>
            {selectedFile && (
              <p className="text-[11px] text-orange-600 dark:text-orange-400 font-bold">
                Preview active. Click "Save & Update" to apply changes.
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-5 border-t border-zinc-100 dark:border-zinc-800">
          {selectedFile && (
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={handleCancelSelection}
              className="rounded-[12px] border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
            >
              <X className="size-3.5 mr-1 text-zinc-400" />
              Cancel
            </Button>
          )}

          <Button
            type="button"
            disabled={!selectedFile || isPending}
            onClick={handleUpload}
            className="rounded-[12px] bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-xs font-bold transition-all shadow-xs active:scale-[0.98] disabled:opacity-50"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-3.5 animate-spin text-orange-500" />
                <span>Uploading...</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <UploadCloud className="size-3.5 text-orange-500" />
                <span>Save & Update</span>
              </span>
            )}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ChangeProfilePicture;