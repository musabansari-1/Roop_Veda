"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  Disc3,
  Lock,
  LogOut,
  Mail,
  PlayCircle,
  Share2
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
          <div className="flex flex-col gap-6 border-b border-forest/10 pb-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="eyebrow">Member area</p>
              <h1 className="mt-4 font-display text-4xl text-forest sm:text-5xl">
                Roop Veda videos
              </h1>
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

          {loading ? (
            <p className="pt-6 text-sm text-forest/70">Loading your library...</p>
          ) : videos.length === 0 ? (
            <div className="mt-6 rounded-[28px] border border-dashed border-forest/15 bg-white/80 px-5 py-8 text-sm text-forest/75">
              No videos are published yet. Add records to the `Video` table and
              keep the matching assets in your GCS bucket.
            </div>
          ) : (
            <div className="mt-6">
              <div className="rounded-[30px] border border-forest/10 bg-[#fbf4ea] p-4">
                <p className="eyebrow px-2">Program</p>
                <div className="mt-4 flex flex-wrap items-stretch gap-3 overflow-x-auto pb-2">
                  {videos.map((video, index) => {
                    const isActive = video.id === activeVideoId;
                    const isLoading = loadingVideoId === video.id;
                    const isCompleted = activeVideoIndex > index;
                    const isLocked = activeVideoIndex >= 0 && index > activeVideoIndex + 1;

                    const statusIcon = isActive ? (
                      <Disc3 className="h-4 w-4 animate-spin [animation-duration:3s]" />
                    ) : isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : isLocked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Disc3 className="h-3.5 w-3.5" />
                    );

                    return (
                      <button
                        key={video.id}
                        type="button"
                        onClick={() => {
                          if (!isLocked) {
                            void handleSelectVideo(video);
                          }
                        }}
                        disabled={isLocked}
                        className={[
                          "group inline-flex h-[138px] w-[68px] shrink-0 flex-col items-center justify-between rounded-[999px] border px-1 py-3 text-center transition duration-200",
                          isActive
                            ? "border-forest bg-forest text-white shadow-[0_12px_32px_rgba(25,51,45,0.18)]"
                            : isLocked
                              ? "border-forest/10 bg-[#f4eee5] text-forest/40"
                              : "border-forest/10 bg-white text-forest hover:-translate-y-0.5 hover:border-ember/40 hover:bg-[#fff7ee]"
                        ].join(" ")}
                      >
                        <span className="relative block h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/70">
                          <Image
                            src="/session-thumb.svg"
                            alt={`Session ${index + 1}`}
                            fill
                            sizes="40px"
                            className={isLocked ? "object-cover opacity-60" : "object-cover"}
                          />
                        </span>
                        <span className="text-[11px] font-semibold tracking-[0.16em]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={[
                            "flex h-5 w-5 items-center justify-center rounded-full",
                            isActive
                              ? "bg-white/15 text-white"
                              : isCompleted
                                ? "bg-[#eaf7ee] text-[#2f7d46]"
                                : isLocked
                                  ? "bg-white/70 text-forest/45"
                                  : "bg-mist text-forest/70"
                          ].join(" ")}
                        >
                          {statusIcon}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 rounded-[30px] border border-forest/10 bg-white p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="eyebrow">Now playing</p>
                    <h2 className="mt-3 text-2xl font-semibold text-forest">
                      {activeVideo ? activeVideo.title : "Choose a lesson to begin"}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-forest/70">
                      {activeVideo?.description ?? "Select a lesson to load its private playback link here."}
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
                          Pick one of the lesson ovals to load the video player.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {statusMessage ? (
                  <p className="mt-4 text-sm text-forest/70">{statusMessage}</p>
                ) : null}
              </div>
            </div>
          )}
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.45fr_0.85fr]">
          <div className="surface px-6 py-6">
            <p className="eyebrow">Access</p>
            <h2 className="mt-4 text-2xl font-semibold text-forest">
              Share your login link
            </h2>
            <p className="mt-3 text-sm leading-7 text-forest/70">
              Send your access link to email or WhatsApp so your sessions stay
              easy to open from any device.
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
          </div>

          <aside className="surface px-6 py-6">
            <p className="eyebrow">Member access</p>
            <div className="mt-4 rounded-[26px] border border-forest/10 bg-[#fffaf4] p-5">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-semibold text-forest">Quick share</p>
                  <p className="text-sm text-forest/60">
                    Open your member area on another device in one tap.
                  </p>
                </div>
              </div>
            </div>
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
