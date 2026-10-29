(function () {
  var KEY = "wwb-path";
  var DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var FULL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var WALK15 = "dBFaMAt03H0";
  var RUN11 = "LoekdHVrcfg";
  var RUN11B = "_x-SHUZc798";
  var START = "H055zh-W-Ko";
  var S1 = "zY3TrmlFyi4";
  var S2 = "rWTsU-MiZ6A";
  var S3 = "11t0Mn0wIrY";
  var S4 = "xMM_8R4kNsw";
  var S5 = "iM2a2mTZupo";
  var S6 = "NwLK-FMQryE";
  var S7 = "upwfALlN7Gc";

  var SHORT = {};
  SHORT[WALK15] = "15 min wellness walk";
  SHORT[RUN11] = "11 min walk + run";
  SHORT[RUN11B] = "11 min walk + run";
  SHORT[START] = "Start here · run + walk";
  SHORT[S1] = "Get fit · Session 1";
  SHORT[S2] = "Get fit · Session 2";
  SHORT[S3] = "Get fit · Session 3";
  SHORT[S4] = "Get fit · Session 4";
  SHORT[S5] = "Get fit · Session 5";
  SHORT[S6] = "Get fit · Session 6";
  SHORT[S7] = "Get fit · Session 7";

  var CORE = [WALK15, RUN11, RUN11B, START, S1, S2, S3, S4, S5, S6, S7];

  var GOALS = [
    { id: "consistent", label: "Stay consistent 5–6 days per week" },
    { id: "calories", label: "Burn calories and support weight loss" },
    { id: "strength", label: "Build strength and endurance" },
    { id: "confident", label: "Feel stronger, healthier, and more confident" },
    { id: "sleep", label: "Get 7–8 hours of sleep" },
    { id: "celebrate", label: "Celebrate progress" }
  ];

  var HABITS = [
    { id: "water", label: "Water", hint: "64–100 oz", icon: "water_drop" },
    { id: "protein", label: "Protein", hint: "High protein meals", icon: "restaurant" },
    { id: "move", label: "Move", hint: "30+ minutes", icon: "directions_walk" },
    { id: "sleep", label: "Sleep", hint: "7–8 hours", icon: "bedtime" },
    { id: "prayer", label: "Prayer", hint: "Affirmations", icon: "favorite" }
  ];

  var MOODS = [
    { id: "grounded", label: "Grounded", icon: "nature_people" },
    { id: "calm", label: "Calm", icon: "spa" },
    { id: "restless", label: "Restless", icon: "air" },
    { id: "fatigued", label: "Fatigued", icon: "bedtime" },
    { id: "inspired", label: "Inspired", icon: "wb_twilight" }
  ];

  var KINDS = {
    session: { label: "Get fit", color: "#80475e" },
    run: { label: "Walk + run", color: "#c97194" },
    walk: { label: "Wellness walk", color: "#bfa4a4" },
    start: { label: "Start here", color: "#d1abad" },
    rest: { label: "Rest", color: "#e3b9bc" },
    finish: { label: "Done", color: "#80475e" },
    library: { label: "Video", color: "#c97194" },
    open: { label: "Open", color: "#e3b9bc" }
  };

  function videos() {
    return { videos: Array.prototype.slice.call(arguments) };
  }

  function restDay() {
    return { rest: true, label: "Rest & refuel", note: "Stretch · Pray · Hydrate" };
  }

  function finishDay() {
    return { finish: true, label: "You did it", note: "Celebrate · Reflect · Set your next goal" };
  }

  function emptyWeek() {
    return [{ videos: [] }, { videos: [] }, { videos: [] }, { videos: [] }, { videos: [] }, { videos: [] }, { videos: [] }];
  }

  var paths = [
    {
      id: "weight-loss",
      title: "8 week weight loss",
      kicker: "Bre's path",
      summary: "Walk, run, and the seven Get Fit sessions, in the order Bre laid out. Sundays are for rest.",
      weeks: [
        { title: "Week 1", theme: "Build the habit", days: [videos(WALK15), videos(S1), videos(RUN11, S1), videos(WALK15), videos(S2), videos(RUN11, S2), restDay()] },
        { title: "Week 2", theme: "Move with confidence", days: [videos(RUN11, WALK15), videos(S2), videos(WALK15), videos(S3), videos(WALK15), videos(START), restDay()] },
        { title: "Week 3", theme: "Increase endurance", days: [videos(WALK15), videos(S3), videos(RUN11, S3), videos(WALK15), videos(S4), videos(RUN11, WALK15), restDay()] },
        { title: "Week 4", theme: "Build strength", days: [videos(START), videos(S4), videos(WALK15), videos(S5), videos(RUN11), videos(S5), restDay()] },
        { title: "Week 5", theme: "Level up", days: [videos(WALK15), videos(S5), videos(RUN11, S5), videos(WALK15), videos(S6), videos(START), restDay()] },
        { title: "Week 6", theme: "Get stronger", days: [videos(RUN11), videos(S6), videos(WALK15), videos(S7), videos(RUN11, S7), videos(WALK15), restDay()] },
        { title: "Week 7", theme: "Push further", days: [videos(START), videos(S1), videos(RUN11, S1), videos(WALK15), videos(S3), videos(RUN11, WALK15), restDay()] },
        { title: "Week 8", theme: "Finish strong", days: [videos(WALK15), videos(S4), videos(RUN11, S6), videos(WALK15), videos(S7), videos(START), finishDay()] }
      ]
    },
    {
      id: "stronger",
      title: "Stronger & healthier",
      kicker: "Bre's path",
      summary: "The same videos, arranged so strength sessions and rest days fall on a different rhythm.",
      weeks: [
        { title: "Week 1", theme: "Build the habit", goal: "Show up and get moving", days: [videos(WALK15), videos(S1), videos(RUN11), videos(S1), videos(RUN11B), restDay(), videos(START)] },
        { title: "Week 2", theme: "Move with confidence", goal: "Build endurance", days: [videos(S2), videos(RUN11), videos(S2), videos(WALK15), videos(S2), videos(START), restDay()] },
        { title: "Week 3", theme: "Increase endurance", goal: "Go a little further", days: [videos(WALK15), videos(S3), videos(RUN11), videos(S3), videos(WALK15), videos(S4), restDay()] },
        { title: "Week 4", theme: "Build strength", goal: "Get stronger", days: [videos(START), videos(S4), videos(WALK15), videos(S5), videos(RUN11), videos(S5), restDay()] },
        { title: "Week 5", theme: "Level up", goal: "Push your limits", days: [videos(WALK15), videos(S6), videos(RUN11), videos(S6), videos(WALK15), videos(START), restDay()] },
        { title: "Week 6", theme: "Get stronger", goal: "Feel the change", days: [videos(RUN11), videos(S1), videos(WALK15), videos(S7), videos(RUN11B), videos(S3), restDay()] },
        { title: "Week 7", theme: "Finish stronger", goal: "Celebrate you", days: [videos(START), videos(S4), videos(RUN11), videos(S6), videos(WALK15), videos(S7), restDay()] }
      ]
    },
    {
      id: "custom",
      title: "Your path",
      kicker: "Build it yourself",
      summary: "Eight open weeks. Pick the video for each day from Bre's library, or mark the day for rest.",
      built: true,
      weeks: [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
        return { title: "Week " + n, theme: "Your plan", days: emptyWeek() };
      })
    }
  ];

  function blank() {
    return {
      pathId: null,
      startedOn: null,
      completed: {},
      customDays: {},
      goals: {},
      habits: {},
      moods: {},
      journal: {},
      notes: "",
      wins: {},
      feelings: {}
    };
  }

  function load() {
    var state = blank();
    try {
      var parsed = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!parsed || typeof parsed !== "object") return state;
      state.pathId = typeof parsed.pathId === "string" ? parsed.pathId : null;
      state.startedOn = typeof parsed.startedOn === "string" ? parsed.startedOn : null;
      state.completed = parsed.completed && typeof parsed.completed === "object" ? parsed.completed : {};
      state.customDays = parsed.customDays && typeof parsed.customDays === "object" ? parsed.customDays : {};
      state.goals = parsed.goals && typeof parsed.goals === "object" ? parsed.goals : {};
      state.habits = parsed.habits && typeof parsed.habits === "object" ? parsed.habits : {};
      state.moods = parsed.moods && typeof parsed.moods === "object" ? parsed.moods : {};
      state.journal = parsed.journal && typeof parsed.journal === "object" ? parsed.journal : {};
      state.notes = typeof parsed.notes === "string" ? parsed.notes : "";
      state.wins = parsed.wins && typeof parsed.wins === "object" ? parsed.wins : {};
      state.feelings = parsed.feelings && typeof parsed.feelings === "object" ? parsed.feelings : {};
      if (state.notes && !Object.keys(state.journal).length) {
        state.journal[iso(new Date())] = state.notes;
        state.notes = "";
        save(state);
      }
    } catch (e) {
      return blank();
    }
    return state;
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function findPath(id) {
    for (var i = 0; i < paths.length; i++) {
      if (paths[i].id === id) return paths[i];
    }
    return null;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function iso(date) {
    var month = String(date.getMonth() + 1);
    var day = String(date.getDate());
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return date.getFullYear() + "-" + month + "-" + day;
  }

  function parseISO(value) {
    var parts = value.split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function mondayOf(date) {
    var day = startOfDay(date);
    var weekday = day.getDay();
    var delta = weekday === 0 ? -6 : 1 - weekday;
    day.setDate(day.getDate() + delta);
    return day;
  }

  function weekdayIndex(date) {
    var weekday = startOfDay(date).getDay();
    return weekday === 0 ? 6 : weekday - 1;
  }

  function cellDate(startedOn, week, day) {
    var anchor = mondayOf(startedOn ? parseISO(startedOn) : new Date());
    var date = new Date(anchor);
    date.setDate(anchor.getDate() + week * 7 + day);
    return date;
  }

  function kindFor(item) {
    if (!item) return "open";
    if (item.rest) return "rest";
    if (item.finish) return "finish";
    if (item.videoId === WALK15) return "walk";
    if (item.videoId === RUN11 || item.videoId === RUN11B) return "run";
    if (item.videoId === START) return "start";
    if (SHORT[item.videoId]) return "session";
    return "library";
  }

  function position(state, date) {
    var today = startOfDay(date || new Date());
    var start = state.startedOn ? parseISO(state.startedOn) : today;
    var diff = Math.round((today - mondayOf(start)) / 86400000);
    if (diff < 0) diff = 0;
    return { week: Math.floor(diff / 7), day: diff % 7, date: today };
  }

  function slotKey(pathId, week, day, index) {
    return pathId + ":" + week + ":" + day + ":" + index;
  }

  function itemsFor(path, state, week, day) {
    if (path.built) {
      var saved = state.customDays[week + ":" + day];
      if (!saved) return [];
      if (saved.rest) return [{ rest: true, label: "Rest & refuel", note: "Stretch · Pray · Hydrate" }];
      if (saved.finish) return [{ finish: true, label: "You did it", note: "Celebrate · Reflect · Set your next goal" }];
      return (saved.videos || []).slice(0, 2).map(function (id) { return { videoId: id }; });
    }
    var cell = path.weeks[week].days[day];
    if (cell.rest) return [{ rest: true, label: cell.label, note: cell.note }];
    if (cell.finish) return [{ finish: true, label: cell.label, note: cell.note }];
    return (cell.videos || []).map(function (id) { return { videoId: id }; });
  }

  function videoMeta(id) {
    var video = window.WWB && WWB.find(id);
    return {
      id: id,
      short: SHORT[id] || (video ? video.title : "Video"),
      title: video ? video.title : (SHORT[id] || "Video"),
      duration: video ? video.duration : "",
      thumb: window.WWB ? WWB.thumb(id) : "",
      href: "../workout_player/code.html?v=" + encodeURIComponent(id)
    };
  }

  function progress(path, state) {
    var total = 0;
    var done = 0;
    path.weeks.forEach(function (week, weekIndex) {
      week.days.forEach(function (_, dayIndex) {
        itemsFor(path, state, weekIndex, dayIndex).forEach(function (_, itemIndex) {
          total += 1;
          if (state.completed[slotKey(path.id, weekIndex, dayIndex, itemIndex)]) done += 1;
        });
      });
    });
    return { done: done, total: total };
  }

  function formatLong(date) {
    return date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  }

  function checkIcon(on) {
    return on ? "check_box" : "check_box_outline_blank";
  }

  function itemLabel(item) {
    if (item.videoId) return videoMeta(item.videoId);
    if (item.rest) return { short: item.label, title: item.label, duration: item.note, thumb: "", href: "" };
    return { short: item.label, title: item.label, duration: item.note, thumb: "", href: "" };
  }

  function renderItem(path, state, week, day, item, index, editable) {
    var meta = itemLabel(item);
    var key = slotKey(path.id, week, day, index);
    var done = Boolean(state.completed[key]);
    var kind = KINDS[kindFor(item)];
    var play = meta.href
      ? '<a class="shrink-0 w-10 h-10 rounded-full bg-primary text-on-primary inline-flex items-center justify-center" href="' + meta.href + '" aria-label="Play ' + escapeHtml(meta.short) + '"><span class="material-symbols-outlined text-[20px]">play_arrow</span></a>'
      : "";
    var remove = editable && item.videoId
      ? '<button type="button" class="shrink-0 w-10 h-10 inline-flex items-center justify-center text-on-surface-variant" data-action="remove-video" data-week="' + week + '" data-day="' + day + '" data-index="' + index + '" aria-label="Remove ' + escapeHtml(meta.short) + '"><span class="material-symbols-outlined text-[18px]">close</span></button>'
      : "";
    var thumb = meta.thumb
      ? '<img alt="" class="w-14 h-10 rounded-lg object-cover shrink-0 bg-surface-container" src="' + meta.thumb + '"/>'
      : '<span class="w-14 h-10 rounded-lg shrink-0 inline-flex items-center justify-center text-white" style="background:' + kind.color + '"><span class="material-symbols-outlined text-[18px]">' + (item.finish ? "celebration" : "self_improvement") + "</span></span>";
    return (
      '<div class="flex items-center gap-2">' +
        '<button type="button" class="shrink-0 w-10 h-10 inline-flex items-center justify-center" style="color:' + kind.color + '" data-action="toggle" data-key="' + key + '" aria-pressed="' + done + '" aria-label="' + (done ? "Mark not done" : "Mark done") + ": " + escapeHtml(meta.short) + '"><span class="material-symbols-outlined text-[22px]">' + checkIcon(done) + "</span></button>" +
        '<span class="w-1 self-stretch rounded-full shrink-0" style="background:' + kind.color + '"></span>' +
        thumb +
        '<span class="min-w-0 flex-1">' +
          '<span class="block font-body-sm text-body-sm text-on-surface font-semibold leading-snug clamp-2' + (done ? " line-through" : "") + '">' + escapeHtml(meta.short) + "</span>" +
          '<span class="block font-label-sm text-label-sm text-secondary mt-0.5">' + escapeHtml(kind.label + (meta.duration ? " · " + meta.duration : "")) + "</span>" +
        "</span>" +
        play +
        remove +
      "</div>"
    );
  }

  function renderHero(path, state, week, day, item, index) {
    if (!item.videoId) return renderItem(path, state, week, day, item, index, false);
    var meta = videoMeta(item.videoId);
    var key = slotKey(path.id, week, day, index);
    var done = Boolean(state.completed[key]);
    var kind = KINDS[kindFor(item)];
    return (
      '<article class="rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm">' +
        '<a class="block relative" href="' + meta.href + '">' +
          '<img alt="" class="w-full object-cover" style="aspect-ratio:16/9" src="' + meta.thumb + '"/>' +
          '<span class="absolute left-3 top-3 px-2.5 py-1 rounded-full font-label-sm text-label-sm text-white" style="background:' + kind.color + '">' + escapeHtml(kind.label) + "</span>" +
          '<span class="absolute right-3 top-3 px-2.5 py-1 rounded-full bg-surface/90 font-label-sm text-label-sm text-on-surface">' + escapeHtml(meta.duration) + "</span>" +
        "</a>" +
        '<div class="p-space-md flex items-start gap-2">' +
          '<button type="button" class="shrink-0 w-10 h-10 inline-flex items-center justify-center" style="color:' + kind.color + '" data-action="toggle" data-key="' + key + '" aria-pressed="' + done + '" aria-label="' + (done ? "Mark not done" : "Mark done") + ": " + escapeHtml(meta.short) + '"><span class="material-symbols-outlined text-[24px]">' + checkIcon(done) + "</span></button>" +
          '<span class="min-w-0 flex-1 pt-1">' +
            '<h2 class="font-headline-sm text-headline-sm text-primary leading-tight' + (done ? " line-through" : "") + '">' + escapeHtml(meta.short) + "</h2>" +
            '<p class="font-body-sm text-body-sm text-on-surface-variant mt-1 clamp-2">' + escapeHtml(meta.title) + "</p>" +
          "</span>" +
        "</div>" +
        '<div class="px-space-md pb-space-md"><a class="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md" href="' + meta.href + '">Play <span class="material-symbols-outlined text-[18px]">play_arrow</span></a></div>' +
      "</article>"
    );
  }

  function renderToday(root) {
    var state = load();
    var path = findPath(state.pathId);
    if (!path || !state.startedOn) {
      root.innerHTML = renderChooser("today");
      return;
    }
    var pos = position(state);
    if (pos.week >= path.weeks.length) {
      root.innerHTML = renderFinished(path, state);
      return;
    }
    var week = path.weeks[pos.week];
    var items = itemsFor(path, state, pos.week, pos.day);
    var stats = progress(path, state);
    var blocks = [];
    blocks.push(
      '<div class="space-y-1">' +
        '<p class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">' + escapeHtml(path.title) + " · " + escapeHtml(week.title) + "</p>" +
        '<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">' + FULL_DAYS[pos.day] + "</h1>" +
        '<p class="font-body-sm text-body-sm text-on-surface-variant">' + escapeHtml(pos.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })) + " · " + escapeHtml(week.theme) + (week.goal ? " · " + escapeHtml(week.goal) : "") + "</p>" +
      "</div>"
    );
    blocks.push(renderProgress(stats));
    blocks.push(renderWeekDots(path, state, pos));
    if (!items.length) {
      blocks.push(
        '<div class="rounded-xl p-space-md space-y-3 bg-surface-container-lowest shadow-sm">' +
          '<p class="font-headline-sm text-headline-sm text-primary">This day is open</p>' +
          '<p class="font-body-sm text-body-sm text-on-surface-variant">Choose the video you want with Bre today.</p>' +
          '<a class="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md" href="../coaching/code.html#custom/' + pos.week + "-" + pos.day + '">Choose a video</a>' +
        "</div>"
      );
    } else if (items[0].rest || items[0].finish) {
      var restKey = slotKey(path.id, pos.week, pos.day, 0);
      var rested = Boolean(state.completed[restKey]);
      var kind = KINDS[kindFor(items[0])];
      blocks.push(
        '<section class="rounded-xl p-space-md shadow-sm space-y-3" style="background:' + kind.color + '22" aria-label="Today on the path">' +
          '<p class="font-label-sm text-label-sm uppercase tracking-widest" style="color:' + kind.color + '">' + escapeHtml(kind.label) + "</p>" +
          '<h2 class="font-headline-sm text-headline-sm text-primary">' + escapeHtml(items[0].label) + "</h2>" +
          '<p class="font-body-md text-body-md text-on-surface-variant">' + escapeHtml(items[0].note) + "</p>" +
          '<button type="button" class="inline-flex items-center justify-center w-full py-3 rounded-full font-label-md text-label-md text-white" style="background:' + kind.color + '" data-action="toggle" data-key="' + restKey + '">' + (rested ? "Marked" : items[0].finish ? "Celebrate" : "Mark rest day") + "</button>" +
        "</section>"
      );
    } else {
      blocks.push('<div class="space-y-3" aria-label="Today on the path">' + items.map(function (item, index) {
        if (index === 0) return renderHero(path, state, pos.week, pos.day, item, index);
        return '<div class="rounded-xl bg-surface-container-lowest shadow-sm p-3">' + renderItem(path, state, pos.week, pos.day, item, index, false) + "</div>";
      }).join("") + "</div>");
    }
    blocks.push(renderHabitToday(state, pos.date));
    var statsLabel = stats.total ? stats.done + " of " + stats.total : "Nothing scheduled yet";
    blocks.push(
      '<a class="inline-flex items-center justify-between gap-3 rounded-xl px-space-md py-3 bg-surface-container-lowest shadow-sm" href="../coaching/code.html">' +
        '<span class="font-body-sm text-body-sm text-primary font-semibold">Full path · ' + statsLabel + "</span>" +
        '<span class="material-symbols-outlined text-primary">chevron_right</span>' +
      "</a>"
    );
    root.innerHTML = blocks.join("");
  }

  function renderProgress(stats) {
    var pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
    return '<div class="rounded-full bg-surface-container overflow-hidden" style="height:6px"><div class="bg-primary-container rounded-full" style="height:6px;width:' + pct + '%"></div></div>';
  }

  function renderWeekDots(path, state, pos) {
    var cells = DAY_LABELS.map(function (label, day) {
      var items = itemsFor(path, state, pos.week, day);
      var done = items.length > 0 && items.every(function (_, index) {
        return state.completed[slotKey(path.id, pos.week, day, index)];
      });
      var kind = KINDS[items.length ? kindFor(items[0]) : "open"];
      var current = day === pos.day;
      return (
        '<span class="flex-1 flex flex-col items-center gap-1">' +
          '<span class="w-9 h-9 rounded-full inline-flex items-center justify-center font-label-sm text-label-sm ' + (current ? "bg-primary text-on-primary" : done ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-container text-on-surface-variant") + '">' + label.slice(0, 1) + "</span>" +
          '<span class="rounded-full" style="width:8px;height:8px;background:' + kind.color + '"></span>' +
        "</span>"
      );
    }).join("");
    return '<div class="flex gap-1" aria-hidden="true">' + cells + "</div>";
  }

  function renderHabitToday(state, date) {
    var dateKey = iso(date);
    var saved = state.habits[dateKey] || {};
    var buttons = HABITS.map(function (habit) {
      var on = Boolean(saved[habit.id]);
      return (
        '<button type="button" class="flex flex-col items-center gap-1 min-h-[44px]" data-action="habit" data-date="' + dateKey + '" data-habit="' + habit.id + '" aria-pressed="' + on + '">' +
          '<span class="w-11 h-11 rounded-full inline-flex items-center justify-center ' + (on ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant") + '"><span class="material-symbols-outlined text-[20px]">' + habit.icon + "</span></span>" +
          '<span class="font-label-sm text-label-sm ' + (on ? "text-primary" : "text-secondary") + '">' + habit.label + "</span>" +
        "</button>"
      );
    }).join("");
    return (
      '<section class="rounded-xl bg-surface-container-lowest shadow-sm p-space-md space-y-3" aria-label="Today habits">' +
        '<h2 class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Daily habits</h2>' +
        '<div class="flex justify-between gap-1">' + buttons + "</div>" +
      "</section>"
    );
  }

  function pathCard(path, state) {
    var dots = path.weeks[0].days.map(function (_, day) {
      var items = itemsFor(path, state, 0, day);
      var kind = KINDS[items.length ? kindFor(items[0]) : "open"];
      return '<span class="rounded-full" style="width:10px;height:10px;background:' + kind.color + '"></span>';
    }).join("");
    return (
      '<span class="block" style="height:8px;background:' + (path.built ? "#bfa4a4" : "#c97194") + '"></span>' +
      '<span class="block p-space-md space-y-2">' +
        '<span class="block font-label-sm text-label-sm uppercase tracking-widest text-secondary">' + escapeHtml(path.kicker) + " · " + path.weeks.length + " weeks</span>" +
        '<span class="block font-headline-sm text-headline-sm text-primary">' + escapeHtml(path.title) + "</span>" +
        '<span class="block font-body-sm text-body-sm text-on-surface-variant">' + escapeHtml(path.summary) + "</span>" +
        '<span class="flex gap-1.5 pt-1">' + dots + "</span>" +
      "</span>"
    );
  }

  function renderChooser(surface) {
    var state = load();
    var cards = paths.map(function (path) {
      var inner = pathCard(path, state);
      if (surface === "journey") {
        return '<button type="button" class="block w-full text-left bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden" data-action="preview" data-path="' + path.id + '">' + inner + "</button>";
      }
      return '<a class="block bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden" href="../coaching/code.html#' + path.id + '">' + inner + "</a>";
    }).join("");
    var intro = surface === "today"
      ? '<div class="space-y-1"><p class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Guiding light</p><h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">Pick a path with Bre</h1><p class="font-body-md text-body-md text-on-surface-variant">A path decides which video you watch, and on which day. Choose one Bre built, or build your own from the library.</p></div>'
      : '<div class="space-y-1"><p class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">With Bre</p><h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">Choose the path</h1><p class="font-body-md text-body-md text-on-surface-variant">The videos already live on YouTube. The path is what turns them into a journey.</p></div>';
    return intro + cards + '<a class="font-label-md text-label-md text-primary" href="../workout_player/code.html?v=F0TT_lTvk2g">Hear where Bre started</a>';
  }

  function renderFinished(path, state) {
    var stats = progress(path, state);
    return (
      '<div class="space-y-1">' +
        '<p class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">' + escapeHtml(path.title) + "</p>" +
        '<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">You finished this path</h1>' +
        '<p class="font-body-md text-body-md text-on-surface-variant">' + stats.done + " of " + stats.total + " checked. Celebrate, then pick what is next.</p>" +
      "</div>" +
      '<a class="inline-flex items-center justify-center w-full py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md" href="../coaching/code.html">See the path</a>' +
      '<button type="button" class="font-label-md text-label-md text-primary text-left" data-action="show-paths">Choose another path</button>'
    );
  }

  function renderJourney(root, ui) {
    var state = load();
    var active = findPath(state.pathId);
    if (ui.picker || (!active && !ui.previewId)) {
      root.innerHTML = renderChooser("journey");
      return;
    }
    var path = findPath(ui.previewId) || active;
    var previewing = !active || path.id !== state.pathId;
    var pos = position(state.startedOn ? state : { startedOn: iso(new Date()) });
    if (ui.week < 0) ui.week = 0;
    if (ui.week > path.weeks.length - 1) ui.week = path.weeks.length - 1;
    var week = path.weeks[ui.week];
    var blocks = [];
    var stats = progress(path, state);
    blocks.push(
      '<div class="space-y-2">' +
        '<p class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">' + escapeHtml(path.kicker) + "</p>" +
        '<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">' + escapeHtml(path.title) + "</h1>" +
        renderProgress(stats) +
      "</div>"
    );
    if (previewing) {
      var startDay = FULL_DAYS[weekdayIndex(new Date())];
      blocks.push(
        '<div class="bg-primary-fixed rounded-xl p-space-md space-y-3">' +
          '<p class="font-body-md text-body-md text-on-primary-fixed">Start today and ' + startDay + " of week 1 is your first day.</p>" +
          '<button type="button" class="inline-flex items-center justify-center w-full py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md" data-action="start" data-path="' + path.id + '">Start this path</button>' +
        "</div>"
      );
    } else if (pos.week >= path.weeks.length) {
      blocks.push('<p class="font-body-sm text-body-sm text-on-surface bg-primary-fixed rounded-xl p-space-md">You have walked every week of this path.</p>');
    }
    var chips = path.weeks.map(function (item, index) {
      var here = !previewing && pos.week === index;
      var on = ui.week === index;
      return '<button type="button" class="shrink-0 px-3 py-2 rounded-full font-label-sm text-label-sm ' + (on ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant") + '" data-action="week" data-week="' + index + '">' + (index + 1) + (here ? " · now" : "") + "</button>";
    }).join("");
    blocks.push('<div class="flex gap-2 overflow-x-auto pb-1">' + chips + "</div>");
    blocks.push(
      '<div>' +
        '<p class="font-headline-sm text-headline-sm text-primary">' + escapeHtml(week.theme) + "</p>" +
        '<p class="font-body-sm text-body-sm text-on-surface-variant">' + escapeHtml(week.title) + (week.goal ? " · " + escapeHtml(week.goal) : "") + "</p>" +
      "</div>"
    );
    blocks.push('<div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">' + week.days.map(function (_, day) {
      return renderDay(path, state, ui.week, day, pos, previewing);
    }).join("") + "</div>");
    blocks.push(renderLegend());
    if (!previewing) {
      blocks.push(renderGoals(state));
      blocks.push(renderTracker(state, ui.week, ui.trackDay));
      if (ui.confirmRestart) {
        blocks.push(
          '<div class="bg-surface-container-low rounded-xl p-space-md space-y-3">' +
            '<p class="font-body-sm text-body-sm text-on-surface">Starting over clears the checks on this path and sets today as week 1. Habits, mood, and journal notes stay.</p>' +
            '<button type="button" class="inline-flex items-center justify-center w-full py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md" data-action="restart">Start over</button>' +
            '<button type="button" class="font-label-md text-label-md text-secondary" data-action="cancel-restart">Keep my progress</button>' +
          "</div>"
        );
      } else {
        blocks.push('<button type="button" class="font-label-md text-label-md text-secondary text-left" data-action="ask-restart">Start this path over</button>');
      }
    }
    blocks.push('<button type="button" class="font-label-md text-label-md text-primary text-left" data-action="show-paths">Choose a different path</button>');
    if (ui.sheet) blocks.push(renderSheet(path, state, ui.sheet));
    root.innerHTML = blocks.join("");
  }

  function renderLegend() {
    var keys = ["session", "run", "walk", "start", "rest"];
    return '<div class="flex flex-wrap gap-x-3 gap-y-2">' + keys.map(function (key) {
      var kind = KINDS[key];
      return '<span class="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary"><span class="rounded-full" style="width:8px;height:8px;background:' + kind.color + '"></span>' + kind.label + "</span>";
    }).join("") + "</div>";
  }

  function renderDay(path, state, week, day, pos, previewing) {
    var items = itemsFor(path, state, week, day);
    var isToday = !previewing && pos.week === week && pos.day === day;
    var editable = path.built && !previewing;
    var date = cellDate(previewing ? null : state.startedOn, week, day);
    var rows = items.map(function (item, index) {
      return renderItem(path, state, week, day, item, index, editable);
    }).join("");
    var add = "";
    if (editable && items.length < 2 && !(items[0] && (items[0].rest || items[0].finish))) {
      add = '<button type="button" class="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary min-h-[40px]" data-action="open-sheet" data-week="' + week + '" data-day="' + day + '"><span class="material-symbols-outlined text-[16px]">add</span>' + (items.length ? "Add another" : "Add a video") + "</button>";
    }
    if (!items.length && !editable) {
      rows = '<p class="font-body-sm text-body-sm text-on-surface-variant">Open</p>';
    }
    return (
      '<section class="flex gap-3 px-3 py-3 border-b border-outline-variant/40 last:border-b-0 ' + (isToday ? "bg-primary-fixed" : "") + '" aria-label="' + DAY_LABELS[day] + '">' +
        '<div class="w-10 shrink-0 pt-1">' +
          '<p class="font-label-sm text-label-sm uppercase ' + (isToday ? "text-primary" : "text-secondary") + '">' + DAY_LABELS[day] + "</p>" +
          '<p class="font-headline-sm text-headline-sm text-on-surface leading-none">' + date.getDate() + "</p>" +
        "</div>" +
        '<div class="min-w-0 flex-1 space-y-2">' + rows + add + "</div>" +
      "</section>"
    );
  }

  function renderSheet(path, state, sheet) {
    var saved = state.customDays[sheet.week + ":" + sheet.day] || { videos: [] };
    var chosen = saved.videos || [];
    function option(id) {
      var meta = videoMeta(id);
      var already = chosen.indexOf(id) !== -1;
      return (
        '<button type="button" class="w-full flex items-center gap-3 text-left min-h-[44px]" data-action="pick-video" data-id="' + id + '" ' + (already ? "disabled" : "") + ">" +
          '<img alt="" class="w-16 h-11 rounded-lg object-cover bg-surface-container" src="' + meta.thumb + '"/>' +
          '<span class="min-w-0 flex-1"><span class="block font-body-sm text-body-sm text-primary font-semibold leading-snug">' + escapeHtml(meta.short) + "</span>" +
          '<span class="block font-label-sm text-label-sm text-secondary">' + (already ? "Added" : escapeHtml(meta.duration)) + "</span></span>" +
        "</button>"
      );
    }
    var more = (window.WWB ? WWB.videos : []).filter(function (video) {
      return CORE.indexOf(video.id) === -1;
    }).map(function (video) {
      return option(video.id);
    }).join("");
    return (
      '<div class="fixed inset-0 z-[60]">' +
        '<button type="button" class="absolute inset-0 bg-on-surface/40" data-action="close-sheet" aria-label="Close"></button>' +
        '<div class="sheet-panel absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto bg-surface rounded-t-xl p-space-md pb-28 space-y-3">' +
          '<div class="flex items-center justify-between">' +
            '<h2 class="font-headline-sm text-headline-sm text-primary">Add to ' + DAY_LABELS[sheet.day] + "</h2>" +
            '<button type="button" class="w-11 h-11 inline-flex items-center justify-center" data-action="close-sheet" aria-label="Close"><span class="material-symbols-outlined">close</span></button>' +
          "</div>" +
          '<p class="font-body-sm text-body-sm text-on-surface-variant">Up to two videos, or a rest day. ' + escapeHtml(path.weeks[sheet.week].title) + ".</p>" +
          '<div class="flex flex-col gap-3">' + CORE.map(option).join("") + "</div>" +
          '<button type="button" class="w-full text-left font-body-md text-body-md text-primary font-semibold min-h-[44px]" data-action="pick-rest">Make this a rest day</button>' +
          (chosen.length || saved.rest ? '<button type="button" class="font-label-md text-label-md text-secondary" data-action="clear-day">Clear this day</button>' : "") +
          '<details class="bg-surface-container-low rounded-xl p-3"><summary class="font-label-md text-label-md text-primary cursor-pointer">More from the library</summary><div class="flex flex-col gap-3 mt-3">' + more + "</div></details>" +
        "</div>" +
      "</div>"
    );
  }

  function renderGoals(state) {
    var rows = GOALS.map(function (goal) {
      var on = Boolean(state.goals[goal.id]);
      return (
        '<button type="button" class="w-full flex items-center gap-2 text-left min-h-[44px]" data-action="goal" data-goal="' + goal.id + '" aria-pressed="' + on + '">' +
          '<span class="material-symbols-outlined text-primary">' + checkIcon(on) + "</span>" +
          '<span class="font-body-sm text-body-sm text-on-surface">' + escapeHtml(goal.label) + "</span>" +
        "</button>"
      );
    }).join("");
    return '<section class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm" aria-label="Challenge goals"><h2 class="font-headline-sm text-headline-sm text-primary mb-1">Goals</h2>' + rows + "</section>";
  }

  function dayLogged(state, dateKey) {
    var habits = state.habits[dateKey] || {};
    var anyHabit = HABITS.some(function (habit) { return habits[habit.id]; });
    var note = state.journal[dateKey] || "";
    return anyHabit || Boolean(state.moods[dateKey]) || note.trim().length > 0;
  }

  function renderTracker(state, weekIndex, trackDay) {
    var day = trackDay >= 0 && trackDay < 7 ? trackDay : 0;
    var selected = cellDate(state.startedOn, weekIndex, day);
    var dateKey = iso(selected);
    var todayKey = iso(new Date());
    var saved = state.habits[dateKey] || {};
    var mood = state.moods[dateKey] || "";
    var note = state.journal[dateKey] || "";
    var chips = DAY_LABELS.map(function (label, index) {
      var cell = cellDate(state.startedOn, weekIndex, index);
      var key = iso(cell);
      var on = index === day;
      var logged = dayLogged(state, key);
      return (
        '<button type="button" class="flex-1 min-w-0 flex flex-col items-center gap-0.5 min-h-[44px] py-1.5 rounded-xl ' + (on ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant") + '" data-action="track-day" data-day="' + index + '" aria-pressed="' + on + '" aria-label="' + FULL_DAYS[index] + " " + cell.getDate() + '">' +
          '<span class="font-label-sm text-label-sm">' + label.slice(0, 1) + "</span>" +
          '<span class="font-body-sm text-body-sm leading-none">' + cell.getDate() + "</span>" +
          '<span class="rounded-full ' + (logged ? (on ? "bg-on-primary" : "bg-primary") : "bg-transparent") + '" style="width:4px;height:4px"></span>' +
        "</button>"
      );
    }).join("");
    var habits = HABITS.map(function (habit) {
      var on = Boolean(saved[habit.id]);
      return (
        '<button type="button" class="flex flex-col items-center gap-1 min-h-[44px] flex-1 min-w-0" data-action="habit" data-date="' + dateKey + '" data-habit="' + habit.id + '" aria-pressed="' + on + '">' +
          '<span class="w-11 h-11 rounded-full inline-flex items-center justify-center ' + (on ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant") + '"><span class="material-symbols-outlined text-[20px]">' + habit.icon + "</span></span>" +
          '<span class="font-label-sm text-label-sm text-center ' + (on ? "text-primary" : "text-secondary") + '">' + habit.label + "</span>" +
        "</button>"
      );
    }).join("");
    var moods = MOODS.map(function (item) {
      var on = mood === item.id;
      return (
        '<button type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-full font-label-sm text-label-sm min-h-[40px] ' + (on ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant") + '" data-action="mood" data-date="' + dateKey + '" data-mood="' + item.id + '" aria-pressed="' + on + '">' +
          '<span class="material-symbols-outlined text-[18px]">' + item.icon + "</span>" +
          item.label +
        "</button>"
      );
    }).join("");
    return (
      '<section class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-4" aria-label="Daily habits and mood">' +
        '<div>' +
          '<h2 class="font-headline-sm text-headline-sm text-primary">This week</h2>' +
          '<p class="font-body-sm text-body-sm text-on-surface-variant">' + escapeHtml(formatLong(selected)) + (dateKey === todayKey ? " · today" : "") + "</p>" +
        "</div>" +
        '<div class="flex gap-1">' + chips + "</div>" +
        '<div class="space-y-2">' +
          '<h3 class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Habits</h3>' +
          '<div class="flex justify-between gap-1">' + habits + "</div>" +
        "</div>" +
        '<div class="space-y-2">' +
          '<h3 class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Mood</h3>' +
          '<div class="flex flex-wrap gap-2">' + moods + "</div>" +
        "</div>" +
        '<div class="space-y-2">' +
          '<h3 class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Journal</h3>' +
          '<textarea class="w-full min-h-[88px] rounded-xl bg-surface-container p-3 font-body-sm text-body-sm text-on-surface" data-field="journal" data-date="' + dateKey + '" maxlength="500" placeholder="How did this day feel?">' + escapeHtml(note) + "</textarea>" +
        "</div>" +
      "</section>"
    );
  }

  function readHash() {
    var hash = (location.hash || "").replace("#", "");
    var parts = hash.split("/");
    var cell = parts[1] ? parts[1].split("-") : null;
    var week = cell ? Number(cell[0]) : NaN;
    var day = cell ? Number(cell[1]) : NaN;
    return {
      pathId: findPath(parts[0]) ? parts[0] : null,
      sheet: cell && week >= 0 && day >= 0 && day < 7 ? { week: week, day: day } : null
    };
  }

  function mountToday(root) {
    root.addEventListener("click", function (event) {
      var button = event.target.closest("[data-action]");
      if (!button || !root.contains(button)) return;
      var action = button.getAttribute("data-action");
      var state = load();
      if (action === "toggle") {
        var key = button.getAttribute("data-key");
        state.completed[key] = !state.completed[key];
        save(state);
        renderToday(root);
      }
      if (action === "habit") {
        toggleHabit(state, button.getAttribute("data-date"), button.getAttribute("data-habit"));
        save(state);
        renderToday(root);
      }
      if (action === "show-paths") {
        state.pathId = null;
        save(state);
        renderToday(root);
      }
    });
    renderToday(root);
  }

  function toggleHabit(state, date, habit) {
    if (!state.habits[date]) state.habits[date] = {};
    state.habits[date][habit] = !state.habits[date][habit];
  }

  function mountJourney(root) {
    var hash = readHash();
    var state = load();
    var active = findPath(state.pathId);
    var ui = { picker: !active, previewId: null, week: 0, trackDay: weekdayIndex(new Date()), sheet: null, confirmRestart: false };
    if (hash.pathId && (!active || hash.pathId !== active.id)) {
      ui.previewId = hash.pathId;
      ui.picker = false;
    } else if (active) {
      var pos = position(state);
      ui.week = Math.min(pos.week, active.weeks.length - 1);
      if (hash.sheet && active.built && hash.sheet.week < active.weeks.length) ui.sheet = hash.sheet;
    } else if (hash.pathId) {
      ui.previewId = hash.pathId;
      ui.picker = false;
    }

    function draw() {
      renderJourney(root, ui);
    }

    root.addEventListener("click", function (event) {
      var button = event.target.closest("[data-action]");
      if (!button || !root.contains(button)) return;
      if (button.tagName === "A") return;
      var action = button.getAttribute("data-action");
      var current = load();
      var path = findPath(ui.previewId) || findPath(current.pathId);
      if (action === "show-paths") {
        ui.picker = true;
        ui.previewId = null;
        ui.sheet = null;
        ui.confirmRestart = false;
        draw();
        return;
      }
      if (action === "preview") {
        ui.previewId = button.getAttribute("data-path");
        ui.picker = false;
        ui.week = 0;
        ui.sheet = null;
        ui.confirmRestart = false;
        draw();
        return;
      }
      if (action === "start") {
        var nextId = button.getAttribute("data-path");
        current.pathId = nextId;
        current.startedOn = iso(new Date());
        save(current);
        ui.previewId = null;
        ui.picker = false;
        ui.week = Math.min(position(current).week, findPath(nextId).weeks.length - 1);
        ui.sheet = null;
        history.replaceState(null, "", location.pathname);
        draw();
        return;
      }
      if (!path) return;
      if (action === "week-prev" && ui.week > 0) ui.week -= 1;
      if (action === "week-next" && ui.week < path.weeks.length - 1) ui.week += 1;
      if (action === "week") {
        var picked = Number(button.getAttribute("data-week"));
        if (picked >= 0 && picked < path.weeks.length) ui.week = picked;
      }
      if (action === "track-day") {
        var pickedDay = Number(button.getAttribute("data-day"));
        if (pickedDay >= 0 && pickedDay < 7) ui.trackDay = pickedDay;
      }
      if (action === "toggle") {
        if (ui.previewId && ui.previewId !== current.pathId) {
          draw();
          return;
        }
        var key = button.getAttribute("data-key");
        current.completed[key] = !current.completed[key];
        save(current);
      }
      if (action === "open-sheet") {
        ui.sheet = { week: Number(button.getAttribute("data-week")), day: Number(button.getAttribute("data-day")) };
      }
      if (action === "close-sheet") ui.sheet = null;
      if (action === "pick-video" && ui.sheet) {
        var id = button.getAttribute("data-id");
        var cellKey = ui.sheet.week + ":" + ui.sheet.day;
        var cell = current.customDays[cellKey];
        if (!cell || cell.rest || cell.finish) cell = { videos: [] };
        if (cell.videos.indexOf(id) === -1 && cell.videos.length < 2) cell.videos.push(id);
        current.customDays[cellKey] = cell;
        save(current);
        if (cell.videos.length >= 2) ui.sheet = null;
      }
      if (action === "pick-rest" && ui.sheet) {
        current.customDays[ui.sheet.week + ":" + ui.sheet.day] = { rest: true };
        save(current);
        ui.sheet = null;
      }
      if (action === "clear-day" && ui.sheet) {
        delete current.customDays[ui.sheet.week + ":" + ui.sheet.day];
        save(current);
        ui.sheet = null;
      }
      if (action === "remove-video") {
        var removeKey = button.getAttribute("data-week") + ":" + button.getAttribute("data-day");
        var existing = current.customDays[removeKey];
        if (existing && existing.videos) {
          existing.videos.splice(Number(button.getAttribute("data-index")), 1);
          if (!existing.videos.length) delete current.customDays[removeKey];
          save(current);
        }
      }
      if (action === "habit") {
        toggleHabit(current, button.getAttribute("data-date"), button.getAttribute("data-habit"));
        save(current);
      }
      if (action === "mood") {
        var moodDate = button.getAttribute("data-date");
        var moodId = button.getAttribute("data-mood");
        if (!current.moods) current.moods = {};
        if (current.moods[moodDate] === moodId) delete current.moods[moodDate];
        else current.moods[moodDate] = moodId;
        save(current);
      }
      if (action === "goal") {
        var goal = button.getAttribute("data-goal");
        current.goals[goal] = !current.goals[goal];
        save(current);
      }
      if (action === "ask-restart") ui.confirmRestart = true;
      if (action === "cancel-restart") ui.confirmRestart = false;
      if (action === "restart" && current.pathId) {
        var prefix = current.pathId + ":";
        Object.keys(current.completed).forEach(function (doneKey) {
          if (doneKey.indexOf(prefix) === 0) delete current.completed[doneKey];
        });
        current.startedOn = iso(new Date());
        save(current);
        ui.confirmRestart = false;
        ui.week = Math.min(position(current).week, path.weeks.length - 1);
      }
      draw();
    });

    root.addEventListener("input", function (event) {
      var field = event.target.getAttribute("data-field");
      if (!field) return;
      var current = load();
      if (field === "journal") {
        var journalDate = event.target.getAttribute("data-date");
        if (!current.journal) current.journal = {};
        current.journal[journalDate] = event.target.value.slice(0, 500);
      }
      save(current);
    });

    draw();
  }

  window.WWBPath = {
    paths: paths,
    load: load,
    mountToday: mountToday,
    mountJourney: mountJourney
  };
})();
