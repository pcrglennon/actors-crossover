export default class ImageService {
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
      return 'https://via.placeholder.com/185';
    }
  }

  private imageUrl(imageSize: string, imagePath: string) {
    return this.imageUrlBase +
           imageSize +
           imagePath;
  }

  private get imageUrlBase() {
    return 'https://image.tmdb.org/t/p/';
  }

  private get thumbnailSize() {
    return 'w45';
  }

  private get profileSize() {
    return 'w185';
  }
}
