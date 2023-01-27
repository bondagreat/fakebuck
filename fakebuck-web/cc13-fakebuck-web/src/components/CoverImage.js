import coverImage from '../assets/cover-image.jpg'

export default function CoverImage({ src }) {
  return (
    <div
      className="overflow-hidden position-relative mx-auto rounded-b-lg max-w-274 max-h-101"
      style={{
        aspectRatio: '1096/404',
      }}
    >
      <img
      src={src || coverImage}
        alt="cover"
        className="img-fluid position-absolute top-50 start-50 translate-middle"
      />
    </div>
  );
}
