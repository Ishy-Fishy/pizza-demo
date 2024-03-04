import cloudinary from "./cloudinary";

export interface IImage {
  url: string;
}

export async function getImages([assetIds]: Array<string>): Promise<
  Array<IImage>
> {
  const {
    resources: [resources],
  } = await cloudinary.v2.api.resources_by_asset_ids(assetIds);

  return resources.map(({ url }) => ({ url }));
}
