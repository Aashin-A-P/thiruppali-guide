import Image from "next/image";
import { InlineImage } from "@/lib/types";

export function InlineArticleImage({ image }: { image: InlineImage }) {
  return (
    <figure className="decorative-image my-8 overflow-hidden rounded-lg border border-maroon/10 bg-white shadow-soft">
      <div className="relative aspect-[16/9]">
        <Image src={image.url} alt={image.alt} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
      </div>
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
