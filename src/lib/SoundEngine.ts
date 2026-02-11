/**
 * SoundEngine — Web Audio API synthesized sounds for Civic Mirror.
 *
 * Zero external audio files. All sounds are generated programmatically
 * using oscillators, gain envelopes, and filters.
 *
 * Sound palette:
 *   • choiceSelect   — satisfying "click-confirm" tap
 *   • consequenceReveal — dramatic low rumble + chime
 *   • positiveImpact — ascending warm chime (major third)
 *   • negativeImpact — descending minor tone
 *   • neutralImpact  — single balanced tone
 *   • sceneTransition — soft whoosh sweep
 *   • milestone      — triumphant ascending arpeggio
 *   • celebration    — sparkle fanfare
 *   • hover          — ultra-subtle tick
 *   • buttonClick    — crisp tactile tap
 */

class SoundEngine {
    private ctx: AudioContext | null = null;
    private _enabled = true;
    private _volume = 0.5;

    /** Lazy-init AudioContext (must be triggered by user gesture) */
    private getCtx(): AudioContext {
        if (!this.ctx || this.ctx.state === "closed") {
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === "suspended") {
            this.ctx.resume();
        }
        return this.ctx;
    }

    get enabled() {
        return this._enabled;
    }
    set enabled(val: boolean) {
        this._enabled = val;
    }

    get volume() {
        return this._volume;
    }
    set volume(val: number) {
        this._volume = Math.max(0, Math.min(1, val));
    }

    /** Create a gain-controlled oscillator */
    private osc(
        ctx: AudioContext,
        type: OscillatorType,
        freq: number,
        startTime: number,
        duration: number,
        volume: number,
        destination?: AudioNode
    ): OscillatorNode {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type;
        o.frequency.value = freq;
        g.gain.setValueAtTime(0, startTime);
        g.gain.linearRampToValueAtTime(volume * this._volume, startTime + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        o.connect(g);
        g.connect(destination || ctx.destination);
        o.start(startTime);
        o.stop(startTime + duration);
        return o;
    }

    // ─── SOUND METHODS ───

    /** Satisfying choice selection click */
    choiceSelect() {
        if (!this._enabled) return;
        const ctx = this.getCtx();
        const now = ctx.currentTime;

        // Short percussive click
        this.osc(ctx, "sine", 800, now, 0.06, 0.3);
        this.osc(ctx, "sine", 1200, now + 0.01, 0.04, 0.15);

        // Warm confirmation tone
        this.osc(ctx, "sine", 523.25, now + 0.03, 0.15, 0.2); // C5
        this.osc(ctx, "sine", 659.25, now + 0.06, 0.15, 0.15); // E5
    }

    /** Consequence card reveal — dramatic low rumble + chime */
    consequenceReveal(mood: "positive" | "neutral" | "negative") {
        if (!this._enabled) return;
        const ctx = this.getCtx();
        const now = ctx.currentTime;

        // Soft sub-bass rumble
        this.osc(ctx, "sine", 80, now, 0.3, 0.15);

        // Mood-dependent chime
        if (mood === "positive") {
            this.osc(ctx, "sine", 523.25, now + 0.1, 0.3, 0.2); // C5
            this.osc(ctx, "sine", 659.25, now + 0.18, 0.25, 0.18); // E5
            this.osc(ctx, "sine", 783.99, now + 0.26, 0.3, 0.15); // G5
        } else if (mood === "negative") {
            this.osc(ctx, "sine", 392, now + 0.1, 0.35, 0.2); // G4
            this.osc(ctx, "sine", 349.23, now + 0.2, 0.3, 0.18); // F4
            this.osc(ctx, "sine", 311.13, now + 0.3, 0.4, 0.15); // Eb4
        } else {
            this.osc(ctx, "sine", 440, now + 0.1, 0.3, 0.18); // A4
            this.osc(ctx, "sine", 493.88, now + 0.2, 0.3, 0.15); // B4
        }
    }

    /** Positive metric change — ascending warm chime */
    positiveImpact() {
        if (!this._enabled) return;
        const ctx = this.getCtx();
        const now = ctx.currentTime;

        this.osc(ctx, "sine", 659.25, now, 0.15, 0.2); // E5
        this.osc(ctx, "sine", 783.99, now + 0.08, 0.15, 0.18); // G5
        this.osc(ctx, "triangle", 1046.5, now + 0.16, 0.2, 0.12); // C6
    }

    /** Negative metric change — descending minor */
    negativeImpact() {
        if (!this._enabled) return;
        const ctx = this.getCtx();
        const now = ctx.currentTime;

        this.osc(ctx, "sine", 440, now, 0.15, 0.15); // A4
        this.osc(ctx, "sine", 392, now + 0.1, 0.2, 0.12); // G4
        this.osc(ctx, "sine", 349.23, now + 0.2, 0.25, 0.1); // F4
    }

    /** Gentle scene transition — soft musical "page turn" */
    sceneTransition() {
        if (!this._enabled) return;
        const ctx = this.getCtx();
        const now = ctx.currentTime;

        // Soft low tone — warm foundation
        this.osc(ctx, "sine", 392, now, 0.25, 0.08);       // G4 gentle base

        // Delicate high shimmer that rises slightly
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(1174.66, now);            // D6
        o.frequency.linearRampToValueAtTime(1567.98, now + 0.2); // → G6
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.05 * this._volume, now + 0.04);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(now);
        o.stop(now + 0.3);

        // Soft fifth for depth
        this.osc(ctx, "sine", 587.33, now + 0.03, 0.2, 0.05); // D5
    }

