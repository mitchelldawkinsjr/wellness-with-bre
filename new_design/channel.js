(function () {
  var categories = [
    { id: "walks", label: "Walks" },
    { id: "sessions", label: "Sessions" },
    { id: "journey", label: "Journey" },
    { id: "moves", label: "Moves" },
    { id: "affirm", label: "Affirmations" },
    { id: "podcast", label: "Podcast" }
  ];

  var videos = [
    { id: "dBFaMAt03H0", title: "15 MIN Beginner Low Impact Walking Workout | Sweat & Speak Life! | Wellness Walks", duration: "15:04", category: "walks" },
    { id: "LoekdHVrcfg", title: "11-Min Beginner Walk + Run Workout | Self-Love Affirmations", duration: "11:03", category: "walks" },
    { id: "_x-SHUZc798", title: "11-Minute Walk/Run Workout for Beginners", duration: "11:04", category: "walks" },
    { id: "H055zh-W-Ko", title: "Want to Run? Start With 15 Seconds! | Beginner Walk–Run • Weeks 1–2", duration: "27:29", category: "walks" },
    { id: "T6skPUA6uCY", title: "15 MIN Beginner Walking Workout | Low Impact Cardio + Positive Affirmations", duration: "15:05", category: "walks" },
    { id: "zY3TrmlFyi4", title: "Get It In, Fit It In // Session #1", duration: "37:53", category: "sessions", chapters: [
      { title: "Countdown", start: 0 },
      { title: "Welcome", start: 120 },
      { title: "Warm-up | Kettle Bell", start: 225 },
      { title: "Break", start: 1300 },
      { title: "Resistance Band Burn Out | Cooldown", start: 1410 }
    ] },
    { id: "rWTsU-MiZ6A", title: "Get It In, Fit It In // Session #2", duration: "40:05", category: "sessions", chapters: [
      { title: "Countdown", start: 0 },
      { title: "Welcome", start: 120 },
      { title: "Warm-up | Kettle Bell", start: 202 },
      { title: "Break", start: 1272 },
      { title: "Resistance Band Burn Out | Cooldown", start: 1405 }
    ] },
    { id: "11t0Mn0wIrY", title: "Get It In, Fit It In // Session #3", duration: "39:49", category: "sessions", chapters: [
      { title: "Countdown", start: 0 },
      { title: "Welcome", start: 128 },
      { title: "Warm-up", start: 227 },
      { title: "Kettle Bell Lower Body", start: 336 },
      { title: "Break", start: 1300 },
      { title: "Kettle Bell Upper Body", start: 1455 },
      { title: "Cooldown", start: 2056 }
    ] },
    { id: "xMM_8R4kNsw", title: "Get It In, Fit It In // Session #4", duration: "43:03", category: "sessions" },
    { id: "iM2a2mTZupo", title: "Get It In, Fit It In // Session #5", duration: "40:39", category: "sessions", chapters: [
      { title: "Countdown", start: 0 },
      { title: "Welcome", start: 141 },
      { title: "Warm-up", start: 250 },
      { title: "Kettle Bell Work", start: 374 },
      { title: "Break", start: 1323 },
      { title: "Resistance Band Work", start: 1475 },
      { title: "Cooldown", start: 2090 }
    ] },
    { id: "NwLK-FMQryE", title: "Get It In, Fit It In // Session #6", duration: "42:08", category: "sessions", start: 502, chapters: [
      { title: "Countdown", start: 0 },
      { title: "Welcome", start: 132 },
      { title: "Warm-up", start: 256 },
      { title: "Kettle Bell Work", start: 380 },
      { title: "Break", start: 1327 },
      { title: "Resistance Band Work", start: 1466 },
      { title: "Cooldown", start: 2187 }
    ] },
    { id: "upwfALlN7Gc", title: "Get It In, Fit It In // Session #7", duration: "39:35", category: "sessions" },
    { id: "vE3v2hyDeWo", title: "Fat Burning Leg Workout - In Puerto Vallarta Mexico", duration: "24:30", category: "sessions" },
    { id: "rw82pi9jQEE", title: "Fat Burning- Total Body Weight Workout - In the Maldives", duration: "35:08", category: "sessions" },
    { id: "LRSa6E9YyQ8", title: "Fat Burning - Resistance Band Workout - On a Maldives Beach", duration: "29:59", category: "sessions" },
    { id: "F0TT_lTvk2g", title: "My Weight Loss Journey Begins | Who Am I? & What to Expect", duration: "9:07", category: "journey" },
    { id: "d8sDfIKexU0", title: "My Weight Loss Journey: A Mom’s Mission to Get Fit and Healthy", duration: "4:41", category: "journey" },
    { id: "KqnCE0NkSvM", title: "Week 1 Recap: Eating Out & STILL Losing!", duration: "12:14", category: "journey" },
    { id: "b4qztL7K9R0", title: "Week 2: Flu, Setbacks, and a Surprise Win", duration: "9:30", category: "journey" },
    { id: "FGj6F6-ues8", title: "Week 3: Reset & Rebuild After Being Sick", duration: "7:10", category: "journey" },
    { id: "lVmj9hdEniw", title: "Wellness Unfiltered - Episode 1 - with Sam & Tova Jones", duration: "8:01", category: "journey" },
    { id: "cEB8Yrk6WeE", title: "5 min Resistance Band Workout", duration: "5:43", category: "moves" },
    { id: "e3miXM8VT18", title: "5 min Kettlebell Workout", duration: "5:42", category: "moves" },
    { id: "llA_IpaFFyk", title: "5 min Resistance Band Workout", duration: "5:43", category: "moves" },
    { id: "g6N2F5X4BsM", title: "5 min Resistance Band Workout", duration: "5:42", category: "moves" },
    { id: "TSTAN0SDpdg", title: "How to do a Kettlebell Lunge", duration: "2:05", category: "moves" },
    { id: "Z3w-MV-Vigk", title: "How to do a Kettlebell Squat to Press", duration: "1:15", category: "moves" },
    { id: "-KIIuqPDHbg", title: "How to do a Kettlebell Deadlift", duration: "1:34", category: "moves" },
    { id: "DJXqOq6vkx0", title: "How to do a Kettlebell Around the World", duration: "1:43", category: "moves" },
    { id: "1oxlrp7ecVE", title: "How to do a Kettlebell Standing Russian Twist to a Knee Drive", duration: "1:58", category: "moves" },
    { id: "xuSUc3Cu4VU", title: "How to do a Kettlebell Figure 8", duration: "1:38", category: "moves" },
    { id: "-XsZgNFbDUg", title: "How to do a Kettlebell Single Arm Press", duration: "1:31", category: "moves" },
    { id: "s6Zg0O3-yYU", title: "How to do a Kettlebell Side Bend", duration: "1:28", category: "moves" },
    { id: "pzwclWHf8PM", title: "How to do a Kettlebell Alternating Row", duration: "2:08", category: "moves" },
    { id: "bFgaIXvIu-U", title: "How to do a Kettlebell Standing Russian Twist to a Knee Drive", duration: "1:25", category: "moves" },
    { id: "tWDLrHGb6eM", title: "How to do a Kettlebell Swing", duration: "1:52", category: "moves" },
    { id: "9BgaM2yrwKI", title: "How to do a Kettle Bell Squat", duration: "1:28", category: "moves" },
    { id: "y0y8fsco9ak", title: "Affirmations | Self Acceptance", duration: "11:03", category: "affirm" },
    { id: "bdUkxnpXtEk", title: "Affirmations | Kindness & Compassion", duration: "12:53", category: "affirm" },
    { id: "n1WZGJGqs3M", title: "Postpartum Affirmation Meditation", duration: "15:56", category: "affirm" },
    { id: "QOI6pYrskgM", title: "Postpartum Affirmation Meditation", duration: "12:57", category: "affirm" },
    { id: "jnr9jv58Smg", title: "Postpartum Affirmation Mediation", duration: "12:14", category: "affirm" },
    { id: "Bw2i6BJq4o4", title: "Affirmations | Patience", duration: "10:22", category: "affirm" },
    { id: "8br6jGJF53Q", title: "Affirmations | Courage", duration: "9:53", category: "affirm" },
    { id: "FOQrkMNW1Fk", title: "Be Free and Fit Podcast // Episode 1 // Be willing to try again and again", duration: "12:01", category: "podcast" },
    { id: "fpEnK0HEUN0", title: "Be Free and Fit Podcast // Episode 2 // Building Discipline", duration: "21:42", category: "podcast" },
    { id: "nw0iJFcNjF0", title: "Be Free and Fit Podcast // Episode 3 // Be Patient - Where is your Focus?", duration: "48:27", category: "podcast" },
    { id: "iuNwYOpu-Fc", title: "Be Free and Fit Podcast // Episode 4 // Patience and Serenity", duration: "27:38", category: "podcast" },
    { id: "WtFzR_GOWgo", title: "Be Free and Fit Podcast // Episode 5 // Self Love - The Importance of Being Kind to yourself", duration: "29:13", category: "podcast" },
    { id: "7eO2age2Y68", title: "Be Free and Fit Podcast // Episode 6 // Self Love", duration: "35:13", category: "podcast" },
    { id: "Z7K14VGRCbk", title: "Be Free and Fit // Episode 7 // Girl Talk with April Whitehead, LMHC", duration: "1:10:08", category: "podcast" }
  ];

  var SAVED_KEY = "wwb-saved";

  function thumb(id) {
    return "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
  }

  function playerUrl(id) {
    return "../workout_player/code.html?v=" + encodeURIComponent(id);
  }

  function categoryLabel(id) {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].id === id) return categories[i].label;
    }
    return "Video";
  }

  function find(id) {
    for (var i = 0; i < videos.length; i++) {
      if (videos[i].id === id) return videos[i];
    }
    return null;
  }

  function savedIds() {
    try {
      var raw = sessionStorage.getItem(SAVED_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function isSaved(id) {
    return savedIds().indexOf(id) !== -1;
  }

  function toggleSaved(id) {
    var ids = savedIds();
    var index = ids.indexOf(id);
    if (index === -1) ids.push(id);
    else ids.splice(index, 1);
    sessionStorage.setItem(SAVED_KEY, JSON.stringify(ids));
    return index === -1;
  }

  function pillClass(active) {
    return active
      ? "category-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md bg-primary text-on-primary shadow-sm"
      : "category-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant";
  }

  function escapeHtml(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function card(video) {
    var note = video.start ? " · opens at 8:22" : "";
    return (
      '<a class="flex gap-3 bg-surface-container-lowest rounded-xl p-3 shadow-sm active:scale-[0.99] transition-transform" href="' + playerUrl(video.id) + '">' +
        '<img alt="" class="w-32 h-20 rounded-lg object-cover shrink-0 bg-surface-container" src="' + thumb(video.id) + '"/>' +
        '<span class="min-w-0 flex flex-col justify-center">' +
          '<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary">' + categoryLabel(video.category) + " · " + video.duration + note + "</span>" +
          '<span class="font-body-md text-body-md text-primary font-semibold leading-snug mt-1">' + escapeHtml(video.title) + "</span>" +
        "</span>" +
      "</a>"
    );
  }

  function renderLinks(listEl, predicate) {
    var list = videos.filter(predicate);
    listEl.innerHTML = list.length
      ? list.map(card).join("")
      : '<p class="font-body-sm text-body-sm text-on-surface-variant">Nothing saved yet. Bookmark a video on the remote.</p>';
  }

  function mountLibrary(listEl, filterEl) {
    var fromHash = (location.hash || "").replace("#", "");
    var known = fromHash === "all" || fromHash === "saved" || categories.some(function (category) { return category.id === fromHash; });
    var current = known ? fromHash : "all";

    function drawFilters() {
      var html = '<button type="button" class="' + pillClass(current === "all") + '" data-category="all">All</button>';
      categories.forEach(function (category) {
        html += '<button type="button" class="' + pillClass(current === category.id) + '" data-category="' + category.id + '">' + category.label + "</button>";
      });
      html += '<button type="button" class="' + pillClass(current === "saved") + '" data-category="saved">Saved</button>';
      filterEl.innerHTML = html;
      filterEl.querySelectorAll("button").forEach(function (button) {
        button.addEventListener("click", function () {
          current = button.getAttribute("data-category");
          history.replaceState(null, "", "#" + current);
          drawFilters();
          drawList();
        });
      });
    }

    function drawList() {
      var list = videos.filter(function (video) {
        if (current === "all") return true;
        if (current === "saved") return isSaved(video.id);
        return video.category === current;
      });
      if (!list.length) {
        listEl.innerHTML = '<p class="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low rounded-xl p-space-md">Save a video from the remote and it will show up here.</p>';
        return;
      }
      listEl.innerHTML = list.map(card).join("");
    }

    drawFilters();
    drawList();
  }

  window.WWB = {
    channel: "Wellness With Bre",
    handle: "@WellnesswithBre",
    categories: categories,
    videos: videos,
    thumb: thumb,
    playerUrl: playerUrl,
    categoryLabel: categoryLabel,
    find: find,
    isSaved: isSaved,
    toggleSaved: toggleSaved,
    mountLibrary: mountLibrary,
    renderLinks: renderLinks
  };
})();
