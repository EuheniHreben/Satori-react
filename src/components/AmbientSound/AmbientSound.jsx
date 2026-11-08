
import { useEffect, useRef } from "react";
import findActiveBackground from "../../utils/findActiveBackground";

function AmbientSound({ isStarted, activeSeason, activeTime }) {
  const audioCtxRef = useRef(null);
  const activeSourceRef = useRef(null);
  const activeGainNodeRef = useRef(null);
  const stopTimeoutRef = useRef(null);

  const FADE_DURATION = 20;

  const activeSound = findActiveBackground({ activeSeason, activeTime });
  const currentTrackUrl = activeSound?.sound;

  // Создание и закрытие аудиосистемы
  useEffect(() => {
    if (!isStarted) return;

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    const ctx = new AudioContextClass({ latencyHint: "playback" });
    audioCtxRef.current = ctx;

    return () => {
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = null;
      }

      activeSourceRef.current?.stop();
      activeSourceRef.current = null;
      activeGainNodeRef.current = null;

      if (ctx.state !== "closed") {
        ctx.close();
      }

      audioCtxRef.current = null;
    };
  }, [isStarted]);

  // Загрузка и переключение звуков
  useEffect(() => {
    if (!isStarted || !audioCtxRef.current || !currentTrackUrl) return;

    const ctx = audioCtxRef.current;
    let isCancelled = false;

    const oldSource = activeSourceRef.current;
    const oldGainNode = activeGainNodeRef.current;

    // Отменяем предыдущий таймер остановки
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }

    // Плавное затухание предыдущего звука
    if (oldSource && oldGainNode) {
      oldGainNode.gain.cancelAndHoldAtTime(ctx.currentTime);

      oldGainNode.gain.linearRampToValueAtTime(
        0,
        ctx.currentTime + FADE_DURATION
      );

      stopTimeoutRef.current = setTimeout(() => {
        try {
          oldSource.stop();
        } catch (error) {
          // Источник уже остановлен
        }

        oldSource.disconnect();
        oldGainNode.disconnect();
      }, FADE_DURATION * 1000);
    }

    // Создаём новый регулятор громкости
    const newGainNode = ctx.createGain();
    newGainNode.gain.setValueAtTime(0, ctx.currentTime);
    newGainNode.connect(ctx.destination);

    async function loadTrack() {
      try {
        const response = await fetch(currentTrackUrl);

        if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

        if (isCancelled || ctx.state === "closed") {
          newGainNode.disconnect();
          return;
        }

        const newSource = ctx.createBufferSource();

        newSource.buffer = audioBuffer;
        newSource.loop = true;
        newSource.connect(newGainNode);
        newSource.start(0);

        newGainNode.gain.setValueAtTime(0, ctx.currentTime);
        newGainNode.gain.linearRampToValueAtTime(
          1,
          ctx.currentTime + FADE_DURATION
        );

        activeSourceRef.current = newSource;
        activeGainNodeRef.current = newGainNode;
      } catch (error) {
        if (!isCancelled) {
          console.error("Ошибка смены эмбиента:", error);
          newGainNode.disconnect();
        }
      }
    }

    loadTrack();

    return () => {
      isCancelled = true;
    };
  }, [isStarted, currentTrackUrl]);

  return null;
}

export default AmbientSound;