    /** Milestone achievement — triumphant ascending arpeggio */
    milestone() {
        if (!this._enabled) return;
        const ctx = this.getCtx();
        const now = ctx.currentTime;

        // Ascending major chord arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
        notes.forEach((freq, i) => {
            this.osc(ctx, "sine", freq, now + i * 0.1, 0.4 - i * 0.05, 0.2 - i * 0.03);
            // Add harmonic shimmer
            this.osc(ctx, "triangle", freq * 2, now + i * 0.1, 0.3 - i * 0.05, 0.06);
        });

        // Final sustain chord
        this.osc(ctx, "sine", 523.25, now + 0.4, 0.5, 0.1);
        this.osc(ctx, "sine", 659.25, now + 0.4, 0.5, 0.08);
        this.osc(ctx, "sine", 783.99, now + 0.4, 0.5, 0.06);
    }

    /** Results page celebration — sparkle fanfare */
    celebration() {
        if (!this._enabled) return;
        const ctx = this.getCtx();
        const now = ctx.currentTime;

        // Quick sparkle arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5 E5 G5 C6 E6
        notes.forEach((freq, i) => {
            this.osc(ctx, "sine", freq, now + i * 0.08, 0.3, 0.15 - i * 0.02);
            this.osc(ctx, "triangle", freq * 1.5, now + i * 0.08 + 0.02, 0.2, 0.04);
        });

        // Warm pad sustain
        this.osc(ctx, "sine", 261.63, now + 0.5, 0.8, 0.08); // C4
        this.osc(ctx, "sine", 329.63, now + 0.5, 0.8, 0.06); // E4
        this.osc(ctx, "sine", 392, now + 0.5, 0.8, 0.05); // G4
    }

    /** Ultra-subtle hover tick */
    hover() {
        if (!this._enabled) return;
        const ctx = this.getCtx();
        const now = ctx.currentTime;

        this.osc(ctx, "sine", 1400, now, 0.025, 0.06);
    }

    /** Crisp button click */
    buttonClick() {
        if (!this._enabled) return;
        const ctx = this.getCtx();
        const now = ctx.currentTime;

        this.osc(ctx, "sine", 600, now, 0.04, 0.15);
        this.osc(ctx, "sine", 900, now + 0.015, 0.03, 0.1);
    }
}

// Singleton
const soundEngine = new SoundEngine();
export default soundEngine;
