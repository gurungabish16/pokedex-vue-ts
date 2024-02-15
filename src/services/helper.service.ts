import { TYPE_BACKGROUND, TYPE_COLOR_CONST } from '@/constants/color.constant'
import axiosInstance from './axios-common'

export class HelperService {
  static getImageUrlToBlob(url: string): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      axiosInstance(url)
        .then((response) => response.data.blob())
        .then((blob) => {
          try {
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
              const base64String = reader.result
              resolve(base64String)
            }
          } catch (error) {
            reject(error)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  static getAllImageUrlToBlob(blob: any): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          const base64String = reader.result
          resolve(base64String)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  static mapToColorCode(typeName: string) {
    switch (typeName?.toLocaleLowerCase()) {
      case TYPE_COLOR_CONST.GRASS:
        return TYPE_BACKGROUND.GRASS;
      case TYPE_COLOR_CONST.POISON:
        return TYPE_BACKGROUND.POISON;
      case TYPE_COLOR_CONST.FIRE:
        return TYPE_BACKGROUND.FIRE;
      case TYPE_COLOR_CONST.FLYING:
        return TYPE_BACKGROUND.FLYING;
      case TYPE_COLOR_CONST.WATER:
        return TYPE_BACKGROUND.WATER;

      default:
        return TYPE_BACKGROUND.DEFAULT
    }
  }
}
