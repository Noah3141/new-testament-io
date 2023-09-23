import React from "react";
import Image from "next/image";
import NoImagePlaceholder from "~/images/NoProfilePhoto.png";

type ProfileImageProps = {
    src?: string;
};

const ProfileImage = ({ src }: ProfileImageProps) => {
    return (
        <Image
            className=""
            width={30}
            height={30}
            src={src ?? NoImagePlaceholder}
            alt={"Profile Image"}
        />
    );
};

export default ProfileImage;
