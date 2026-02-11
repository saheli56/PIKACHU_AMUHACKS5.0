"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Copy, Share2, Check, Sparkles } from "lucide-react";
import html2canvas from "html2canvas";
import ShareableCard from "./ShareableCard";
import { CivicProfile, Metrics, WorldState } from "@/lib/types";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: CivicProfile;
    metrics: Metrics;
    worldState: WorldState;
    choiceCount: number;
}

export default function ShareModal({
    isOpen,
    onClose,
    profile,
    metrics,
    worldState,
    choiceCount,
}: ShareModalProps) {
    const captureRef = useRef<HTMLDivElement>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    const cardProps = { profile, metrics, worldState, choiceCount };

    const captureCard = useCallback(async (): Promise<HTMLCanvasElement | null> => {
        if (!captureRef.current) return null;
        setIsCapturing(true);
        try {
            const canvas = await html2canvas(captureRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#0c0a1a",
                logging: false,
            });
            return canvas;
        } catch (err) {
            console.error("Failed to capture card:", err);
            return null;
        } finally {
            setIsCapturing(false);
        }
    }, []);

    const handleDownload = useCallback(async () => {
        const canvas = await captureCard();
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = `civic-mirror-${profile.archetype}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2500);
    }, [captureCard, profile.archetype]);

    const handleCopy = useCallback(async () => {
        const canvas = await captureCard();
        if (!canvas) return;

        try {
            canvas.toBlob(async (blob) => {
                if (!blob) return;
                await navigator.clipboard.write([
                    new ClipboardItem({ "image/png": blob }),
                ]);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
            }, "image/png");
        } catch {
            handleDownload();
        }
    }, [captureCard, handleDownload]);

    const handleShare = useCallback(async () => {
        const canvas = await captureCard();
        if (!canvas) return;

        canvas.toBlob(async (blob) => {
            if (!blob) return;

            const file = new File([blob], `civic-mirror-${profile.archetype}.png`, {
                type: "image/png",
            });

            if (navigator.share && navigator.canShare?.({ files: [file] })) {
                try {
                    await navigator.share({
                        title: `I'm "${profile.title}" — Civic Mirror`,
                        text: `I just discovered my civic archetype! Take the Civic Mirror simulation to discover yours.`,
                        files: [file],
                    });
                } catch {
                    // User cancelled
                }
            } else {
                handleDownload();
            }
        }, "image/png");
    }, [captureCard, profile, handleDownload]);

    return (
        <>
            {/* ═══════════════════════════════════════════
          OFF-SCREEN capture card — full 1200×630, no transform
          This is positioned far off-screen so the user never sees it,
          but html2canvas can capture it at full resolution.
         ═══════════════════════════════════════════ */}
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: -10000,
                        width: 1200,
                        height: 630,
                        zIndex: -1,
                        overflow: "hidden",
                    }}
                    aria-hidden="true"
                >
                    <ShareableCard ref={captureRef} {...cardProps} />
                </div>
            )}

            {/* ═══════════════════════════════════════════
          Modal overlay
         ═══════════════════════════════════════════ */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
                            onClick={onClose}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div className="relative w-full max-w-2xl pointer-events-auto">
                                <div className="rounded-3xl border border-stone-200/60 bg-white shadow-2xl overflow-hidden">
                                    {/* Header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="h-4 w-4 text-indigo-500" />
                                            <h3 className="text-sm font-bold text-stone-800">
                                                Share Your Civic Profile
                                            </h3>
                                        </div>
                                        <button
                                            onClick={onClose}
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-all hover:bg-stone-200 hover:text-stone-700 cursor-pointer"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* Card preview — separate instance, NOT the one we capture */}
                                    <div className="px-6 py-5 bg-gradient-to-br from-stone-50 to-stone-100/50">
                                        <div
                                            className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-stone-200/50"
                                            style={{
                                                width: "100%",
                                                aspectRatio: "1200 / 630",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 1200,
                                                    height: 630,
                                                    transform: "scale(var(--preview-scale))",
                                                    transformOrigin: "top left",
                                                }}
                                                ref={(el) => {
                                                    if (el) {
                                                        const parent = el.parentElement;
                                                        if (parent) {
                                                            const scale = parent.clientWidth / 1200;
                                                            el.style.setProperty("--preview-scale", String(scale));
                                                        }
                                                    }
                                                }}
                                            >
                                                {/* Preview-only card (no ref — not captured) */}
                                                <ShareableCard {...cardProps} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex flex-col gap-3 px-6 py-5">
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleDownload}
                                                disabled={isCapturing}
                                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl hover:from-indigo-600 hover:to-purple-600 active:scale-[0.97] disabled:opacity-60 cursor-pointer"
                                            >
                                                {downloaded ? (
                                                    <>
                                                        <Check className="h-4 w-4" />
                                                        Saved!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download className="h-4 w-4" />
                                                        Download PNG
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                onClick={handleCopy}
                                                disabled={isCapturing}
                                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:shadow-md active:scale-[0.97] disabled:opacity-60 cursor-pointer"
                                            >
                                                {copied ? (
                                                    <>
                                                        <Check className="h-4 w-4 text-emerald-500" />
                                                        <span className="text-emerald-600">Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="h-4 w-4" />
                                                        Copy Image
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        <button
                                            onClick={handleShare}
                                            disabled={isCapturing}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/60 px-5 py-3 text-sm font-semibold text-indigo-600 transition-all hover:bg-indigo-100/60 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                                        >
                                            <Share2 className="h-4 w-4" />
                                            Share via...
                                        </button>

                                        {isCapturing && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center text-xs text-stone-400"
                                            >
                                                Generating your card...
                                            </motion.p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
