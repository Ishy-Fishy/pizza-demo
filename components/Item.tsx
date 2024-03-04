import Image from "next/image";
import { ItemProps } from "../utils/types";
import { Cloudinary } from "@cloudinary/url-gen";

export default function Item({
  _id,
  name,
  prices,
  cloudId,
  description,
}: ItemProps) {
  const defaultImageId = "samples/coffee"; // todo: do something about this, maybe?

  if (!cloudId) cloudId = defaultImageId;

  // const cloud = new Cloudinary({
  //   cloud: {
  //     cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  //   },
  // });
  //
  // const image = cloud.image(cloudId).resize

  console.log("COMPONENT ", _id, "\n PUBLIC IMAGE ID: ", cloudId);

  return (
    <Image
      alt="Next.js Conf photo"
      className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
      style={{ transform: "translate3d(0, 0, 0)" }}
      placeholder="blur"
      blurDataURL={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${cloudId}`}
      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${cloudId}`}
      width={720}
      height={480}
      sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
    />
  );
}
// import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
// import {
//   AdvancedImage,
//   accessibility,
//   responsive,
//   lazyload,
//   placeholder
// } from '@cloudinary/react';
//
// const App = () => {
//
//   const myCld = new Cloudinary({ cloudName: 'demo'});
//   let img = myCld().image('sample');
//
//   return (
//       <div>
//         <div style={{height: "1000px"}}/>
//         <AdvancedImage
//             cldImg={img}
//             plugins={[lazyload(), responsive(100), placeholder()]}
//         />
//       </div>
//   )
// };
