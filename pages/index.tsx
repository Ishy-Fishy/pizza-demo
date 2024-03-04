import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Bridge from "../components/Icons/Bridge";
import Logo from "../components/Icons/Logo";
import Modal from "../components/Modal";
import cloudinary from "../lib/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ItemProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
import { getAllItems } from "../lib/dao/item.dao";
import dbConnect from "../lib/mongodb";
import Item from "../components/Item";

const Home: NextPage = ({
  items,
  appName,
}: {
  items: Array<ItemProps>;
  appName: string;
}) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>{appName}</title>
      </Head>
      <main className="mx-auto max-w-[1960px] align-middle p-4">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>
            <Logo />
            <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
              {appName}
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              Tastes better than cardboard!
            </p>
          </div>
          {items.map(({ _id, name, prices, cloudId, description }) => (
            <li
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
              key={_id}
            >
              <Item
                _id={_id}
                name={name}
                prices={prices}
                description={description}
                cloudId={cloudId}
              />
            </li>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const appName = process.env.APP_NAME;
  await dbConnect();
  const items = (await getAllItems()).map((doc) => {
    let jsonDoc = doc.toJSON({ flattenObjectIds: true });
    jsonDoc["cloudId"] = jsonDoc.image ? jsonDoc.image.cloudId : null;
    return jsonDoc;
  });

  console.log(items);
  // const results = await cloudinary.v2.search
  //   .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
  //   .sort_by("public_id", "desc")
  //   .max_results(400)
  //   .execute();
  // let assetIds: Array<string> = [];
  // for (let item of items) {
  //   if (item.image?.cloudId) {
  //     assetIds.push(item.image.cloudId);
  //   }
  // }
  // const results = await cloudinary.v2.api.resources_by_asset_ids(assetIds);
  // console.log("!!!!! RES\n", results);
  // let reducedResults: ImageProps[] = [];
  //
  // let i = 0;
  // for (let result of results.resources) {
  //   reducedResults.push({
  //     id: i,
  //     height: result.height,
  //     width: result.width,
  //     public_id: result.public_id,
  //     format: result.format,
  //   });
  //   i++;
  // }
  //
  // const blurImagePromises = results.resources.map((image: ImageProps) => {
  //   return getBase64ImageUrl(image);
  // });
  // const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);
  //
  // for (let i = 0; i < reducedResults.length; i++) {
  //   reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  // }

  return {
    props: {
      appName,
      items,
    },
  };
}
