import { InlineImage } from "@/lib/types";

export function InlineArticleImage({ image }: { image: InlineImage }) {
  return (
    <figure className="decorative-image my-8 overflow-hidden rounded-lg border border-maroon/10 bg-white shadow-soft">
      {/* Use the image's natural aspect ratio on article pages so uploaded artwork is not cropped. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.url} alt={image.alt} className="h-auto w-full object-contain" />
      {(image.credit || image.creditUrl) && (
        <figcaption className="px-4 py-3 text-xs text-ink/60">
          படம்:{" "}
          {image.creditUrl ? (
            <a className="underline underline-offset-4" href={image.creditUrl} target="_blank" rel="noreferrer">
              {image.credit}
            </a>
          ) : (
            image.credit
          )}
        </figcaption>
      )}
    </figure>
  );
}
