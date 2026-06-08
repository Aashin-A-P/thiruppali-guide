"use client";

import { useState } from "react";
import { ImagePlus, Save } from "lucide-react";

const fieldClass = "mt-2 w-full rounded-md border border-maroon/15 bg-white px-4 py-3 outline-none focus:border-maroon";
const textAreaClass = `${fieldClass} min-h-28 leading-7`;

function TextField({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-ink/75">{label}</span>
      <input name={name} required={required} className={fieldClass} />
    </label>
  );
}

function TextArea({ label, name, hint }: { label: string; name: string; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-ink/75">{label}</span>
      {hint ? <span className="ml-2 text-xs text-ink/50">{hint}</span> : null}
      <textarea name={name} className={textAreaClass} />
    </label>
  );
}

export function AdminPostForm() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function uploadImage(file: File) {
    const uploadData = new FormData();
    uploadData.append("file", file);
    const response = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: uploadData
    });
    const result = (await response.json()) as { url?: string; error?: string };

    if (!response.ok || !result.url) {
      throw new Error(result.error || "Image upload failed");
    }

    return result.url;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setError("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const imageFile = formData.get("featuredImage");
      let featuredImageUrl = String(formData.get("featuredImageUrl") || "");

      if (imageFile instanceof File && imageFile.size > 0) {
        setStatus("Uploading image to GitHub...");
        featuredImageUrl = await uploadImage(imageFile);
      }

      setStatus("Saving post...");
      const payload = Object.fromEntries(formData.entries());
      delete payload.featuredImage;
      payload.featuredImageUrl = featuredImageUrl;

      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Could not save post");
      }

      form.reset();
      setStatus("Post saved. If GitHub env vars are configured, Vercel will redeploy automatically.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong");
      setStatus("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-8 rounded-lg border border-maroon/10 bg-white p-5 shadow-soft sm:p-8">
      <section className="grid gap-5 md:grid-cols-2">
        <TextField label="Post Title / தலைப்பு" name="title" required />
        <TextField label="Slug / இணைப்பு பெயர்" name="slug" />
        <TextField label="Mass Date / திருப்பலி தேதி" name="massDate" required />
        <TextField label="Publish Date / வெளியிடும் தேதி" name="publishedAt" />
        <TextField label="Sunday or Feast Name / ஞாயிறு / திருநாள் பெயர்" name="feastName" />
        <TextField label="Liturgical Season / திருவழிபாட்டு காலம்" name="liturgicalSeason" />
      </section>

      <section className="space-y-5">
        <TextArea label="Reading References / வாசக குறிப்புகள்" name="readingReferences" hint="One per line" />
        <TextArea label="Mass Introduction / திருப்பலி முன்னுரை" name="massIntroduction" hint="One paragraph per line" />
        <TextArea label="First Reading Introduction / முதல் வாசக முன்னுரை" name="firstReadingIntroduction" />
        <TextArea label="Responsorial Psalm / பதிலுரைப்பாடல்" name="responsorialPsalm" />
        <TextArea label="Second Reading Introduction / இரண்டாம் வாசக முன்னுரை" name="secondReadingIntroduction" />
        <TextArea label="Gospel Acclamation / நற்செய்திக்கு முன் வாழ்த்தொலி" name="gospelAcclamation" />
        <TextArea label="Gospel Introduction / நற்செய்தி முன்னுரை" name="gospelIntroduction" />
        <TextArea label="Prayer of the Faithful / நம்பிக்கையாளரின் மன்றாட்டு" name="prayerOfTheFaithful" />
        <TextArea label="Tags / குறிச்சொற்கள்" name="tags" hint="One per line" />
      </section>

      <section className="rounded-lg border border-gold/25 bg-parchment/60 p-5">
        <div className="flex items-center gap-2 font-bold text-maroon">
          <ImagePlus className="h-5 w-5" />
          Featured Image / முதன்மை படம்
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-bold text-ink/75">Upload image to GitHub</span>
            <input name="featuredImage" type="file" accept="image/*" className={fieldClass} />
          </label>
          <TextField label="Or paste image URL" name="featuredImageUrl" />
          <TextField label="Image Alt Text / பட விளக்கம்" name="featuredImageAlt" />
          <TextArea label="Inline Image URLs / கட்டுரைக்குள் படங்கள்" name="inlineImageUrls" hint="One URL per line" />
        </div>
      </section>

      {status ? <p className="rounded-md bg-olive/10 px-4 py-3 text-sm font-semibold text-olive">{status}</p> : null}
      {error ? <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-maroon px-5 py-3 text-sm font-bold text-white shadow-soft disabled:opacity-60"
      >
        <Save className="h-4 w-4" />
        {isSubmitting ? "Saving..." : "Save Post"}
      </button>
    </form>
  );
}
