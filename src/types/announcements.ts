export interface AnnouncementSchema extends ParsedAnnouncement {
  parser: string;
}

export interface ParsedAnnouncement {
  id?: string;
  date: number;
  title: string;
  description?: string;
  links?: string[];
  files?: string[];
}
