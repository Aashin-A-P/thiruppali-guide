export type InlineImage = {
  url: string;
  alt: string;
  credit?: string;
  creditUrl?: string;
};

export type MassPost = {
  title: string;
  slug: string;
  massDate: string;
  publishedAt: string;
  feastName: string;
  liturgicalSeason: string;
  readingReferences: string[];
  massIntroduction: string[];
  firstReadingIntroduction: string[];
  responsorialPsalm: string[];
  secondReadingIntroduction?: string[];
  gospelAcclamation: string[];
  gospelIntroduction: string[];
  prayerOfTheFaithful: string[];
  sourceName: string;
  sourceUrl: string;
  tags: string[];
  featuredImage?: InlineImage;
  inlineImages?: InlineImage[];
};
