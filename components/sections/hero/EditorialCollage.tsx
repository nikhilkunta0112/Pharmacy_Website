import Image from "next/image";
import { heroPhotos } from "./assets";
export function EditorialCollage() {
  return (
    <div className="care-collage" aria-hidden="true">
      {heroPhotos.map((photo) => (
        <div key={photo.id} className={`care-tile care-photo care-${photo.id}`}>
          <Image
            src={photo.src}
            alt=""
            fill
            preload={"priority" in photo && photo.priority}
            sizes="(max-width: 767px) 60vw, (max-width: 1199px) 25vw, 22vw"
            style={{ objectFit: "cover", objectPosition: photo.position }}
          />
        </div>
      ))}
      {(["c", "a", "r", "e"] as const).map((letter) => (
        <div
          key={letter}
          className={`care-tile care-letter care-letter-${letter}`}
        >
          <span>{letter.toUpperCase()}</span>
        </div>
      ))}
      <div className="care-tile care-accent" />
    </div>
  );
}
