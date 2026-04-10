import { Storage } from "@google-cloud/storage";

import { findVideoById, listVideos } from "@/lib/db";
import { env, requireEnv } from "@/lib/env";

export type VideoListItem = {
  id: string;
  title: string;
  description?: string | null;
  durationSeconds?: number | null;
  createdAt: Date;
};

function createStorageClient() {
  if (!env.GCP_PROJECT_ID || !env.GCP_CLIENT_EMAIL || !env.GCP_PRIVATE_KEY) {
    return new Storage();
  }

  return new Storage({
    projectId: env.GCP_PROJECT_ID,
    credentials: {
      client_email: env.GCP_CLIENT_EMAIL,
      private_key: env.GCP_PRIVATE_KEY.replace(/\\n/g, "\n")
    }
  });
}

const storage = createStorageClient();

export class GCSVideoProvider {
  async getVideoUrl(videoId: string, userId: string) {
    void userId;

    const video = await findVideoById(videoId);

    if (!video) {
      throw new Error("Video not found");
    }

    const bucketName = requireEnv("GCS_BUCKET_NAME");
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(video.gcsPath);

    const [url] = await file.getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + 1000 * 60 * 30
    });

    return url;
  }

  async listVideos() {
    const videos = await listVideos(30);

    return videos.map((video: (typeof videos)[number]) => ({
      id: video.id,
      title: video.title,
      description: video.description,
      durationSeconds: video.durationSeconds,
      createdAt: video.createdAt
    }));
  }
}
