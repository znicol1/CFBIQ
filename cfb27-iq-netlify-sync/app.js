const STORAGE_KEY = "cfb27-team-selection-v1";
const SYNC_CODE_KEY = `${STORAGE_KEY}-sync-code`;
const SYNC_UPDATED_KEY = `${STORAGE_KEY}-cloud-updated-at`;
const SYNC_LOCAL_EDIT_KEY = `${STORAGE_KEY}-local-edit-at`;
const CLOUD_SYNC_ENDPOINT = "/api/cfb27-state";
const CLOUD_SYNC_POLL_MS = 10000;
const DEFAULT_SYNC_CODE = "cfb27sync";
const CONFERENCE_LOGOS = {
  ACC: "https://commons.wikimedia.org/wiki/Special:FilePath/Atlantic_Coast_Conference_logo.svg",
  American: "https://commons.wikimedia.org/wiki/Special:FilePath/American_Athletic_Conference_logo.svg",
  "Big 12": "https://commons.wikimedia.org/wiki/Special:FilePath/Big_12_Conference_(cropped)_logo.svg",
  "Big Ten": "https://commons.wikimedia.org/wiki/Special:FilePath/Big_Ten_Conference_logo.svg",
  CUSA: "https://commons.wikimedia.org/wiki/Special:FilePath/CUSA_logo.svg",
  MAC: "https://commons.wikimedia.org/wiki/Special:FilePath/Mid-American_Conference_logo.svg",
  "Mountain West": "https://commons.wikimedia.org/wiki/Special:FilePath/Mountain_West_Conference_logo.svg",
  "Pac-12": "https://commons.wikimedia.org/wiki/Special:FilePath/Pac-12_wordmark.svg",
  SEC: "https://commons.wikimedia.org/wiki/Special:FilePath/Southeastern_Conference_logo.svg",
  "Sun Belt": "https://commons.wikimedia.org/wiki/Special:FilePath/Sun_Belt_Conference_2020_logo_and_name.svg",
};
const SLOT_WEIGHTS = {
  qb1: 14,
  rb1: 7,
  rb2: 4,
  wr1: 8,
  wr2: 6,
  wr3: 4,
  te1: 5,
  ol1: 7,
  ol2: 5,
  dl1: 7,
  dl2: 5,
  lb1: 6,
  lb2: 4,
  db1: 7,
  db2: 6,
};
const TALENT_WEIGHT_BOOSTS = {
  qb1: 1.25,
  rb1: 1.15,
  wr1: 1.15,
  te1: 1.15,
  ol1: 1.15,
  ol2: 1.15,
};
const PLAYER_BONUSES = { none: 0, notable: 1, "big-fan": 3, "super-fan": 5 };
const TEAM_BONUSES = { none: 0, notable: 1, "big-fan": 2, "super-fan": 3 };
const RIVAL_TIERS = { none: 0, light: -0.5, normal: -1.25, hard: -2.25, brutal: -3.5 };
const NDL_WIN_GOAL_WEIGHT = 1.2;
const NDL_RISK_WEIGHT = 0.65;
const NDL_DRAFT_SLOT = 39;
const NDL_PROJECTED_PICK_RATE = 0.6;
const USER_STATUSES = ["Confirmed", "Waiting on Response", "Need to Reach Out"];
const DEFAULT_Z_USERS = [
  { name: "Zack Nicol", discordUsername: "", cfbUsername: "", status: "Confirmed" },
  { name: "Matt Fontana", discordUsername: "", cfbUsername: "", status: "Confirmed" },
  { name: "CJ Niedzielski", discordUsername: "", cfbUsername: "", status: "Confirmed" },
  { name: "Luke Landry", discordUsername: "", cfbUsername: "", status: "Confirmed" },
  { name: "Kenny Bunch", discordUsername: "", cfbUsername: "", status: "Confirmed" },
  { name: "Seth Landry", discordUsername: "", cfbUsername: "", status: "Confirmed" },
  { name: "David Yri", discordUsername: "", cfbUsername: "", status: "Confirmed" },
  { name: "Mike Weis", discordUsername: "", cfbUsername: "", status: "Confirmed" },
  { name: "", discordUsername: "texasfan4444", cfbUsername: "", status: "Waiting on Response" },
  { name: "Alex Johnson", discordUsername: "awjpack4", cfbUsername: "", status: "Waiting on Response" },
  { name: "Robert Jones", discordUsername: "RAJ", cfbUsername: "", status: "Waiting on Response" },
  { name: "", discordUsername: "Mr. Dink", cfbUsername: "", status: "Waiting on Response" },
  { name: "Aaron Henderson", discordUsername: "darthcloudz", cfbUsername: "", status: "Waiting on Response" },
  { name: "Brendyn Puzio", discordUsername: "NJG_brendyn", cfbUsername: "", status: "Confirmed" },
  { name: "", discordUsername: "tranquilTyler", cfbUsername: "", status: "Waiting on Response" },
  { name: "", discordUsername: "Embiid2525", cfbUsername: "", status: "Waiting on Response" },
  { name: "", discordUsername: "Bigfella4747", cfbUsername: "", status: "Waiting on Response" },
  { name: "Matt Saglembeni", discordUsername: "Mattsags", cfbUsername: "", status: "Waiting on Response" },
];
const PLAY_SITUATIONS = [
  ["firstDown", "1st Down"],
  ["secondLong", "2nd and Long"],
  ["secondMedium", "2nd and Medium"],
  ["secondShort", "2nd and Short"],
  ["thirdLong", "3rd and Long"],
  ["thirdMedium", "3rd and Medium"],
  ["thirdShort", "3rd and Short"],
  ["fourthLong", "4th and Long"],
  ["fourthMedium", "4th and Medium"],
  ["fourthShort", "4th and Short"],
  ["backedUp", "Backed Up"],
  ["redZone", "Red Zone"],
  ["goalLine", "Goal Line"],
  ["goalLinePass", "Goal Line - Pass"],
  ["goForTwo", "Go for 2"],
  ["hailMary", "Hail Mary"],
  ["twoMinute", "2-Minute Offense"],
  ["conserveTime", "Conserve Time"],
  ["redZoneFringe", "Red Zone Fringe"],
];
const CONCEPT_OPTIONS = [
  "Cross Screen",
  "Deep Comeback",
  "Deep Crosser",
  "Deep Fade",
  "Deep Middle",
  "Direct Snap",
  "Drag and RB Streak",
  "Flat",
  "Inside High and Low",
  "Inside Mid and High",
  "Inside Mid and Low",
  "Inside Run",
  "Jet Touch Pass",
  "Mid Curl",
  "Middle Screen",
  "Normal RB Screen",
  "Outside High and Low",
  "Outside Mid and High",
  "Outside Mid and Low",
  "Outside Run",
  "Pick-a-Side",
  "QB Boot",
  "QB Option",
  "QB Run",
  "RB Angle",
  "RB Flat",
  "RB Streak",
  "RB Up and Out",
  "RPO",
  "Same Side Double Ins",
  "Same Side Streak and Fade",
  "Short Ins",
  "Short Outs",
  "Speed Option",
  "Streak and Fade",
  "Swing",
  "TE Drag and Slot Cross",
  "TE Oppo Flat",
  "TE Pop",
  "TE or Slot Corner",
  "TE or Slot Wheel",
  "Tricky",
  "Triple Option",
  "WR In and Oppo RB Drag",
  "WR Out",
  "WR Screen In",
  "WR Screen Out",
  "WR Slant",
];
const DEFAULT_PLAYS = (window.PLAYBOOK_DATA?.plays || []).map((play) => ({ ...play }));
const PLAYBOOK_RATING_VERSION = window.PLAYBOOK_DATA?.ratingVersion || 1;
const PLAY_ART_SEEDS = {
  "shotgun empty bunch open:::crossers": "https://fatgvrcdozmbkxcwpwsc.supabase.co/storage/v1/object/public/college_plays_output/crossers-gun-emptybunchopen-27.webp",
};
const GENERATOR_CANDIDATE_LIMIT = 24;
const NDL_WIN_GOALS = {
  "Oregon Ducks": "8.5",
  "Indiana Hoosiers": "8.5",
  "Ohio State Buckeyes": "8",
  "Notre Dame Fighting Irish": "8.5",
  "Texas Longhorns": "7.5",
  "LSU Tigers": "7",
  "Miami (FL) Hurricanes": "9.5",
  "Ole Miss Rebels": "7",
  "Georgia Bulldogs": "8",
  "Oklahoma Sooners": "6.5",
  "Texas Tech Red Raiders": "9",
  "Alabama Crimson Tide": "7",
  "BYU Cougars": "9",
  "Texas A&M Aggies": "5.5",
  "USC Trojans": "6",
  "Michigan Wolverines": "5.5",
  "Missouri Tigers": "6",
  "Tennessee Volunteers": "6.5",
  "Florida Gators": "4",
  "Louisville Cardinals": "9",
  "Auburn Tigers": "3",
  "Clemson Tigers": "6",
  "Houston Cougars": "5.5",
  "Nebraska Cornhuskers": "5.5",
  "Oklahoma State Cowboys": "6.5",
  "Penn State Nittany Lions": "7.5",
  "SMU Mustangs": "6.5",
  "Virginia Cavaliers": "7",
  "Washington Huskies": "5.5",
  "Arizona Wildcats": "5",
  "Florida State Seminoles": "5",
  "South Carolina Gamecocks": "2.5",
  "UCLA Bruins": "5",
  "Arizona State Sun Devils": "4",
  "California Golden Bears": "6.5",
  "Colorado Buffaloes": "4",
  "Kansas State Wildcats": "5.5",
  "Kentucky Wildcats": "2",
  "Minnesota Golden Gophers": "4",
  "Mississippi State Bulldogs": "2",
  "Pittsburgh Panthers": "5",
  "UCF Knights": "6",
  "Utah Utes": "6.5",
  "Vanderbilt Commodores": "2",
  "Virginia Tech Hokies": "5.5",
  "Arkansas Razorbacks": "2",
  "Boise State Broncos": "7",
  "Iowa Hawkeyes": "4",
  "Maryland Terrapins": "3",
  "Michigan State Spartans": "2.5",
  "TCU Horned Frogs": "4",
  "Baylor Bears": "3",
  "Cincinnati Bearcats": "3.5",
  "Duke Blue Devils": "3.5",
  "Illinois Fighting Illini": "2.5",
  "North Carolina Tar Heels": "2",
  "Northwestern Wildcats": "2.5",
  "Wisconsin Badgers": "3",
  "Georgia Tech Yellow Jackets": "2",
  "Rutgers Scarlet Knights": "2",
  "Syracuse Orange": "2.5",
  "UNLV Rebels": "7",
  "Wake Forest Demon Deacons": "2",
  "West Virginia Mountaineers": "2",
  "Boston College Eagles": "2",
  "Iowa State Cyclones": "2",
  "James Madison Dukes": "7.5",
  "Kansas Jayhawks": "2",
  "Memphis Tigers": "7",
  "North Texas Mean Green": "6",
  "Purdue Boilermakers": "2",
  "San Diego State Aztecs": "3.5",
  "South Florida Bulls": "5.5",
  "Texas State Bobcats": "4",
  "Army Black Knights": "5",
  "Florida Atlantic Owls": "5.5",
  "Fresno State Bulldogs": "4",
  "Georgia Southern Eagles": "6",
  "Hawaii Rainbow Warriors": "6.5",
  "Jacksonville State Gamecocks": "7",
  "Liberty Flames": "8.5",
  "Miami (OH) RedHawks": "7",
  "New Mexico Lobos": "7",
  "Oregon State Beavers": "3",
  "Stanford Cardinal": "2",
  "Temple Owls": "5.5",
  "Tulane Green Wave": "6",
  "Tulsa Golden Hurricane": "5",
  "Utah State Aggies": "3",
  "UTSA Roadrunners": "5.5",
  "Washington State Cougars": "3",
  "Delaware Fightin' Blue Hens": "5",
  "Kennesaw State Owls": "5.5",
  "Marshall Thundering Herd": "5.5",
  "North Dakota State Bison": "5.5",
  "Western Michigan Broncos": "6",
  "Air Force Falcons": "5",
  "Arkansas State Red Wolves": "5",
  "Colorado State Rams": "2.5",
  "East Carolina Pirates": "3",
  "Louisiana Tech Bulldogs": "5",
  "Navy Midshipmen": "3.5",
  "Ohio Bobcats": "4",
  "Old Dominion Monarchs": "4",
  "UConn Huskies": "2",
  "Akron Zips": "3.5",
  "Appalachian State Mountaineers": "4",
  "Eastern Michigan Eagles": "4",
  "FIU Panthers": "3",
  "Georgia State Panthers": "3",
  "Louisiana Ragin' Cajuns": "4.5",
  "Nevada Wolf Pack": "3",
  "New Mexico State Aggies": "3",
  "Toledo Rockets": "4",
  "Troy Trojans": "3.5",
  "UAB Blazers": "2",
  "Western Kentucky Hilltoppers": "3",
  "Wyoming Cowboys": "3.5",
  "Ball State Cardinals": "4.5",
  "Bowling Green Falcons": "3",
  "Buffalo Bulls": "3",
  "Central Michigan Chippewas": "3",
  "Charlotte 49ers": "2",
  "Coastal Carolina Chanticleers": "2.5",
  "Kent State Golden Flashes": "3",
  "Middle Tennessee Blue Raiders": "2",
  "Missouri State Bears": "2",
  "Rice Owls": "2",
  "Sacramento State University Hornets": "4",
  "San Jose State Spartans": "2.5",
  "South Alabama Jaguars": "4",
  "UTEP Miners": "2.5",
  "UMass Minutemen": "3.5",
  "Sam Houston Bearkats": "2.5",
  "Southern Miss Golden Eagles": "2",
  "Northern Illinois Huskies": "2",
  "ULâ€“Monroe Warhawks": "2",
};
const DEFAULT_PLAY_BY_ID = new Map(DEFAULT_PLAYS.map((play) => [play.id, play]));
const DEFAULT_PLAY_BY_NAME = new Map(DEFAULT_PLAYS.map((play) => [`${play.formation}:::${play.play}`.toLowerCase(), play]));

const teams = window.CFB27_DATA.teams;
let state = loadState();
let activeLeague = state.activeLeague || "ndl";
let activeView = state.activeView || "draft";
let selectedTeamId = null;

const els = {
  rows: document.getElementById("teamRows"),
  leaguePanel: document.getElementById("leaguePanel"),
  navDrafted: document.getElementById("navDrafted"),
  draftView: document.getElementById("draftView"),
  playbookView: document.getElementById("playbookView"),
  playbookPanel: document.getElementById("playbookPanel"),
  playbookSets: document.getElementById("playbookSets"),
  rankingPanel: document.getElementById("rankingPanel"),
  generatorBeta: document.getElementById("generatorBeta"),
  playbookSearch: document.getElementById("playbookSearch"),
  playbookSort: document.getElementById("playbookSort"),
  playbookDirection: document.getElementById("playbookDirection"),
  playbookMode: document.getElementById("playbookMode"),
  bulkPlayActions: document.getElementById("bulkPlayActions"),
  bulkPlayStatus: document.getElementById("bulkPlayStatus"),
  bulkMarkPlays: document.getElementById("bulkMarkPlays"),
  conceptOptions: document.getElementById("conceptOptions"),
  addPlay: document.getElementById("addPlay"),
  generatePlaybook: document.getElementById("generatePlaybook"),
  applyGenerator: document.getElementById("applyGenerator"),
  exportPlaybook: document.getElementById("exportPlaybook"),
  exportBackup: document.getElementById("exportBackup"),
  importBackupButton: document.getElementById("importBackupButton"),
  importBackupInput: document.getElementById("importBackupInput"),
  bonusHeader: document.getElementById("leagueBonusHeader"),
  teamOptions: document.getElementById("teamOptions"),
  dialog: document.getElementById("teamDialog"),
  dialogTitle: document.getElementById("dialogTitle"),
  dialogConference: document.getElementById("dialogConference"),
  dialogBody: document.getElementById("dialogBody"),
  situationDialog: document.getElementById("situationDialog"),
  situationFormation: document.getElementById("situationFormation"),
  situationTitle: document.getElementById("situationTitle"),
  situationBody: document.getElementById("situationBody"),
  suggestSituations: document.getElementById("suggestSituations"),
  pairDialog: document.getElementById("pairDialog"),
  pairFormation: document.getElementById("pairFormation"),
  pairTitle: document.getElementById("pairTitle"),
  pairBody: document.getElementById("pairBody"),
};
let selectedSituationPlayId = null;
let selectedPairPlayId = null;
let pairSearchQuery = "";
let syncSaveTimer = null;
let syncPollTimer = null;
let hasPendingCloudSave = false;
let isApplyingRemoteState = false;
let hasBooted = false;
let syncStatus = "";
let syncStatusTone = "";

