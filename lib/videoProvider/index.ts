import { GCSVideoProvider, type VideoListItem } from "@/lib/videoProvider/providers/gcs";

export interface VideoProvider {
  getVideoUrl(videoId: string, userId: string): Promise<string>;
  listVideos(): Promise<VideoListItem[]>;
}

export const videoProvider: VideoProvider = new GCSVideoProvider();

export type Video = VideoListItem;
