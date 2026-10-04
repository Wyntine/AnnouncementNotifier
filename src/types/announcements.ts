export interface AnnouncementSchema {
  id?: string;
  parser: string;
  date: number;
  title: string;
  description?: string;
  links?: string[];
  files?: string[];
}
