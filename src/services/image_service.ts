export default class ImageService {
  private imagesConfiguration: any;

  constructor(imagesConfiguration: any) {
    this.imagesConfiguration = imagesConfiguration;
  }

  thumbnailImageUrl(imagePath: string) {
    if (imagePath) {
      return this.imageUrl(this.thumbnailSize, imagePath);
      } else {
        return 'https://via.placeholder.com/45';
      }
  }

  profileImageUrl(imagePath: string) {
    if (imagePath) {
      return this.imageUrl(this.profileSize, imagePath);
    } else {
      return 'https://via.placeholder.com/180';
    }
  }

  private imageUrl(imageSize: string, imagePath: string) {
    return this.imagesConfiguration.secure_base_url +
           imageSize +
           imagePath;
  }

  private get thumbnailSize() {
    return this.imagesConfiguration.profile_sizes[0]; // 'w45'
  }

  private get profileSize() {
    return this.imagesConfiguration.profile_sizes[1]; // 'w180'
  }
}
