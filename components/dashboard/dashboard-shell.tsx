"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock3,
  LogOut,
  Mail,
  PlayCircle,
  Share2,
  Sparkles
} from "lucide-react";

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
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [loadingVideoId, setLoadingVideoId] = useState<string | null>(null);
  const [shareEmail, setShareEmail] = useState(userEmail);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const loginUrl = useMemo(() => {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      (typeof window !== "undefined" ? window.location.origin : "");
    return `${baseUrl}/login`;
  }, []);

  const activeVideo = videos.find((video) => video.id === activeVideoId) ?? null;
  const activeVideoIndex = activeVideo
    ? videos.findIndex((video) => video.id === activeVideo.id)
    : -1;

  useEffect(() => {
    async function loadVideos() {
      try {
        const response = await fetch("/api/videos");
        const data = (await response.json()) as { videos?: VideoItem[] };
        const nextVideos = data.videos ?? [];
        setVideos(nextVideos);

        if (nextVideos.length > 0) {
          setActiveVideoId((current) => current ?? nextVideos[0].id);
        }
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

  async function handleSelectVideo(video: VideoItem) {
    setActiveVideoId(video.id);
    setLoadingVideoId(video.id);
    setStatusMessage(null);

    try {
      const response = await fetch(`/api/videos/${video.id}`);
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to open video.");
      }

      setActiveVideoUrl(data.url);
    } catch (error) {
      setActiveVideoUrl(null);
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
        <section className="surface overflow-hidden px-6 py-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-44 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(246,178,107,0.22),transparent_60%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow">Member area</p>
                <h1 className="mt-4 font-display text-4xl text-forest sm:text-5xl">
                  Roop Veda videos
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-forest/70 sm:text-base">
                  Move through your sessions in sequence. Pick a lesson number,
                  press play, and continue your practice from one calm step to
                  the next.
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

            <div className="relative mt-8 rounded-[32px] border border-forest/10 bg-gradient-to-br from-[#fff9f2] via-white to-[#f4ede3] p-5 shadow-[0_24px_80px_rgba(58,41,28,0.08)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="eyebrow">Program flow</p>
                  <h2 className="mt-3 text-2xl font-semibold text-forest sm:text-3xl">
                    Face yoga, guided in order
                  </h2>
                </div>
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-forest/75">
                  <Sparkles className="h-4 w-4 text-ember" />
                  {videos.length} lessons available
                </div>
              </div>

              {loading ? (
                <p className="mt-6 text-sm text-forest/70">Loading your library...</p>
              ) : videos.length === 0 ? (
                <div className="mt-6 rounded-[28px] border border-dashed border-forest/15 bg-white/80 px-5 py-8 text-sm text-forest/75">
                  No videos are published yet. Add records to the `Video` table
                  and keep the matching assets in your GCS bucket.
                </div>
              ) : (
                <div className="mt-6 flex flex-wrap gap-3">
                  {videos.map((video, index) => {
                    const isActive = video.id === activeVideoId;
                    const isLoading = loadingVideoId === video.id;

                    return (
                      <button
                        key={video.id}
                        type="button"
                        onClick={() => void handleSelectVideo(video)}
                        className={[
                          "group inline-flex min-w-[120px] items-center gap-3 rounded-full border px-4 py-3 text-left transition duration-200",
                          isActive
                            ? "border-forest bg-forest text-white shadow-[0_12px_32px_rgba(25,51,45,0.22)]"
                            : "border-forest/10 bg-white text-forest hover:-translate-y-0.5 hover:border-ember/40 hover:bg-[#fff7ee]"
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                            isActive
                              ? "bg-white text-forest"
                              : "bg-mist text-forest"
                          ].join(" ")}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">
                            Session {index + 1}
                          </span>
                          <span
                            className={[
                              "block truncate text-xs",
                              isActive ? "text-white/75" : "text-forest/55"
                            ].join(" ")}
                          >
                            {isLoading ? "Opening..." : formatDuration(video.durationSeconds)}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.45fr_0.85fr]">
          <div className="surface overflow-hidden px-6 py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Now playing</p>
                <h2 className="mt-3 text-2xl font-semibold text-forest">
                  {activeVideo ? activeVideo.title : "Choose a lesson to begin"}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-forest/70">
                  {activeVideo?.description ??
                    "Select one of the numbered lessons above to load its private playback link here."}
                </p>
              </div>
              {activeVideo ? (
                <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-forest/60">
                  <span className="rounded-full bg-mist px-4 py-2">
                    Lesson {activeVideoIndex + 1}
                  </span>
                  <span className="rounded-full bg-mist px-4 py-2">
                    {formatDuration(activeVideo.durationSeconds)}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="mt-6 overflow-hidden rounded-[30px] border border-forest/10 bg-[#f6efe5] p-3 shadow-inner">
              <div className="aspect-video overflow-hidden rounded-[24px] bg-forest">
                {activeVideoUrl && activeVideo ? (
                  <video
                    key={activeVideoUrl}
                    className="h-full w-full bg-black object-contain"
                    src={activeVideoUrl}
                    controls
                    autoPlay
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(246,178,107,0.18),transparent_45%),linear-gradient(135deg,#17342d_0%,#1d443a_45%,#294f45_100%)] px-6 text-center text-white">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                      <PlayCircle className="h-9 w-9" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold">
                      Your next Roop Veda session starts here
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">
                      Pick one of the oval lesson buttons above to load the
                      video player.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {statusMessage ? (
              <p className="mt-4 text-sm text-forest/70">{statusMessage}</p>
            ) : null}
          </div>

          <aside className="surface px-6 py-6">
            <p className="eyebrow">Member access</p>
            <h2 className="mt-4 text-2xl font-semibold text-forest">
              Keep your login close
            </h2>
            <p className="mt-3 text-sm leading-7 text-forest/70">
              Send your access link to email or WhatsApp so your sessions stay
              easy to open from any device.
            </p>

            <div className="mt-6 rounded-[26px] border border-forest/10 bg-[#fffaf4] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mist text-forest">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-forest">
                    Practice rhythm
                  </p>
                  <p className="text-sm text-forest/60">
                    Follow the lesson order for the smoothest experience.
                  </p>
                </div>
              </div>
            </div>

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
          </aside>
        </section>
      </div>
    </main>
  );
}
