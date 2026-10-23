import Image from "next/image";

import type { ProjectImage } from "@/types/content";

type ProjectGalleryProps = {
  images: readonly ProjectImage[];
};

export function ProjectGallery({ images }: ProjectGalleryProps) {
  return (
    <div className="project-gallery-grid" aria-label="Project site photographs">
      {images.map((image, index) => {
        const isSingle = images.length === 1;
        const isPortrait = image.aspectRatio === "portrait" || image.height > image.width;
        const isPanoramic = image.aspectRatio === "panoramic" || image.width / image.height > 2;

        let spanClass = "gallery-card--span-6";
        let frameClass = "gallery-card__frame--landscape";

        if (isSingle || (index === 0 && !isPortrait)) {
          spanClass = "gallery-card--span-12";
        }

        if (isPortrait) {
          spanClass = "gallery-card--portrait";
          frameClass = "gallery-card__frame--portrait";
        } else if (isPanoramic) {
          spanClass = "gallery-card--span-12";
          frameClass = "gallery-card__frame--panoramic";
        }

        return (
          <figure
            key={image.src}
            className={`gallery-card ${spanClass}`}
          >
            <div className={`gallery-card__frame ${frameClass}`}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={
                  spanClass === "gallery-card--span-12"
                    ? "(max-width: 64rem) 100vw, 1200px"
                    : "(max-width: 58rem) 100vw, 580px"
                }
                priority={index === 0}
              />
            </div>
            {image.caption ? (
              <figcaption>
                <strong style={{ color: "var(--navy-deep)", marginRight: "0.4rem" }}>
                  Figure {index + 1}:
                </strong>
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}
