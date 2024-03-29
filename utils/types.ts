/* eslint-disable no-unused-vars */
import { IItem } from "../lib/models/item.model";

export interface ImageProps {
  id: number;
  height: number;
  width: number;
  public_id: string;
  format: string;
  blurDataUrl?: string;
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

export interface ItemProps extends IItem {
  _id: string;
  cloudId?: string;
}
