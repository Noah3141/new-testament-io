import React from "react";
import Image from "next/image";
import NoImagePlaceholder from "~/images/NoProfilePhoto.png";

type ProfileImageProps = {
    src?: string;
    size?: number;
    className?: string;
};

const ProfileImage = ({ src, size, className = "" }: ProfileImageProps) => {
    return (
        <Image
            className={`  ${className}`}
            width={size ?? 30}
            height={size ?? 30}
            src={src ?? NoImagePlaceholder}
            alt={"Profile Image"}
        />
    );
};

export default ProfileImage;
