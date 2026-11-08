// Создаёт начальное состояние таймера
export function createInitialTimerState() {
  return {
    status: "idle",
    phase: "work",
    currentCycle: 1,
    remainingMs: 0,
    phaseDurationMs: 0,
    deadline: null,
  };
}

// Переводит минуты в миллисекунды
export function minutesToMs(minutes) {
  return minutes * 60 * 1000;
}

// Запускает текущую фазу
export function startTimer(state, settings, now = Date.now()) {
  const duration =
    state.remainingMs > 0
      ? state.remainingMs
      : minutesToMs(
          state.phase === "work"
            ? settings.workDuration
            : settings.breakDuration,
        );

  return {
    ...state,
    status: "running",
    remainingMs: duration,
    phaseDurationMs: state.phaseDurationMs || duration,
    deadline: now + duration,
  };
}

// Ставит таймер на паузу
export function pauseTimer(state, now = Date.now()) {
  if (state.status !== "running") return state;

  return {
    ...state,
    status: "paused",
    remainingMs: Math.max(0, state.deadline - now),
    deadline: null,
  };
}

// Продолжает таймер после паузы
export function resumeTimer(state, now = Date.now()) {
  if (state.status !== "paused") return state;

  return {
    ...state,
    status: "running",
    deadline: now + state.remainingMs,
  };
}

// Переход к следующей фазе
export function advancePhase(state, settings) {
  if (state.phase === "work") {
    // Последняя рабочая сессия — завершение
    if (state.currentCycle >= settings.totalCycles) {
      return {
        ...state,
        status: "completed",
        remainingMs: 0,
        deadline: null,
      };
    }

    const duration = minutesToMs(settings.breakDuration);

    return {
      ...state,
      phase: "break",
      remainingMs: duration,
      phaseDurationMs: duration,
    };
  }

  // После перерыва начинается следующая рабочая сессия
  const duration = minutesToMs(settings.workDuration);

  return {
    ...state,
    phase: "work",
    currentCycle: state.currentCycle + 1,
    remainingMs: duration,
    phaseDurationMs: duration,
  };
}

// Пропуск текущей фазы
export function skipPhase(state, settings, now = Date.now()) {
  if (state.status === "idle" || state.status === "completed") {
    return state;
  }

  const nextState = advancePhase(state, settings);

  if (nextState.status === "completed") {
    return nextState;
  }

  return {
    ...nextState,
    status: "running",
    deadline: now + nextState.remainingMs,
  };
}

// Проверяет время и автоматически переключает фазы
export function tickTimer(state, settings, now = Date.now()) {
  if (state.status !== "running") return state;

  let nextState = { ...state };

  // Цикл позволяет обработать даже несколько пропущенных фаз,
  // например, если вкладка долго находилась в фоне.
  while (
    nextState.status === "running" &&
    nextState.deadline !== null &&
    now >= nextState.deadline
  ) {
    const previousDeadline = nextState.deadline;

    nextState = advancePhase(nextState, settings);

    if (nextState.status === "completed") {
      break;
    }

    // Сохраняем точность перехода, не начиная отсчёт заново от now
    nextState.deadline = previousDeadline + nextState.remainingMs;
    nextState.remainingMs = Math.max(0, nextState.deadline - now);
  }

  if (nextState.status === "running") {
    nextState.remainingMs = Math.max(0, nextState.deadline - now);
  }

  return nextState;
}

// Полный сброс
export function resetTimer() {
  return createInitialTimerState();
}

// Получение прогресса текущей фазы: от 0 до 1
export function getTimerProgress(state, now = Date.now()) {
  if (!state.phaseDurationMs) return 0;

  const remaining =
    state.status === "running"
      ? Math.max(0, state.deadline - now)
      : state.remainingMs;

  return Math.min(1, Math.max(0, 1 - remaining / state.phaseDurationMs));
}

// Форматирование времени для цифрового таймера
export function formatTime(milliseconds) {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}`;
}
