import Image from "next/image";

export default function Logo() {
  const public_id = "logo/c8ysi0o62k1xqnsslbny";
  const format = "PNG";
  return (
    <Image
      alt="Next.js Conf photo"
      className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
      style={{ transform: "translate3d(0, 0, 0)" }}
      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
      width={720}
      height={480}
      sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
    />
  );
}