function loadState() {
  const fallback = {
    activeLeague: "ndl",
    activeView: "draft",
    ndlProjectedPickRate: NDL_PROJECTED_PICK_RATE,
    sort: "manual",
    sortDirection: "asc",
    filters: { search: "", conference: "all", tier: "all", availability: "all" },
    leagues: { z: {}, ndl: {} },
    draftedTeams: { z: [], ndl: [] },
    heldTeams: { z: [], ndl: [] },
    ndlFavorites: [],
    sharedTeams: {},
    boardOrder: { z: teams.map((t) => t.id), ndl: teams.map((t) => t.id) },
    zUsers: [],
    playbook: { plays: DEFAULT_PLAYS, sort: "setSlot", direction: "asc", search: "", mode: "generator", generatorPreview: [], rankOrder: [] },
  };
  try {
    return normalizeState({ ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") });
  } catch {
    return normalizeState(fallback);
  }
}

function normalizeState(nextState) {
  if (!nextState.filters) nextState.filters = { search: "", conference: "all", tier: "all", availability: "all" };
  const projectedPickRate = Number(nextState.ndlProjectedPickRate);
  nextState.ndlProjectedPickRate =
    Number.isFinite(projectedPickRate) && projectedPickRate > 0 && projectedPickRate <= 1 ? projectedPickRate : NDL_PROJECTED_PICK_RATE;
  if (!nextState.filters.availability) nextState.filters.availability = "all";
  if (!nextState.draftedTeams) nextState.draftedTeams = { z: [], ndl: [] };
  if (!Array.isArray(nextState.draftedTeams.z)) nextState.draftedTeams.z = [];
  if (!Array.isArray(nextState.draftedTeams.ndl)) nextState.draftedTeams.ndl = [];
  if (!nextState.heldTeams) nextState.heldTeams = { z: [], ndl: [] };
  if (!Array.isArray(nextState.heldTeams.z)) nextState.heldTeams.z = [];
  if (!Array.isArray(nextState.heldTeams.ndl)) nextState.heldTeams.ndl = [];
  if (!Array.isArray(nextState.ndlFavorites)) nextState.ndlFavorites = [];
  nextState.ndlFavorites = [...new Set(nextState.ndlFavorites)].filter((id) => teams.some((team) => team.id === id));
  if (!nextState.ndlHeldMigrationComplete && nextState.draftedTeams.ndl.length) {
    nextState.heldTeams.ndl = [...new Set([...nextState.heldTeams.ndl, ...nextState.draftedTeams.ndl])];
    nextState.draftedTeams.ndl = [];
    nextState.ndlHeldMigrationComplete = true;
  }
  if (!nextState.sharedTeams) nextState.sharedTeams = {};
  if (!nextState.playbook) nextState.playbook = { plays: [] };
  if (nextState.playbook.sort === "playType") nextState.playbook.sort = "concepts";
  if (!nextState.playbook.sort) nextState.playbook.sort = "setSlot";
  if (!nextState.playbook.direction) nextState.playbook.direction = "asc";
  if (!nextState.playbook.search) nextState.playbook.search = "";
  if (!["generator", "live", "gameday", "favoriteUpdate", "practice", "history", "ranking", "list"].includes(nextState.playbook.mode)) nextState.playbook.mode = "generator";
  if (!Array.isArray(nextState.playbook.generatorPreview)) nextState.playbook.generatorPreview = [];
  if (!Array.isArray(nextState.playbook.rankOrder)) nextState.playbook.rankOrder = [];
  if (!nextState.playbook.favoriteUpdate) nextState.playbook.favoriteUpdate = { newPlayIds: [], builtAt: "" };
  if (!Array.isArray(nextState.playbook.favoriteUpdate.newPlayIds)) nextState.playbook.favoriteUpdate.newPlayIds = [];
  const shouldSyncSheetRatings = nextState.playbook.ratingVersion !== PLAYBOOK_RATING_VERSION;
  if (!Array.isArray(nextState.playbook.plays) || !nextState.playbook.plays.length) {
    nextState.playbook.plays = DEFAULT_PLAYS.map((play) => ({ ...play }));
  }
  seedNdlWinGoals(nextState);
  Object.entries(nextState.draftedTeams).forEach(([leagueKey, ids]) => {
    if (!nextState.leagues[leagueKey]) nextState.leagues[leagueKey] = {};
    ids.forEach((teamId) => {
      if (!nextState.leagues[leagueKey][teamId]) nextState.leagues[leagueKey][teamId] = {};
      nextState.leagues[leagueKey][teamId].available = false;
    });
  });
  Object.entries(nextState.heldTeams).forEach(([leagueKey, ids]) => {
    if (!nextState.leagues[leagueKey]) nextState.leagues[leagueKey] = {};
    ids.forEach((teamId) => {
      if (!nextState.leagues[leagueKey][teamId]) nextState.leagues[leagueKey][teamId] = {};
      nextState.leagues[leagueKey][teamId].available = false;
    });
  });
  nextState.playbook.plays = nextState.playbook.plays.filter((play) => play.id !== "need-try-shotgun-bunch-dash-flood");
  nextState.playbook.plays = nextState.playbook.plays.map((play, index) => ({
    ...normalizePlay(play, index, shouldSyncSheetRatings)
  }));
  const playIds = new Set(nextState.playbook.plays.map((play) => play.id));
  nextState.playbook.rankOrder = normalizeRankOrder(nextState.playbook.rankOrder, nextState.playbook.plays);
  nextState.playbook.generatorPreview = nextState.playbook.generatorPreview
    .map((group) => normalizePairedPlayIds(group).filter((id) => playIds.has(id)))
    .filter((group) => group.length);
  nextState.playbook.ratingVersion = PLAYBOOK_RATING_VERSION;
  Object.values(nextState.leagues || {}).forEach((league) => {
    Object.entries(league || {}).forEach(([teamId, teamState]) => {
      const shared = nextState.sharedTeams[teamId] || {};
      ["qb1", "rb1", "rb2", "wr1", "wr2", "wr3", "te1", "ol1", "ol2", "dl1", "dl2", "lb1", "lb2", "db1", "db2"].forEach((slot) => {
        if (shared[slot] === undefined && teamState[slot] !== undefined) shared[slot] = teamState[slot];
      });
      if (!shared.teamBonus && teamState.teamBonus) shared.teamBonus = teamState.teamBonus;
      if (!shared.conferenceTier && teamState.conferenceTier) shared.conferenceTier = teamState.conferenceTier;
      if (!shared.playerBonuses && teamState.playerBonuses) shared.playerBonuses = teamState.playerBonuses;
      nextState.sharedTeams[teamId] = shared;
    });
  });
  Object.values(nextState.sharedTeams).forEach((teamState) => {
    if (!teamState.teamBonus) teamState.teamBonus = "none";
    if (teamState.teamBonus === "love") teamState.teamBonus = "super-fan";
    if (teamState.teamBonus === "like") teamState.teamBonus = "big-fan";
    if (!teamState.playerBonuses) teamState.playerBonuses = {};
    if (!teamState.conferenceTier) teamState.conferenceTier = "";
  });
  nextState.zUsers = (nextState.zUsers || []).map((user) => ({
    name: user.name === "Unnamed" ? "" : user.name || "",
    discordUsername: user.discordUsername ?? user.handle ?? "",
    cfbUsername: user.cfbUsername || "",
    status: USER_STATUSES.includes(user.status) ? user.status : "Need to Reach Out",
  }));
  if (!nextState.zUsers.length) {
    nextState.zUsers = DEFAULT_Z_USERS.map((user) => ({ ...user }));
  }
  return nextState;
}

function seedNdlWinGoals(nextState) {
  if (!nextState.leagues) nextState.leagues = {};
  if (!nextState.leagues.ndl) nextState.leagues.ndl = {};
  teams.forEach((team) => {
    const winGoal = NDL_WIN_GOALS[team.displayName];
    if (winGoal === undefined) return;
    if (!nextState.leagues.ndl[team.id]) nextState.leagues.ndl[team.id] = {};
    if (nextState.leagues.ndl[team.id].ndlWinGoal === undefined || nextState.leagues.ndl[team.id].ndlWinGoal === "") {
      nextState.leagues.ndl[team.id].ndlWinGoal = winGoal;
    }
  });
}

function normalizePlay(play, index, shouldSyncSheetRatings) {
  const id = play.id || `play-${Date.now()}-${index}`;
  const formation = play.formation || "";
  const playName = play.play || "";
  const imported = DEFAULT_PLAY_BY_ID.get(id) || DEFAULT_PLAY_BY_NAME.get(`${formation}:::${playName}`.toLowerCase());
  const seededImage = PLAY_ART_SEEDS[`${formation}:::${playName}`.toLowerCase()];
  const rating = shouldSyncSheetRatings && imported && !play.ratingEdited ? imported.zRating : play.zRating;
  const normalizedRating = rating === "" || rating === null || rating === undefined ? "" : clampPlayRating(rating);
  return {
    id,
    set: play.set || imported?.set || "A",
    slot: String(play.slot || imported?.slot || ((index % 3) + 1)),
    formation,
    play: playName,
    preSnap: play.preSnap || "",
    mainRead: play.mainRead || "",
    playType: "",
    concepts: normalizeConcepts(play.concepts || imported?.concepts || [play.concept1, play.concept2, play.concept3, play.playType || imported?.playType]),
    zRating: normalizedRating,
    sheetRating: play.sheetRating || imported?.sheetRating || "",
    ratingEdited: Boolean(play.ratingEdited),
    situations: normalizeSituations(play.situations || imported?.situations || {}),
    needPractice: Boolean(play.needPractice || play.needToTry),
    addedToBook: Boolean(play.addedToBook || play.added),
    addedToFavs: Boolean(play.addedToFavs),
    favoriteUpdateNew: Boolean(play.favoriteUpdateNew),
    pairedPlayIds: normalizePairedPlayIds(play.pairedPlayIds || play.pairsWellWith || play.pairWith || []),
    image: play.image || imported?.image || seededImage || "",
    source: play.source || "Manual",
    addedAt: Number(play.addedAt) || (String(id).match(/^manual-(\d+)/) ? Number(String(id).match(/^manual-(\d+)/)[1]) : ""),
  };
}

function normalizePairedPlayIds(value) {
  if (!Array.isArray(value)) return value ? [String(value)] : [];
  return [...new Set(value.filter(Boolean).map(String))];
}

function normalizeConcepts(value) {
  const list = Array.isArray(value) ? value : [value];
  return [0, 1, 2].map((index) => String(list[index] || "").trim());
}

function playConcepts(play) {
  return normalizeConcepts(play.concepts).filter(Boolean);
}

function conceptSummary(play) {
  return playConcepts(play).join(", ");
}

function normalizedConcept(value) {
  return String(value || "").trim().toLowerCase();
}

function sharedConcepts(a, b) {
  const bConcepts = new Set(playConcepts(b).map(normalizedConcept));
  return playConcepts(a).filter((concept) => bConcepts.has(normalizedConcept(concept)));
}

function normalizeRankOrder(order, plays) {
  const ratedPlays = plays.filter(hasPlayRating);
  const playIds = new Set(ratedPlays.map((play) => play.id));
  const kept = normalizePairedPlayIds(order).filter((id) => playIds.has(id));
  const keptSet = new Set(kept);
  const missing = ratedPlays
    .filter((play) => !keptSet.has(play.id))
    .sort(
      (a, b) =>
        clampPlayRating(b.zRating) - clampPlayRating(a.zRating) ||
        String(a.formation).localeCompare(String(b.formation), undefined, { numeric: true }) ||
        String(a.play).localeCompare(String(b.play), undefined, { numeric: true })
    )
    .map((play) => play.id);
  return [...kept, ...missing];
}

function normalizeSituations(situations) {
  const normalized = {};
  PLAY_SITUATIONS.forEach(([key]) => {
    normalized[key] = situations[key] === "" || situations[key] === undefined ? "" : clampPlayRating(situations[key]);
  });
  return normalized;
}

function saveState() {
  state.activeLeague = activeLeague;
  state.activeView = activeView;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (!hasBooted) return;
  if (!isApplyingRemoteState) markLocalEdited();
  scheduleCloudSave();
}

function syncCode() {
  return localStorage.getItem(SYNC_CODE_KEY) || DEFAULT_SYNC_CODE;
}

function lastCloudUpdatedAt() {
  return localStorage.getItem(SYNC_UPDATED_KEY) || "";
}

function setLastCloudUpdatedAt(updatedAt) {
  if (updatedAt) localStorage.setItem(SYNC_UPDATED_KEY, updatedAt);
}

function lastLocalEditAt() {
  return Number(localStorage.getItem(SYNC_LOCAL_EDIT_KEY) || 0);
}

function markLocalEdited() {
  localStorage.setItem(SYNC_LOCAL_EDIT_KEY, String(Date.now()));
}

function clearLocalEdited() {
  localStorage.removeItem(SYNC_LOCAL_EDIT_KEY);
}

function hasUnsyncedLocalChange() {
  const localEdit = lastLocalEditAt();
  if (!localEdit) return false;
  const cloudUpdated = Date.parse(lastCloudUpdatedAt());
  return !Number.isFinite(cloudUpdated) || localEdit > cloudUpdated;
}

function isNewerCloudSave(updatedAt) {
  if (!updatedAt) return false;
  const current = Date.parse(lastCloudUpdatedAt());
  const next = Date.parse(updatedAt);
  if (!Number.isFinite(next)) return updatedAt !== lastCloudUpdatedAt();
  if (!Number.isFinite(current)) return true;
  return next > current;
}

function setSyncStatus(message, tone = "") {
  syncStatus = message;
  syncStatusTone = tone;
  const target = document.getElementById("syncStatus");
  if (!target) return;
  target.textContent = message || (syncCode() ? "Cloud sync connected" : "Local only");
  target.classList.toggle("good", tone === "good");
  target.classList.toggle("bad", tone === "bad");
}

function refreshSyncControls() {
  const input = document.getElementById("syncCodeInput");
  if (input && document.activeElement !== input) input.value = syncCode();
  setSyncStatus(syncStatus || (syncCode() ? "Sync on: saves now, refresh pulls" : "Local only"), syncStatusTone);
}

function scheduleCloudSave() {
  if (isApplyingRemoteState || !syncCode()) return;
  hasPendingCloudSave = true;
  clearTimeout(syncSaveTimer);
  syncSaveTimer = setTimeout(() => {
    pushCloudState({ quiet: true }).catch((error) => setSyncStatus(error.message, "bad"));
  }, 1200);
}

async function cloudStateRequest(method, body = null) {
  const code = syncCode();
  if (!code) throw new Error("Enter your sync code first.");
  const response = await fetch(CLOUD_SYNC_ENDPOINT, {
    method,
    headers: {
      "content-type": "application/json",
      "x-cfb27-sync-code": code,
    },
    body: body ? JSON.stringify(body) : null,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Cloud sync failed (${response.status})`);
  return payload;
}

async function pullCloudState() {
  setSyncStatus("Pulling cloud state...");
  const payload = await cloudStateRequest("GET");
  if (!payload.state) {
    setSyncStatus("No cloud save yet. Push this browser first.", "bad");
    return;
  }
  isApplyingRemoteState = true;
  state = normalizeState(payload.state);
  activeLeague = state.activeLeague || "ndl";
  activeView = state.activeView || "draft";
  saveState();
  isApplyingRemoteState = false;
  render();
  setLastCloudUpdatedAt(payload.updatedAt);
  setSyncStatus(`Pulled cloud save ${payload.updatedAt ? new Date(payload.updatedAt).toLocaleString() : ""}`, "good");
}

async function pushCloudState(options = {}) {
  if (!options.quiet) setSyncStatus("Pushing cloud state...");
  const payload = await cloudStateRequest("PUT", { state });
  hasPendingCloudSave = false;
  setLastCloudUpdatedAt(payload.updatedAt);
  clearLocalEdited();
  setSyncStatus(`Saved to cloud ${payload.updatedAt ? new Date(payload.updatedAt).toLocaleTimeString() : ""}`, "good");
}

async function checkCloudState(options = {}) {
  if (!syncCode() || isApplyingRemoteState || hasPendingCloudSave) return;
  if (hasUnsyncedLocalChange()) {
    await pushCloudState({ quiet: true });
    return;
  }
  const payload = await cloudStateRequest("GET");
  if (!payload.state) {
    if (options.pushIfEmpty) await pushCloudState({ quiet: true });
    return;
  }
  if (!options.force && !isNewerCloudSave(payload.updatedAt)) return;
  isApplyingRemoteState = true;
  try {
    state = normalizeState(payload.state);
    activeLeague = state.activeLeague || "ndl";
    activeView = state.activeView || "draft";
    saveState();
  } finally {
    isApplyingRemoteState = false;
  }
  setLastCloudUpdatedAt(payload.updatedAt);
  render();
  setSyncStatus(`Pulled cloud on refresh ${payload.updatedAt ? new Date(payload.updatedAt).toLocaleTimeString() : ""}`, "good");
}

function startAutoCloudSync(options = {}) {
  clearInterval(syncPollTimer);
  if (!syncCode()) return;
  if (!hasBooted) clearLocalEdited();
  checkCloudState(options).catch((error) => setSyncStatus(error.message, "bad"));
}

function leagueTeam(teamId) {
  if (!state.leagues[activeLeague]) state.leagues[activeLeague] = {};
  if (!state.leagues[activeLeague][teamId]) {
    state.leagues[activeLeague][teamId] = {
      available: true,
      zBonus: "none",
      confWinGoal: "",
      projectedWins: "",
      ndlRiskRating: "",
      ndlWinGoal: "",
      rivalsUnder80: "",
      rivalTier: "none",
      notes: "",
    };
  }
  if (state.leagues[activeLeague][teamId].ndlRiskRating === undefined) state.leagues[activeLeague][teamId].ndlRiskRating = "";
  if (state.leagues[activeLeague][teamId].ndlWinGoal === undefined) state.leagues[activeLeague][teamId].ndlWinGoal = "";
  return state.leagues[activeLeague][teamId];
}

function sharedTeam(teamId) {
  if (!state.sharedTeams) state.sharedTeams = {};
  if (!state.sharedTeams[teamId]) {
    state.sharedTeams[teamId] = {
      teamBonus: "none",
      playerBonuses: {},
      conferenceTier: "",
    };
  }
  if (!state.sharedTeams[teamId].playerBonuses) state.sharedTeams[teamId].playerBonuses = {};
  if (!state.sharedTeams[teamId].teamBonus) state.sharedTeams[teamId].teamBonus = "none";
  if (!state.sharedTeams[teamId].conferenceTier) state.sharedTeams[teamId].conferenceTier = "";
  return state.sharedTeams[teamId];
}

function slotValue(team, slot) {
  const edited = sharedTeam(team.id)[slot];
  return edited === "" || edited === undefined ? team.slots[slot] : Number(edited);
}

function playerBonus(team, slot) {
  const bonusKey = sharedTeam(team.id).playerBonuses?.[slot] || "none";
  return PLAYER_BONUSES[bonusKey] || 0;
}

function adjustedSlotValue(team, slot) {
  const value = slotValue(team, slot);
  return Number.isFinite(value) ? value + playerBonus(team, slot) : value;
}

function baseTalent(team) {
  let total = 0;
  let weight = 0;
  Object.entries(SLOT_WEIGHTS).forEach(([slot, slotWeight]) => {
    const value = adjustedSlotValue(team, slot);
    if (Number.isFinite(value)) {
      const boostedWeight = slotWeight * (TALENT_WEIGHT_BOOSTS[slot] || 1);
      total += value * boostedWeight;
      weight += boostedWeight;
    }
  });
  return weight ? total / weight : team.overall;
}

function ndlAdjustment(team) {
  const item = leagueTeam(team.id);
  const goal = Number(item.confWinGoal);
  const wins = Number(item.projectedWins);
  const rivals = Number(item.rivalsUnder80);
  const schedulePenalty = Number.isFinite(goal) && Number.isFinite(wins) ? (wins - goal) * 0.55 : 0;
  const rivalPenalty = Number.isFinite(rivals) ? rivals * -0.35 : 0;
  return schedulePenalty + rivalPenalty + ndlRangeAdjustment(team) + (RIVAL_TIERS[item.rivalTier] || 0);
}

function ndlRangeAdjustment(team) {
  const item = leagueTeam(team.id);
  const ranges = ndlInputRanges();
  return (
    normalizedLowerIsBetterAdjustment(item.ndlWinGoal, ranges.winGoal, NDL_WIN_GOAL_WEIGHT) +
    normalizedLowerIsBetterAdjustment(item.ndlRiskRating, ranges.risk, NDL_RISK_WEIGHT)
  );
}

function ndlInputRanges() {
  const valuesFor = (field) =>
    teams
      .map((team) => Number(state.leagues?.ndl?.[team.id]?.[field]))
      .filter((value) => Number.isFinite(value));
  const rangeFor = (values) => ({
    min: values.length ? Math.min(...values) : null,
    max: values.length ? Math.max(...values) : null,
  });
  return {
    winGoal: rangeFor(valuesFor("ndlWinGoal")),
    risk: rangeFor(valuesFor("ndlRiskRating")),
  };
}

function normalizedLowerIsBetterAdjustment(value, range, weight) {
  const number = Number(value);
  if (!Number.isFinite(number) || range.min === null || range.max === null || range.min === range.max) return 0;
  const midpoint = (range.min + range.max) / 2;
  const halfRange = (range.max - range.min) / 2;
  return ((midpoint - number) / halfRange) * weight;
}

function zRating(team) {
  const base = baseTalent(team) * 0.72 + team.overall * 0.28;
  const bonus = TEAM_BONUSES[sharedTeam(team.id).teamBonus] || 0;
  const leagueAdjustment = activeLeague === "ndl" ? ndlAdjustment(team) : 0;
  return base + bonus + leagueAdjustment;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ratingStyle(value) {
  const rating = Number(value);
  if (!Number.isFinite(rating)) return "";
  const low = 68;
  const mid = 83.5;
  const high = 99;
  if (rating <= low) return 'style="background-color: rgba(174, 48, 48, 0.28);"';
  if (rating >= high) return 'style="background-color: rgba(22, 122, 74, 0.3);"';
  if (rating < mid) {
    const alpha = ((mid - rating) / (mid - low)) * 0.24;
    return `style="background-color: rgba(174, 48, 48, ${alpha.toFixed(3)});"`;
  }
  const alpha = ((rating - mid) / (high - mid)) * 0.28;
  return `style="background-color: rgba(22, 122, 74, ${alpha.toFixed(3)});"`;
}

function lowerIsBetterStyle(value, range) {
  const number = Number(value);
  if (!Number.isFinite(number) || range.min === null || range.max === null || range.min === range.max) return "";
  const midpoint = (range.min + range.max) / 2;
  if (number <= midpoint) {
    const alpha = 0.08 + ((midpoint - number) / (midpoint - range.min || 1)) * 0.22;
    return `style="background-color: rgba(22, 122, 74, ${Math.min(alpha, 0.3).toFixed(3)});"`;
  }
  const alpha = 0.08 + ((number - midpoint) / (range.max - midpoint || 1)) * 0.22;
  return `style="background-color: rgba(174, 48, 48, ${Math.min(alpha, 0.3).toFixed(3)});"`;
}

function fixedBoardNumber(value, style = "") {
  const number = Number(value);
  const display = Number.isFinite(number) ? number : "--";
  return `<span class="board-fixed-number" ${style}>${escapeHtml(display)}</span>`;
}

function clampPlayRating(value) {
  const rating = Number(value);
  if (!Number.isFinite(rating)) return 3;
  return Math.max(1, Math.min(5, Math.round(rating * 2) / 2));
}

function hasPlayRating(play) {
  return play.zRating !== "" && play.zRating !== null && play.zRating !== undefined && Number.isFinite(Number(play.zRating));
}

function isGeneratorEligible(play) {
  return Boolean(hasPlayRating(play) && !play.needPractice);
}

function isPlaybookEligible(play) {
  return Boolean(play.addedToBook && isGeneratorEligible(play));
}

function playRatingStyle(value) {
  if (value === "" || value === null || value === undefined) return "";
  const rating = clampPlayRating(value);
  const mid = 3;
  if (rating <= 1) return 'style="background-color: rgba(174, 48, 48, 0.3);"';
  if (rating >= 5) return 'style="background-color: rgba(47, 111, 214, 0.32);"';
  if (rating < mid) {
    const alpha = ((mid - rating) / 2) * 0.24;
    return `style="background-color: rgba(174, 48, 48, ${alpha.toFixed(3)});"`;
  }
  if (rating === mid) return 'style="background-color: rgba(255, 255, 255, 0.95);"';
  const alpha = ((rating - mid) / 2) * 0.28;
  return `style="background-color: rgba(47, 111, 214, ${alpha.toFixed(3)});"`;
}

function ratingNumberLabel(value) {
  if (value === "" || value === null || value === undefined) return "";
  const rating = clampPlayRating(value);
  return `${Number.isInteger(rating) ? rating : rating.toFixed(1)}`;
}

function zRankForPlay(play) {
  if (!hasPlayRating(play)) return null;
  const order = normalizeRankOrder(state.playbook.rankOrder, state.playbook.plays);
  const index = order.indexOf(play.id);
  return index >= 0 ? index + 1 : state.playbook.plays.length;
}

function zRankLabel(play) {
  const rank = zRankForPlay(play);
  return rank ? `z${rank}` : "rank";
}

function zRankToneClass(play) {
  const rank = zRankForPlay(play);
  if (!rank) return "z-rank-unrated";
  if (rank <= 20) return "z-rank-top";
  if (rank <= 40) return "z-rank-high";
  if (rank <= 60) return "z-rank-mid";
  if (rank <= 80) return "z-rank-low";
  return "z-rank-bottom";
}

function playRatingToneClass(value) {
  const rating = clampPlayRating(value);
  if (rating >= 5) return "rating-tone-5";
  if (rating >= 4) return "rating-tone-4";
  return "rating-tone-low";
}

function bonusClass(value) {
  if (value === "super-fan") return "bonus-super-fan";
  if (value === "big-fan") return "bonus-big-fan";
  if (value === "notable") return "bonus-notable";
  return "";
}

function teamTier(team) {
  return sharedTeam(team.id).conferenceTier || team.conferenceTier;
}

function conferenceLogo(conference) {
  const logo = CONFERENCE_LOGOS[conference];
  if (!logo) return `<span class="conference-badge conference-independent" title="${escapeHtml(conference)}">IND</span>`;
  return `<img class="conference-logo" src="${escapeHtml(logo)}" alt="${escapeHtml(conference)}" title="${escapeHtml(conference)}" loading="lazy" />`;
}

function isNdlFavorite(teamId) {
  return (state.ndlFavorites || []).includes(teamId);
}

function toggleNdlFavorite(teamId) {
  if (!state.ndlFavorites) state.ndlFavorites = [];
  if (isNdlFavorite(teamId)) state.ndlFavorites = state.ndlFavorites.filter((id) => id !== teamId);
  else state.ndlFavorites = [...state.ndlFavorites, teamId];
}

function filteredTeams() {
  const filters = state.filters;
  const query = filters.search.trim().toLowerCase();
  return teams.filter((team) => {
    const item = leagueTeam(team.id);
    const names = Object.values(team.slotNames).join(" ").toLowerCase();
    const haystack = `${team.displayName} ${team.conference} ${names}`.toLowerCase();
    if (query && !haystack.includes(query)) return false;
    if (filters.conference !== "all" && team.conference !== filters.conference) return false;
    if (filters.tier !== "all" && teamTier(team) !== filters.tier) return false;
    const unavailable = isTeamUnavailable(team.id);
    if (filters.availability === "available" && unavailable) return false;
    if (filters.availability === "taken" && !unavailable) return false;
    return true;
  });
}

function sortedTeams(list) {
  const sort = state.sort || "manual";
  const direction = state.sortDirection === "asc" ? 1 : -1;
  const order = state.boardOrder[activeLeague] || teams.map((t) => t.id);
  const index = new Map(order.map((id, i) => [id, i]));
  const sorted = [...list];
  sorted.sort((a, b) => {
    if (sort === "manual") return (index.get(a.id) ?? 9999) - (index.get(b.id) ?? 9999);
    let result = 0;
    if (sort === "team") result = a.displayName.localeCompare(b.displayName);
    else if (sort === "available") result = Number(leagueTeam(a.id).available) - Number(leagueTeam(b.id).available);
    else if (sort === "conference") result = a.conference.localeCompare(b.conference) || a.displayName.localeCompare(b.displayName);
    else if (sort === "tier") result = teamTier(a).localeCompare(teamTier(b)) || a.displayName.localeCompare(b.displayName);
    else if (sort === "talent") result = baseTalent(a) - baseTalent(b);
    else if (sort === "zRating") result = zRating(a) - zRating(b);
    else if (sort === "ndlRiskRating") return compareNumericField(leagueTeam(a.id).ndlRiskRating, leagueTeam(b.id).ndlRiskRating, direction);
    else if (sort === "ndlWinGoal") return compareNumericField(leagueTeam(a.id).ndlWinGoal, leagueTeam(b.id).ndlWinGoal, direction);
    else if (sort === "teamBonus") result = (TEAM_BONUSES[sharedTeam(a.id).teamBonus] || 0) - (TEAM_BONUSES[sharedTeam(b.id).teamBonus] || 0);
    else result = (a[sort] || 0) - (b[sort] || 0);
    return result * direction;
  });
  return sorted;
}

function compareNumericField(aValue, bValue, direction) {
  const aNumber = Number(aValue);
  const bNumber = Number(bValue);
  const aValid = Number.isFinite(aNumber);
  const bValid = Number.isFinite(bNumber);
  if (!aValid && !bValid) return 0;
  if (!aValid) return 1;
  if (!bValid) return -1;
  return (aNumber - bNumber) * direction;
}

function defaultSortDirection(sort) {
  return ["team", "conference", "tier", "manual"].includes(sort) ? "asc" : "desc";
}

function updateSortHeaders() {
  document.querySelectorAll("[data-sort-header]").forEach((button) => {
    const isActive = button.dataset.sortHeader === (state.sort || "manual");
    button.classList.toggle("active", isActive);
    button.dataset.direction = isActive ? state.sortDirection || defaultSortDirection(state.sort || "manual") : "";
  });
}

function dialogTeamList() {
  const currentList = sortedTeams(filteredTeams());
  return currentList.some((team) => team.id === selectedTeamId) ? currentList : sortedTeams(teams);
}

function draftedTeamIds() {
  if (!state.draftedTeams) state.draftedTeams = { z: [], ndl: [] };
  if (!Array.isArray(state.draftedTeams[activeLeague])) state.draftedTeams[activeLeague] = [];
  return state.draftedTeams[activeLeague];
}

function heldTeamIds() {
  if (!state.heldTeams) state.heldTeams = { z: [], ndl: [] };
  if (!Array.isArray(state.heldTeams[activeLeague])) state.heldTeams[activeLeague] = [];
  return state.heldTeams[activeLeague];
}

function draftedTeamsForLeague() {
  const byId = new Map(teams.map((team) => [team.id, team]));
  return draftedTeamIds().map((id) => byId.get(id)).filter(Boolean);
}

function heldTeamsForLeague() {
  const byId = new Map(teams.map((team) => [team.id, team]));
  return heldTeamIds().map((id) => byId.get(id)).filter(Boolean);
}

function isTeamUnavailable(teamId) {
  return draftedTeamIds().includes(teamId) || heldTeamIds().includes(teamId) || !leagueTeam(teamId).available;
}

function teamDraftStatus(teamId) {
  if (heldTeamIds().includes(teamId)) return "Held";
  if (draftedTeamIds().includes(teamId)) return "Drafted";
  return leagueTeam(teamId).available ? "Yes" : "No";
}

function findTeamByText(value) {
  const query = String(value || "").trim().toLowerCase();
  if (!query) return null;
  return (
    teams.find((team) => team.displayName.toLowerCase() === query || team.team.toLowerCase() === query) ||
    teams.find((team) => team.displayName.toLowerCase().includes(query) || team.team.toLowerCase().includes(query))
  );
}

function markTeamDrafted(teamId) {
  const ids = draftedTeamIds();
  if (!ids.includes(teamId)) ids.push(teamId);
  state.heldTeams[activeLeague] = heldTeamIds().filter((id) => id !== teamId);
  leagueTeam(teamId).available = false;
}

function removeDraftedTeam(teamId) {
  state.draftedTeams[activeLeague] = draftedTeamIds().filter((id) => id !== teamId);
  leagueTeam(teamId).available = true;
}

function removeHeldTeam(teamId) {
  state.heldTeams[activeLeague] = heldTeamIds().filter((id) => id !== teamId);
  leagueTeam(teamId).available = true;
}

function setTeamAvailability(teamId, available) {
  leagueTeam(teamId).available = available;
  if (available) {
    state.draftedTeams[activeLeague] = draftedTeamIds().filter((id) => id !== teamId);
    state.heldTeams[activeLeague] = heldTeamIds().filter((id) => id !== teamId);
  } else {
    markTeamDrafted(teamId);
  }
}

function addDraftedTeamFromInput(input) {
  const team = findTeamByText(input?.value || "");
  if (!team) return false;
  markTeamDrafted(team.id);
  if (input) input.value = "";
  render();
  return true;
}

function ndlDraftPickState() {
  const draftedCount = state.draftedTeams?.ndl?.length || 0;
  const picksUntilMine = Math.max(1, NDL_DRAFT_SLOT - draftedCount);
  const remaining = (state.boardOrder.ndl || teams.map((team) => team.id)).filter((id) => {
    const item = state.leagues.ndl?.[id];
    const drafted = state.draftedTeams.ndl?.includes(id);
    const held = state.heldTeams.ndl?.includes(id);
    return !drafted && !held && item?.available !== false;
  });
  const worstIndex = Math.min(remaining.length - 1, picksUntilMine - 1);
  const projectedRate = Number(state.ndlProjectedPickRate || NDL_PROJECTED_PICK_RATE);
  const projectedIndex = Math.min(remaining.length - 1, Math.max(0, Math.floor(picksUntilMine * projectedRate) - 1));
  return {
    picksUntilMine,
    worstPickNumber: worstIndex + 1,
    projectedPickNumber: projectedIndex + 1,
    worstTeamId: remaining[worstIndex] || null,
    projectedTeamId: remaining[projectedIndex] || null,
  };
}

function draftMarkerForTeam(teamId, pickState) {
  if (activeLeague !== "ndl" || !pickState) return null;
  const labels = [];
  if (teamId === pickState.projectedTeamId) labels.push(`Projected Pick #${pickState.projectedPickNumber}`);
  if (teamId === pickState.worstTeamId) labels.push(`Worst Case Scenario Pick #${pickState.worstPickNumber}`);
  return labels.length ? labels.join(" / ") : null;
}

function renderDraftedTeamsPanel() {
  const drafted = draftedTeamsForLeague();
  const held = heldTeamsForLeague();
  return `
    <div class="nav-drafted-card">
      ${activeLeague === "ndl" ? renderNdlDraftPositionSummary() : ""}
      <div class="nav-section-label">Drafted Teams</div>
      <div class="drafted-actions">
        <input id="draftedTeamInput" list="teamOptions" placeholder="Type team name" />
        <button class="primary" id="addDraftedTeam" type="button">Add</button>
      </div>
      <label class="drafted-filter">
        <input type="checkbox" id="hideDraftedTeams" ${state.filters.availability === "available" ? "checked" : ""} />
        Hide unavailable teams
      </label>
      <div class="drafted-list">
        ${
          drafted.length
            ? drafted
                .map((team, index) => renderUnavailableTeamChip(team, "drafted", index + 1))
                .join("")
            : `<p class="fineprint">No teams marked drafted yet.</p>`
        }
      </div>
      <div class="nav-section-label">Kept / Held Teams</div>
      <div class="drafted-list">
        ${
          held.length
            ? held.map((team) => renderUnavailableTeamChip(team, "held")).join("")
            : `<p class="fineprint">No held teams marked yet.</p>`
        }
      </div>
    </div>
  `;
}

function renderNdlDraftPositionSummary() {
  const pickState = ndlDraftPickState();
  const byId = new Map(teams.map((team) => [team.id, team]));
  const projected = byId.get(pickState.projectedTeamId)?.displayName || "TBD";
  const worst = byId.get(pickState.worstTeamId)?.displayName || "TBD";
  return `
    <div class="draft-position-card">
      <span>NDL Draft Slot</span>
      <strong>#${NDL_DRAFT_SLOT}</strong>
      <label class="projected-rate-control">
        <span>Projected Pick %</span>
        <select id="ndlProjectedPickRate">
          ${[0.5, 0.6, 0.65, 0.7, 0.75, 0.8].map((rate) => `<option value="${rate}"${Number(state.ndlProjectedPickRate || NDL_PROJECTED_PICK_RATE) === rate ? " selected" : ""}>${Math.round(rate * 100)}%</option>`).join("")}
        </select>
      </label>
      <small>${pickState.picksUntilMine} picks until your pick</small>
      <small>Projected #${pickState.projectedPickNumber}: ${escapeHtml(projected)}</small>
      <small>Worst #${pickState.worstPickNumber}: ${escapeHtml(worst)}</small>
    </div>
  `;
}

function renderUnavailableTeamChip(team, type, number = null) {
  const action = type === "held" ? "remove-held" : "remove-drafted";
  const label = number ? `${number}. ${team.displayName}` : team.displayName;
  return `
    <div class="drafted-chip ${type === "held" ? "held-chip" : ""}">
      <span>${escapeHtml(label)}</span>
      <button class="chip-remove" data-${action}="${team.id}" type="button" aria-label="Remove ${escapeHtml(team.displayName)}">x</button>
    </div>
  `;
}

function render() {
  document.querySelectorAll("[data-view-button]").forEach((button) => {
    const view = button.dataset.viewButton;
    button.classList.toggle("active", view === activeView || (view === "draft" && activeView === "draft"));
  });
  document.querySelectorAll("[data-playbook-mode-button]").forEach((button) => {
    button.classList.toggle(
      "active",
      activeView === "playbook" && button.dataset.playbookModeButton === (state.playbook.mode || "generator")
    );
  });
  els.draftView.classList.toggle("hidden", activeView !== "draft");
  els.draftView.classList.remove("full-width");
  els.playbookView.classList.toggle("hidden", activeView !== "playbook");
  document.querySelectorAll("[data-league-button]").forEach((button) => {
    button.classList.toggle("active", activeView === "draft" && button.dataset.leagueButton === activeLeague);
  });
  els.teamOptions.innerHTML = teams.map((team) => `<option value="${escapeHtml(team.displayName)}"></option>`).join("");
  els.navDrafted.innerHTML = activeView === "draft" ? renderDraftedTeamsPanel() : "";
  refreshSyncControls();
  updateSortHeaders();
  if (activeView === "draft") {
    renderLeaguePanel();
    renderRows();
  } else {
    renderPlaybook();
  }
  saveState();
}

function renderRows() {
  const list = sortedTeams(filteredTeams());
  const pickState = activeLeague === "ndl" ? ndlDraftPickState() : null;
  const ndlRanges = activeLeague === "ndl" ? ndlInputRanges() : null;
  updateSortHeaders();
  document.querySelectorAll(".ndl-board-col").forEach((cell) => cell.classList.toggle("hidden", activeLeague !== "ndl"));

  els.rows.innerHTML = list
    .map((team, index) => {
      const item = leagueTeam(team.id);
      const shared = sharedTeam(team.id);
      const rank = (state.boardOrder[activeLeague] || []).indexOf(team.id) + 1 || index + 1;
      const draftMarker = draftMarkerForTeam(team.id, pickState);
      const status = teamDraftStatus(team.id);
      const favorite = activeLeague === "ndl" && isNdlFavorite(team.id);
      const bonusCell = `
        <select data-change="teamBonus" data-id="${team.id}">
          <option value="none"${shared.teamBonus === "none" ? " selected" : ""}>None</option>
          <option value="notable"${shared.teamBonus === "notable" ? " selected" : ""}>Notable +1</option>
          <option value="big-fan"${shared.teamBonus === "big-fan" ? " selected" : ""}>Big Fan +2</option>
          <option value="super-fan"${shared.teamBonus === "super-fan" ? " selected" : ""}>Super Fan +3</option>
        </select>
        ${activeLeague === "ndl" ? `<span class="pill">NDL ${ndlAdjustment(team).toFixed(1)}</span>` : ""}
      `;
      return `
        <tr class="${favorite ? "favorite-team-row" : ""} ${draftMarker ? `draft-pick-marker ${draftMarker.includes("Projected") ? "projected-pick-marker" : ""} ${draftMarker.includes("Worst") ? "worst-pick-marker" : ""}` : ""}">
          <td class="number" data-label="Rank">${rank}</td>
          ${
            activeLeague === "ndl"
              ? `<td class="favorite-cell" data-label="Favorite"><button class="favorite-button ${favorite ? "active" : ""}" type="button" data-ndl-favorite="${team.id}" aria-label="${favorite ? "Remove" : "Add"} ${escapeHtml(team.displayName)} as draft favorite">${favorite ? "â˜…" : "â˜†"}</button></td>`
              : ""
          }
          <td data-label="Team">
            <button class="team-cell ghost" data-open="${team.id}">
              <img class="logo" src="${escapeHtml(team.image)}" alt="" />
              <span>
                <span class="team-name">${escapeHtml(team.displayName)}</span>
                <span class="team-meta">QB ${adjustedSlotValue(team, "qb1") ?? "--"} | WR ${adjustedSlotValue(team, "wr1") ?? "--"} | DB ${adjustedSlotValue(team, "db1") ?? "--"}</span>
                ${draftMarker ? `<span class="draft-pick-label">${escapeHtml(draftMarker)}</span>` : ""}
              </span>
            </button>
          </td>
          <td data-label="Avail">
            <label class="${status === "Yes" ? "available" : "taken"}">
              <input type="checkbox" data-change="available" data-id="${team.id}" ${status === "Yes" ? "checked" : ""} />
              ${status}
            </label>
          </td>
          <td class="conference-cell" data-label="Conf">${conferenceLogo(team.conference)}</td>
          <td class="number rating-cell" data-label="OVR" ${ratingStyle(team.overall)}>${team.overall}</td>
          <td class="number rating-cell" data-label="OFF" ${ratingStyle(team.offense)}>${team.offense}</td>
          <td class="number rating-cell" data-label="DEF" ${ratingStyle(team.defense)}>${team.defense}</td>
          <td class="number rating-cell" data-label="Talent" ${ratingStyle(baseTalent(team))}>${baseTalent(team).toFixed(1)}</td>
          <td class="number rating rating-cell" data-label="Z Rating" ${ratingStyle(zRating(team))}>${zRating(team).toFixed(1)}</td>
          ${
            activeLeague === "ndl"
              ? `
                <td data-label="NDL Risk">${fixedBoardNumber(item.ndlRiskRating, lowerIsBetterStyle(item.ndlRiskRating, ndlRanges.risk))}</td>
                <td data-label="Win Goal">${fixedBoardNumber(item.ndlWinGoal, lowerIsBetterStyle(item.ndlWinGoal, ndlRanges.winGoal))}</td>
              `
              : ""
          }
          <td data-label="Bonus">${bonusCell}</td>
          <td data-label="Board">
            <div class="board-buttons">
              <button data-move="up" data-id="${team.id}" title="Move up">Up</button>
              <button data-move="down" data-id="${team.id}" title="Move down">Down</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderLeaguePanel() {
  els.leaguePanel.innerHTML = "";
  els.leaguePanel.classList.add("hidden");
  els.draftView.classList.add("full-width");
}

function userStatusCounts() {
  return (state.zUsers || []).reduce(
    (counts, user) => {
      if (user.status === "Confirmed") counts.confirmed += 1;
      if (user.status === "Waiting on Response") counts.waiting += 1;
      if (user.status === "Need to Reach Out") counts.reachOut += 1;
      return counts;
    },
    { confirmed: 0, waiting: 0, reachOut: 0 }
  );
}

function playbookSets(plays = filteredPlays()) {
  const sets = new Map();
  plays.forEach((play) => {
    const setName = play.set || "A";
    if (!sets.has(setName)) sets.set(setName, []);
    sets.get(setName).push(play);
  });
  return [...sets.entries()].sort(([a], [b]) => setSortValue(a) - setSortValue(b));
}

function setSortValue(setName) {
  const value = String(setName || "A").toUpperCase();
  const oldFallback = value.match(/^A(\d+)$/);
  if (oldFallback) return 26 + Number(oldFallback[1]);
  if (!/^[A-Z]+$/.test(value)) return 9999;
  return value.split("").reduce((total, char) => total * 26 + (char.charCodeAt(0) - 64), 0) - 1;
}

function currentLivePlayOrder(a, b) {
  return (
    setSortValue(a.set) - setSortValue(b.set) ||
    Number(a.slot || 99) - Number(b.slot || 99) ||
    String(a.formation).localeCompare(String(b.formation)) ||
    String(a.play).localeCompare(String(b.play))
  );
}

function normalizeLivePlaybookSetOrder() {
  const livePlays = state.playbook.plays.filter(isPlaybookEligible).sort(currentLivePlayOrder);
  livePlays.forEach((play, index) => {
    play.set = setNameFromIndex(Math.floor(index / 3));
    play.slot = String((index % 3) + 1);
  });
}

function filteredPlays(options = {}) {
  const query = (state.playbook.search || "").trim().toLowerCase();
  const source = options.bookOnly ? state.playbook.plays.filter(isPlaybookEligible) : state.playbook.plays;
  const plays = query
    ? source.filter((play) =>
        [play.set, play.slot, play.formation, play.play, conceptSummary(play), play.preSnap, play.mainRead, play.zRating]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : [...source];
  return sortedPlays(plays);
}

function sortedPlays(plays) {
  const sort = state.playbook.sort || "setSlot";
  const direction = state.playbook.direction === "desc" ? -1 : 1;
  const sorted = [...plays];
  sorted.sort((a, b) => {
    if (sort === "setSlot") {
      return (
        setSortValue(a.set) - setSortValue(b.set) ||
        String(a.slot).localeCompare(String(b.slot), undefined, { numeric: true }) ||
        String(a.formation).localeCompare(String(b.formation))
      );
    }
    if (sort === "zRating") return (clampPlayRating(a.zRating) - clampPlayRating(b.zRating)) * direction;
    if (sort === "concepts") return conceptSummary(a).localeCompare(conceptSummary(b), undefined, { numeric: true }) * direction;
    return String(a[sort] || "").localeCompare(String(b[sort] || ""), undefined, { numeric: true }) * direction;
  });
  return sorted;
}

function renderPlaybook() {
  const plays = state.playbook.plays;
  if (["live", "gameday", "favoriteUpdate"].includes(state.playbook.mode)) normalizeLivePlaybookSetOrder();
  const visiblePlays = filteredPlays();
  const livePlays = ["live", "gameday", "favoriteUpdate"].includes(state.playbook.mode) ? state.playbook.plays.filter(isPlaybookEligible) : filteredPlays({ bookOnly: true });
  const practicePlays = sortedPlays(visiblePlays.filter((play) => play.needPractice));
  const recentPlays = recentAddedPlays(visiblePlays, 20);
  const concepts = [...new Set(plays.flatMap(playConcepts))].sort();
  els.playbookSearch.value = state.playbook.search || "";
  els.playbookSort.value = state.playbook.sort || "setSlot";
  els.playbookDirection.value = state.playbook.direction || "asc";
  els.playbookMode.value = state.playbook.mode || "generator";
  els.bulkPlayActions.classList.toggle("hidden", state.playbook.mode !== "list");
  els.conceptOptions.innerHTML = CONCEPT_OPTIONS.map((concept) => `<option value="${escapeHtml(concept)}"></option>`).join("");
  els.playbookPanel.innerHTML = "";
  els.playbookPanel.classList.add("hidden");

  els.rankingPanel.innerHTML = renderRankingPanel();
  els.rankingPanel.classList.toggle("hidden", state.playbook.mode !== "ranking");
  els.generatorBeta.innerHTML = renderGeneratorBeta();
  els.generatorBeta.classList.toggle("hidden", state.playbook.mode !== "generator");
  els.playbookSets.innerHTML =
    state.playbook.mode === "live"
      ? renderLivePlaybookSetView(livePlays, "No eligible Book plays are in the Live Playbook yet.")
      : state.playbook.mode === "gameday"
        ? renderGamedayPlaybookView(livePlays)
      : state.playbook.mode === "favoriteUpdate"
        ? renderFavoriteUpdateView(livePlays)
      : state.playbook.mode === "practice"
        ? renderPlaybookSetView(practicePlays, "No plays are marked Practice right now.")
      : state.playbook.mode === "history"
        ? renderRecentPlayHistory(recentPlays)
      : (state.playbook.sort || "setSlot") === "setSlot"
        ? renderPlaybookSetView(visiblePlays)
        : renderPlaybookSortedView(visiblePlays);
  els.playbookSets.classList.toggle("hidden", !["list", "live", "gameday", "favoriteUpdate", "practice", "history"].includes(state.playbook.mode));
}

function rankedPlays() {
  const playById = new Map(state.playbook.plays.map((play) => [play.id, play]));
  state.playbook.rankOrder = normalizeRankOrder(state.playbook.rankOrder, state.playbook.plays);
  return state.playbook.rankOrder.map((id) => playById.get(id)).filter(Boolean);
}

function renderRankingPanel() {
  const plays = rankedPlays();
  const unrated = state.playbook.plays.filter((play) => !hasPlayRating(play));
  const nextRank = plays.length + 1;
  return `
    <section class="play-set ranking-play-panel">
      <div class="play-set-head">
        <div>
          <p class="eyebrow">Play Ranking</p>
          <h2>Within-Star Preference</h2>
        </div>
        <button class="ghost light-button" type="button" data-hide-ranking-panel>Hide</button>
      </div>
      <div class="generator-note">Rank new plays first, then move ranked plays up or down to tell Generator Beta what you like most.</div>
      ${
        unrated.length
          ? `<div class="ranking-unrated">
              <div class="slot-heading">Needs Z Rank</div>
              <div class="ranking-list">${unrated.map((play) => renderUnratedPlayRow(play, nextRank)).join("")}</div>
            </div>`
          : ""
      }
      <div class="ranking-list">
        ${plays.map((play, index) => renderRankingRow(play, index, plays.length)).join("")}
      </div>
    </section>
  `;
}

function renderUnratedPlayRow(play, nextRank) {
  return `
    <div class="ranking-play">
      <div class="ranking-controls">
        <strong>--</strong>
      </div>
      <div class="generator-play-info">
        <span class="z-rank-badge z-rank-unrated">rank</span>
        <strong>${escapeHtml(play.play || "Play")}</strong>
        <small>${escapeHtml(play.formation || "Formation")}</small>
      </div>
      <div class="ranking-adjustments">
        <span>Set Rank</span>
        <input class="rank-jump" type="number" min="1" max="${nextRank}" value="${nextRank}" data-rank-add="${escapeHtml(play.id)}" aria-label="Set ${escapeHtml(play.play || "play")} rank" />
      </div>
      ${play.image ? `<img class="generator-play-art" src="${escapeHtml(play.image)}" alt="${escapeHtml(`${play.formation} ${play.play} play art`)}" loading="lazy" />` : `<div class="generator-play-art generator-play-art-empty">No art</div>`}
    </div>
  `;
}

function renderRankingRow(play, index, total) {
  const toneClass = zRankToneClass(play);
  return `
    <div class="ranking-play">
      <div class="ranking-controls">
        <strong>${index + 1}</strong>
        <button class="small-button" type="button" data-rank-move="${escapeHtml(play.id)}" data-rank-direction="up" ${index === 0 ? "disabled" : ""}>^</button>
        <button class="small-button" type="button" data-rank-move="${escapeHtml(play.id)}" data-rank-direction="down" ${index === total - 1 ? "disabled" : ""}>v</button>
        <input class="rank-jump" type="number" min="1" max="${total}" value="${index + 1}" data-rank-jump="${escapeHtml(play.id)}" aria-label="Move ${escapeHtml(play.play || "play")} to rank" />
      </div>
      <div class="generator-play-info">
        <span class="z-rank-badge ${toneClass}">${zRankLabel(play)}</span>
        <strong>${escapeHtml(play.play || "Play")}</strong>
        <small>${escapeHtml(play.formation || "Formation")}</small>
      </div>
      <div class="ranking-adjustments">
        <span>Play Adjustments</span>
        <strong>${escapeHtml(play.preSnap || "No pre-snap note")}</strong>
        <small>${escapeHtml(play.mainRead || "No main read note")}</small>
      </div>
      ${play.image ? `<img class="generator-play-art" src="${escapeHtml(play.image)}" alt="${escapeHtml(`${play.formation} ${play.play} play art`)}" loading="lazy" />` : `<div class="generator-play-art generator-play-art-empty">No art</div>`}
    </div>
  `;
}

function renderGeneratorBeta() {
  const groups = state.playbook.generatorPreview || [];
  const generatorPlays = state.playbook.plays.filter(isGeneratorEligible);
  const pairMap = buildPairConnectionMap(generatorPlays);
  const playById = new Map(state.playbook.plays.map((play) => [play.id, play]));
  const sortedGroups = packGeneratorGroups(groups
    .map((group) => group.map((id) => playById.get(id)).filter(isGeneratorEligible))
    .filter((group) => group.length)
    .sort((a, b) => generatorGroupSortScore(a, pairMap) - generatorGroupSortScore(b, pairMap))
    .map((group) => arrangeGeneratorGroup(group, pairMap)), pairMap)
    .map((group) => group.map((play) => play.id));
  return `
    <section class="play-set generator-beta-panel">
      <div class="play-set-head">
        <div>
          <p class="eyebrow">Generator Beta</p>
          <h2>Suggested Three-Play Sets</h2>
        </div>
        <button class="ghost light-button" type="button" data-clear-generator-preview>Clear Preview</button>
      </div>
      <div class="generator-note">Generator uses every ranked play that is not marked Practice. Build Live Playbook marks generated plays as Book and assigns their set/slot.</div>
      <div class="generator-set-list">
        ${
          sortedGroups.length
            ? sortedGroups.map((group, index) => renderGeneratorGroup(group, index, pairMap)).join("")
            : `<div class="empty-slot">Rank plays and clear Practice, then click Preview Ranked Plays or Build Live Playbook.</div>`
        }
      </div>
    </section>
  `;
}

function renderGeneratorGroup(group, index, pairMap = buildPairConnectionMap(state.playbook.plays)) {
  const plays = arrangeGeneratorGroup(group.map((id) => state.playbook.plays.find((play) => play.id === id)).filter(Boolean), pairMap);
  const { strongPairCount } = generatorPairDetails(plays, pairMap);
  return `
    <div class="generator-set">
      <div class="slot-heading">Suggested Set ${escapeHtml(setNameFromIndex(index))}${strongPairCount === 3 ? ` <span class="pair-icon" title="All three plays pair together" aria-label="All three plays pair together"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.6 13.4a1.4 1.4 0 0 0 2 0l3.9-3.9a3.4 3.4 0 0 0-4.8-4.8l-1.1 1.1" /><path d="M13.4 10.6a1.4 1.4 0 0 0-2 0l-3.9 3.9a3.4 3.4 0 0 0 4.8 4.8l1.1-1.1" /></svg></span>` : ""}</div>
      <div class="generator-slot-grid">
        ${[0, 1, 2].map((slotIndex) => {
          const play = plays[slotIndex];
          const toneClass = play ? zRankToneClass(play) : "";
          return `
            <div class="generator-play">
              ${play ? `
                <div class="generator-play-info">
                  <span>Slot ${slotIndex + 1}</span>
                  <strong>${escapeHtml(play.play || "Play")}</strong>
                  <small>${escapeHtml(play.formation || "Formation")} | <b class="z-rank-badge ${toneClass}">${zRankLabel(play)}</b></small>
                </div>
                ${play.image ? `<img class="generator-play-art" src="${escapeHtml(play.image)}" alt="${escapeHtml(`${play.formation} ${play.play} play art`)}" loading="lazy" />` : `<div class="generator-play-art generator-play-art-empty">No art</div>`}
              ` : `<small>Open</small>`}
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderPlaybookSetView(plays = filteredPlays(), emptyMessage = "No plays match this search") {
  const sets = playbookSets(plays);
  if (!sets.length) return `<section class="play-set"><div class="empty-slot">${escapeHtml(emptyMessage)}</div></section>`;
  return sets
    .map(([setName, setPlays]) => {
      const slots = ["1", "2", "3"].map((slot) => {
        const slotPlays = setPlays.filter((play) => String(play.slot) === slot);
        return `
          <div class="play-slot" data-drop-set="${escapeHtml(setName)}" data-drop-slot="${slot}">
            <div class="slot-heading">Slot ${slot}</div>
            ${slotPlays.map(renderPlayCard).join("") || `<div class="empty-slot">Drop play here</div>`}
          </div>
        `;
      });
      const overflow = setPlays.filter((play) => !["1", "2", "3"].includes(String(play.slot)));
      return `
        <section class="play-set">
          <div class="play-set-head">
            <h2>Set ${escapeHtml(setName)}</h2>
            <span>${setPlays.length} plays</span>
          </div>
          <div class="play-slot-grid">${slots.join("")}</div>
          ${overflow.length ? `<div class="play-overflow">${overflow.map(renderPlayCard).join("")}</div>` : ""}
        </section>
      `;
    })
    .join("");
}

function renderLivePlaybookSetView(plays = filteredPlays({ bookOnly: true }), emptyMessage = "No eligible Book plays are in the Live Playbook yet.") {
  const orderedPlays = [...plays].sort(currentLivePlayOrder);
  orderedPlays.forEach((play, index) => {
    play.set = setNameFromIndex(Math.floor(index / 3));
    play.slot = String((index % 3) + 1);
  });
  return renderPlaybookSetView(orderedPlays, emptyMessage);
}

function renderGamedayPlaybookView(plays = filteredPlays({ bookOnly: true })) {
  const orderedPlays = [...plays].sort(currentLivePlayOrder);
  orderedPlays.forEach((play, index) => {
    play.set = setNameFromIndex(Math.floor(index / 3));
    play.slot = String((index % 3) + 1);
  });
  const sets = playbookSets(orderedPlays);
  if (!sets.length) return `<section class="play-set"><div class="empty-slot">No live playbook plays yet.</div></section>`;
  return sets
    .map(([setName, setPlays]) => `
      <section class="play-set gameday-set">
        <div class="play-set-head">
          <h2>Set ${escapeHtml(setName)}</h2>
          <span>${setPlays.length} plays</span>
        </div>
        <div class="gameday-list">
          ${setPlays
            .sort((a, b) => Number(a.slot || 99) - Number(b.slot || 99))
            .map(renderGamedayPlayCard)
            .join("")}
        </div>
      </section>
    `)
    .join("");
}

function renderGamedayPlayCard(play) {
  return `
    <article class="gameday-card ${isFavoriteUpdateNew(play) ? "is-new" : ""}">
      <div class="gameday-card-head">
        <div class="gameday-slot">Slot ${escapeHtml(play.slot || "--")}</div>
        <div class="gameday-badges">
          ${isFavoriteUpdateNew(play) ? `<strong class="new-play-badge">New</strong>` : ""}
          <b class="z-rank-badge ${zRankToneClass(play)}">${zRankLabel(play)}</b>
        </div>
      </div>
      ${play.image ? `<img class="gameday-art" src="${escapeHtml(play.image)}" alt="${escapeHtml(`${play.formation} ${play.play} play art`)}" loading="lazy" />` : `<div class="gameday-art gameday-art-empty">No art</div>`}
      <div class="gameday-main">
        <div class="gameday-title-row">
          <div>
            <span>${escapeHtml(play.formation || "Formation")}</span>
            <strong>${escapeHtml(play.play || "Play")}</strong>
          </div>
        </div>
        <div class="gameday-quick">
          <span>Quick</span>
          <p><strong>Pre-Snap:</strong> ${escapeHtml(play.preSnap || "None")}</p>
          <p><strong>Main Read:</strong> ${escapeHtml(play.mainRead || "None")}</p>
        </div>
      </div>
    </article>
  `;
}

function orderedLivePlays(plays = state.playbook.plays.filter(isPlaybookEligible)) {
  return [...plays].sort(currentLivePlayOrder);
}

function favoriteUpdateNewIds() {
  return new Set(state.playbook.favoriteUpdate?.newPlayIds || []);
}

function isFavoriteUpdateNew(play) {
  return Boolean(play.favoriteUpdateNew || favoriteUpdateNewIds().has(play.id));
}

function playPositionLabel(play) {
  return `Set ${play.set || "--"} / Slot ${play.slot || "--"}`;
}

function renderFavoriteUpdateView(plays = state.playbook.plays.filter(isPlaybookEligible)) {
  const ordered = orderedLivePlays(plays);
  const newIds = favoriteUpdateNewIds();
  const lastNewIndex = ordered.reduce((last, play, index) => (isFavoriteUpdateNew(play) || newIds.has(play.id) ? index : last), -1);
  if (!ordered.length) return `<section class="play-set"><div class="empty-slot">No live playbook plays yet.</div></section>`;
  if (lastNewIndex < 0) {
    return `
      <section class="play-set favorite-update-panel">
        <div class="play-set-head">
          <h2>Favorite Update</h2>
          <span>No new plays marked</span>
        </div>
        <div class="favorite-update-note">Build Live Playbook after adding and ranking new plays. New plays will be marked here, and this view will show the exact refavorite order.</div>
      </section>
    `;
  }
  const impacted = ordered.slice(0, lastNewIndex + 1);
  const refavoriteOrder = [...impacted].reverse();
  const startPlay = ordered[lastNewIndex];
  return `
    <section class="play-set favorite-update-panel">
      <div class="play-set-head">
        <h2>Favorite Update</h2>
        <span>${refavoriteOrder.length} plays to refavorite</span>
      </div>
      <div class="favorite-update-note">
        Start in-game at ${escapeHtml(playPositionLabel(startPlay))}. Favorite these from top to bottom in this list. The final play you favorite should be Set A / Slot 1.
      </div>
      <div class="favorite-update-actions">
        <button class="ghost" type="button" data-clear-favorite-update>Mark Update Complete</button>
      </div>
      <div class="favorite-update-list">
        ${refavoriteOrder.map((play, index) => renderFavoriteUpdateStep(play, index, refavoriteOrder.length)).join("")}
      </div>
    </section>
  `;
}

function renderFavoriteUpdateStep(play, index, total) {
  const isNew = isFavoriteUpdateNew(play);
  return `
    <article class="favorite-update-step ${isNew ? "is-new" : ""}">
      <div class="favorite-step-number">${index + 1}</div>
      ${play.image ? `<img class="favorite-step-art" src="${escapeHtml(play.image)}" alt="${escapeHtml(`${play.formation} ${play.play} play art`)}" loading="lazy" />` : `<div class="favorite-step-art favorite-step-art-empty">No art</div>`}
      <div class="favorite-step-main">
        <div class="favorite-step-meta">
          <span>${escapeHtml(playPositionLabel(play))}</span>
          <b class="z-rank-badge ${zRankToneClass(play)}">${zRankLabel(play)}</b>
          ${isNew ? `<strong class="new-play-badge">New</strong>` : ""}
        </div>
        <strong>${escapeHtml(play.play || "Play")}</strong>
        <small>${escapeHtml(play.formation || "Formation")}</small>
      </div>
      <div class="favorite-step-action">${index === total - 1 ? "Favorite this last" : "Favorite"}</div>
    </article>
  `;
}

function playAddedAt(play) {
  if (Number.isFinite(Number(play.addedAt))) return Number(play.addedAt);
  const match = String(play.id || "").match(/^manual-(\d+)/);
  return match ? Number(match[1]) : 0;
}

function recentAddedPlays(plays, limit = 20) {
  return [...plays]
    .filter((play) => playAddedAt(play) > 0 || play.source === "Manual")
    .sort((a, b) => playAddedAt(b) - playAddedAt(a))
    .slice(0, limit);
}

function renderRecentPlayHistory(plays) {
  return `
    <section class="play-set">
      <div class="play-set-head">
        <h2>Recent Adds</h2>
        <span>Last ${plays.length} plays</span>
      </div>
      <div class="generator-note">Newest manual plays first. Edit, rank, or clear Practice here, then build the live playbook.</div>
      <div class="play-library-list recent-play-list">
        ${plays.map(renderPlayCard).join("") || `<div class="empty-slot">No manually added plays yet.</div>`}
      </div>
    </section>
  `;
}

function renderPlaybookSortedView(plays) {
  const sort = state.playbook.sort || "formation";
  return `
    <section class="play-set">
      <div class="play-set-head">
        <h2>Sorted by ${escapeHtml(sortLabel(sort))}</h2>
        <span>${plays.length} plays</span>
      </div>
      <div class="play-sort-headers">
        ${[
          ["formation", "Formation"],
          ["play", "Play"],
          ["concepts", "Concepts"],
          ["preSnap", "Pre-Snap"],
          ["mainRead", "Main Read"],
          ["zRating", "Z Rating"],
          ["set", "Set"],
          ["slot", "Slot"],
        ]
          .map(
            ([key, label]) =>
              `<button class="${sort === key ? "active" : ""}" data-play-sort-header="${key}" data-direction="${sort === key ? state.playbook.direction : ""}">${label}</button>`
          )
          .join("")}
      </div>
      <div class="play-library-list">
        ${plays.map(renderPlayCard).join("") || `<div class="empty-slot">No plays match this search</div>`}
      </div>
    </section>
  `;
}

function sortLabel(sort) {
  return {
    setSlot: "Set / Slot",
    formation: "Formation",
    play: "Play",
    concepts: "Concepts",
    preSnap: "Pre-Snap",
    mainRead: "Main Read",
    zRating: "Z Rating",
    set: "Set",
    slot: "Slot",
  }[sort] || sort;
}

function renderPlayCard(play) {
  const pairNames = pairedPlayNames(play);
  const rankToneClass = zRankToneClass(play);
  return `
    <article class="play-card ${play.needPractice ? "play-practice" : ""} ${play.addedToBook ? "play-book" : ""} ${play.addedToFavs ? "play-favs" : ""} ${isFavoriteUpdateNew(play) ? "play-new" : ""}" draggable="true" data-play-id="${escapeHtml(play.id)}">
      <div class="play-card-head">
        <div class="play-status-toggles">
          <label class="status-toggle ${play.needPractice ? "is-practice" : ""}">
            <input type="checkbox" data-play-status="needPractice" data-play-id="${escapeHtml(play.id)}" ${play.needPractice ? "checked" : ""} />
            Practice
          </label>
          <label class="status-toggle ${play.addedToBook ? "is-book" : ""}">
            <input type="checkbox" data-play-status="addedToBook" data-play-id="${escapeHtml(play.id)}" ${play.addedToBook ? "checked" : ""} />
            Book
          </label>
          <label class="status-toggle ${play.addedToFavs ? "is-favs" : ""}">
            <input type="checkbox" data-play-status="addedToFavs" data-play-id="${escapeHtml(play.id)}" ${play.addedToFavs ? "checked" : ""} />
            Favs
          </label>
        </div>
        ${isFavoriteUpdateNew(play) ? `<strong class="new-play-badge">New Favorite</strong>` : ""}
      </div>
      ${play.image ? `<img class="play-art" src="${escapeHtml(play.image)}" alt="${escapeHtml(`${play.formation} ${play.play} play art`)}" loading="lazy" />` : ""}
      <input class="play-formation" data-play-field="formation" data-play-id="${escapeHtml(play.id)}" value="${escapeHtml(play.formation)}" placeholder="Formation" />
      <div class="play-title-row">
        <input class="play-title" data-play-field="play" data-play-id="${escapeHtml(play.id)}" value="${escapeHtml(play.play)}" placeholder="Play" />
        <span class="z-rank-badge ${rankToneClass}">${zRankLabel(play)}</span>
      </div>
      <input class="play-image-url" data-play-field="image" data-play-id="${escapeHtml(play.id)}" value="${escapeHtml(play.image)}" placeholder="Play art image URL" />
      <div class="play-slot-meta">
        <input data-play-field="set" data-play-id="${escapeHtml(play.id)}" value="${escapeHtml(play.set)}" placeholder="Set" />
        <select data-play-field="slot" data-play-id="${escapeHtml(play.id)}">
          ${["1", "2", "3"].map((slot) => `<option value="${slot}"${String(play.slot) === slot ? " selected" : ""}>Slot ${slot}</option>`).join("")}
        </select>
      </div>
      <div class="play-concept-grid">
        <input list="conceptOptions" data-play-field="concepts.0" data-play-id="${escapeHtml(play.id)}" value="${escapeHtml(play.concepts?.[0] || "")}" placeholder="Concept 1" />
        <input list="conceptOptions" data-play-field="concepts.1" data-play-id="${escapeHtml(play.id)}" value="${escapeHtml(play.concepts?.[1] || "")}" placeholder="Concept 2" />
        <input list="conceptOptions" data-play-field="concepts.2" data-play-id="${escapeHtml(play.id)}" value="${escapeHtml(play.concepts?.[2] || "")}" placeholder="Concept 3" />
      </div>
      <label><span>Pre-Snap</span><textarea data-play-field="preSnap" data-play-id="${escapeHtml(play.id)}" placeholder="Pre-Snap">${escapeHtml(play.preSnap)}</textarea></label>
      <label><span>Main Read</span><textarea data-play-field="mainRead" data-play-id="${escapeHtml(play.id)}" placeholder="Main Read">${escapeHtml(play.mainRead)}</textarea></label>
      <div class="play-pair-summary">${pairNames.length ? `Pairs: ${pairNames.map(escapeHtml).join(", ")}` : "No pair links yet"}</div>
      <div class="play-card-actions">
        <button class="small-button" type="button" data-pairs-play="${escapeHtml(play.id)}">Pairs well with</button>
        <button class="small-button situation-button" type="button" data-situations-play="${escapeHtml(play.id)}">Situations</button>
      </div>
      <button class="small-button" data-remove-play="${escapeHtml(play.id)}">Remove</button>
    </article>
  `;
}

function pairedPlayNames(play) {
  return pairIdsFor(play)
    .map((id) => state.playbook.plays.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => `${item.formation} - ${item.play}`);
}

function pairIdsFor(play) {
  const direct = normalizePairedPlayIds(play.pairedPlayIds);
  const reciprocal = state.playbook.plays
    .filter((item) => item.id !== play.id && normalizePairedPlayIds(item.pairedPlayIds).includes(play.id))
    .map((item) => item.id);
  const sameConcept = playConcepts(play).length
    ? state.playbook.plays.filter((item) => item.id !== play.id && sharedConcepts(play, item).length).map((item) => item.id)
    : [];
  return [...new Set([...direct, ...reciprocal, ...sameConcept])].filter((id) => id !== play.id);
}

function openPairDialog(playId, resetSearch = false) {
  const play = state.playbook.plays.find((item) => item.id === playId);
  if (!play) return;
  selectedPairPlayId = playId;
  if (resetSearch) pairSearchQuery = "";
  if (!Array.isArray(play.pairedPlayIds)) play.pairedPlayIds = normalizePairedPlayIds(play.pairedPlayIds);
  const selected = new Set(pairIdsFor(play));
  const query = pairSearchQuery.trim().toLowerCase();
  els.pairFormation.textContent = play.formation || "Formation";
  els.pairTitle.textContent = play.play || "Play";
  const options = [...state.playbook.plays]
    .filter((item) => item.id !== play.id)
    .sort((a, b) => `${a.formation} ${a.play}`.localeCompare(`${b.formation} ${b.play}`, undefined, { numeric: true }));
  const visibleOptions = query
    ? options.filter((item) =>
        [item.formation, item.play, conceptSummary(item), item.preSnap, item.mainRead, zRankLabel(item), ratingNumberLabel(item.zRating)]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : options;
  els.pairBody.innerHTML = `
    <input class="pair-search" type="search" data-pair-search value="${escapeHtml(pairSearchQuery)}" placeholder="Search plays to pair" />
    <div class="pair-picker">
      ${visibleOptions.map((item) => {
        const matchedConcepts = sharedConcepts(play, item);
        return `
        <label class="pair-row">
          <input type="checkbox" data-pair-id="${escapeHtml(item.id)}" ${selected.has(item.id) ? "checked" : ""} />
          <span>
            <strong>${escapeHtml(item.play || "Play")}</strong>
            <small>${escapeHtml(item.formation || "Formation")} | <b class="z-rank-badge ${zRankToneClass(item)}">${zRankLabel(item)}</b>${matchedConcepts.length ? ` | Concept: ${matchedConcepts.map(escapeHtml).join(", ")}` : ""}</small>
          </span>
        </label>
      `;
      }).join("") || `<div class="empty-slot">No matching plays</div>`}
    </div>
  `;
  if (!els.pairDialog.open) els.pairDialog.showModal();
  const searchInput = els.pairBody.querySelector("[data-pair-search]");
  if (searchInput) {
    searchInput.focus();
    searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
  }
}

function playRankMap() {
  return new Map(normalizeRankOrder(state.playbook.rankOrder, state.playbook.plays).map((id, index) => [id, index + 1]));
}

function rankForPlayFromMap(play, rankMap) {
  return rankMap.get(play.id) || state.playbook.plays.length;
}

function playPriorityScore(play, rankMap = null) {
  return (
    generatorSingleRankScore(play, rankMap) +
    (play.addedToFavs ? 9 : 0) +
    (play.addedToBook ? 5 : 0) +
    (play.needPractice ? 2 : 0)
  );
}

function generatorSingleRankScore(play, rankMap = null) {
  if (!hasPlayRating(play)) return 0;
  const rank = rankMap ? rankForPlayFromMap(play, rankMap) : zRankForPlay(play);
  return Math.max(0, 120 - rank);
}

function generatorWeightedRank(group, rankMap = null) {
  const ranks = group.map((play) => (rankMap ? rankForPlayFromMap(play, rankMap) : zRankForPlay(play))).filter(Boolean).sort((a, b) => a - b);
  if (!ranks.length) return 999;
  const weights = [0.45, 0.35, 0.2];
  return ranks.reduce((sum, rank, index) => sum + rank * (weights[index] || 0), 0);
}

function generatorWeightedRankScore(group, rankMap = null) {
  return Math.max(0, 130 - generatorWeightedRank(group, rankMap));
}

function sortPlaysByZRank(plays) {
  return [...plays].sort((a, b) => (zRankForPlay(a) || 9999) - (zRankForPlay(b) || 9999));
}

function playFitScore(anchor, candidate) {
  const anchorText = `${anchor.formation} ${anchor.play} ${conceptSummary(anchor)}`.toLowerCase();
  const candidateText = `${candidate.formation} ${candidate.play} ${conceptSummary(candidate)}`.toLowerCase();
  const pairBoost = pairIdsFor(anchor).includes(candidate.id) ? 40 : 0;
  const formationBoost = anchor.formation && anchor.formation === candidate.formation ? 12 : 0;
  const conceptBoost = conceptConnectionScore(anchor, candidate);
  const familyBoost = anchorText.split(/\s+/).some((word) => word.length > 4 && candidateText.includes(word)) ? 3 : 0;
  return pairBoost + formationBoost + conceptBoost + familyBoost + playPriorityScore(candidate);
}

function buildPairConnectionMap(plays) {
  const playIds = new Set(plays.map((play) => play.id));
  const map = new Map(plays.map((play) => [play.id, new Set()]));
  const conceptBuckets = new Map();

  plays.forEach((play) => {
    normalizePairedPlayIds(play.pairedPlayIds).forEach((pairedId) => {
      if (!playIds.has(pairedId) || pairedId === play.id) return;
      map.get(play.id).add(pairedId);
      map.get(pairedId).add(play.id);
    });
    playConcepts(play).map(normalizedConcept).filter(Boolean).forEach((concept) => {
      if (!conceptBuckets.has(concept)) conceptBuckets.set(concept, []);
      conceptBuckets.get(concept).push(play.id);
    });
  });

  conceptBuckets.forEach((ids) => {
    for (let i = 0; i < ids.length; i += 1) {
      for (let j = i + 1; j < ids.length; j += 1) {
        map.get(ids[i]).add(ids[j]);
        map.get(ids[j]).add(ids[i]);
      }
    }
  });

  return map;
}

function manualPairIdsFor(play) {
  const direct = normalizePairedPlayIds(play.pairedPlayIds);
  const reciprocal = state.playbook.plays
    .filter((item) => item.id !== play.id && normalizePairedPlayIds(item.pairedPlayIds).includes(play.id))
    .map((item) => item.id);
  return new Set([...direct, ...reciprocal].filter((id) => id !== play.id));
}

function conceptConnectionScore(a, b) {
  const count = sharedConcepts(a, b).length;
  if (count >= 3) return 46;
  if (count === 2) return 28;
  if (count === 1) return 14;
  return 0;
}

function pairConnectionScore(a, b, pairMap) {
  let score = 0;
  const isPaired = pairMap
    ? pairMap.get(a.id)?.has(b.id) || pairMap.get(b.id)?.has(a.id)
    : pairIdsFor(a).includes(b.id) || pairIdsFor(b).includes(a.id);
  const isManualPair = pairMap ? false : manualPairIdsFor(a).has(b.id) || manualPairIdsFor(b).has(a.id);
  if (isManualPair) score += 18;
  else if (isPaired) score += pairMap ? 8 : 4;
  score += conceptConnectionScore(a, b);
  if (sameFormation(a, b)) score += 6;
  return score;
}

function sameFormation(a, b) {
  return Boolean(a?.formation && b?.formation && a.formation === b.formation);
}

function generatorPairDetails(group, pairMap) {
  const pairs = [
    [group[0], group[1]],
    [group[0], group[2]],
    [group[1], group[2]],
  ].filter(([a, b]) => a && b);
  const strongPairs = pairs.filter(([a, b]) => pairConnectionScore(a, b, pairMap) >= 14);
  const perfectConceptPairs = pairs.filter(([a, b]) => sharedConcepts(a, b).length >= 3);
  const greatConceptPairs = pairs.filter(([a, b]) => sharedConcepts(a, b).length >= 2);
  const formationPairs = pairs.filter(([a, b]) => sameFormation(a, b));
  return {
    strongPairCount: strongPairs.length,
    strongPairs,
    perfectConceptCount: perfectConceptPairs.length,
    greatConceptCount: greatConceptPairs.length,
    formationPairCount: formationPairs.length,
    allSameFormation: formationPairs.length === 3,
  };
}

function arrangeGeneratorGroup(group, pairMap) {
  const plays = sortPlaysByZRank(group);
  const { strongPairCount, strongPairs } = generatorPairDetails(plays, pairMap);
  if (strongPairCount === 3 || !strongPairs.length) return plays;
  const pair = [...strongPairs].sort(
    ([a1, b1], [a2, b2]) => zRankForPlay(a1) + zRankForPlay(b1) - (zRankForPlay(a2) + zRankForPlay(b2))
  )[0];
  const pairIds = new Set(pair.map((play) => play.id));
  const paired = sortPlaysByZRank(pair);
  const rest = plays.filter((play) => !pairIds.has(play.id));
  return [...paired, ...rest];
}

function generatorGroupScore(group, pairMap, rankMap = null) {
  const weightedRankScore = generatorWeightedRankScore(group, rankMap) * 4;
  const tagScore = group.reduce((sum, play) => sum + (play.addedToFavs ? 5 : 0) + (play.addedToBook ? 3 : 0), 0);
  const pairScores = [
    pairConnectionScore(group[0], group[1], pairMap),
    pairConnectionScore(group[0], group[2], pairMap),
    pairConnectionScore(group[1], group[2], pairMap),
  ];
  const { strongPairCount, perfectConceptCount, greatConceptCount, formationPairCount, allSameFormation } = generatorPairDetails(group, pairMap);
  const connectionScore = pairScores.reduce((sum, score) => sum + score, 0) * 1.2;
  const clusterBonus = strongPairCount === 3 ? 42 : strongPairCount === 2 ? 22 : strongPairCount === 1 ? 6 : 0;
  const conceptClusterBonus = perfectConceptCount ? perfectConceptCount * 18 : greatConceptCount * 8;
  const formationBonus = formationPairCount * 5 + (allSameFormation ? 10 : 0);
  return weightedRankScore + tagScore + connectionScore + clusterBonus + conceptClusterBonus + formationBonus;
}

function generatorGroupSortScore(group, pairMap) {
  const { strongPairCount, perfectConceptCount, greatConceptCount, formationPairCount, allSameFormation } = generatorPairDetails(group, pairMap);
  const weightedRank = generatorWeightedRank(group);
  const pairPenalty = (3 - strongPairCount) * 8;
  const conceptCredit = perfectConceptCount * 5 + greatConceptCount * 2;
  const formationCredit = formationPairCount * 1.5 + (allSameFormation ? 2 : 0);
  return weightedRank + pairPenalty - conceptCredit - formationCredit;
}

function bestGeneratorGroup(plays, pairMap, rankMap = null) {
  if (plays.length <= 3) {
    return [...plays].sort((a, b) => playPriorityScore(b, rankMap) - playPriorityScore(a, rankMap));
  }
  const candidatePlays = [...plays]
    .sort((a, b) => playPriorityScore(b, rankMap) - playPriorityScore(a, rankMap))
    .slice(0, GENERATOR_CANDIDATE_LIMIT);
  let best = null;
  let bestScore = -Infinity;
  for (let i = 0; i < candidatePlays.length - 2; i += 1) {
    for (let j = i + 1; j < candidatePlays.length - 1; j += 1) {
      for (let k = j + 1; k < candidatePlays.length; k += 1) {
        const group = [candidatePlays[i], candidatePlays[j], candidatePlays[k]].sort((a, b) => playPriorityScore(b, rankMap) - playPriorityScore(a, rankMap));
        const score = generatorGroupScore(group, pairMap, rankMap);
        if (score > bestScore) {
          best = group;
          bestScore = score;
        }
      }
    }
  }
  return best || [];
}

function pruneGeneratorPreview() {
  const playById = new Map(state.playbook.plays.map((play) => [play.id, play]));
  const pairMap = buildPairConnectionMap(state.playbook.plays.filter(isGeneratorEligible));
  const groups = (state.playbook.generatorPreview || [])
    .map((group) => group.filter((id) => {
      const play = playById.get(id);
      return play && isGeneratorEligible(play);
    }).map((id) => playById.get(id)))
    .filter((group) => group.length);
  state.playbook.generatorPreview = packGeneratorGroups(groups, pairMap).map((group) => group.map((play) => play.id));
}

function packGeneratorGroups(groups, pairMap) {
  const ordered = groups
    .flatMap((group) => arrangeGeneratorGroup(group.filter(Boolean), pairMap))
    .filter(Boolean);
  const packed = [];
  for (let index = 0; index < ordered.length; index += 3) {
    packed.push(arrangeGeneratorGroup(ordered.slice(index, index + 3), pairMap));
  }
  return packed.filter((group) => group.length);
}

function setNameFromIndex(index) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let value = index + 1;
  let name = "";
  while (value > 0) {
    value -= 1;
    name = alphabet[value % alphabet.length] + name;
    value = Math.floor(value / alphabet.length);
  }
  return name;
}

function generatePlaybookPreview(shouldRender = true) {
  const rankMap = playRankMap();
  const plays = state.playbook.plays.filter(isGeneratorEligible).sort((a, b) => playPriorityScore(b, rankMap) - playPriorityScore(a, rankMap));
  const pairMap = buildPairConnectionMap(plays);
  const remaining = [...plays];
  const groups = [];

  while (remaining.length) {
    const group = bestGeneratorGroup(remaining, pairMap, rankMap);
    if (!group.length) break;
    groups.push(sortPlaysByZRank(group));
    const picked = new Set(group.map((play) => play.id));
    for (let index = remaining.length - 1; index >= 0; index -= 1) {
      if (picked.has(remaining[index].id)) remaining.splice(index, 1);
    }
  }

  state.playbook.generatorPreview = packGeneratorGroups(groups
    .sort((a, b) => generatorGroupSortScore(a, pairMap) - generatorGroupSortScore(b, pairMap))
    .map((group) => arrangeGeneratorGroup(group, pairMap)), pairMap)
    .map((group) => group.map((play) => play.id));
  if (shouldRender) {
    renderPlaybook();
    saveState();
  }
}

function applyGeneratorToLivePlaybook() {
  try {
    const previousLiveIds = new Set(state.playbook.plays.filter(isPlaybookEligible).map((play) => play.id));
    generatePlaybookPreview(false);
    const playById = new Map(state.playbook.plays.map((play) => [play.id, play]));
    const eligiblePlays = state.playbook.plays.filter(isGeneratorEligible);
    const pairMap = buildPairConnectionMap(eligiblePlays);
    const groups = packGeneratorGroups((state.playbook.generatorPreview || [])
      .map((group) => group.map((id) => playById.get(id)).filter(isGeneratorEligible))
      .filter((group) => group.length), pairMap);
    if (!groups.length) {
      alert("No ranked, non-Practice plays are available for the live playbook.");
      return;
    }
    state.playbook.plays.forEach((play) => {
      play.addedToBook = false;
      play.favoriteUpdateNew = false;
    });
    const generatedIds = new Set();
    groups.forEach((group, setIndex) => {
      const setName = setNameFromIndex(setIndex);
      arrangeGeneratorGroup(group, pairMap).forEach((play, slotIndex) => {
        generatedIds.add(play.id);
        play.addedToBook = true;
        play.set = setName;
        play.slot = String(slotIndex + 1);
      });
    });
    normalizeLivePlaybookSetOrder();
    const newPlayIds = [...generatedIds].filter((id) => !previousLiveIds.has(id));
    state.playbook.favoriteUpdate = { newPlayIds, builtAt: new Date().toISOString() };
    state.playbook.plays.forEach((play) => {
      play.favoriteUpdateNew = newPlayIds.includes(play.id);
    });
    state.playbook.mode = "live";
    renderPlaybook();
    saveState();
  } catch (error) {
    console.error(error);
    alert("The live playbook build hit an error. Try clearing Practice on fewer plays or exporting a backup, then reload and build again.");
  }
}

function openSituationDialog(playId) {
  const play = state.playbook.plays.find((item) => item.id === playId);
  if (!play) return;
  selectedSituationPlayId = playId;
  if (!play.situations) play.situations = normalizeSituations({});
  els.situationFormation.textContent = play.formation || "Formation";
  els.situationTitle.textContent = play.play || "Play";
  els.situationBody.innerHTML = `
    <div class="situation-grid">
      ${PLAY_SITUATIONS.map(([key, label]) => {
        const value = play.situations[key] || "";
        return `
          <label class="situation-row">
            <span>${label}</span>
            <select data-situation-key="${key}" ${value ? playRatingStyle(value) : ""}>
              <option value="">Unrated</option>
              ${[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
                .map((rating) => `<option value="${rating}"${Number(value) === rating ? " selected" : ""}>${ratingNumberLabel(rating)}</option>`)
                .join("")}
            </select>
          </label>
        `;
      }).join("")}
    </div>
  `;
  if (!els.situationDialog.open) els.situationDialog.showModal();
}

function suggestSituationsForPlay(play) {
  const text = `${play.formation} ${play.play} ${conceptSummary(play)} ${play.preSnap} ${play.mainRead}`.toLowerCase();
  const ratings = Object.fromEntries(PLAY_SITUATIONS.map(([key]) => [key, 3]));
  const has = (...terms) => terms.some((term) => text.includes(term));

  if (has("quick", "stick", "spacing", "slant", "zig", "rub", "flat", "bubble", "now screen")) {
    Object.assign(ratings, {
      firstDown: 4,
      secondMedium: 4,
      secondShort: 4,
      thirdMedium: 4,
      thirdShort: 4,
      fourthShort: 3.5,
      redZone: 4,
      goalLinePass: 3.5,
      goForTwo: 3.5,
      twoMinute: 4,
      redZoneFringe: 4,
    });
  }

  if (has("inside zone", "duo", "power", "counter", "dive", "stretch", "run", "iso", "trap")) {
    Object.assign(ratings, {
      firstDown: 4,
      secondMedium: 3.5,
      secondShort: 4.5,
      thirdShort: 4,
      fourthShort: 4,
      backedUp: 4,
      redZone: 3.5,
      goalLine: 4,
      goForTwo: 3.5,
      conserveTime: 4.5,
      redZoneFringe: 3.5,
      thirdLong: 1.5,
      fourthLong: 1.5,
      hailMary: 1,
    });
  }

  if (has("rpo", "read option", "speed option", "triple option", "option")) {
    Object.assign(ratings, {
      firstDown: 4,
      secondMedium: 4,
      secondShort: 4,
      thirdShort: 3.5,
      fourthShort: 3.5,
      redZone: 4,
      goalLine: 3.5,
      goalLinePass: 3,
      goForTwo: 4,
      redZoneFringe: 4,
      conserveTime: 3.5,
    });
  }

  if (has("screen", "slip screen", "hb screen", "wr screen", "jailbreak")) {
    Object.assign(ratings, {
      firstDown: 3.5,
      secondLong: 4,
      thirdLong: 3.5,
      fourthLong: 2.5,
      backedUp: 3,
      twoMinute: 3.5,
      redZoneFringe: 3,
      goalLine: 1.5,
      hailMary: 1,
    });
  }

  if (has("play action", "pa ", "boot", "cross", "crosser", "deep", "post", "corner", "flood", "sail", "shot")) {
    Object.assign(ratings, {
      firstDown: 4,
      secondLong: 3.5,
      secondMedium: 4,
      thirdLong: 3.5,
      thirdMedium: 3.5,
      fourthMedium: 3,
      redZone: 3.5,
      goalLinePass: 3.5,
      twoMinute: 3.5,
      redZoneFringe: 4,
    });
  }

  if (has("verts", "vertical", "hail mary", "go", "streak", "seams")) {
    Object.assign(ratings, {
      secondLong: 4,
      thirdLong: 4,
      fourthLong: 4,
      hailMary: 5,
      twoMinute: 4,
      redZoneFringe: 3.5,
      firstDown: 3,
      secondShort: 2.5,
      thirdShort: 1.5,
      goalLine: 1,
      goalLinePass: 2,
      goForTwo: 1.5,
      conserveTime: 1,
    });
  }

  return Object.fromEntries(Object.entries(ratings).map(([key, value]) => [key, clampPlayRating(value)]));
}

function nextPlaySpot() {
  const sets = playbookSets();
  if (!sets.length) return { set: "A", slot: "1" };
  for (const [setName, setPlays] of sets) {
    for (const slot of ["1", "2", "3"]) {
      if (!setPlays.some((play) => String(play.slot) === slot)) return { set: setName, slot };
    }
  }
  const lastSet = sets[sets.length - 1][0];
  return { set: `${lastSet} Next`, slot: "1" };
}

function updatePlay(playId, field, value, shouldRender = true) {
  const play = state.playbook.plays.find((item) => item.id === playId);
  if (!play) return;
  if (field === "zRating") {
    play[field] = value === "" ? "" : clampPlayRating(value);
    play.ratingEdited = value !== "";
    if (value !== "") state.playbook.rankOrder = normalizeRankOrder(state.playbook.rankOrder, state.playbook.plays);
  } else if (field.startsWith("concepts.")) {
    const index = Number(field.split(".")[1]);
    play.concepts = normalizeConcepts(play.concepts);
    if (Number.isInteger(index) && index >= 0 && index < 3) play.concepts[index] = value.trim();
  } else {
    play[field] = value;
  }
  saveState();
  if (shouldRender) renderPlaybook();
}

function rankUnratedPlay(playId, rankValue) {
  const play = state.playbook.plays.find((item) => item.id === playId);
  if (!play) return;
  state.playbook.rankOrder = normalizeRankOrder(state.playbook.rankOrder, state.playbook.plays);
  const nextIndex = Math.max(0, Math.min(state.playbook.rankOrder.length, Number(rankValue) - 1));
  if (!Number.isFinite(nextIndex)) return;
  play.zRating = 5;
  play.ratingEdited = true;
  state.playbook.rankOrder = normalizeRankOrder(state.playbook.rankOrder, state.playbook.plays).filter((id) => id !== playId);
  state.playbook.rankOrder.splice(nextIndex, 0, playId);
}

function renderDepthChartPreview(team) {
  const groups = [
    ["Offense", ["qb1", "rb1", "rb2", "wr1", "wr2", "wr3", "te1", "ol1", "ol2"]],
    ["Defense", ["dl1", "dl2", "lb1", "lb2", "db1", "db2"]],
  ];
  return `
    <section class="depth-preview">
      <div class="depth-preview-head">
        <div>
          <p class="eyebrow">Depth Chart Preview</p>
          <h3>Key Player Slots</h3>
        </div>
        <span>${escapeHtml(team.displayName)}</span>
      </div>
      <div class="depth-preview-grid">
        ${groups
          .map(
            ([label, slots]) => `
              <div class="depth-group">
                <h4>${label}</h4>
                ${slots
                  .map((slot) => {
                    const value = adjustedSlotValue(team, slot);
                    const bonus = playerBonus(team, slot);
                    const name = team.slotNames[`${slot}Name`] || "No listed player";
                    return `
                      <div class="depth-row">
                        <span>${slot.toUpperCase()}</span>
                        <strong>${escapeHtml(name)}</strong>
                        <b ${ratingStyle(value)}>${Number.isFinite(value) ? value : "--"}${bonus ? ` <small>+${bonus}</small>` : ""}</b>
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function openDialog(teamId) {
  selectedTeamId = teamId;
  const team = teams.find((item) => item.id === teamId);
  const item = leagueTeam(teamId);
  const shared = sharedTeam(teamId);
  const teamList = dialogTeamList();
  const teamIndex = teamList.findIndex((entry) => entry.id === teamId);
  const previousTeam = teamList[(teamIndex - 1 + teamList.length) % teamList.length];
  const nextTeam = teamList[(teamIndex + 1) % teamList.length];
  els.dialogTitle.textContent = team.displayName;
  els.dialogConference.textContent = `${team.conference} | ${teamTier(team)} | CFB OVR ${team.overall}`;
  const slotCards = Object.keys(SLOT_WEIGHTS)
    .map(
      (slot) => {
        const slotBonus = shared.playerBonuses?.[slot] || "none";
        const value = slotValue(team, slot);
        return `
        <label class="slot-card ${bonusClass(slotBonus)}">
          <span>${slot.toUpperCase()}</span>
          <input class="slot-rating" data-slot="${slot}" value="${escapeHtml(value ?? "")}" inputmode="numeric" ${ratingStyle(adjustedSlotValue(team, slot))} />
          ${
            `<select class="${bonusClass(slotBonus)}" data-slot-bonus="${slot}">
              <option value="none"${slotBonus === "none" ? " selected" : ""}>No player bonus</option>
              <option value="notable"${slotBonus === "notable" ? " selected" : ""}>Notable +1</option>
              <option value="big-fan"${slotBonus === "big-fan" ? " selected" : ""}>Big Fan +3</option>
              <option value="super-fan"${slotBonus === "super-fan" ? " selected" : ""}>Super Fan +5</option>
            </select>`
          }
          <strong class="player-name">${escapeHtml(team.slotNames[`${slot}Name`] || "No listed player")}</strong>
        </label>
      `;
      }
    )
    .join("");
  const ndlFields =
    activeLeague === "ndl"
      ? `
        <div class="dialog-actions">
          <label><span>NDL Risk Rating</span><input data-change-detail="ndlRiskRating" value="${escapeHtml(item.ndlRiskRating || "")}" /></label>
          <label><span>NDL Win Goal</span><input data-change-detail="ndlWinGoal" value="${escapeHtml(item.ndlWinGoal || "")}" /></label>
          <label><span>Conference Win Goal</span><input data-change-detail="confWinGoal" value="${escapeHtml(item.confWinGoal)}" /></label>
          <label><span>Projected Wins</span><input data-change-detail="projectedWins" value="${escapeHtml(item.projectedWins)}" /></label>
          <label><span>Rivals 80 and Under</span><input data-change-detail="rivalsUnder80" value="${escapeHtml(item.rivalsUnder80)}" /></label>
          <label><span>Rival Status Tier</span>
            <select data-change-detail="rivalTier">
              <option value="none"${item.rivalTier === "none" ? " selected" : ""}>None</option>
              <option value="light"${item.rivalTier === "light" ? " selected" : ""}>Light</option>
              <option value="normal"${item.rivalTier === "normal" ? " selected" : ""}>Normal</option>
              <option value="hard"${item.rivalTier === "hard" ? " selected" : ""}>Hard</option>
              <option value="brutal"${item.rivalTier === "brutal" ? " selected" : ""}>Brutal</option>
            </select>
          </label>
        </div>
      `
      : "";
  els.dialogBody.innerHTML = `
    <div class="dialog-nav">
      <button type="button" class="ghost" data-dialog-nav="${previousTeam.id}">Previous: ${escapeHtml(previousTeam.team)}</button>
      <span>${teamIndex + 1} of ${teamList.length}</span>
      <button type="button" class="ghost" data-dialog-nav="${nextTeam.id}">Next: ${escapeHtml(nextTeam.team)}</button>
    </div>
    ${ndlFields}
    ${renderDepthChartPreview(team)}
    <div class="dialog-actions">
      <label><span>Available</span><select data-change-detail="available"><option value="true"${item.available ? " selected" : ""}>Available</option><option value="false"${!item.available ? " selected" : ""}>Taken</option></select></label>
      <label><span>Team Bonus</span><select data-change-detail="teamBonus"><option value="none"${shared.teamBonus === "none" ? " selected" : ""}>None</option><option value="notable"${shared.teamBonus === "notable" ? " selected" : ""}>Notable +1</option><option value="big-fan"${shared.teamBonus === "big-fan" ? " selected" : ""}>Big Fan +2</option><option value="super-fan"${shared.teamBonus === "super-fan" ? " selected" : ""}>Super Fan +3</option></select></label>
      <label><span>Conference Tier</span><select data-change-detail="conferenceTier">${["Power", "Tweener", "Group", "Independent"].map((tier) => `<option${teamTier(team) === tier ? " selected" : ""}>${tier}</option>`).join("")}</select></label>
      <label><span>Source</span><a class="primary small-button" href="${escapeHtml(team.sourceUrl)}" target="_blank" rel="noreferrer">Open Roster</a></label>
    </div>
    <div class="slot-grid">${slotCards}</div>
    <label class="panel-section"><span>Notes</span><input data-change-detail="notes" value="${escapeHtml(item.notes)}" placeholder="Scheme fit, draft intel, user preference" /></label>
  `;
  if (!els.dialog.open) els.dialog.showModal();
}

function moveTeam(teamId, direction) {
  const order = state.boardOrder[activeLeague] || teams.map((t) => t.id);
  const index = order.indexOf(teamId);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || target < 0 || target >= order.length) return;
  [order[index], order[target]] = [order[target], order[index]];
  state.boardOrder[activeLeague] = order;
  state.sort = "manual";
  state.sortDirection = "asc";
  render();
}

function downloadFile(filename, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportCsv() {
  const headers = [
    "Rank",
    "Team",
    "Available",
    "Conference",
    "Tier",
    "CFB Overall",
    "CFB Offense",
    "CFB Defense",
    "Talent",
    "Z Rating",
    "NDL Risk Rating",
    "NDL Win Goal",
    "Team Bonus",
    "Player Bonuses",
    "NDL Inputs",
  ];
  const order = sortedTeams(teams);
  const rows = order.map((team, index) => {
    const item = leagueTeam(team.id);
    const shared = sharedTeam(team.id);
    const bonus = shared.teamBonus;
    const playerBonuses = Object.entries(shared.playerBonuses || {})
      .filter(([, value]) => value && value !== "none")
      .map(([slot, value]) => `${slot.toUpperCase()}:${value}`)
      .join("; ");
    const leagueInputs =
      activeLeague === "ndl"
        ? `NDL Adj:${ndlAdjustment(team).toFixed(1)}; Risk:${item.ndlRiskRating || ""}; Win Goal:${item.ndlWinGoal || ""}; Goal:${item.confWinGoal || ""}; Projected:${item.projectedWins || ""}; Rivals:${item.rivalsUnder80 || ""}; Tier:${item.rivalTier || ""}`
        : "";
    return [
      index + 1,
      team.displayName,
      item.available ? "Yes" : "No",
      team.conference,
      teamTier(team),
      team.overall,
      team.offense,
      team.defense,
      baseTalent(team).toFixed(1),
      zRating(team).toFixed(1),
      activeLeague === "ndl" ? item.ndlRiskRating || "" : "",
      activeLeague === "ndl" ? item.ndlWinGoal || "" : "",
      bonus,
      playerBonuses,
      leagueInputs,
    ];
  });
  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  downloadFile(`cfb27-${activeLeague}-draft-board.csv`, csv, "text/csv");
}

function exportBackup() {
  downloadFile(
    "cfb27-team-selection-backup.json",
    JSON.stringify({ state, dataGeneratedAt: window.CFB27_DATA.generatedAt }, null, 2),
    "application/json"
  );
}

function importBackupFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const importedState = parsed.state || parsed;
      state = normalizeState(importedState);
      activeLeague = state.activeLeague || "ndl";
      activeView = state.activeView || "draft";
      saveState();
      render();
    } catch {
      alert("That backup file could not be imported.");
    } finally {
      els.importBackupInput.value = "";
    }
  });
  reader.readAsText(file);
}

document.querySelectorAll("[data-league-button]").forEach((button) => {
  button.addEventListener("click", () => {
    activeLeague = button.dataset.leagueButton;
    activeView = "draft";
    render();
  });
});

document.querySelectorAll("[data-view-button]").forEach((button) => {
  button.addEventListener("click", () => {
    activeView = button.dataset.viewButton;
    render();
  });
});

document.querySelectorAll("[data-playbook-mode-button]").forEach((button) => {
  button.addEventListener("click", () => {
    activeView = "playbook";
    state.playbook.mode = button.dataset.playbookModeButton;
    if (["live", "gameday", "favoriteUpdate"].includes(state.playbook.mode)) normalizeLivePlaybookSetOrder();
    render();
  });
});

els.addPlay.addEventListener("click", () => {
  const spot = nextPlaySpot();
  const id = `manual-${Date.now()}`;
  state.playbook.plays.unshift({
    id,
    addedAt: Date.now(),
    set: spot.set,
    slot: spot.slot,
    formation: "",
    play: "",
    preSnap: "",
    mainRead: "",
    playType: "",
    concepts: ["", "", ""],
    zRating: "",
    situations: normalizeSituations({}),
    needPractice: true,
    pairedPlayIds: [],
    image: "",
    source: "Manual",
  });
  renderPlaybook();
  saveState();
});

els.playbookMode.addEventListener("change", () => {
  state.playbook.mode = els.playbookMode.value;
  if (["live", "gameday", "favoriteUpdate"].includes(state.playbook.mode)) normalizeLivePlaybookSetOrder();
  renderPlaybook();
  saveState();
});

els.bulkMarkPlays.addEventListener("click", () => {
  if (state.playbook.mode !== "list") return;
  const field = els.bulkPlayStatus.value;
  if (!["addedToBook", "addedToFavs"].includes(field)) return;
  const plays = filteredPlays();
  plays.forEach((play) => {
    play[field] = true;
  });
  if (field === "addedToBook") pruneGeneratorPreview();
  renderPlaybook();
  saveState();
});

els.generatePlaybook.addEventListener("click", () => {
  state.playbook.mode = "generator";
  generatePlaybookPreview();
});

els.applyGenerator.addEventListener("click", () => {
  applyGeneratorToLivePlaybook();
});

els.exportPlaybook.addEventListener("click", () => {
  const headers = ["Set", "Slot", "Need to Practice", "Added to Book", "Added to Favs", "Formation", "Play", "Pairs Well With", "Image URL", "Concept 1", "Concept 2", "Concept 3", "Pre-Snap", "Main Read", "Z Rating", ...PLAY_SITUATIONS.map(([, label]) => label)];
  const rows = [...state.playbook.plays]
    .sort((a, b) => setSortValue(a.set) - setSortValue(b.set) || String(a.slot).localeCompare(String(b.slot), undefined, { numeric: true }))
    .map((play) => [
      play.set,
      play.slot,
      play.needPractice ? "Yes" : "No",
      play.addedToBook ? "Yes" : "No",
      play.addedToFavs ? "Yes" : "No",
      play.formation,
      play.play,
      pairedPlayNames(play).join("; "),
      play.image,
      play.concepts?.[0] || "",
      play.concepts?.[1] || "",
      play.concepts?.[2] || "",
      play.preSnap,
      play.mainRead,
      play.zRating,
      ...PLAY_SITUATIONS.map(([key]) => play.situations?.[key] || ""),
    ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
  downloadFile("cfb27-custom-playbook.csv", csv, "text/csv");
});

els.exportBackup.addEventListener("click", exportBackup);

els.importBackupButton.addEventListener("click", () => {
  els.importBackupInput.click();
});

els.importBackupInput.addEventListener("change", () => {
  importBackupFile(els.importBackupInput.files?.[0]);
});

els.playbookSearch.addEventListener("input", () => {
  state.playbook.search = els.playbookSearch.value;
  renderPlaybook();
  saveState();
});

els.playbookSort.addEventListener("change", () => {
  state.playbook.sort = els.playbookSort.value;
  if (state.playbook.sort === "zRating") state.playbook.direction = "desc";
  else if (state.playbook.sort === "setSlot") state.playbook.direction = "asc";
  renderPlaybook();
  saveState();
});

els.playbookDirection.addEventListener("change", () => {
  state.playbook.direction = els.playbookDirection.value;
  renderPlaybook();
  saveState();
});

document.querySelector("thead").addEventListener("click", (event) => {
  const button = event.target.closest("[data-sort-header]");
  if (!button) return;
  const nextSort = button.dataset.sortHeader;
  if (state.sort === nextSort) {
    state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
  } else {
    state.sort = nextSort;
    state.sortDirection = defaultSortDirection(nextSort);
  }
  renderRows();
  saveState();
});

els.playbookSets.addEventListener("input", (event) => {
  const field = event.target.dataset.playField;
  const playId = event.target.dataset.playId;
  if (!field || !playId) return;
  updatePlay(playId, field, event.target.value, false);
});

els.playbookSets.addEventListener("change", (event) => {
  const statusField = event.target.dataset.playStatus;
  const statusPlayId = event.target.dataset.playId;
  if (statusField && statusPlayId) {
    const play = state.playbook.plays.find((item) => item.id === statusPlayId);
    if (play) play[statusField] = event.target.checked;
    if (statusField === "addedToBook" || statusField === "needPractice") pruneGeneratorPreview();
    renderPlaybook();
    saveState();
    return;
  }
  const field = event.target.dataset.playField;
  const playId = event.target.dataset.playId;
  if (!field || !playId) return;
  updatePlay(playId, field, event.target.value);
});

els.playbookSets.addEventListener("click", (event) => {
  const clearFavoriteUpdate = event.target.closest("[data-clear-favorite-update]");
  if (clearFavoriteUpdate) {
    state.playbook.favoriteUpdate = { newPlayIds: [], builtAt: "" };
    state.playbook.plays.forEach((play) => {
      play.favoriteUpdateNew = false;
    });
    renderPlaybook();
    saveState();
    return;
  }

  const pairs = event.target.closest("[data-pairs-play]");
  if (pairs) {
    openPairDialog(pairs.dataset.pairsPlay, true);
    return;
  }
  const situations = event.target.closest("[data-situations-play]");
  if (situations) {
    openSituationDialog(situations.dataset.situationsPlay);
    return;
  }
  const sortButton = event.target.closest("[data-play-sort-header]");
  if (sortButton) {
    const nextSort = sortButton.dataset.playSortHeader;
    if (state.playbook.sort === nextSort) {
      state.playbook.direction = state.playbook.direction === "asc" ? "desc" : "asc";
    } else {
      state.playbook.sort = nextSort;
      state.playbook.direction = nextSort === "zRating" ? "desc" : "asc";
    }
    renderPlaybook();
    saveState();
    return;
  }
  const remove = event.target.closest("[data-remove-play]");
  if (!remove) return;
  state.playbook.plays = state.playbook.plays.filter((play) => play.id !== remove.dataset.removePlay);
  renderPlaybook();
  saveState();
});

els.generatorBeta.addEventListener("click", (event) => {
  const clear = event.target.closest("[data-clear-generator-preview]");
  if (!clear) return;
  state.playbook.generatorPreview = [];
  renderPlaybook();
  saveState();
});

els.rankingPanel.addEventListener("click", (event) => {
  const hide = event.target.closest("[data-hide-ranking-panel]");
  if (hide) {
    state.playbook.mode = "generator";
    renderPlaybook();
    saveState();
    return;
  }
  const move = event.target.closest("[data-rank-move]");
  if (!move) return;
  const scrollTop = els.rankingPanel.querySelector(".ranking-list")?.scrollTop || 0;
  const id = move.dataset.rankMove;
  const direction = move.dataset.rankDirection;
  state.playbook.rankOrder = normalizeRankOrder(state.playbook.rankOrder, state.playbook.plays);
  const index = state.playbook.rankOrder.indexOf(id);
  const nextIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || nextIndex < 0 || nextIndex >= state.playbook.rankOrder.length) return;
  const [item] = state.playbook.rankOrder.splice(index, 1);
  state.playbook.rankOrder.splice(nextIndex, 0, item);
  renderPlaybook();
  restoreRankingScroll(scrollTop);
  saveState();
});

els.rankingPanel.addEventListener("change", (event) => {
  const addInput = event.target.closest("[data-rank-add]");
  if (addInput) {
    const scrollTop = els.rankingPanel.querySelector(".ranking-list")?.scrollTop || 0;
    rankUnratedPlay(addInput.dataset.rankAdd, addInput.value);
    renderPlaybook();
    restoreRankingScroll(scrollTop);
    saveState();
    return;
  }
  const input = event.target.closest("[data-rank-jump]");
  if (!input) return;
  const id = input.dataset.rankJump;
  const scrollTop = els.rankingPanel.querySelector(".ranking-list")?.scrollTop || 0;
  state.playbook.rankOrder = normalizeRankOrder(state.playbook.rankOrder, state.playbook.plays);
  const index = state.playbook.rankOrder.indexOf(id);
  const nextIndex = Math.max(0, Math.min(state.playbook.rankOrder.length - 1, Number(input.value) - 1));
  if (index < 0 || !Number.isFinite(nextIndex)) return;
  const [item] = state.playbook.rankOrder.splice(index, 1);
  state.playbook.rankOrder.splice(nextIndex, 0, item);
  renderPlaybook();
  restoreRankingScroll(scrollTop);
  saveState();
});

function restoreRankingScroll(scrollTop) {
  const list = els.rankingPanel.querySelector(".ranking-list");
  if (list) list.scrollTop = scrollTop;
}

els.situationBody.addEventListener("change", (event) => {
  const key = event.target.dataset.situationKey;
  if (!key || !selectedSituationPlayId) return;
  const play = state.playbook.plays.find((item) => item.id === selectedSituationPlayId);
  if (!play) return;
  if (!play.situations) play.situations = normalizeSituations({});
  play.situations[key] = event.target.value ? clampPlayRating(event.target.value) : "";
  event.target.setAttribute("style", event.target.value ? playRatingStyle(event.target.value).replace(/^style="|";?$/g, "") : "");
  saveState();
});

els.pairBody.addEventListener("change", (event) => {
  const pairId = event.target.dataset.pairId;
  if (!pairId || !selectedPairPlayId) return;
  const play = state.playbook.plays.find((item) => item.id === selectedPairPlayId);
  const pairedPlay = state.playbook.plays.find((item) => item.id === pairId);
  if (!play) return;
  const pairs = new Set(normalizePairedPlayIds(play.pairedPlayIds));
  const reciprocalPairs = new Set(normalizePairedPlayIds(pairedPlay?.pairedPlayIds));
  if (event.target.checked) pairs.add(pairId);
  else pairs.delete(pairId);
  if (pairedPlay) {
    if (event.target.checked) reciprocalPairs.add(play.id);
    else reciprocalPairs.delete(play.id);
    pairedPlay.pairedPlayIds = [...reciprocalPairs];
  }
  play.pairedPlayIds = [...pairs];
  renderPlaybook();
  openPairDialog(play.id);
  saveState();
});

els.pairBody.addEventListener("input", (event) => {
  if (!event.target.matches("[data-pair-search]") || !selectedPairPlayId) return;
  pairSearchQuery = event.target.value;
  openPairDialog(selectedPairPlayId);
});

els.suggestSituations.addEventListener("click", () => {
  if (!selectedSituationPlayId) return;
  const play = state.playbook.plays.find((item) => item.id === selectedSituationPlayId);
  if (!play) return;
  play.situations = suggestSituationsForPlay(play);
  openSituationDialog(play.id);
  saveState();
});

els.playbookSets.addEventListener("dragstart", (event) => {
  const card = event.target.closest("[data-play-id]");
  if (!card) return;
  event.dataTransfer.setData("text/plain", card.dataset.playId);
});

els.playbookSets.addEventListener("dragover", (event) => {
  const slot = event.target.closest("[data-drop-set]");
  if (!slot) return;
  event.preventDefault();
  slot.classList.add("drag-over");
});

els.playbookSets.addEventListener("dragleave", (event) => {
  const slot = event.target.closest("[data-drop-set]");
  if (slot) slot.classList.remove("drag-over");
});

els.playbookSets.addEventListener("drop", (event) => {
  const slot = event.target.closest("[data-drop-set]");
  if (!slot) return;
  event.preventDefault();
  slot.classList.remove("drag-over");
  const playId = event.dataTransfer.getData("text/plain");
  const play = state.playbook.plays.find((item) => item.id === playId);
  if (!play) return;
  play.set = slot.dataset.dropSet;
  play.slot = slot.dataset.dropSlot;
  renderPlaybook();
  saveState();
});

els.rows.addEventListener("change", (event) => {
  const target = event.target;
  const teamId = target.dataset.id;
  const field = target.dataset.change;
  if (!teamId || !field) return;
  if (field === "teamBonus" || field === "conferenceTier") {
    sharedTeam(teamId)[field] = target.value;
  } else {
    if (field === "available") setTeamAvailability(teamId, target.checked);
    else leagueTeam(teamId)[field] = target.value;
  }
  render();
});

els.rows.addEventListener("input", (event) => {
  const target = event.target;
  const teamId = target.dataset.id;
  const field = target.dataset.change;
  if (!teamId || !["ndlRiskRating", "ndlWinGoal"].includes(field)) return;
  leagueTeam(teamId)[field] = target.value;
  saveState();
});

els.rows.addEventListener("click", (event) => {
  const favorite = event.target.closest("[data-ndl-favorite]");
  const open = event.target.closest("[data-open]");
  const move = event.target.closest("[data-move]");
  if (favorite) {
    toggleNdlFavorite(favorite.dataset.ndlFavorite);
    render();
    return;
  }
  if (open) openDialog(open.dataset.open);
  if (move) moveTeam(move.dataset.id, move.dataset.move);
});

els.leaguePanel.addEventListener("click", (event) => {
  const remove = event.target.closest("[data-remove-user]");
  if (remove) {
    state.zUsers.splice(Number(remove.dataset.removeUser), 1);
    render();
    return;
  }
  if (event.target.id === "addUser") {
    const name = document.getElementById("userName").value.trim();
    const discordUsername = document.getElementById("userDiscord").value.trim();
    const cfbUsername = document.getElementById("userCfb").value.trim();
    const status = document.getElementById("userStatus").value;
    if (name || discordUsername || cfbUsername) {
      state.zUsers.push({ name, discordUsername, cfbUsername, status });
      render();
    }
  }
});

els.leaguePanel.addEventListener("input", (event) => {
  const index = Number(event.target.dataset.userIndex);
  const field = event.target.dataset.userField;
  if (!field || !Number.isInteger(index) || !state.zUsers[index]) return;
  state.zUsers[index][field] = event.target.value;
  if (field === "status") renderLeaguePanel();
  saveState();
});

els.navDrafted.addEventListener("click", (event) => {
  if (event.target.id === "addDraftedTeam") {
    addDraftedTeamFromInput(document.getElementById("draftedTeamInput"));
    return;
  }
  const removeDrafted = event.target.closest("[data-remove-drafted]");
  const removeHeld = event.target.closest("[data-remove-held]");
  if (removeDrafted) removeDraftedTeam(removeDrafted.dataset.removeDrafted);
  else if (removeHeld) removeHeldTeam(removeHeld.dataset.removeHeld);
  else return;
  render();
});

els.navDrafted.addEventListener("keydown", (event) => {
  if (event.target.id !== "draftedTeamInput" || event.key !== "Enter") return;
  event.preventDefault();
  addDraftedTeamFromInput(event.target);
});

els.navDrafted.addEventListener("change", (event) => {
  if (event.target.id === "ndlProjectedPickRate") {
    state.ndlProjectedPickRate = Number(event.target.value) || NDL_PROJECTED_PICK_RATE;
    render();
    saveState();
    return;
  }
  if (event.target.id === "hideDraftedTeams") {
    state.filters.availability = event.target.checked ? "available" : "all";
    render();
  }
});

document.getElementById("saveSyncCode")?.addEventListener("click", () => {
  const input = document.getElementById("syncCodeInput");
  const code = input?.value.trim() || "";
  if (!code) {
    localStorage.removeItem(SYNC_CODE_KEY);
    localStorage.removeItem(SYNC_UPDATED_KEY);
    clearInterval(syncPollTimer);
    setSyncStatus("Local only");
    return;
  }
  localStorage.setItem(SYNC_CODE_KEY, code);
  setSyncStatus("Auto sync on", "good");
  startAutoCloudSync({ force: true, pushIfEmpty: true });
});

document.getElementById("pullCloudState")?.addEventListener("click", () => {
  pullCloudState().catch((error) => setSyncStatus(error.message, "bad"));
});

document.getElementById("pushCloudState")?.addEventListener("click", () => {
  pushCloudState().catch((error) => setSyncStatus(error.message, "bad"));
});

els.leaguePanel.addEventListener("change", (event) => {
  const index = Number(event.target.dataset.userIndex);
  const field = event.target.dataset.userField;
  if (!field || !Number.isInteger(index) || !state.zUsers[index]) return;
  state.zUsers[index][field] = event.target.value;
  renderLeaguePanel();
  saveState();
});

els.dialogBody.addEventListener("input", (event) => {
  if (!selectedTeamId) return;
  const slot = event.target.dataset.slot;
  const slotBonus = event.target.dataset.slotBonus;
  const field = event.target.dataset.changeDetail;
  const item = leagueTeam(selectedTeamId);
  const shared = sharedTeam(selectedTeamId);
  if (slot) shared[slot] = event.target.value;
  if (slotBonus) {
    if (!shared.playerBonuses) shared.playerBonuses = {};
    shared.playerBonuses[slotBonus] = event.target.value;
  }
  if (field === "teamBonus" || field === "conferenceTier") shared[field] = event.target.value;
  else if (field === "available") setTeamAvailability(selectedTeamId, event.target.value === "true");
  else if (field) item[field] = event.target.value;
  saveState();
  renderRows();
});

els.dialogBody.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-dialog-nav]");
  if (!nav) return;
  openDialog(nav.dataset.dialogNav);
});

els.dialogBody.addEventListener("change", (event) => {
  if (!selectedTeamId) return;
  const slotBonus = event.target.dataset.slotBonus;
  const field = event.target.dataset.changeDetail;
  if (slotBonus) {
    const shared = sharedTeam(selectedTeamId);
    if (!shared.playerBonuses) shared.playerBonuses = {};
    shared.playerBonuses[slotBonus] = event.target.value;
    saveState();
    renderRows();
    openDialog(selectedTeamId);
  }
  if (field) {
    if (field === "teamBonus" || field === "conferenceTier") {
      sharedTeam(selectedTeamId)[field] = event.target.value;
    } else {
      if (field === "available") setTeamAvailability(selectedTeamId, event.target.value === "true");
      else leagueTeam(selectedTeamId)[field] = event.target.value;
    }
    saveState();
    renderRows();
  }
});

render();
refreshSyncControls();
startAutoCloudSync();
hasBooted = true;

