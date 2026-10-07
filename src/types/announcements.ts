export interface AnnouncementSchema extends ParsedAnnouncement {
  parser: string;
}

export interface ParsedAnnouncement {
  id?: string;
  date: number;
  title: string;
  /**
   * Texts splitted by two new lines
   */
  description?: string[];
  /**
   * General links related to the announcement
   */
  links?: string[];
  /**
   * Attachments such as image, PDF, and text files
   */
  files?: string[];
}
