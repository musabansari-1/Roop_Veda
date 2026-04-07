"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Mail, PlayCircle, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type VideoItem = {
  id: string;
  title: string;
  description?: string | null;
  durationSeconds?: number | null;
  createdAt: string;
};

type DashboardShellProps = {
  userEmail: string;
};

function formatDuration(seconds?: number | null) {
  if (!seconds) {
    return "On-demand";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function DashboardShell({ userEmail }: DashboardShellProps) {
  const router = useRouter();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    url: string;
  } | null>(null);
  const [loadingVideoId, setLoadingVideoId] = useState<string | null>(null);
  const [shareEmail, setShareEmail] = useState(userEmail);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const loginUrl = useMemo(() => {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      (typeof window !== "undefined" ? window.location.origin : "");
    return `${baseUrl}/login`;
  }, []);

  useEffect(() => {
    async function loadVideos() {
      try {
        const response = await fetch("/api/videos");
        const data = (await response.json()) as { videos?: VideoItem[] };
        setVideos(data.videos ?? []);
      } finally {
        setLoading(false);
      }
    }

    void loadVideos();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST"
    });

    router.push("/login");
  }

  async function handlePlayVideo(video: VideoItem) {
    setLoadingVideoId(video.id);
    setStatusMessage(null);

    try {
      const response = await fetch(`/api/videos/${video.id}`);
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to open video.");
      }

      setActiveVideo({
        title: video.title,
        url: data.url
      });
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Unable to open the video."
      );
    } finally {
      setLoadingVideoId(null);
    }
  }

  async function handleShareEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("Sending access link...");

    const response = await fetch("/api/share/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: shareEmail
      })
    });

    const data = (await response.json()) as { error?: string };

    setStatusMessage(
      response.ok
        ? "Access link sent."
        : data.error ?? "Unable to send access link."
    );
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Access your Roop Veda dashboard here: ${loginUrl}`
  )}`;

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="surface px-6 py-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="eyebrow">Private dashboard</p>
              <h1 className="mt-4 font-display text-4xl text-forest">
                Your members-only video library
              </h1>
              <p className="mt-3 text-sm leading-7 text-forest/70">
                Signed URLs are generated only when you open a video, keeping
                the library private and access-controlled.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/forgot-password"
                className="inline-flex items-center justify-center rounded-full border border-forest/10 bg-white px-6 py-3 text-sm font-semibold text-forest transition hover:bg-mist"
              >
                Reset password
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="surface px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Video library</p>
                <p className="mt-2 text-sm text-forest/70">
                  Up to 30 protected videos can be surfaced here.
                </p>
              </div>
              <span className="rounded-full bg-mist px-4 py-2 text-xs font-semibold text-forest">
                {videos.length} available
              </span>
            </div>

            {loading ? (
              <p className="mt-6 text-sm text-forest/70">Loading library...</p>
            ) : videos.length === 0 ? (
              <div className="mt-6 rounded-[24px] bg-mist px-5 py-8 text-sm text-forest/75">
                No videos are published yet. Add metadata to the `Video` table
                and private assets to your GCS bucket to populate this library.
              </div>
            ) : (
              <div className="mt-6 grid gap-4">
                {videos.map((video) => (
                  <article
                    key={video.id}
                    className="rounded-[24px] border border-forest/10 bg-white px-5 py-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-forest">
                          {video.title}
                        </h2>
                        <p className="mt-2 text-sm text-forest/65">
                          {video.description ?? "Private session"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-mist px-3 py-2 text-xs font-semibold text-forest">
                          {formatDuration(video.durationSeconds)}
                        </span>
                        <Button
                          onClick={() => handlePlayVideo(video)}
                          disabled={loadingVideoId === video.id}
                        >
                          <PlayCircle className="mr-2 h-4 w-4" />
                          {loadingVideoId === video.id ? "Opening..." : "Play"}
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="surface px-6 py-6">
            <p className="eyebrow">Access sharing</p>
            <h2 className="mt-4 text-2xl font-semibold text-forest">
              Send yourself the login link
            </h2>
            <p className="mt-3 text-sm leading-7 text-forest/70">
              Use email or WhatsApp when you want quick access on another
              device.
            </p>
            <form className="mt-6 flex flex-col gap-4" onSubmit={handleShareEmail}>
              <Input
                type="email"
                value={shareEmail}
                onChange={(event) => setShareEmail(event.target.value)}
                placeholder="Where should we send the link?"
              />
              <Button type="submit" fullWidth>
                <Mail className="mr-2 h-4 w-4" />
                Send email link
              </Button>
            </form>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-forest/10 bg-white px-6 py-3 text-sm font-semibold text-forest transition hover:bg-mist"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share via WhatsApp
            </a>
            {statusMessage ? (
              <p className="mt-4 text-sm text-forest/70">{statusMessage}</p>
            ) : null}
          </aside>
        </section>
      </div>

      {activeVideo ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-forest/70 p-4">
          <div className="w-full max-w-4xl rounded-[30px] bg-white p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-forest">
                {activeVideo.title}
              </h3>
              <Button variant="ghost" onClick={() => setActiveVideo(null)}>
                Close
              </Button>
            </div>
            <video
              key={activeVideo.url}
              className="w-full rounded-[24px] bg-black"
              src={activeVideo.url}
              controls
              autoPlay
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
