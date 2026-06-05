const storageKey = "orgassets-portal-data-v1";
const sessionUserKey = "orgassets-current-user-id";
const legacyStorageKeys = ["orgaccess-portal-data-v1", "asset-topology-demo-v2"];
const defaultAdminPassword = "ChangeMe123!";
const staticDemoHost = /\.github\.io$/i.test(location.hostname);
const defaultCompanyName = "OrgAssets";
const defaultReportHeader = "OrgAssets\nDigital asset ownership and access report";
const legacyDemoCompanyNames = new Set(["Demo Company", "Pinpoint Personnel Demo Business", "TechSavvy Demo Business"]);
const legacyDemoHeaderPattern = /^(Demo Company|Pinpoint Personnel Demo Business|TechSavvy Demo Business)\b/i;
const adminLevels = new Set(["Billing Admin", "Admin", "Owner"]);
const inactiveStatuses = new Set(["Inactive", "Terminated", "Archived"]);
const contractorTypes = new Set(["Contractor", "Subcontractor"]);
const adminOnlyViews = new Set(["offboarding", "settings", "imports"]);
const defaultPortalSettings = {
  defaultScope: "department",
  defaultDensity: "compact",
  showCostKpis: true,
  showSystemsOnCards: true,
  showOrgSnapshot: true,
  showFocusedTables: true,
  showReportDeck: true,
  defaultPageSize: "25",
  defaultPersonStatus: "Active",
  defaultEmploymentType: "Employee",
  defaultSystemStatus: "Active",
  defaultAssignmentAccess: "User",
  showAdvancedFields: true
};

const el = {
  navItems: document.querySelectorAll(".nav-item[data-view]"),
  views: document.querySelectorAll(".view"),
  viewTitle: document.querySelector("#viewTitle"),
  renewalWindow: document.querySelector("#renewalWindow"),
  showInactive: document.querySelector("#showInactive"),
  showContractors: document.querySelector("#showContractors"),
  viewRuleStats: document.querySelector("#viewRuleStats"),
  globalSearch: document.querySelector("#globalSearch"),
  loginDialog: document.querySelector("#loginDialog"),
  loginForm: document.querySelector("#loginForm"),
  loginUsername: document.querySelector("#loginUsername"),
  loginPassword: document.querySelector("#loginPassword"),
  loginError: document.querySelector("#loginError"),
  currentUserLabel: document.querySelector("#currentUserLabel"),
  logoutUser: document.querySelector("#logoutUser"),
  loadDemoData: document.querySelector("#loadDemoData"),
  clearDemoData: document.querySelector("#clearDemoData"),
  metricGrid: document.querySelector("#metricGrid"),
  upcomingRenewals: document.querySelector("#upcomingRenewals"),
  formerStaffTable: document.querySelector("#formerStaffTable"),
  contractorAccessTable: document.querySelector("#contractorAccessTable"),
  noOwnerTable: document.querySelector("#noOwnerTable"),
  highCostTable: document.querySelector("#highCostTable"),
  reportDeckPanel: document.querySelector(".report-deck-panel"),
  focusedDashboardGrid: document.querySelector(".focused-dashboard-grid"),
  orgSnapshotPanel: document.querySelector(".org-snapshot-panel"),
  orgSnapshot: document.querySelector("#orgSnapshot"),
  reportDeck: document.querySelector("#reportDeck"),
  actionPreview: document.querySelector("#actionPreview"),
  peopleTable: document.querySelector("#peopleTable"),
  departmentTable: document.querySelector("#departmentTable"),
  roleTable: document.querySelector("#roleTable"),
  vendorTable: document.querySelector("#vendorTable"),
  systemTable: document.querySelector("#systemTable"),
  assignmentTable: document.querySelector("#assignmentTable"),
  exportStandardAssignments: document.querySelector("#exportStandardAssignments"),
  offboardingPerson: document.querySelector("#offboardingPerson"),
  offboardingOpenPerson: document.querySelector("#offboardingOpenPerson"),
  offboardingSummary: document.querySelector("#offboardingSummary"),
  offboardingChecklist: document.querySelector("#offboardingChecklist"),
  offboardingMarkInactive: document.querySelector("#offboardingMarkInactive"),
  offboardingRevokeAll: document.querySelector("#offboardingRevokeAll"),
  offboardingUndo: document.querySelector("#offboardingUndo"),
  offboardingExportPdf: document.querySelector("#offboardingExportPdf"),
  topologyScope: document.querySelector("#topologyScope"),
  topologyDepartment: document.querySelector("#topologyDepartment"),
  topologyRole: document.querySelector("#topologyRole"),
  topologyDensity: document.querySelector("#topologyDensity"),
  topologySystems: document.querySelector("#topologySystems"),
  topologyRoles: document.querySelector("#topologyRoles"),
  topologyAccessFlags: document.querySelector("#topologyAccessFlags"),
  topologyZoomOut: document.querySelector("#topologyZoomOut"),
  topologyZoomReset: document.querySelector("#topologyZoomReset"),
  topologyZoomIn: document.querySelector("#topologyZoomIn"),
  topologyUndoTree: document.querySelector("#topologyUndoTree"),
  topologyRedoTree: document.querySelector("#topologyRedoTree"),
  topologyOrganizeTree: document.querySelector("#topologyOrganizeTree"),
  topologyPrintMode: document.querySelector("#topologyPrintMode"),
  topologyPrintPdf: document.querySelector("#topologyPrintPdf"),
  topologyMap: document.querySelector("#topologyMap"),
  actionTable: document.querySelector("#actionTable"),
  reportType: document.querySelector("#reportType"),
  reportDepartment: document.querySelector("#reportDepartment"),
  reportQuestion: document.querySelector("#reportQuestion"),
  reportVisuals: document.querySelector("#reportVisuals"),
  reportOutput: document.querySelector("#reportOutput"),
  downloadReport: document.querySelector("#downloadReport"),
  printReport: document.querySelector("#printReport"),
  downloadTemplates: document.querySelector("#downloadTemplates"),
  downloadAssignmentSchema: document.querySelector("#downloadAssignmentSchema"),
  importSummary: document.querySelector("#importSummary"),
  importType: document.querySelector("#importType"),
  importFile: document.querySelector("#importFile"),
  analyzeImport: document.querySelector("#analyzeImport"),
  applyImport: document.querySelector("#applyImport"),
  importPreview: document.querySelector("#importPreview"),
  importTable: document.querySelector("#importTable"),
  detailPanel: document.querySelector("#detailPanel"),
  detailTitle: document.querySelector("#detailTitle"),
  detailBody: document.querySelector("#detailBody"),
  closeDetail: document.querySelector("#closeDetail"),
  settingDefaultScope: document.querySelector("#settingDefaultScope"),
  settingDefaultDensity: document.querySelector("#settingDefaultDensity"),
  settingShowCostKpis: document.querySelector("#settingShowCostKpis"),
  settingShowOrgSnapshot: document.querySelector("#settingShowOrgSnapshot"),
  settingShowFocusedTables: document.querySelector("#settingShowFocusedTables"),
  settingShowReportDeck: document.querySelector("#settingShowReportDeck"),
  settingDefaultPageSize: document.querySelector("#settingDefaultPageSize"),
  settingDefaultPersonStatus: document.querySelector("#settingDefaultPersonStatus"),
  settingDefaultEmploymentType: document.querySelector("#settingDefaultEmploymentType"),
  settingDefaultSystemStatus: document.querySelector("#settingDefaultSystemStatus"),
  settingDefaultAssignmentAccess: document.querySelector("#settingDefaultAssignmentAccess"),
  settingShowAdvancedFields: document.querySelector("#settingShowAdvancedFields"),
  settingReportLogo: document.querySelector("#settingReportLogo"),
  settingReportHeader: document.querySelector("#settingReportHeader"),
  clearReportLogo: document.querySelector("#clearReportLogo"),
  reportBrandPreview: document.querySelector("#reportBrandPreview"),
  downloadPortalBackup: document.querySelector("#downloadPortalBackup"),
  backupRestoreMessage: document.querySelector("#backupRestoreMessage"),
  auditTrailTable: document.querySelector("#auditTrailTable"),
  exportAuditCsv: document.querySelector("#exportAuditCsv"),
  exportAuditPdf: document.querySelector("#exportAuditPdf"),
  userPersonSelect: document.querySelector("#userPersonSelect"),
  userUsername: document.querySelector("#userUsername"),
  userPassword: document.querySelector("#userPassword"),
  userRole: document.querySelector("#userRole"),
  createUser: document.querySelector("#createUser"),
  enableAllStaffUsers: document.querySelector("#enableAllStaffUsers"),
  disableAllStaffUsers: document.querySelector("#disableAllStaffUsers"),
  usersSummary: document.querySelector("#usersSummary"),
  usersMessage: document.querySelector("#usersMessage"),
  usersSearch: document.querySelector("#usersSearch"),
  usersTable: document.querySelector("#usersTable"),
  savePortalSettings: document.querySelector("#savePortalSettings"),
  resetPortalSettings: document.querySelector("#resetPortalSettings"),
  recordDialog: document.querySelector("#recordDialog"),
  recordForm: document.querySelector("#recordForm"),
  recordDialogMode: document.querySelector("#recordDialogMode"),
  recordDialogTitle: document.querySelector("#recordDialogTitle"),
  recordFields: document.querySelector("#recordFields"),
  deleteRecord: document.querySelector("#deleteRecord"),
  userDialog: document.querySelector("#userDialog"),
  userForm: document.querySelector("#userForm"),
  userDialogTitle: document.querySelector("#userDialogTitle"),
  editUserPerson: document.querySelector("#editUserPerson"),
  editUserUsername: document.querySelector("#editUserUsername"),
  editUserRole: document.querySelector("#editUserRole"),
  editUserStatus: document.querySelector("#editUserStatus"),
  editUserPassword: document.querySelector("#editUserPassword"),
  editUserMessage: document.querySelector("#editUserMessage"),
  confirmDialog: document.querySelector("#confirmDialog"),
  confirmForm: document.querySelector("#confirmForm"),
  confirmTitle: document.querySelector("#confirmTitle"),
  confirmMessage: document.querySelector("#confirmMessage"),
  confirmAction: document.querySelector("#confirmAction")
};

let state = loadState();
let currentView = "dashboard";
let currentUserId = sessionStorage.getItem(sessionUserKey) || "";
let currentEditor = null;
let currentUserEditorId = "";
let pendingConfirmAction = null;
let pendingImport = null;
let lastOffboardingUndo = null;
const tablePrefs = {};
const tableExportCache = {};
let topologyZoomOverride = null;
let lastTopologyFitZoom = 1;
let topologyOrganizeMode = false;
let topologyDragPersonId = "";
const topologyUndoStack = [];
const topologyRedoStack = [];

const recordViewMap = {
  person: "people",
  system: "systems",
  assignment: "assignments",
  department: "departments",
  vendor: "vendors",
  role: "roles"
};

function emptyState() {
  return {
    company: {
      id: "c1",
      name: defaultCompanyName,
      logoUrl: "",
      reportHeader: defaultReportHeader,
      createdAt: "2026-06-01",
      updatedAt: "2026-06-01"
    },
    people: [],
    departments: [],
    roles: [],
    personRoles: [],
    vendors: [],
    systemAssets: [],
    systemAssignments: [],
    auditEvents: [],
    users: [defaultAdminUser()],
    settings: { ...defaultPortalSettings }
  };
}

function defaultAdminUser() {
  return {
    id: "u-admin",
    username: "admin",
    password: defaultAdminPassword,
    role: "admin",
    status: "Active",
    personId: "",
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01"
  };
}

function loadState() {
  const saved = localStorage.getItem(storageKey) || legacyStorageKeys.map((key) => localStorage.getItem(key)).find(Boolean);
  if (saved) {
    try {
      const data = normalizeState(JSON.parse(saved));
      localStorage.setItem(storageKey, JSON.stringify(data));
      return data;
    } catch {
      localStorage.removeItem(storageKey);
    }
  }
  const seed = buildSeedData();
  localStorage.setItem(storageKey, JSON.stringify(seed));
  return seed;
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function normalizeAuditEvents(events) {
  return events
    .filter((event) => event && typeof event === "object")
    .map((event, index, list) => ({
      id: event.id || `ae-${index + 1}`,
      at: event.at || new Date().toISOString(),
      actor: event.actor || "System",
      eventType: event.eventType || "EVENT",
      entityType: event.entityType || "",
      entityId: event.entityId || "",
      summary: event.summary || "",
      before: event.before || "",
      after: event.after || "",
      previousHash: event.previousHash || list[index - 1]?.hash || "",
      hash: event.hash || simpleHashString(`${event.at || ""}|${event.actor || ""}|${event.eventType || ""}|${event.entityType || ""}|${event.entityId || ""}|${event.summary || ""}|${event.before || ""}|${event.after || ""}|${event.previousHash || ""}`)
    }))
    .slice(-500);
}

function simpleHashString(value) {
  let hash = 2166136261;
  const text = String(value ?? "");
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `h${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function auditActorLabel() {
  const user = currentUser?.();
  return user ? `${user.username} (${user.role})` : "System";
}

function addAuditEvent({ eventType, entityType = "", entityId = "", summary = "", before = "", after = "" }) {
  state.auditEvents = Array.isArray(state.auditEvents) ? state.auditEvents : [];
  const previous = state.auditEvents[state.auditEvents.length - 1];
  const event = {
    id: uid("ae"),
    at: new Date().toISOString(),
    actor: auditActorLabel(),
    eventType,
    entityType,
    entityId,
    summary,
    before,
    after,
    previousHash: previous?.hash || ""
  };
  event.hash = simpleHashString(`${event.at}|${event.actor}|${event.eventType}|${event.entityType}|${event.entityId}|${event.summary}|${event.before}|${event.after}|${event.previousHash}`);
  state.auditEvents.push(event);
  if (state.auditEvents.length > 500) state.auditEvents = state.auditEvents.slice(-500);
  return event;
}

function auditRows(limit = 50) {
  return (state.auditEvents || [])
    .slice()
    .sort((a, b) => String(b.at).localeCompare(String(a.at)))
    .slice(0, limit)
    .map((event) => ({
      Time: event.at ? new Date(event.at).toLocaleString() : "",
      Actor: event.actor,
      Event: event.eventType,
      Entity: [event.entityType, event.entityId].filter(Boolean).join(" "),
      Summary: event.summary,
      Before: event.before,
      After: event.after,
      Hash: event.hash
    }));
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function randomSalt() {
  const bytes = new Uint8Array(16);
  if (globalThis.crypto?.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    bytes.forEach((_, index) => {
      bytes[index] = Math.floor(Math.random() * 256);
    });
  }
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sha256Hex(text) {
  if (!globalThis.TextEncoder) return sha256HexFallback(text);
  const bytes = new TextEncoder().encode(text);
  if (globalThis.crypto?.subtle?.digest) {
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  return sha256BytesFallback(bytes);
}

function sha256HexFallback(text) {
  const encoded = unescape(encodeURIComponent(String(text)));
  const bytes = new Uint8Array(encoded.length);
  for (let index = 0; index < encoded.length; index += 1) {
    bytes[index] = encoded.charCodeAt(index);
  }
  return sha256BytesFallback(bytes);
}

function sha256BytesFallback(bytes) {
  const rightRotate = (value, amount) => (value >>> amount) | (value << (32 - amount));
  const constants = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  const bitLength = bytes.length * 8;
  const paddedLength = (((bytes.length + 9 + 63) >> 6) << 6);
  const padded = new Uint8Array(paddedLength);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(paddedLength - 4, bitLength >>> 0);
  view.setUint32(paddedLength - 8, Math.floor(bitLength / 0x100000000));
  const hash = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const words = new Uint32Array(64);
  for (let offset = 0; offset < paddedLength; offset += 64) {
    for (let index = 0; index < 16; index += 1) words[index] = view.getUint32(offset + index * 4);
    for (let index = 16; index < 64; index += 1) {
      const s0 = rightRotate(words[index - 15], 7) ^ rightRotate(words[index - 15], 18) ^ (words[index - 15] >>> 3);
      const s1 = rightRotate(words[index - 2], 17) ^ rightRotate(words[index - 2], 19) ^ (words[index - 2] >>> 10);
      words[index] = (words[index - 16] + s0 + words[index - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = hash;
    for (let index = 0; index < 64; index += 1) {
      const s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + s1 + ch + constants[index] + words[index]) >>> 0;
      const s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (s0 + maj) >>> 0;
      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }
    [a, b, c, d, e, f, g, h].forEach((value, index) => {
      hash[index] = (hash[index] + value) >>> 0;
    });
  }
  return hash.map((value) => value.toString(16).padStart(8, "0")).join("");
}

async function buildPasswordHash(password, salt = randomSalt()) {
  return {
    passwordSalt: salt,
    passwordHash: `v1$sha256$${await sha256Hex(`${salt}:${password}`)}`
  };
}

async function setUserPassword(user, password) {
  Object.assign(user, await buildPasswordHash(password));
  delete user.password;
  user.updatedAt = todayStamp();
}

async function verifyUserPassword(user, password) {
  if (!user) return false;
  if (user.passwordHash && user.passwordSalt) {
    const expected = await buildPasswordHash(password, user.passwordSalt);
    return expected.passwordHash === user.passwordHash;
  }
  if (user.password !== undefined && String(user.password) === password) {
    await setUserPassword(user, password);
    saveState();
    return true;
  }
  return false;
}

async function ensurePasswordsMigrated() {
  let changed = false;
  for (const user of state.users) {
    if (user.password !== undefined && !user.passwordHash) {
      await setUserPassword(user, String(user.password || ""));
      changed = true;
    } else if (user.password !== undefined) {
      delete user.password;
      changed = true;
    }
  }
  if (changed) saveState();
}

function normalizeState(data) {
  const normalized = data && typeof data === "object" ? data : emptyState();
  normalized.company = normalizeCompanyBranding({ ...emptyState().company, ...(normalized.company ?? {}) });
  ["people", "departments", "roles", "personRoles", "vendors", "systemAssets", "systemAssignments", "auditEvents", "users"].forEach((key) => {
    normalized[key] = Array.isArray(normalized[key]) ? normalized[key] : [];
  });
  normalized.auditEvents = normalizeAuditEvents(normalized.auditEvents);
  normalizeUsers(normalized);
  normalized.settings = { ...defaultPortalSettings, ...(normalized.settings ?? {}) };
  normalized.company = normalizeCompanyBranding(normalized.company);
  normalized.people.forEach((personRecord) => {
    personRecord.displayName = `${personRecord.firstName ?? ""} ${personRecord.lastName ?? ""}`.trim() || personRecord.displayName || "Unnamed person";
  });
  linkUsersToPeople(normalized);
  normalizeAssignmentIntegrity(normalized);
  normalized.systemAssets.forEach((system) => recalculateSystemCosts(system, normalized));
  return normalized;
}

function normalizeCompanyBranding(company) {
  const normalizedCompany = { ...emptyState().company, ...(company ?? {}) };
  const companyName = String(normalizedCompany.name || "").trim();
  const reportHeader = String(normalizedCompany.reportHeader || "").trim();
  normalizedCompany.name = legacyDemoCompanyNames.has(companyName) || !companyName ? defaultCompanyName : companyName;
  normalizedCompany.reportHeader =
    legacyDemoHeaderPattern.test(reportHeader) || !reportHeader ? defaultReportHeader : reportHeader;
  return normalizedCompany;
}

function normalizeUsers(data) {
  const admin = defaultAdminUser();
  const seen = new Set();
  data.users = data.users
    .filter((user) => user && typeof user === "object")
    .map((user) => ({
      ...admin,
      ...user,
      id: user.id || uid("u"),
      username: String(user.username || "").trim(),
      password: user.password !== undefined ? String(user.password || "") : undefined,
      passwordHash: String(user.passwordHash || ""),
      passwordSalt: String(user.passwordSalt || ""),
      role: user.role === "admin" ? "admin" : "user",
      status: user.status === "Inactive" ? "Inactive" : "Active",
      personId: user.personId || "",
      updatedAt: user.updatedAt || "2026-06-01"
    }))
    .filter((user) => {
      const key = user.username.toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  const adminUser = data.users.find((user) => user.username.toLowerCase() === "admin");
  if (!adminUser) {
    data.users.unshift(admin);
  } else if (!adminUser.passwordHash && adminUser.password === undefined) {
    adminUser.password = defaultAdminPassword;
  }
  if (!data.users.some((user) => user.role === "admin" && user.status === "Active")) {
    const repairedAdmin = data.users.find((user) => user.username.toLowerCase() === "admin") || admin;
    Object.assign(repairedAdmin, { role: "admin", status: "Active", password: repairedAdmin.password || admin.password });
    if (!data.users.includes(repairedAdmin)) data.users.unshift(repairedAdmin);
  }
}

function linkUsersToPeople(data = state) {
  data.users.forEach((user) => {
    const personRecord = userPersonRecord(user, data);
    if (personRecord && !user.personId) user.personId = personRecord.id;
  });
}

function buildSeedData() {
  const data = emptyState();
  data.company.name = "OrgAssets Sample Company";
  data.company.reportHeader = "OrgAssets Sample Company\nDigital asset ownership and access review";

  data.departments = [
    dept("d-exec", "Executive", null, "p1"),
    dept("d-ops", "Operations", null, "p4"),
    dept("d-fin", "Finance", null, "p5"),
    dept("d-it", "Information Technology", null, "p6"),
    dept("d-sales", "Sales", null, "p7"),
    dept("d-marketing", "Marketing", null, "p8"),
    dept("d-hr", "Human Resources", null, "p9"),
    dept("d-field", "Field Services", "d-ops", "p10"),
    dept("d-admin", "Administration", null, "p11")
  ];

  data.roles = [
    role("r-owner", "Owner", "Business owner and final approver"),
    role("r-ceo", "CEO", "Executive operator"),
    role("r-coo", "Operations Manager", "Daily operations leader"),
    role("r-finance", "Finance Manager", "Billing, accounting, and payment ownership"),
    role("r-hr", "HR Manager", "Employee lifecycle owner"),
    role("r-it", "IT Admin", "System administration and technical ownership"),
    role("r-sales", "Sales Manager", "Sales pipeline and customer systems"),
    role("r-marketing", "Marketing Manager", "Brand and campaign systems"),
    role("r-field", "Field Technician", "Field systems and device user"),
    role("r-admin", "Administrative Assistant", "Internal administrative support"),
    role("r-billing", "Billing Contact", "Vendor billing point of contact"),
    role("r-account-owner", "Account Owner", "System ownership role"),
    role("r-reviewer", "Reviewer", "Periodic access review"),
    role("r-approver", "Approver", "Approves purchases and renewals"),
    role("r-contractor", "Contractor", "External temporary resource"),
    role("r-subcontractor", "Subcontractor", "Subcontracted resource"),
    role("r-vendor", "Vendor Contact", "External vendor contact")
  ];

  data.people = [
    person("p1", "Morgan", "Hale", "Owner", "Owner", "Active", "d-exec", null, "2018-01-05", ""),
    person("p2", "Avery", "Chen", "CEO", "Executive", "Active", "d-exec", "p1", "2019-04-15", ""),
    person("p3", "Blake", "Monroe", "Chief Operating Officer", "Executive", "Active", "d-ops", "p2", "2020-02-10", ""),
    person("p4", "Jordan", "Price", "Operations Manager", "Employee", "Active", "d-ops", "p3", "2020-08-03", ""),
    person("p5", "Maria", "Santos", "Finance Manager", "Employee", "Active", "d-fin", "p2", "2021-01-12", ""),
    person("p6", "Riley", "Knox", "IT Administrator", "Employee", "Active", "d-it", "p3", "2021-07-01", ""),
    person("p7", "Sam", "Rivera", "Sales Manager", "Employee", "Active", "d-sales", "p2", "2021-09-18", ""),
    person("p8", "Lisa", "Nolan", "Marketing Manager", "Employee", "Active", "d-marketing", "p2", "2022-02-22", ""),
    person("p9", "Harper", "Nguyen", "HR Manager", "Employee", "Active", "d-hr", "p2", "2022-05-06", ""),
    person("p10", "Taylor", "Brooks", "Field Services Lead", "Employee", "Active", "d-field", "p4", "2022-06-20", ""),
    person("p11", "Nina", "Cole", "Administrative Coordinator", "Employee", "Active", "d-admin", "p3", "2023-03-14", ""),
    person("p12", "Casey", "Patel", "Website Contractor", "Contractor", "Active", "d-marketing", "p8", "2025-01-15", "2026-05-01"),
    person("p13", "Drew", "Wallace", "Former Bookkeeper", "Employee", "Terminated", "d-fin", "p5", "2020-09-01", "2026-04-19"),
    person("p14", "Quinn", "Foster", "Former IT Contractor", "Contractor", "Inactive", "d-it", "p6", "2025-05-01", "2026-03-31"),
    person("p15", "Parker", "Shaw", "Payroll Vendor Contact", "Vendor Contact", "Active", "d-fin", "p5", "2024-10-01", "")
  ];

  const demoPeople = [
    ["p100", "Alex", "Miller", "Field Technician", "Employee", "d-field", "p10", "r-field"],
    ["p101", "Jamie", "Bennett", "Front Desk Specialist", "Employee", "d-admin", "p11", "r-admin"],
    ["p102", "Chris", "Parker", "Billing Specialist", "Employee", "d-fin", "p5", "r-billing"],
    ["p103", "Dana", "Reed", "Recruiting Coordinator", "Employee", "d-hr", "p9", "r-hr"],
    ["p104", "Elliot", "Stone", "Account Executive", "Employee", "d-sales", "p7", "r-sales"],
    ["p105", "Finley", "Morgan", "Operations Analyst", "Employee", "d-ops", "p4", "r-coo"],
    ["p106", "Gray", "Ellis", "Help Desk Technician", "Employee", "d-it", "p6", "r-it"],
    ["p107", "Hayden", "Ross", "Social Media Coordinator", "Employee", "d-marketing", "p8", "r-marketing"],
    ["p108", "Indigo", "West", "Field Technician", "Employee", "d-field", "p10", "r-field"],
    ["p109", "Jules", "Maddox", "Customer Success Rep", "Employee", "d-sales", "p7", "r-sales"],
    ["p110", "Kai", "Ramirez", "Staff Accountant", "Employee", "d-fin", "p5", "r-finance"],
    ["p111", "Logan", "Pierce", "Scheduler", "Employee", "d-admin", "p11", "r-admin"],
    ["p112", "Micah", "Ford", "Inventory Coordinator", "Employee", "d-ops", "p4", "r-coo"],
    ["p113", "Noel", "Carter", "HR Generalist", "Employee", "d-hr", "p9", "r-hr"],
    ["p114", "Oakley", "Wells", "Systems Analyst", "Employee", "d-it", "p6", "r-it"],
    ["p115", "Peyton", "Hayes", "Marketing Designer", "Employee", "d-marketing", "p8", "r-marketing"],
    ["p116", "Reese", "Bailey", "Sales Support", "Employee", "d-sales", "p7", "r-sales"],
    ["p117", "Rowan", "James", "Field Technician", "Employee", "d-field", "p10", "r-field"],
    ["p118", "Sage", "Cooper", "Accounts Payable Clerk", "Employee", "d-fin", "p5", "r-billing"],
    ["p119", "Skyler", "Ward", "Office Assistant", "Employee", "d-admin", "p11", "r-admin"],
    ["p120", "Tatum", "Bryant", "Implementation Contractor", "Contractor", "d-it", "p6", "r-contractor"],
    ["p121", "Robin", "Hughes", "SEO Subcontractor", "Subcontractor", "d-marketing", "p8", "r-subcontractor"],
    ["p122", "Emerson", "Diaz", "Data Cleanup Contractor", "Contractor", "d-ops", "p4", "r-contractor"],
    ["p123", "Kendall", "Reyes", "Former Sales Rep", "Employee", "d-sales", "p7", "r-sales", "Terminated", "2026-05-10"],
    ["p124", "Marley", "Kim", "Former Admin Assistant", "Employee", "d-admin", "p11", "r-admin", "Inactive", "2026-04-30"],
    ["p125", "Ari", "Lane", "Insurance Vendor Contact", "Vendor Contact", "d-fin", "p5", "r-vendor"],
    ["p126", "Briar", "Scott", "Phone Vendor Contact", "Vendor Contact", "d-it", "p6", "r-vendor"],
    ["p127", "Cameron", "Wright", "Client Portal Coordinator", "Employee", "d-sales", "p7", "r-sales"],
    ["p128", "Devon", "Myers", "Compliance Reviewer", "Employee", "d-hr", "p9", "r-reviewer"],
    ["p129", "Ellis", "Powell", "Operations Approver", "Employee", "d-ops", "p4", "r-approver"]
  ];

  demoPeople.forEach((row, index) => {
    const [id, firstName, lastName, title, employmentType, departmentId, managerPersonId, roleId, status = "Active", endDate = ""] = row;
    data.people.push(person(id, firstName, lastName, title, employmentType, status, departmentId, managerPersonId, `2023-${String((index % 12) + 1).padStart(2, "0")}-12`, endDate));
  });

  const primaryRoles = {
    p1: ["r-owner", "r-approver", "r-account-owner"],
    p2: ["r-ceo", "r-approver"],
    p3: ["r-coo", "r-approver"],
    p4: ["r-coo", "r-reviewer"],
    p5: ["r-finance", "r-billing", "r-reviewer"],
    p6: ["r-it", "r-account-owner", "r-reviewer"],
    p7: ["r-sales", "r-account-owner"],
    p8: ["r-marketing", "r-account-owner"],
    p9: ["r-hr", "r-reviewer"],
    p10: ["r-field", "r-reviewer"],
    p11: ["r-admin"],
    p12: ["r-contractor"],
    p13: ["r-finance", "r-billing"],
    p14: ["r-contractor", "r-it"],
    p15: ["r-vendor"]
  };

  demoPeople.forEach((row) => {
    primaryRoles[row[0]] = [row[7]];
  });

  data.personRoles = Object.entries(primaryRoles).flatMap(([personId, roles]) => roles.map((roleId, index) => ({
    id: `pr-${personId}-${roleId}`,
    companyId: "c1",
    personId,
    roleId,
    isPrimary: index === 0,
    notes: "",
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01"
  })));

  data.vendors = [
    vendor("v1", "Microsoft", "https://microsoft.com", "Productivity", "2026-07-01"),
    vendor("v2", "Google", "https://workspace.google.com", "Productivity", "2026-08-12"),
    vendor("v3", "Intuit QuickBooks", "https://quickbooks.intuit.com", "Accounting", "2026-06-28"),
    vendor("v4", "HubSpot", "https://hubspot.com", "Sales", "2026-09-14"),
    vendor("v5", "GoDaddy", "https://godaddy.com", "Domain", "2026-06-18"),
    vendor("v6", "Namecheap", "https://namecheap.com", "Domain", "2026-06-20"),
    vendor("v7", "Adobe", "https://adobe.com", "Design", "2026-07-08"),
    vendor("v8", "Canva", "https://canva.com", "Design", "2026-06-11"),
    vendor("v9", "Slack", "https://slack.com", "Communication", "2026-06-25"),
    vendor("v10", "Zoom", "https://zoom.us", "Communication", "2026-08-01"),
    vendor("v11", "RingCentral", "https://ringcentral.com", "Phone System", "2026-07-19"),
    vendor("v12", "Gusto", "https://gusto.com", "Payroll", "2026-10-01"),
    vendor("v13", "Bank of Commerce", "https://bank.example", "Banking", "2026-12-31"),
    vendor("v14", "State Tax Portal", "https://state.example", "Government", "2026-07-01"),
    vendor("v15", "Backblaze", "https://backblaze.com", "Cloud Service", "2026-06-16"),
    vendor("v16", "AWS", "https://aws.amazon.com", "Cloud Service", "2026-11-05"),
    vendor("v17", "Dropbox", "https://dropbox.com", "Storage", "2026-06-09"),
    vendor("v18", "LinkedIn", "https://linkedin.com", "Social Media", "2026-09-20"),
    vendor("v19", "Meta Business", "https://business.facebook.com", "Social Media", "2026-07-03"),
    vendor("v20", "Local Chamber", "https://chamber.example", "Membership", "2026-06-29"),
    vendor("v21", "CyberShield Insurance", "https://insurance.example", "Insurance", "2026-07-15"),
    vendor("v22", "Client Portal Co", "https://clientportal.example", "Client Portal", "2026-08-20")
  ];

  const systemCatalog = [
    ["s1", "Microsoft 365 Tenant", "v1", "Software", "Email", "Active", "p6", "d-it", "Monthly", 312, "2026-07-01", "2026-06-15", true, 42, 35, "2026-02-01"],
    ["s2", "Google Workspace Archive", "v2", "Email", "Email", "Active", "p6", "d-it", "Monthly", 96, "2026-08-12", "2026-07-28", true, 12, 7, "2025-10-15"],
    ["s3", "QuickBooks Online", "v3", "Subscription", "Accounting", "Active", "p5", "d-fin", "Monthly", 120, "2026-06-28", "2026-06-21", true, 8, 6, "2026-01-05"],
    ["s4", "HubSpot Sales Hub", "v4", "Subscription", "Sales", "Active", "p7", "d-sales", "Monthly", 540, "2026-09-14", "2026-08-30", true, 14, 11, "2026-03-03"],
    ["s5", "Primary Domain", "v6", "Domain", "Domain", "Active", "p6", "d-it", "Annual", 24, "2026-06-20", "2026-06-13", true, 0, 0, "2026-04-01"],
    ["s6", "Legacy Domain", "v5", "Domain", "Domain", "Active", null, "d-it", "Annual", 32, "2026-06-18", "2026-06-12", true, 0, 0, "2025-09-01"],
    ["s7", "Adobe Creative Cloud", "v7", "License", "Design", "Active", "p8", "d-marketing", "Monthly", 330, "2026-07-08", "2026-06-25", true, 10, 4, "2025-11-15"],
    ["s8", "Canva Teams", "v8", "Membership", "Design", "Active", null, "d-marketing", "Monthly", 150, "2026-06-11", "2026-06-06", true, 15, 9, ""],
    ["s9", "Slack Workspace", "v9", "Software", "Communication", "Active", "p3", "d-ops", "Monthly", 284, "2026-06-25", "2026-06-10", true, 36, 31, "2025-12-01"],
    ["s10", "Zoom Business", "v10", "Software", "Communication", "Active", "p11", "d-admin", "Monthly", 210, "2026-08-01", "2026-07-15", true, 20, 18, "2026-05-02"],
    ["s11", "RingCentral Phone System", "v11", "Phone System", "Communication", "Active", "p6", "d-it", "Monthly", 690, "2026-07-19", "2026-07-01", true, 42, 37, "2026-02-10"],
    ["s12", "Gusto Payroll", "v12", "Payroll", "Payroll", "Active", "p9", "d-hr", "Monthly", 260, "2026-10-01", "2026-09-15", true, 8, 5, "2025-08-01"],
    ["s13", "Operating Bank Portal", "v13", "Banking", "Banking", "Active", "p1", "d-fin", "Monthly", 0, "2026-12-31", "2026-12-15", false, 0, 0, "2026-04-20"],
    ["s14", "State Tax Filing Portal", "v14", "Government Portal", "Tax", "Active", "p5", "d-fin", "Annual", 0, "2026-07-01", "2026-06-20", false, 0, 0, "2025-07-01"],
    ["s15", "Backblaze Backup Vault", "v15", "Cloud Service", "Backup", "Active", "p6", "d-it", "Monthly", 88, "2026-06-16", "2026-06-09", true, 0, 0, "2025-09-15"],
    ["s16", "AWS Production Account", "v16", "Cloud Service", "Hosting", "Active", "p6", "d-it", "Monthly", 920, "2026-11-05", "2026-10-20", true, 0, 0, "2026-01-20"],
    ["s17", "Dropbox Business", "v17", "Subscription", "Storage", "Active", "p11", "d-admin", "Monthly", 288, "2026-06-09", "2026-06-05", true, 24, 17, "2025-10-01"],
    ["s18", "LinkedIn Company Page", "v18", "Social Media", "Social", "Active", "p8", "d-marketing", "Monthly", 0, "2026-09-20", "2026-09-01", false, 0, 0, "2026-02-14"],
    ["s19", "Facebook Business Manager", "v19", "Social Media", "Social", "Active", "p8", "d-marketing", "Monthly", 0, "2026-07-03", "2026-06-20", false, 0, 0, "2025-11-11"],
    ["s20", "Local Chamber Membership", "v20", "Membership", "Association", "Active", "p2", "d-exec", "Annual", 650, "2026-06-29", "2026-06-22", true, 1, 1, "2026-05-01"],
    ["s21", "Cyber Insurance Portal", "v21", "Insurance Portal", "Insurance", "Active", "p5", "d-fin", "Annual", 4200, "2026-07-15", "2026-06-30", true, 0, 0, "2026-01-15"],
    ["s22", "Client Portal", "v22", "Client Portal", "Customer", "Active", "p7", "d-sales", "Monthly", 410, "2026-08-20", "2026-08-05", true, 40, 33, "2026-04-08"]
  ];

  for (let i = 23; i <= 46; i += 1) {
    const vendor = data.vendors[(i - 1) % data.vendors.length];
    const departments = ["d-it", "d-ops", "d-fin", "d-sales", "d-marketing", "d-hr", "d-admin", "d-field"];
    const owners = ["p6", "p4", "p5", "p7", "p8", "p9", "p11", "p10", null, "p13"];
    const types = ["Software", "Subscription", "License", "Vendor Portal", "Website", "Hosting", "Client Portal", "Cloud Service"];
    const month = ((i % 7) + 6);
    const day = ((i * 3) % 24) + 1;
    systemCatalog.push([
      `s${i}`,
      `${vendor.name} ${types[i % types.length]}`,
      vendor.id,
      types[i % types.length],
      vendor.category,
      i % 11 === 0 ? "Pending" : "Active",
      owners[i % owners.length],
      departments[i % departments.length],
      i % 3 === 0 ? "Annual" : "Monthly",
      i % 3 === 0 ? 600 + i * 22 : 35 + i * 9,
      `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      `2026-${String(month).padStart(2, "0")}-${String(Math.max(1, day - 7)).padStart(2, "0")}`,
      i % 4 !== 0,
      i % 5 === 0 ? 0 : 4 + (i % 18),
      i % 5 === 0 ? 0 : 2 + (i % 12),
      i % 6 === 0 ? "" : `2026-${String((i % 5) + 1).padStart(2, "0")}-10`
    ]);
  }

  data.systemAssets = systemCatalog.map((row) => {
    const [id, name, vendorId, type, category, status, ownerPersonId, departmentId, billingFrequency, costAmount, renewalDate, cancellationDeadline, autoRenew, seatsPurchased, seatsAssigned, lastReviewedAt] = row;
    const monthlyEquivalentCost = monthlyEquivalent(billingFrequency, costAmount);
    return {
      id,
      companyId: "c1",
      vendorId,
      name,
      type,
      category,
      description: `${name} business tracking record.`,
      status,
      ownerPersonId,
      departmentId,
      billingFrequency,
      costAmount,
      monthlyEquivalentCost,
      annualEquivalentCost: monthlyEquivalentCost * 12,
      renewalDate,
      cancellationDeadline,
      autoRenew,
      seatsPurchased,
      seatsAssigned,
      url: byId(data.vendors, vendorId)?.website ?? "",
      lastReviewedAt,
      notes: "",
      createdAt: "2026-06-01",
      updatedAt: "2026-06-01"
    };
  });

  data.systemAssignments = [];
  data.systemAssets.forEach((system, index) => {
    if (system.ownerPersonId) addAssignment(data, system.id, system.ownerPersonId, "Owner", "Owner", "Active", "2026-01-01", "");
    const staffPool = data.people.filter((personRecord) => personRecord.status === "Active" && personRecord.employmentType !== "Vendor Contact");
    const count = Math.min(5, 2 + (index % 4));
    for (let i = 0; i < count; i += 1) {
      const personRecord = staffPool[(index * 3 + i) % staffPool.length];
      const accessLevel = i === 0 && index % 5 === 0 ? "Admin" : i === 1 && index % 7 === 0 ? "Billing Admin" : "User";
      const assignmentType = accessLevel === "Admin" ? "Admin Contact" : accessLevel === "Billing Admin" ? "Billing Contact" : system.seatsPurchased ? "Licensed User" : "User";
      addAssignment(data, system.id, personRecord.id, assignmentType, accessLevel, "Active", "2026-01-01", "");
    }
  });

  addAssignment(data, "s3", "p13", "Billing Contact", "Billing Admin", "Active", "2022-01-01", "");
  addAssignment(data, "s15", "p14", "Technical Contact", "Admin", "Active", "2025-05-01", "");
  addAssignment(data, "s6", "p12", "Technical Contact", "Admin", "Active", "2025-01-15", "");
  addAssignment(data, "s8", "p123", "Licensed User", "User", "Active", "2025-04-01", "");
  addAssignment(data, "s17", "p124", "User", "User", "Active", "2024-11-01", "");

  return normalizeState(data);
}

function dept(id, name, parentDepartmentId, managerPersonId) {
  return { id, companyId: "c1", name, parentDepartmentId, managerPersonId, notes: "", createdAt: "2026-06-01", updatedAt: "2026-06-01" };
}

function role(id, name, description) {
  return { id, companyId: "c1", name, description, createdAt: "2026-06-01", updatedAt: "2026-06-01" };
}

function person(id, firstName, lastName, title, employmentType, status, departmentId, managerPersonId, startDate, endDate) {
  return {
    id,
    companyId: "c1",
    firstName,
    lastName,
    displayName: `${firstName} ${lastName}`,
    email: `${firstName}.${lastName}@example.local`.toLowerCase(),
    phone: "",
    title,
    employmentType,
    status,
    departmentId,
    managerPersonId,
    startDate,
    endDate,
    notes: "",
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01"
  };
}

function vendor(id, name, website, category, renewalDate) {
  return {
    id,
    companyId: "c1",
    name,
    website,
    contactName: "Account Team",
    contactEmail: `support@${website.replace(/^https?:\/\//, "").split("/")[0]}`,
    contactPhone: "",
    category,
    renewalDate,
    notes: "",
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01"
  };
}

function addAssignment(data, systemAssetId, personId, assignmentType, accessLevel, status, startDate, endDate) {
  data.systemAssignments.push({
    id: `sa-${data.systemAssignments.length + 1}`,
    companyId: "c1",
    systemAssetId,
    personId,
    assignmentType,
    accessLevel,
    startDate,
    endDate,
    status,
    notes: "",
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01"
  });
}

function monthlyEquivalent(frequency, cost) {
  if (frequency === "Free" || frequency === "One-Time") return 0;
  if (frequency === "Annual") return Math.round((Number(cost) / 12) * 100) / 100;
  if (frequency === "Quarterly") return Math.round((Number(cost) / 3) * 100) / 100;
  return Number(cost) || 0;
}

function assignedSeatCount(systemId, data = state) {
  if (!systemId || !data?.systemAssignments) return 0;
  return data.systemAssignments.filter((assignment) => assignment.systemAssetId === systemId && assignment.status === "Active").length;
}

function recalculateSystemCosts(system, data = state) {
  system.costAmount = Number(system.costAmount) || 0;
  system.monthlyEquivalentCost = monthlyEquivalent(system.billingFrequency, system.costAmount);
  system.annualEquivalentCost = Math.round(system.monthlyEquivalentCost * 12 * 100) / 100;
  system.seatsPurchased = Number(system.seatsPurchased) || 0;
  system.seatsAssigned = assignedSeatCount(system.id, data);
  system.autoRenew = Boolean(system.autoRenew);
  return system;
}

function byId(collection, id) {
  return collection.find((item) => item.id === id);
}

function uid(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function departmentName(id) {
  return byId(state.departments, id)?.name ?? "Unassigned";
}

function roleName(id) {
  return byId(state.roles, id)?.name ?? "Unassigned";
}

function vendorName(id) {
  return byId(state.vendors, id)?.name ?? "Unassigned";
}

function personName(id) {
  return byId(state.people, id)?.displayName ?? "Unassigned";
}

function systemName(id) {
  return byId(state.systemAssets, id)?.name ?? "Unassigned";
}

function ownerName(system) {
  return system?.ownerPersonId ? personName(system.ownerPersonId) : "No owner";
}

function nextAssignmentIdForData(data) {
  const numbers = data.systemAssignments
    .map((item) => String(item.id || "").match(/^sa(\d+)$/)?.[1])
    .filter(Boolean)
    .map(Number);
  return `sa${numbers.length ? Math.max(...numbers) + 1 : 1}`;
}

function syncOwnerAssignmentForData(data, systemId, ownerPersonId) {
  const today = todayStamp();
  const activeAssignments = data.systemAssignments.filter((assignment) => assignment.systemAssetId === systemId && assignment.status === "Active");
  activeAssignments
    .filter((assignment) => assignment.assignmentType === "Owner" || assignment.accessLevel === "Owner")
    .forEach((assignment) => {
      if (!ownerPersonId || assignment.personId !== ownerPersonId) {
        assignment.status = "Removed";
        assignment.endDate = assignment.endDate || today;
        assignment.updatedAt = today;
      }
    });
  if (!ownerPersonId || !byId(data.people, ownerPersonId)) return;
  const ownerAssignment = data.systemAssignments.find((assignment) => (
    assignment.systemAssetId === systemId
    && assignment.personId === ownerPersonId
    && assignment.status === "Active"
  ));
  if (ownerAssignment) {
    ownerAssignment.assignmentType = "Owner";
    ownerAssignment.accessLevel = "Owner";
    ownerAssignment.endDate = "";
    ownerAssignment.updatedAt = today;
    return;
  }
  data.systemAssignments.push({
    id: nextAssignmentIdForData(data),
    companyId: "c1",
    systemAssetId: systemId,
    personId: ownerPersonId,
    assignmentType: "Owner",
    accessLevel: "Owner",
    startDate: today,
    endDate: "",
    status: "Active",
    notes: "Created from system owner field.",
    createdAt: today,
    updatedAt: today
  });
}

function normalizeAssignmentIntegrity(data) {
  const today = todayStamp();
  const usedIds = new Set();
  const nextSafeAssignmentId = () => {
    let id = nextAssignmentIdForData(data);
    while (usedIds.has(id)) {
      const number = Number(id.match(/^sa(\d+)$/)?.[1] || 0) + 1;
      id = `sa${number}`;
    }
    usedIds.add(id);
    return id;
  };
  data.systemAssignments = data.systemAssignments
    .filter((assignment) => assignment && byId(data.systemAssets, assignment.systemAssetId) && byId(data.people, assignment.personId))
    .map((assignment) => {
      const safeId = safeImportedId(assignment.id);
      const id = safeId && !usedIds.has(safeId) ? safeId : nextSafeAssignmentId();
      usedIds.add(id);
      return {
        id,
        companyId: assignment.companyId || "c1",
        systemAssetId: assignment.systemAssetId,
        personId: assignment.personId,
        assignmentType: assignment.assignmentType || "User",
        accessLevel: assignment.accessLevel || data.settings?.defaultAssignmentAccess || "User",
        startDate: assignment.startDate || today,
        endDate: assignment.endDate || "",
        status: assignment.status || "Active",
        notes: assignment.notes || "",
        createdAt: assignment.createdAt || today,
        updatedAt: assignment.updatedAt || today
      };
    });
  const activeByPair = new Map();
  data.systemAssignments.forEach((assignment) => {
    if (assignment.status !== "Active") return;
    const key = `${assignment.systemAssetId}::${assignment.personId}`;
    if (activeByPair.has(key)) {
      assignment.status = "Removed";
      assignment.endDate = assignment.endDate || today;
      assignment.updatedAt = today;
      return;
    }
    activeByPair.set(key, assignment);
  });
  data.systemAssets.forEach((system) => syncOwnerAssignmentForData(data, system.id, system.ownerPersonId));
}

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value) || 0);
}

function daysUntil(dateValue) {
  if (!dateValue) return 9999;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${dateValue}T00:00:00`);
  return Math.ceil((target - today) / 86400000);
}

function isOlderThan(dateValue, days) {
  return !dateValue || daysUntil(dateValue) < -days;
}

function visiblePeople() {
  return state.people.filter((personRecord) => {
    if (!el.showInactive.checked && personRecord.status !== "Active" && personRecord.status !== "Pending") return false;
    if (!el.showContractors.checked && contractorTypes.has(personRecord.employmentType)) return false;
    return true;
  });
}

function isAllStaffEmployment(employmentType) {
  return !contractorTypes.has(employmentType);
}

function isDirectoryVisiblePerson(personRecord) {
  return el.showInactive.checked || personRecord.status === "Active" || personRecord.status === "Pending";
}

function personRoles(personId) {
  return state.personRoles.filter((item) => item.personId === personId).map((item) => roleName(item.roleId));
}

function matchesSearch(row, rawQuery = el.globalSearch.value) {
  const query = String(rawQuery ?? "").trim().toLowerCase();
  if (!query) return true;
  return Object.values(row).some((value) => String(value ?? "").toLowerCase().includes(query));
}

function statusPill(value) {
  const cls = ["Active", "Owner", "Admin", "Billing Admin", true].includes(value) ? "good" : inactiveStatuses.has(value) || value === false ? "danger" : "info";
  const label = typeof value === "boolean" ? (value ? "Yes" : "No") : value;
  return `<span class="status-pill ${cls}">${escapeHtml(label)}</span>`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (match) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[match]));
}

function renderTable(target, columns, rows, options = {}) {
  const tableId = options.tableId || target.id || "table";
  const tableOptions = { ...options, columns };
  const prefs = getTablePrefs(tableId, tableOptions);
  const controlsEnabled = options.controls !== false;
  const filteredRows = rows
    .filter((row) => matchesSearch(row))
    .filter((row) => matchesSearch(row, prefs.search))
    .filter((row) => matchesTableFilters(row, prefs.filters, tableOptions.filters));
  const sortedRows = sortTableRows(filteredRows, prefs.sortKey, prefs.sortDir, prefs.sortStack);
  const visibleRows = prefs.limit === "all" ? sortedRows : sortedRows.slice(0, Number(prefs.limit || state.settings.defaultPageSize || 25));
  tableExportCache[tableId] = {
    columns,
    rows: sortedRows,
    filename: options.exportFilename || `orgassets-${tableId}.csv`
  };
  const toolbar = controlsEnabled ? tableToolbar(tableId, columns, rows, filteredRows, visibleRows, prefs, tableOptions) : "";

  if (!visibleRows.length) {
    target.innerHTML = `${toolbar}<div class="empty-state">No records match the current filters.</div>`;
    return;
  }

  target.innerHTML = `
    ${toolbar}
    <table>
      <thead><tr>${columns.map((column) => tableHeaderCell(column, tableId, prefs, controlsEnabled, tableOptions)).join("")}</tr></thead>
      <tbody>
        ${visibleRows.map((row) => `<tr>${columns.map((column) => `<td>${renderTableCell(row, column, tableOptions)}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>
  `;
}

function renderTableCell(row, column, options) {
  if (column.render) return column.render(row);
  if (options.cellRenderer) return options.cellRenderer(row, column);
  return escapeHtml(row[column.key]);
}

function tableHeaderCell(column, tableId, prefs, controlsEnabled, options = {}) {
  if (!controlsEnabled || !column.key) return `<th>${escapeHtml(column.label)}</th>`;
  const stackIndex = prefs.multiSort ? (prefs.sortStack ?? []).findIndex((item) => item.key === column.key) : -1;
  const active = prefs.multiSort ? stackIndex >= 0 : prefs.sortKey === column.key;
  const direction = prefs.multiSort ? prefs.sortStack?.[stackIndex]?.direction : prefs.sortDir;
  const indicator = active ? `${prefs.multiSort ? stackIndex + 1 : ""}${direction === "desc" ? "v" : "^"}` : "";
  const hint = options.multiSort ? "Click for primary sort. Shift-click to add as another sort level." : "Click to sort this column.";
  return `
    <th>
      <button type="button" class="th-sort ${active ? "active" : ""}" data-table-header-sort="${escapeHtml(column.key)}" data-table-id="${escapeHtml(tableId)}" title="${escapeHtml(hint)}">
        <span>${escapeHtml(column.label)}</span>
        <span class="sort-indicator">${escapeHtml(indicator)}</span>
      </button>
    </th>
  `;
}

function getTablePrefs(tableId, options) {
  const sortFields = tableSortFields(options.columns ?? [], options);
  tablePrefs[tableId] = tablePrefs[tableId] ?? {
    search: "",
    sortKey: options.defaultSort || sortFields[0]?.key || "",
    sortDir: options.defaultDirection || "asc",
    sortStack: [],
    limit: options.defaultLimit || state.settings.defaultPageSize || "25",
    filters: {}
  };
  const prefs = tablePrefs[tableId];
  if (!sortFields.some((field) => field.key === prefs.sortKey)) prefs.sortKey = options.defaultSort || sortFields[0]?.key || "";
  prefs.limit = prefs.limit || state.settings.defaultPageSize || "25";
  prefs.filters = prefs.filters ?? {};
  const validFilterKeys = new Set((options.filters ?? []).map((filter) => filter.key));
  Object.keys(prefs.filters).forEach((key) => {
    if (!validFilterKeys.has(key)) delete prefs.filters[key];
  });
  prefs.multiSort = Boolean(options.multiSort);
  prefs.maxSortLevels = options.multiSortLevels || 3;
  if (prefs.multiSort) {
    const defaultStack = options.defaultSorts?.length ? options.defaultSorts : [{ key: prefs.sortKey, direction: prefs.sortDir }];
    prefs.sortStack = normalizeSortStack(prefs.sortStack?.length ? prefs.sortStack : defaultStack, sortFields, prefs.maxSortLevels);
    prefs.sortKey = prefs.sortStack[0]?.key || prefs.sortKey;
    prefs.sortDir = prefs.sortStack[0]?.direction || prefs.sortDir;
  }
  return prefs;
}

function normalizeSortStack(sortStack, sortFields, maxLevels = 3) {
  const validKeys = new Set(sortFields.map((field) => field.key));
  const usedKeys = new Set();
  return (sortStack ?? [])
    .map((item) => ({
      key: item.key,
      direction: item.direction === "desc" || item.dir === "desc" ? "desc" : "asc"
    }))
    .filter((item) => {
      if (!item.key || !validKeys.has(item.key) || usedKeys.has(item.key)) return false;
      usedKeys.add(item.key);
      return true;
    })
    .slice(0, maxLevels);
}

function tableSortFields(columns, options) {
  const source = options.sortFields ?? columns
    .filter((column) => column.key)
    .map((column) => ({ key: column.key, label: column.label }));
  return source.filter((field) => field.key);
}

function tableToolbar(tableId, columns, allRows, filteredRows, visibleRows, prefs, options) {
  const sortFields = tableSortFields(columns, options);
  const filters = options.filters ?? [];
  const sortHint = options.multiSort ? "Use multi-column sort below, or click headers. Shift-click adds a header as another sort level." : "Sort by clicking a column title.";
  const filterControls = filters.map((filter) => {
    const current = prefs.filters[filter.key] ?? "";
    const values = filter.options ?? uniqueSorted(allRows.map((row) => row[filter.key]));
    return `
      <label>${escapeHtml(filter.label)}
        <select data-table-filter="${escapeHtml(filter.key)}" data-table-id="${escapeHtml(tableId)}">
          <option value="">${escapeHtml(filter.allLabel || `All ${filter.label.toLowerCase()}`)}</option>
          ${values.map((option) => {
            const value = typeof option === "object" ? option.value : option;
            const label = typeof option === "object" ? option.label : option;
            return `<option value="${escapeHtml(value)}" ${String(value) === String(current) ? "selected" : ""}>${escapeHtml(label || "Unassigned")}</option>`;
          }).join("")}
        </select>
      </label>
    `;
  }).join("");

  return `
    <div class="table-toolbar" data-table-toolbar="${escapeHtml(tableId)}">
      <div class="table-tools-primary">
        <label>Find in list
          <input type="search" value="${escapeHtml(prefs.search)}" data-table-search="${escapeHtml(tableId)}" placeholder="Filter this list..." />
        </label>
        ${filterControls}
      </div>
      <div class="table-tools-secondary">
        <button type="button" class="row-button" data-table-export="${escapeHtml(tableId)}">Export CSV</button>
        <label>Show
          <select data-table-limit="${escapeHtml(tableId)}">
            ${["3", "5", "10", "25", "50", "100", "all"].map((value) => `<option value="${value}" ${value === prefs.limit ? "selected" : ""}>${value === "all" ? "All" : value}</option>`).join("")}
          </select>
        </label>
      </div>
      ${options.multiSort ? multiSortToolbar(tableId, sortFields, prefs) : ""}
      <div class="table-count">${visibleRows.length} shown of ${filteredRows.length} filtered / ${allRows.length} total. ${escapeHtml(sortHint)}</div>
    </div>
  `;
}

function multiSortToolbar(tableId, sortFields, prefs) {
  const maxLevels = prefs.maxSortLevels || 3;
  const fieldOptions = (selectedKey) => `
    <option value="">No sort</option>
    ${sortFields.map((field) => `<option value="${escapeHtml(field.key)}" ${field.key === selectedKey ? "selected" : ""}>${escapeHtml(field.label)}</option>`).join("")}
  `;
  return `
    <div class="multi-sort-panel">
      <div class="multi-sort-title">
        <span>Multi-column sort</span>
        <button type="button" class="row-button" data-table-sort-reset="${escapeHtml(tableId)}">Reset</button>
      </div>
      <div class="multi-sort-grid">
        ${Array.from({ length: maxLevels }).map((_, index) => {
          const item = prefs.sortStack?.[index] ?? { key: "", direction: "asc" };
          return `
            <label>Level ${index + 1}
              <select data-table-multi-sort-key="${escapeHtml(tableId)}" data-sort-level="${index}">
                ${fieldOptions(item.key)}
              </select>
            </label>
            <label>Direction
              <select data-table-multi-sort-dir="${escapeHtml(tableId)}" data-sort-level="${index}" ${item.key ? "" : "disabled"}>
                <option value="asc" ${item.direction !== "desc" ? "selected" : ""}>A to Z / Low to High</option>
                <option value="desc" ${item.direction === "desc" ? "selected" : ""}>Z to A / High to Low</option>
              </select>
            </label>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function uniqueSorted(values) {
  return [...new Set(values.map((value) => String(value ?? "")).filter((value) => value !== ""))]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function uniqueTextOptions(values) {
  const unique = new Map();
  values.forEach((value) => {
    const normalized = String(value ?? "").trim();
    if (!normalized) return;
    const key = normalized.toLowerCase();
    if (!unique.has(key)) unique.set(key, normalized);
  });
  return [...unique.values()].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function matchesTableFilters(row, filters = {}, filterDefinitions = []) {
  return Object.entries(filters).every(([key, value]) => {
    if (!value) return true;
    const definition = filterDefinitions.find((filter) => filter.key === key);
    if (definition?.predicate) return definition.predicate(row, value);
    return String(row[key] ?? "") === String(value);
  });
}

function sortTableRows(rows, key, direction, sortStack = []) {
  const stack = sortStack?.length ? sortStack : (key ? [{ key, direction }] : []);
  if (!stack.length) return rows.slice();
  return rows.slice().sort((a, b) => {
    for (const item of stack) {
      const dir = item.direction === "desc" ? -1 : 1;
      const result = compareValues(a[item.key], b[item.key]) * dir;
      if (result !== 0) return result;
    }
    return 0;
  });
}

function updateHeaderMultiSort(prefs, key, addAsSecondary = false) {
  const maxLevels = prefs.maxSortLevels || 3;
  const stack = [...(prefs.sortStack ?? [])];
  const existingIndex = stack.findIndex((item) => item.key === key);
  if (existingIndex >= 0) {
    stack[existingIndex] = {
      ...stack[existingIndex],
      direction: stack[existingIndex].direction === "desc" ? "asc" : "desc"
    };
    if (!addAsSecondary && existingIndex > 0) {
      const [item] = stack.splice(existingIndex, 1);
      stack.unshift(item);
    }
  } else {
    const item = { key, direction: defaultSortDirectionForKey(key) };
    if (addAsSecondary) stack.push(item);
    else stack.unshift(item);
  }
  prefs.sortStack = stack.slice(0, maxLevels);
  prefs.sortKey = prefs.sortStack[0]?.key || "";
  prefs.sortDir = prefs.sortStack[0]?.direction || "asc";
}

function updateMultiSortKey(tableId, level, key) {
  const prefs = tablePrefs[tableId];
  if (!prefs) return;
  const stack = [...(prefs.sortStack ?? [])];
  if (!key) {
    stack.splice(level, 1);
  } else {
    const duplicateIndex = stack.findIndex((item, index) => index !== level && item.key === key);
    if (duplicateIndex >= 0) stack.splice(duplicateIndex, 1);
    stack[level] = { key, direction: stack[level]?.direction || defaultSortDirectionForKey(key) };
  }
  prefs.sortStack = stack.filter((item) => item?.key).slice(0, prefs.maxSortLevels || 3);
  prefs.sortKey = prefs.sortStack[0]?.key || "";
  prefs.sortDir = prefs.sortStack[0]?.direction || "asc";
}

function updateMultiSortDirection(tableId, level, direction) {
  const prefs = tablePrefs[tableId];
  const item = prefs?.sortStack?.[level];
  if (!item) return;
  item.direction = direction === "desc" ? "desc" : "asc";
  prefs.sortKey = prefs.sortStack[0]?.key || "";
  prefs.sortDir = prefs.sortStack[0]?.direction || "asc";
}

function resetTableSort(tableId) {
  if (!tablePrefs[tableId]) return;
  delete tablePrefs[tableId];
}

function compareValues(a, b) {
  const numberA = numericValue(a);
  const numberB = numericValue(b);
  if (!Number.isNaN(numberA) && !Number.isNaN(numberB)) return numberA - numberB;
  return String(a ?? "").localeCompare(String(b ?? ""), undefined, { numeric: true, sensitivity: "base" });
}

function numericValue(value) {
  if (typeof value === "number") return value;
  const cleaned = String(value ?? "").replace(/[$,%\s,]/g, "");
  if (!cleaned) return Number.NaN;
  return Number(cleaned);
}

function detailButton(type, id, label = "View") {
  return `<button type="button" class="row-button" data-detail-type="${escapeHtml(type)}" data-detail-id="${escapeHtml(id)}">${escapeHtml(label)}</button>`;
}

function editButton(type, id, label = "Edit") {
  if (!isAdminUser()) return "";
  return `<button type="button" class="row-button edit-button" data-record-action="edit" data-record-type="${escapeHtml(type)}" data-record-id="${escapeHtml(id)}">${escapeHtml(label)}</button>`;
}

function rowActions(type, id) {
  return `<span class="row-actions">${detailButton(type, id)}${editButton(type, id)}</span>`;
}

function getActionItems() {
  const actions = [];
  const windowDays = Number(el.renewalWindow.value || 30);

  state.systemAssets.filter((system) => system.status === "Active").forEach((system) => {
    const owner = byId(state.people, system.ownerPersonId);
    const renewalDays = daysUntil(system.renewalDate);

    if (!system.ownerPersonId) {
      actions.push(action("ASSIGN_OWNER", "System/asset has no owner", "", system, "Assign owner", "danger", system.renewalDate));
    }

    if (owner && inactiveStatuses.has(owner.status)) {
      actions.push(action("TRANSFER", "System owner is inactive or terminated", owner.id, system, "Transfer ownership", "danger", system.renewalDate));
    }

    if (renewalDays < 0) {
      actions.push(action("RENEW", "Renewal date has passed and record is still active", "", system, "Renew, cancel, or update renewal date", "danger", system.renewalDate));
    } else if (renewalDays <= windowDays) {
      actions.push(action("RENEW", `Renewal is due in ${renewalDays} days`, "", system, "Review renewal or cancellation", renewalDays <= 7 ? "danger" : "info", system.renewalDate));
    }

    if (Number(system.seatsPurchased) > Number(system.seatsAssigned)) {
      actions.push(action("REDUCE_SEATS", `${system.seatsPurchased - system.seatsAssigned} unused seats`, "", system, "Reduce seats, cancel unused licenses, or reassign seats", "info", system.renewalDate));
    }

    if (isOlderThan(system.lastReviewedAt, 180)) {
      actions.push(action("REVIEW", "System has not been reviewed in 180 days", "", system, "Review assignments, owner, billing, and active users", "info", system.lastReviewedAt || system.renewalDate));
    }
  });

  state.systemAssignments.filter((assignment) => assignment.status === "Active").forEach((assignment) => {
    const personRecord = byId(state.people, assignment.personId);
    const system = byId(state.systemAssets, assignment.systemAssetId);
    if (!personRecord || !system || system.status !== "Active") return;

    if (inactiveStatuses.has(personRecord.status)) {
      actions.push(action("REMOVE_ACCESS", "Inactive or terminated person has an active assignment", personRecord.id, system, assignment.assignmentType === "Owner" ? "Reassign owner and remove access" : "Remove access", "danger", personRecord.endDate || system.renewalDate));
    }

    if (contractorTypes.has(personRecord.employmentType) && personRecord.endDate && daysUntil(personRecord.endDate) < 0) {
      actions.push(action("REMOVE_ACCESS", "Contractor or subcontractor end date has passed", personRecord.id, system, "Remove contractor access or transfer technical contact", "danger", personRecord.endDate));
    }
  });

  return actions;
}

function action(actionType, reason, personId, system, nextStep, severity, dueDate) {
  return {
    id: `${actionType}-${system.id}-${personId || "system"}-${reason.slice(0, 8)}`,
    actionType,
    reason,
    personId,
    systemAssetId: system.id,
    vendorId: system.vendorId,
    ownerPersonId: system.ownerPersonId,
    departmentId: system.departmentId,
    dueDate,
    nextStep,
    severity
  };
}

function actionRows() {
  return getActionItems().map((item) => ({
    Action: item.actionType,
    Reason: item.reason,
    Person: item.personId ? personName(item.personId) : "",
    "System/Asset": systemName(item.systemAssetId),
    Vendor: vendorName(item.vendorId),
    Owner: ownerName(byId(state.systemAssets, item.systemAssetId)),
    Department: departmentName(item.departmentId),
    Severity: item.severity,
    "Due Date": item.dueDate || "",
    "Recommended Next Step": item.nextStep,
    _id: item.id,
    _systemId: item.systemAssetId,
    _personId: item.personId,
    _severity: item.severity
  }));
}

function renderMetrics() {
  const activePeople = state.people.filter((personRecord) => personRecord.status === "Active" && !contractorTypes.has(personRecord.employmentType) && personRecord.employmentType !== "Vendor Contact").length;
  const activeContractors = state.people.filter((personRecord) => personRecord.status === "Active" && contractorTypes.has(personRecord.employmentType)).length;
  const activeSystems = state.systemAssets.filter((system) => system.status === "Active");
  const monthlyCost = activeSystems.reduce((sum, system) => sum + Number(system.monthlyEquivalentCost || 0), 0);
  const renewals30 = activeSystems.filter((system) => daysUntil(system.renewalDate) <= 30).length;
  const renewals60 = activeSystems.filter((system) => daysUntil(system.renewalDate) <= 60).length;
  const renewals90 = activeSystems.filter((system) => daysUntil(system.renewalDate) <= 90).length;
  const renewals7 = activeSystems.filter((system) => daysUntil(system.renewalDate) <= 7).length;
  const actionCount = getActionItems().length;

  const metrics = [
    ["icon-people", "Active people", activePeople, `${activeContractors} active contractors`, "people"],
    ["icon-systems", "Active systems / assets", activeSystems.length, `${state.vendors.length} vendors tracked`, "systems"],
    ["icon-reports", "Monthly active-system cost", money(monthlyCost), `${money(monthlyCost * 12)} annualized`, "report-subscriptionCost", "cost"],
    ["icon-actions", "Renewal review", renewals30, `${renewals7} in 7d / ${renewals60} in 60d / ${renewals90} in 90d`, "report-vendorRenewal"],
    ["icon-actions", "Cleanup queue", actionCount, "Generated action items", "actions"],
    ["icon-roles", "Admin access", state.systemAssignments.filter((item) => adminLevels.has(item.accessLevel) && item.status === "Active").length, "Admin-level assignments", "report-adminAccessByRole"]
  ].filter((item) => state.settings.showCostKpis || item[5] !== "cost");

  el.metricGrid.innerHTML = metrics
    .map(([iconId, label, value, detail, target]) => `
      <button type="button" class="metric metric-button" data-dashboard-target="${target}">
        <span class="metric-icon" aria-hidden="true"><svg><use href="#${escapeHtml(iconId)}"></use></svg></span>
        <span class="metric-copy"><p>${escapeHtml(label)}</p><strong>${escapeHtml(value)}</strong><span>${escapeHtml(detail)}</span></span>
        <span class="metric-arrow" aria-hidden="true">Open</span>
      </button>
    `)
    .join("");
}

function renewalRows(limit = 20) {
  return state.systemAssets
    .filter((system) => system.status === "Active")
    .map((system) => ({
      id: system.id,
      "System/Asset": system.name,
      Vendor: vendorName(system.vendorId),
      Owner: ownerName(system),
      Department: departmentName(system.departmentId),
      "Renewal Date": system.renewalDate,
      "Days Out": daysUntil(system.renewalDate),
      "Monthly Cost": money(system.monthlyEquivalentCost),
      _vendorId: system.vendorId,
      _ownerPersonId: system.ownerPersonId,
      _departmentId: system.departmentId
    }))
    .sort((a, b) => a["Days Out"] - b["Days Out"])
    .slice(0, limit);
}

function formerStaffAccessRows() {
  return state.systemAssignments
    .filter((assignment) => assignment.status === "Active")
    .map((assignment) => ({ assignment, personRecord: byId(state.people, assignment.personId), system: byId(state.systemAssets, assignment.systemAssetId) }))
    .filter(({ personRecord, system }) => personRecord && system && inactiveStatuses.has(personRecord.status) && system.status === "Active")
    .map(({ assignment, personRecord, system }) => ({
      id: assignment.id,
      Person: personRecord.displayName,
      "Person Status": personRecord.status,
      "End Date": personRecord.endDate,
      "System/Asset": system.name,
      "Assignment Type": assignment.assignmentType,
      "Access Level": assignment.accessLevel,
      Owner: ownerName(system),
      Department: departmentName(system.departmentId),
      "Recommended Action": assignment.assignmentType === "Owner" ? "Reassign owner and remove access" : "Remove access",
      _personId: personRecord.id,
      _systemId: system.id,
      _ownerPersonId: system.ownerPersonId,
      _departmentId: system.departmentId
    }));
}

function formerStaffAccessSummaryRows() {
  const grouped = new Map();
  formerStaffAccessRows().forEach((row) => {
    const personRecord = state.people.find((item) => item.displayName === row.Person);
    const key = personRecord?.id || row.Person;
    if (!grouped.has(key)) {
      grouped.set(key, {
        id: key,
        Person: row.Person,
        "Person Status": row["Person Status"],
        "End Date": row["End Date"],
        "System/Asset": "# Assets: 0",
        "Admin-Level": 0,
        "Recommended Action": "Remove access / review assignments",
        _assetCount: 0,
        _personId: key
      });
    }
    const item = grouped.get(key);
    item._assetCount += 1;
    item["System/Asset"] = `# Assets: ${item._assetCount}`;
    if (adminLevels.has(row["Access Level"])) item["Admin-Level"] += 1;
    if (row["Recommended Action"].includes("Reassign")) item["Recommended Action"] = "Reassign owner and remove access";
  });
  return [...grouped.values()].sort((a, b) => b._assetCount - a._assetCount || a.Person.localeCompare(b.Person));
}

function contractorAccessRows() {
  return state.systemAssignments
    .filter((assignment) => assignment.status === "Active")
    .map((assignment) => ({ assignment, personRecord: byId(state.people, assignment.personId), system: byId(state.systemAssets, assignment.systemAssetId) }))
    .filter(({ personRecord, system }) => personRecord && system && contractorTypes.has(personRecord.employmentType) && personRecord.endDate && daysUntil(personRecord.endDate) < 0 && system.status === "Active")
    .map(({ assignment, personRecord, system }) => ({
      id: assignment.id,
      Contractor: personRecord.displayName,
      "Contractor End Date": personRecord.endDate,
      "System/Asset": system.name,
      Vendor: vendorName(system.vendorId),
      "Assignment Type": assignment.assignmentType,
      "Access Level": assignment.accessLevel,
      Owner: ownerName(system),
      Department: departmentName(system.departmentId),
      "Recommended Action": "Remove contractor access or transfer contact",
      _personId: personRecord.id,
      _systemId: system.id,
      _ownerPersonId: system.ownerPersonId,
      _departmentId: system.departmentId
    }));
}

function contractorAccessSummaryRows() {
  const grouped = new Map();
  contractorAccessRows().forEach((row) => {
    const personRecord = state.people.find((item) => item.displayName === row.Contractor);
    const key = personRecord?.id || row.Contractor;
    if (!grouped.has(key)) {
      grouped.set(key, {
        id: key,
        Contractor: row.Contractor,
        "Contractor End Date": row["Contractor End Date"],
        "System/Asset": "# Assets: 0",
        "Admin-Level": 0,
        "Recommended Action": "Remove contractor access / review assignments",
        _assetCount: 0,
        _personId: key
      });
    }
    const item = grouped.get(key);
    item._assetCount += 1;
    item["System/Asset"] = `# Assets: ${item._assetCount}`;
    if (adminLevels.has(row["Access Level"])) item["Admin-Level"] += 1;
  });
  return [...grouped.values()].sort((a, b) => b._assetCount - a._assetCount || a.Contractor.localeCompare(b.Contractor));
}

function noOwnerRows() {
  return state.systemAssets
    .filter((system) => system.status === "Active" && !system.ownerPersonId)
    .map((system) => ({
      id: system.id,
      "System/Asset": system.name,
      Type: system.type,
      Vendor: vendorName(system.vendorId),
      Department: departmentName(system.departmentId),
      "Renewal Date": system.renewalDate,
      "Monthly Cost": money(system.monthlyEquivalentCost),
      "Annual Cost": money(system.annualEquivalentCost),
      "Recommended Action": "Assign owner",
      _systemId: system.id,
      _vendorId: system.vendorId,
      _departmentId: system.departmentId
    }));
}

function renderDashboardTables() {
  renderTable(el.upcomingRenewals, [
    { label: "System/Asset", render: (row) => recordLink("system", row.id, row["System/Asset"]) },
    { label: "Vendor", render: (row) => recordLink("vendor", row._vendorId, row.Vendor, "vendors") },
    { label: "Owner", render: (row) => recordLink("person", row._ownerPersonId, row.Owner, "report-noOwner") },
    { label: "Renewal Date", render: (row) => commandLink(row["Renewal Date"], "report-vendorRenewal") },
    { label: "Days Out", render: (row) => commandLink(row["Days Out"], "report-vendorRenewal") },
    { label: "", render: (row) => detailButton("system", row.id) }
  ], renewalRows(12), { controls: false });

  renderTable(el.formerStaffTable, [
    { label: "Person", render: (row) => recordLink("person", row._personId, row.Person) },
    { label: "Person Status", render: (row) => commandLink(row["Person Status"], "report-formerStaffAccess") },
    { label: "End Date", render: (row) => commandLink(row["End Date"], "report-formerStaffAccess") },
    { label: "System/Asset", render: (row) => recordLink("person", row._personId, row["System/Asset"]) },
    { label: "Admin-Level", render: (row) => commandLink(row["Admin-Level"], "report-formerStaffAccess") },
    { label: "Recommended Action", render: (row) => commandLink(row["Recommended Action"], "actions") },
    { label: "", render: (row) => detailButton("person", row.id) }
  ], formerStaffAccessSummaryRows(), { controls: false });

  renderTable(el.contractorAccessTable, [
    { label: "Contractor", render: (row) => recordLink("person", row._personId, row.Contractor) },
    { label: "Contractor End Date", render: (row) => commandLink(row["Contractor End Date"], "report-contractorAccess") },
    { label: "System/Asset", render: (row) => recordLink("person", row._personId, row["System/Asset"]) },
    { label: "Admin-Level", render: (row) => commandLink(row["Admin-Level"], "report-contractorAccess") },
    { label: "Recommended Action", render: (row) => commandLink(row["Recommended Action"], "actions") },
    { label: "", render: (row) => detailButton("person", row.id) }
  ], contractorAccessSummaryRows(), { controls: false });

  renderTable(el.noOwnerTable, [
    { label: "System/Asset", render: (row) => recordLink("system", row.id, row["System/Asset"]) },
    { label: "Type", render: (row) => commandLink(row.Type, "report-noOwner") },
    { label: "Vendor", render: (row) => recordLink("vendor", row._vendorId, row.Vendor, "vendors") },
    { label: "Department", render: (row) => recordLink("department", row._departmentId, row.Department, "departments") },
    { label: "Recommended Action", render: (row) => commandLink(row["Recommended Action"], "actions") },
    { label: "", render: (row) => detailButton("system", row.id) }
  ], noOwnerRows(), { controls: false });

  renderTable(el.highCostTable, [
    { label: "System/Asset", render: (row) => recordLink("system", row.id, row["System/Asset"]) },
    { label: "Vendor", render: (row) => recordLink("vendor", row._vendorId, row.Vendor, "vendors") },
    { label: "Department", render: (row) => recordLink("department", row._departmentId, row.Department, "departments") },
    { label: "Owner", render: (row) => recordLink("person", row._ownerPersonId, row.Owner, "report-noOwner") },
    { label: "Monthly Cost", render: (row) => commandLink(row["Monthly Cost"], "report-subscriptionCost") },
    { label: "", render: (row) => detailButton("system", row.id) }
  ], state.systemAssets.filter((system) => system.status === "Active").sort((a, b) => b.monthlyEquivalentCost - a.monthlyEquivalentCost).slice(0, 12).map((system) => ({
    id: system.id,
    "System/Asset": system.name,
    Vendor: vendorName(system.vendorId),
    Department: departmentName(system.departmentId),
    Owner: ownerName(system),
    "Monthly Cost": money(system.monthlyEquivalentCost),
    _vendorId: system.vendorId,
    _ownerPersonId: system.ownerPersonId,
    _departmentId: system.departmentId
  })), { controls: false });

  renderOrgSnapshot();
  renderReportDeck();

  const actions = getActionItems().slice(0, 6);
  el.actionPreview.innerHTML = actions.length
    ? actions.map((item) => `<article class="action-item ${item.severity}"><strong>${commandLink(item.actionType, "actions")}: ${recordLink("system", item.systemAssetId, systemName(item.systemAssetId))}</strong><p>${commandLink(item.reason, "actions")}. ${commandLink(item.nextStep, "actions")}.</p></article>`).join("")
    : `<div class="empty-state">No action items generated.</div>`;
}

function renderOrgSnapshot() {
  const activeEmployees = state.people.filter((personRecord) => personRecord.status === "Active" && personRecord.employmentType !== "Vendor Contact" && !contractorTypes.has(personRecord.employmentType)).length;
  const activeContractors = state.people.filter((personRecord) => personRecord.status === "Active" && contractorTypes.has(personRecord.employmentType)).length;
  const departmentCount = state.departments.length;
  const managerCount = new Set(state.people.map((personRecord) => personRecord.managerPersonId).filter(Boolean)).size;
  const items = [
    ["Employees", activeEmployees],
    ["Contractors", activeContractors],
    ["Departments", departmentCount],
    ["Managers", managerCount]
  ];
  el.orgSnapshot.innerHTML = items.map(([label, value]) => `<button type="button" class="snapshot-item" data-dashboard-target="${label === "Departments" ? "departments" : "people"}"><strong>${value}</strong><span>${label}</span></button>`).join("");
}

function renderReportDeck() {
  const cards = [
    ["cleanupAction", "Cleanup Actions", "What needs review, renewal, cancellation, transfer, deactivation, owner assignment, access removal, or seat reduction?"],
    ["vendorRenewal", "Renewals", "Which vendors and systems renew soon?"],
    ["formerStaffAccess", "Former Staff Access", "Which inactive or terminated people still have active assignments?"],
    ["contractorAccess", "Contractor Cleanup", "Which contractors still have active access after their end date?"],
    ["noOwner", "No Owner", "Which active systems/assets need an owner assigned?"],
    ["subscriptionCost", "Spend", "What subscriptions and systems are we paying for?"],
    ["orgChartRoster", "Org Chart Roster", "Who appears in the reporting structure by level, department, and manager?"],
    ["adminAccessByRole", "Admin Access", "Which roles have admin-level assignments?"]
  ];
  const originalReport = el.reportType.value;
  const originalDepartment = el.reportDepartment.value;
  el.reportDepartment.value = "";
  el.reportDeck.innerHTML = cards.map(([reportId, title, question]) => {
    el.reportType.value = reportId;
    const count = reportRows().length;
    return `<button type="button" class="report-card" data-dashboard-target="report-${reportId}"><strong>${escapeHtml(title)}</strong><span>${count} row${count === 1 ? "" : "s"}</span><span>${escapeHtml(question)}</span></button>`;
  }).join("");
  el.reportType.value = originalReport;
  el.reportDepartment.value = originalDepartment;
}

function col(key) {
  return { label: key, key };
}

function commandLink(label, target = "actions") {
  return `<button type="button" class="text-link" data-dashboard-target="${escapeHtml(target)}">${escapeHtml(label)}</button>`;
}

function recordLink(type, id, label, fallbackTarget = "actions") {
  if (!id) return commandLink(label || "Unassigned", fallbackTarget);
  return `<button type="button" class="text-link" data-record-link-type="${escapeHtml(type)}" data-record-link-id="${escapeHtml(id)}">${escapeHtml(label || "Open")}</button>`;
}

function recordLinkList(type, ids, labels, fallbackTarget = "actions") {
  const idList = Array.isArray(ids) ? ids : [];
  const labelList = Array.isArray(labels) ? labels : String(labels ?? "").split(",").map((item) => item.trim()).filter(Boolean);
  if (!labelList.length) return commandLink("Unassigned", fallbackTarget);
  return labelList.map((label, index) => recordLink(type, idList[index], label, fallbackTarget)).join(`<span class="link-separator">, </span>`);
}

function openRecordLink(type, id) {
  if (!type || !id) return;
  const view = recordViewMap[type] || currentView;
  setView(view);
  renderDetail(type, id);
}

function renderPeople() {
  const rows = state.people.filter((personRecord) => {
    if (!isDirectoryVisiblePerson(personRecord)) return false;
    return true;
  }).map((personRecord) => ({
    id: personRecord.id,
    Person: personRecord.displayName,
    Title: personRecord.title,
    Department: departmentName(personRecord.departmentId),
    Manager: personName(personRecord.managerPersonId),
    "Employment Type": personRecord.employmentType,
    Status: personRecord.status,
    Roles: personRoles(personRecord.id).join(", "),
    "Systems Touched": state.systemAssignments.filter((item) => item.personId === personRecord.id && item.status === "Active").length
  }));
  renderTable(el.peopleTable, [
    col("Person"), col("Title"), col("Department"), col("Manager"), col("Employment Type"),
    { label: "Status", render: (row) => statusPill(row.Status) },
    col("Roles"), col("Systems Touched"), { label: "", render: (row) => rowActions("person", row.id) }
  ], rows, {
    tableId: "people",
    defaultSort: "Person",
    filters: [
      { key: "Department", label: "Department" },
      {
        key: "Employment Type",
        label: "Employment Type",
        allLabel: "All",
        options: [
          { value: "__staff", label: "All Staff" },
          ...uniqueSorted(state.people.map((personRecord) => personRecord.employmentType)).map((value) => ({ value, label: value }))
        ],
        predicate: (row, value) => value === "__staff" ? isAllStaffEmployment(row["Employment Type"]) : String(row["Employment Type"] ?? "") === String(value)
      },
      { key: "Status", label: "Status" }
    ]
  });
}

function renderDepartments() {
  const rows = state.departments.map((department) => {
    const systems = state.systemAssets.filter((system) => system.departmentId === department.id && system.status === "Active");
    return {
      id: department.id,
      Department: department.name,
      Parent: departmentName(department.parentDepartmentId),
      Manager: personName(department.managerPersonId),
      "Active People": state.people.filter((personRecord) => personRecord.departmentId === department.id && personRecord.status === "Active" && !contractorTypes.has(personRecord.employmentType)).length,
      "Active Contractors": state.people.filter((personRecord) => personRecord.departmentId === department.id && personRecord.status === "Active" && contractorTypes.has(personRecord.employmentType)).length,
      "System/Asset Count": systems.length,
      "Monthly Cost": money(systems.reduce((sum, system) => sum + system.monthlyEquivalentCost, 0))
    };
  });
  renderTable(el.departmentTable, [col("Department"), col("Parent"), col("Manager"), col("Active People"), col("Active Contractors"), col("System/Asset Count"), col("Monthly Cost"), { label: "", render: (row) => rowActions("department", row.id) }], rows, {
    tableId: "departments",
    defaultSort: "Department",
    filters: [{ key: "Parent", label: "Parent" }]
  });
}

function renderRoles() {
  const rows = state.roles.map((roleRecord) => {
    const peopleWithRole = state.personRoles.filter((item) => item.roleId === roleRecord.id).map((item) => item.personId);
    const adminLinks = state.systemAssignments.filter((assignment) => peopleWithRole.includes(assignment.personId) && adminLevels.has(assignment.accessLevel) && assignment.status === "Active").length;
    return {
      id: roleRecord.id,
      Role: roleRecord.name,
      Description: roleRecord.description,
      People: peopleWithRole.length,
      "Admin-Level Assignments": adminLinks
    };
  });
  renderTable(el.roleTable, [col("Role"), col("Description"), col("People"), col("Admin-Level Assignments"), { label: "", render: (row) => rowActions("role", row.id) }], rows, {
    tableId: "roles",
    defaultSort: "Role"
  });
}

function renderVendors() {
  const rows = state.vendors.map((vendorRecord) => {
    const systems = state.systemAssets.filter((system) => system.vendorId === vendorRecord.id && system.status === "Active");
    return {
      id: vendorRecord.id,
      Vendor: vendorRecord.name,
      Category: vendorRecord.category,
      Website: vendorRecord.website,
      "System/Asset Count": systems.length,
      "Monthly Cost": money(systems.reduce((sum, system) => sum + system.monthlyEquivalentCost, 0)),
      "Next Renewal": systems.map((system) => system.renewalDate).filter(Boolean).sort()[0] || vendorRecord.renewalDate
    };
  });
  renderTable(el.vendorTable, [col("Vendor"), col("Category"), col("Website"), col("System/Asset Count"), col("Monthly Cost"), col("Next Renewal"), { label: "", render: (row) => rowActions("vendor", row.id) }], rows, {
    tableId: "vendors",
    defaultSort: "Vendor",
    filters: [{ key: "Category", label: "Category" }]
  });
}

function renderSystems() {
  const rows = state.systemAssets.map((system) => ({
    id: system.id,
    "System/Asset": system.name,
    Type: system.type,
    Vendor: vendorName(system.vendorId),
    Department: departmentName(system.departmentId),
    Owner: ownerName(system),
    "Billing Frequency": system.billingFrequency,
    "Monthly Cost": money(system.monthlyEquivalentCost),
    "Annual Cost": money(system.annualEquivalentCost),
    "Renewal Date": system.renewalDate,
    Seats: `${system.seatsAssigned}/${system.seatsPurchased}`,
    Status: system.status
  }));
  renderTable(el.systemTable, [
    col("System/Asset"), col("Type"), col("Vendor"), col("Department"), col("Owner"), col("Billing Frequency"), col("Monthly Cost"), col("Annual Cost"), col("Renewal Date"), col("Seats"),
    { label: "Status", render: (row) => statusPill(row.Status) },
    { label: "", render: (row) => rowActions("system", row.id) }
  ], rows, {
    tableId: "systems",
    defaultSort: "System/Asset",
    filters: [
      { key: "Type", label: "Type" },
      { key: "Vendor", label: "Vendor" },
      { key: "Department", label: "Department" },
      { key: "Status", label: "Status" }
    ]
  });
}

function renderAssignments() {
  const rows = state.systemAssignments.map((assignment) => {
    const system = byId(state.systemAssets, assignment.systemAssetId);
    const personRecord = byId(state.people, assignment.personId);
    return {
      id: assignment.id,
      Person: personRecord?.displayName ?? "Missing person",
      Department: departmentName(personRecord?.departmentId),
      "Employment Type": personRecord?.employmentType ?? "",
      "System/Asset": system?.name ?? "Missing system",
      Vendor: vendorName(system?.vendorId),
      "Assignment Type": assignment.assignmentType,
      "Access Level": assignment.accessLevel,
      Status: assignment.status,
      "Start Date": assignment.startDate,
      "End Date": assignment.endDate
    };
  });
  renderTable(el.assignmentTable, [
    col("Person"), col("Department"), col("Employment Type"), col("System/Asset"), col("Vendor"), col("Assignment Type"),
    { label: "Access Level", render: (row) => statusPill(row["Access Level"]) },
    { label: "Status", render: (row) => statusPill(row.Status) },
    col("Start Date"), col("End Date"), { label: "", render: (row) => rowActions("assignment", row.id) }
  ], rows, {
    tableId: "assignments",
    defaultSort: "Person",
    filters: [
      { key: "Department", label: "Department" },
      { key: "Access Level", label: "Access Level" },
      { key: "Status", label: "Status" }
    ]
  });
}

function offboardingPeopleOptions() {
  return state.people
    .filter((personRecord) => personRecord.employmentType !== "Vendor Contact")
    .slice()
    .sort((a, b) => {
      const aRisk = activeAssignmentsForPerson(a.id).length;
      const bRisk = activeAssignmentsForPerson(b.id).length;
      return bRisk - aRisk || a.displayName.localeCompare(b.displayName);
    });
}

function activeAssignmentsForPerson(personId) {
  return state.systemAssignments
    .filter((assignment) => assignment.personId === personId && assignment.status === "Active")
    .map((assignment) => ({ assignment, system: byId(state.systemAssets, assignment.systemAssetId) }))
    .filter(({ system }) => system);
}

function selectedOffboardingPerson() {
  let personId = el.offboardingPerson?.value || "";
  if (!personId || !byId(state.people, personId)) {
    personId = offboardingPeopleOptions()[0]?.id || "";
    if (el.offboardingPerson) el.offboardingPerson.value = personId;
  }
  return byId(state.people, personId);
}

function renderOffboarding() {
  if (!el.offboardingPerson) return;
  const people = offboardingPeopleOptions();
  const current = el.offboardingPerson.value || people[0]?.id || "";
  el.offboardingPerson.innerHTML = people.map((personRecord) => {
    const activeCount = activeAssignmentsForPerson(personRecord.id).length;
    return `<option value="${escapeHtml(personRecord.id)}" ${personRecord.id === current ? "selected" : ""}>${escapeHtml(personRecord.displayName)} (${activeCount} active)</option>`;
  }).join("");
  if (current && [...el.offboardingPerson.options].some((option) => option.value === current)) el.offboardingPerson.value = current;

  const personRecord = selectedOffboardingPerson();
  const activeRows = personRecord ? offboardingRows(personRecord.id) : [];
  const adminCount = activeRows.filter((row) => adminLevels.has(row["Access Level"])).length;
  const monthlyCost = activeRows.reduce((sum, row) => sum + numericValue(row._monthlyCost), 0);
  const isAdmin = isAdminUser();

  el.offboardingSummary.innerHTML = personRecord ? `
    <div><strong>${escapeHtml(activeRows.length)}</strong><span>Active assignments</span></div>
    <div><strong>${escapeHtml(adminCount)}</strong><span>Admin-level</span></div>
    <div><strong>${escapeHtml(money(monthlyCost))}</strong><span>Monthly exposure</span></div>
    <div><strong>${escapeHtml(personRecord.status)}</strong><span>Person status</span></div>
  ` : `<div class="empty-state">No people available for offboarding.</div>`;

  el.offboardingMarkInactive.disabled = !personRecord || !isAdmin;
  el.offboardingRevokeAll.disabled = !personRecord || !activeRows.length || !isAdmin;
  el.offboardingUndo.disabled = !lastOffboardingUndo || !isAdmin;
  el.offboardingOpenPerson.disabled = !personRecord;
  el.offboardingExportPdf.disabled = !personRecord;
  renderTable(el.offboardingChecklist, [
    { label: "Done", render: (row) => `<label class="check-action"><input type="checkbox" data-offboard-assignment="${escapeHtml(row.id)}" ${!isAdmin ? "disabled" : ""} /><span>Revoked</span></label>` },
    { label: "System/Asset", render: (row) => recordLink("system", row._systemId, row["System/Asset"], "systems") },
    { label: "Vendor", render: (row) => recordLink("vendor", row._vendorId, row.Vendor, "vendors") },
    col("Assignment Type"),
    { label: "Access Level", render: (row) => statusPill(row["Access Level"]) },
    col("Owner"),
    col("Renewal Date"),
    col("Monthly Cost")
  ], activeRows, {
    tableId: "offboarding",
    defaultSort: "System/Asset",
    filters: [
      { key: "Access Level", label: "Access Level" },
      { key: "Vendor", label: "Vendor" }
    ],
    exportFilename: `orgassets-offboarding-${personRecord?.displayName || "person"}.csv`
  });
}

function offboardingRows(personId) {
  return activeAssignmentsForPerson(personId).map(({ assignment, system }) => ({
    id: assignment.id,
    "System/Asset": system.name,
    Vendor: vendorName(system.vendorId),
    "Assignment Type": assignment.assignmentType,
    "Access Level": assignment.accessLevel,
    Owner: ownerName(system),
    "Renewal Date": system.renewalDate,
    "Monthly Cost": money(system.monthlyEquivalentCost),
    _monthlyCost: system.monthlyEquivalentCost,
    _systemId: system.id,
    _vendorId: system.vendorId,
    _ownerPersonId: system.ownerPersonId
  }));
}

function openSelectedOffboardingPersonInPeople() {
  const personRecord = selectedOffboardingPerson();
  if (!personRecord) return;
  el.globalSearch.value = personRecord.displayName;
  tablePrefs.people = tablePrefs.people ?? { search: "", sortKey: "", sortDir: "asc", limit: state.settings.defaultPageSize, filters: {} };
  tablePrefs.people.search = "";
  tablePrefs.people.filters = {};
  setView("people");
  renderDetail("person", personRecord.id);
}

function revokeAssignmentForOffboarding(assignmentId) {
  if (!isAdminUser()) return false;
  const assignment = byId(state.systemAssignments, assignmentId);
  if (!assignment || assignment.status !== "Active") return false;
  captureOffboardingUndo(`Revoke ${personName(assignment.personId)} access to ${systemName(assignment.systemAssetId)}`);
  const before = `${assignment.status}${assignment.endDate ? ` through ${assignment.endDate}` : ""}`;
  clearOwnerWhenRevokingAssignment(assignment);
  assignment.status = "Removed";
  assignment.endDate = assignment.endDate || todayStamp();
  assignment.notes = appendNote(assignment.notes, `Offboarding access revoked ${todayStamp()}.`);
  assignment.updatedAt = todayStamp();
  addAuditEvent({
    eventType: "OFFBOARDING_REVOKE",
    entityType: "assignment",
    entityId: assignment.id,
    summary: `Revoked ${personName(assignment.personId)} access to ${systemName(assignment.systemAssetId)}.`,
    before,
    after: `${assignment.status} through ${assignment.endDate}`
  });
  state = normalizeState(state);
  saveState();
  renderAll();
  return true;
}

function revokeAllOffboardingAssignments() {
  const personRecord = selectedOffboardingPerson();
  if (!personRecord || !isAdminUser()) return;
  const assignments = activeAssignmentsForPerson(personRecord.id).map(({ assignment }) => assignment.id);
  if (!assignments.length) return;
  captureOffboardingUndo(`Revoke all active assignments for ${personRecord.displayName}`);
  assignments.forEach((assignmentId) => revokeAssignmentForOffboardingNoRender(assignmentId));
  addAuditEvent({
    eventType: "OFFBOARDING_REVOKE_ALL",
    entityType: "person",
    entityId: personRecord.id,
    summary: `Revoked ${assignments.length} active assignment${assignments.length === 1 ? "" : "s"} for ${personRecord.displayName}.`,
    before: `${assignments.length} active`,
    after: "0 active"
  });
  state = normalizeState(state);
  saveState();
  renderAll();
}

function revokeAssignmentForOffboardingNoRender(assignmentId) {
  const assignment = byId(state.systemAssignments, assignmentId);
  if (!assignment || assignment.status !== "Active") return;
  clearOwnerWhenRevokingAssignment(assignment);
  assignment.status = "Removed";
  assignment.endDate = assignment.endDate || todayStamp();
  assignment.notes = appendNote(assignment.notes, `Offboarding access revoked ${todayStamp()}.`);
  assignment.updatedAt = todayStamp();
}

function clearOwnerWhenRevokingAssignment(assignment) {
  const system = byId(state.systemAssets, assignment.systemAssetId);
  if (!system || system.ownerPersonId !== assignment.personId) return;
  if (assignment.assignmentType !== "Owner" && assignment.accessLevel !== "Owner") return;
  system.ownerPersonId = null;
  system.notes = appendNote(system.notes, `Owner cleared during ${personName(assignment.personId)} offboarding ${todayStamp()}.`);
  system.updatedAt = todayStamp();
}

function captureOffboardingUndo(label) {
  lastOffboardingUndo = {
    label,
    state: JSON.stringify(state)
  };
}

function undoLastOffboardingChange() {
  if (!isAdminUser() || !lastOffboardingUndo) return;
  const label = lastOffboardingUndo.label;
  try {
    state = normalizeState(JSON.parse(lastOffboardingUndo.state));
    lastOffboardingUndo = null;
    addAuditEvent({
      eventType: "OFFBOARDING_UNDO",
      entityType: "offboarding",
      entityId: "undo",
      summary: `Undid offboarding change: ${label}.`
    });
    saveState();
    renderAll();
  } catch {
    lastOffboardingUndo = null;
    renderOffboarding();
  }
}

function markSelectedPersonInactive() {
  const personRecord = selectedOffboardingPerson();
  if (!personRecord || !isAdminUser()) return;
  captureOffboardingUndo(`Mark ${personRecord.displayName} inactive`);
  const before = personRecord.status;
  personRecord.status = "Inactive";
  personRecord.endDate = personRecord.endDate || todayStamp();
  personRecord.notes = appendNote(personRecord.notes, `Marked inactive during offboarding ${todayStamp()}.`);
  personRecord.updatedAt = todayStamp();
  addAuditEvent({
    eventType: "OFFBOARDING_STATUS",
    entityType: "person",
    entityId: personRecord.id,
    summary: `Marked ${personRecord.displayName} inactive during offboarding.`,
    before,
    after: personRecord.status
  });
  state = normalizeState(state);
  saveState();
  renderAll();
}

function appendNote(notes, line) {
  return [String(notes || "").trim(), line].filter(Boolean).join("\n");
}

async function exportOffboardingChecklistPdf() {
  const personRecord = selectedOffboardingPerson();
  if (!personRecord) return;
  const rows = offboardingRows(personRecord.id);
  const logo = await reportLogoPdfPayload();
  const blob = buildReportPdf({
    title: `Offboarding Checklist - ${personRecord.displayName}`,
    question: `${rows.length} active assignment${rows.length === 1 ? "" : "s"} to review or revoke. Admin-level access should be removed first, then licensed user access and vendor portal contacts.`,
    department: `${departmentName(personRecord.departmentId)} | ${personRecord.employmentType} | ${personRecord.status}`,
    rows: rows.map((row) => ({
      "System/Asset": row["System/Asset"],
      Vendor: row.Vendor,
      "Assignment Type": row["Assignment Type"],
      "Access Level": row["Access Level"],
      Owner: row.Owner,
      "Renewal Date": row["Renewal Date"],
      "Monthly Cost": row["Monthly Cost"]
    })),
    columns: ["System/Asset", "Vendor", "Assignment Type", "Access Level", "Owner", "Renewal Date", "Monthly Cost"],
    logo
  });
  downloadBlob(`orgassets-offboarding-${personRecord.displayName.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${todayStamp()}.pdf`, blob);
}

function assignmentSchemaRows() {
  return [
    ["personId", "Yes", "OrgAssets person ID. Use either personId or Person in imports.", "p6"],
    ["Person", "Yes for friendly imports", "Person display name used by section exports and friendly imports.", "Riley Knox"],
    ["systemAssetId", "Yes", "OrgAssets system/asset ID. Use either systemAssetId or System/Asset in imports.", "s1"],
    ["System/Asset", "Yes for friendly imports", "System or digital asset display name.", "Microsoft 365 Tenant"],
    ["assignmentType", "No", "Business relationship to the system.", "Licensed User"],
    ["accessLevel", "No", "Risk/access level used by admin-access reports.", "Admin"],
    ["status", "No", "Assignment lifecycle status.", "Active"],
    ["startDate", "No", "Date access started, ISO yyyy-mm-dd preferred.", "2026-01-01"],
    ["endDate", "No", "Date access ended or should end.", "2026-06-30"],
    ["notes", "No", "Non-secret context only. Do not store credentials.", "Reviewed during monthly audit"]
  ].map(([column, required, meaning, example]) => ({ Column: column, Required: required, Meaning: meaning, Example: example }));
}

function standardAssignmentExportRows() {
  return state.systemAssignments.map((assignment) => ({
    personId: assignment.personId,
    Person: personName(assignment.personId),
    systemAssetId: assignment.systemAssetId,
    "System/Asset": systemName(assignment.systemAssetId),
    assignmentType: assignment.assignmentType,
    accessLevel: assignment.accessLevel,
    status: assignment.status,
    startDate: assignment.startDate,
    endDate: assignment.endDate,
    notes: assignment.notes
  }));
}

function renderActions() {
  renderTable(el.actionTable, [
    { key: "Action", label: "Action", render: (row) => statusPill(row.Action) },
    col("Reason"), col("Person"), col("System/Asset"), col("Vendor"), col("Owner"), col("Department"), col("Due Date"), col("Recommended Next Step"),
    { label: "", render: (row) => detailButton(row._personId ? "person" : "system", row._personId || row._systemId) }
  ], actionRows(), {
    tableId: "actions",
    defaultSort: "Due Date",
    filters: [
      { key: "Action", label: "Action" },
      { key: "Department", label: "Department" }
    ]
  });
}

function renderTopologyFilters() {
  fillSelect(el.topologyDepartment, "All departments", state.departments.map((item) => [item.id, item.name]));
  if (el.topologyScope.value === "department" && !el.topologyDepartment.value && state.departments.length) {
    el.topologyDepartment.value = byId(state.departments, "d-exec") ? "d-exec" : state.departments[0].id;
  }
  fillSelect(el.topologyRole, "All roles", state.roles.map((item) => [item.id, item.name]));
  fillSelect(el.reportDepartment, "All departments", state.departments.map((item) => [item.id, item.name]));
}

function fillSelect(select, allLabel, options) {
  const current = select.value;
  select.innerHTML = `<option value="">${allLabel}</option>${options.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join("")}`;
  select.value = [...select.options].some((option) => option.value === current) ? current : "";
}

function childPersonIds(personId) {
  return state.people.filter((personRecord) => personRecord.managerPersonId === personId).map((personRecord) => personRecord.id);
}

function descendantPersonIds(personId, seen = new Set()) {
  childPersonIds(personId).forEach((childId) => {
    if (seen.has(childId)) return;
    seen.add(childId);
    descendantPersonIds(childId, seen);
  });
  return seen;
}

function canMovePersonUnder(personId, managerId) {
  if (!personId) return false;
  if (!managerId) return true;
  if (personId === managerId) return false;
  return !descendantPersonIds(personId).has(managerId);
}

function trimTreeHistory(stack) {
  while (stack.length > 3) stack.shift();
}

function updateTreeHistoryButtons() {
  if (el.topologyUndoTree) el.topologyUndoTree.disabled = !topologyUndoStack.length;
  if (el.topologyRedoTree) el.topologyRedoTree.disabled = !topologyRedoStack.length;
}

function clearTreeHistory() {
  topologyUndoStack.length = 0;
  topologyRedoStack.length = 0;
  updateTreeHistoryButtons();
}

function applyManagerMove(personId, managerId) {
  if (!isAdminUser()) return false;
  const personRecord = byId(state.people, personId);
  if (!personRecord || !canMovePersonUnder(personId, managerId)) return false;
  personRecord.managerPersonId = managerId || null;
  normalizeRecord("person", personRecord);
  saveState();
  renderAll();
  return true;
}

function movePersonUnder(personId, managerId, recordHistory = true) {
  const personRecord = byId(state.people, personId);
  if (!personRecord) return false;
  const fromManagerId = personRecord.managerPersonId || "";
  const toManagerId = managerId || "";
  if (fromManagerId === toManagerId) return false;
  if (!canMovePersonUnder(personId, toManagerId)) return false;

  if (!applyManagerMove(personId, toManagerId)) return false;
  if (recordHistory) {
    addAuditEvent({
      eventType: "ORG_TREE_MOVE",
      entityType: "person",
      entityId: personId,
      summary: `Moved ${personName(personId)} under ${toManagerId ? personName(toManagerId) : "top level"}.`,
      before: fromManagerId ? personName(fromManagerId) : "Top level",
      after: toManagerId ? personName(toManagerId) : "Top level"
    });
    saveState();
    topologyUndoStack.push({ personId, fromManagerId, toManagerId });
    trimTreeHistory(topologyUndoStack);
    topologyRedoStack.length = 0;
    updateTreeHistoryButtons();
  }
  return true;
}

function undoTreeMove() {
  if (!isAdminUser()) return;
  const move = topologyUndoStack.pop();
  if (!move) return;
  if (movePersonUnder(move.personId, move.fromManagerId, false)) {
    topologyRedoStack.push(move);
    trimTreeHistory(topologyRedoStack);
  }
  updateTreeHistoryButtons();
}

function redoTreeMove() {
  if (!isAdminUser()) return;
  const move = topologyRedoStack.pop();
  if (!move) return;
  if (movePersonUnder(move.personId, move.toManagerId, false)) {
    topologyUndoStack.push(move);
    trimTreeHistory(topologyUndoStack);
  }
  updateTreeHistoryButtons();
}

function topologyCardDetailOptions() {
  return {
    systems: el.topologySystems.checked,
    roles: el.topologyRoles.checked,
    accessFlags: el.topologyAccessFlags.checked
  };
}

function topologyModel() {
  const scope = el.topologyScope.value;
  const departmentFilter = el.topologyDepartment.value;
  const roleFilter = el.topologyRole.value;
  let people = visiblePeople();
  const effectiveDepartment = scope === "department" ? (departmentFilter || "d-exec") : "";

  if (scope === "department" && effectiveDepartment && !departmentFilter && [...el.topologyDepartment.options].some((option) => option.value === effectiveDepartment)) {
    el.topologyDepartment.value = effectiveDepartment;
  }
  if (scope === "department" && effectiveDepartment) people = people.filter((personRecord) => personRecord.departmentId === effectiveDepartment);
  if (roleFilter) people = people.filter((personRecord) => state.personRoles.some((item) => item.personId === personRecord.id && item.roleId === roleFilter));

  const visibleIds = new Set(people.map((personRecord) => personRecord.id));
  const childrenByManager = people.reduce((acc, personRecord) => {
    const managerKey = visibleIds.has(personRecord.managerPersonId) ? personRecord.managerPersonId : "root";
    acc[managerKey] = acc[managerKey] ?? [];
    acc[managerKey].push(personRecord);
    return acc;
  }, {});

  Object.values(childrenByManager).forEach((list) => {
    list.sort((a, b) => {
      if (a.employmentType === "Owner") return -1;
      if (b.employmentType === "Owner") return 1;
      if (a.employmentType === "Executive" && b.employmentType !== "Executive") return -1;
      if (b.employmentType === "Executive" && a.employmentType !== "Executive") return 1;
      return a.displayName.localeCompare(b.displayName);
    });
  });

  return {
    people,
    childrenByManager,
    rootPeople: childrenByManager.root ?? [],
    departmentLabel: scope === "department" && effectiveDepartment ? departmentName(effectiveDepartment) : "Whole company"
  };
}

function renderTopology() {
  const density = el.topologyDensity.value || "compact";
  const cardDetail = topologyCardDetailOptions();
  const { people, childrenByManager, rootPeople, departmentLabel } = topologyModel();
  const systemsTouched = people.reduce((sum, personRecord) => sum + state.systemAssignments.filter((item) => item.personId === personRecord.id && item.status === "Active").length, 0);
  const mapWidth = el.topologyMap?.clientWidth || Math.max(900, window.innerWidth - 340);
  const largeCanvas = mapWidth >= 1700;
  const isCompanyScope = el.topologyScope.value === "company";
  const baseZoom = isCompanyScope && people.length > 30 ? (largeCanvas ? 0.72 : 0.58) : isCompanyScope && people.length > 18 ? (largeCanvas ? 0.86 : 0.72) : 1;
  lastTopologyFitZoom = baseZoom;
  const chartZoom = topologyZoomOverride ?? baseZoom;
  if (el.topologyZoomReset) {
    el.topologyZoomReset.textContent = topologyZoomOverride === null ? `Fit ${Math.round(chartZoom * 100)}%` : "Fit";
  }
  if (el.topologyOrganizeTree) {
    el.topologyOrganizeTree.classList.toggle("active", topologyOrganizeMode);
    el.topologyOrganizeTree.textContent = topologyOrganizeMode ? "Done" : "Organize Tree";
  }
  updateTreeHistoryButtons();

  el.topologyMap.innerHTML = `
    <div class="chart-summary">
      <span class="tag">${escapeHtml(departmentLabel)}</span>
      <span class="tag">${people.length} people shown</span>
      <span class="tag">${rootPeople.length} top card${rootPeople.length === 1 ? "" : "s"}</span>
      <span class="tag">${systemsTouched} active system assignment${systemsTouched === 1 ? "" : "s"}</span>
      <span class="tag">${topologyZoomOverride === null ? "Auto fit" : "Manual zoom"} ${Math.round(chartZoom * 100)}%</span>
      ${topologyOrganizeMode ? `<span class="tag">Organizing</span>` : ""}
    </div>
    ${topologyOrganizeMode ? `
      <div class="top-level-drop" data-org-drop-root="true">
        <strong>Drop here to remove manager</strong>
        <span>Makes the person a top-level org chart card.</span>
      </div>
    ` : ""}
    <div class="employee-chart ${escapeHtml(density)} ${topologyOrganizeMode ? "organize-mode" : ""}" style="zoom:${chartZoom}">
      ${rootPeople.length ? `<ul>${rootPeople.map((personRecord) => chartNode(personRecord, childrenByManager, cardDetail)).join("")}</ul>` : `<div class="empty-state">No people match this org chart scope.</div>`}
    </div>
  `;
}

function chartNode(personRecord, childrenByManager, cardDetail) {
  const children = childrenByManager[personRecord.id] ?? [];
  return `
    <li>
      ${employeeCard(personRecord, cardDetail)}
      ${children.length ? `<ul>${children.map((child) => chartNode(child, childrenByManager, cardDetail)).join("")}</ul>` : ""}
    </li>
  `;
}

function employeeCard(personRecord, cardDetail) {
  const activeAssignments = state.systemAssignments.filter((item) => item.personId === personRecord.id && item.status === "Active");
  const className = [
    "employee-card",
    personRecord.status !== "Active" ? "inactive" : "",
    contractorTypes.has(personRecord.employmentType) ? "contractor" : "",
    personRecord.employmentType === "Executive" ? "executive" : "",
    personRecord.employmentType === "Owner" ? "owner" : ""
  ].filter(Boolean).join(" ");
  const initials = personRecord.displayName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const organizeAttributes = topologyOrganizeMode
    ? `draggable="true" data-org-drag-person="${escapeHtml(personRecord.id)}" data-org-drop-person="${escapeHtml(personRecord.id)}" title="Drag to reorganize"`
    : "";
  return `
    <button type="button" class="${className}" data-detail-type="person" data-detail-id="${personRecord.id}" ${organizeAttributes}>
      <span class="employee-photo">${escapeHtml(initials)}</span>
      <div class="employee-card-body">
        <div class="employee-card-head">
          <strong>${escapeHtml(personRecord.displayName)}</strong>
          <span>${escapeHtml(personRecord.title)}</span>
        </div>
        <div class="employee-meta">
          <span>${escapeHtml(departmentName(personRecord.departmentId))}</span>
          <span>${escapeHtml(personRecord.employmentType)} | ${escapeHtml(personRecord.status)}</span>
        </div>
        ${employeeCardDetails(personRecord, activeAssignments, cardDetail)}
      </div>
    </button>
  `;
}

function employeeCardDetails(personRecord, activeAssignments, cardDetail) {
  const adminCount = activeAssignments.filter((assignment) => adminLevels.has(assignment.accessLevel)).length;
  const ownedCount = state.systemAssets.filter((system) => system.ownerPersonId === personRecord.id && system.status === "Active").length;
  const sections = [];

  if (cardDetail.systems) {
    sections.push(`
      <div class="employee-badges">
        <span class="mini-badge info"><strong>${activeAssignments.length}</strong>Systems</span>
        <span class="mini-badge warn"><strong>${adminCount}</strong>Admin</span>
        <span class="mini-badge good"><strong>${ownedCount}</strong>Owns</span>
      </div>
    `);
  }

  if (cardDetail.roles) {
    const roles = personRoles(personRecord.id);
    const shownRoles = roles.slice(0, 3);
    if (roles.length > 3) shownRoles.push(`+${roles.length - 3}`);
    sections.push(`<div class="employee-badges role-badges">${(shownRoles.length ? shownRoles : ["No role"]).map((roleLabel) => `<span class="mini-badge role">${escapeHtml(roleLabel)}</span>`).join("")}</div>`);
  }

  if (cardDetail.accessFlags) {
    const flags = [];
    if (personRecord.status !== "Active") flags.push(["Status", personRecord.status, "danger"]);
    if (contractorTypes.has(personRecord.employmentType) && personRecord.endDate && daysUntil(personRecord.endDate) < 0) flags.push(["Past end", personRecord.endDate, "danger"]);
    if (adminCount) flags.push(["Admin", adminCount, "warn"]);
    if (activeAssignments.length >= 8) flags.push(["High touch", activeAssignments.length, "info"]);
    if (!flags.length) flags.push(["Access", "OK", "good"]);
    sections.push(`<div class="employee-badges access-flag-badges">${flags.map(([label, value, tone]) => `<span class="mini-badge ${tone}"><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>`).join("")}</div>`);
  }

  return sections.join("");
}

const reportQuestions = {
  staffStructure: "Who works here, and who manages them?",
  orgChartRoster: "Who appears in the employee org chart, by reporting level and department?",
  systemsTouched: "What systems does each person touch?",
  subscriptionCost: "What subscriptions are we paying for?",
  formerStaffAccess: "Which users still have accounts after leaving?",
  contractorAccess: "Which contractors have active access after their contract ended?",
  vendorRenewal: "Which vendors renew soon?",
  noOwner: "Which digital assets have no owner?",
  adminAccessByRole: "Which roles have admin privileges?",
  departmentMonthlyCost: "What does each department cost monthly?",
  personAssetSummary: "What memberships, software seats, domains, licenses, and accounts are assigned to each person?",
  cleanupAction: "What needs to be reviewed, renewed, cancelled, transferred, or deactivated?"
};

function orgDepth(personRecord, seen = new Set()) {
  if (!personRecord?.managerPersonId || seen.has(personRecord.id)) return 0;
  seen.add(personRecord.id);
  const manager = byId(state.people, personRecord.managerPersonId);
  return manager ? 1 + orgDepth(manager, seen) : 0;
}

function managerPath(personRecord) {
  const path = [];
  let manager = byId(state.people, personRecord.managerPersonId);
  const seen = new Set([personRecord.id]);
  while (manager && !seen.has(manager.id)) {
    seen.add(manager.id);
    path.unshift(manager.displayName);
    manager = byId(state.people, manager.managerPersonId);
  }
  return path.join(" > ");
}

function buildReportRows() {
  const type = el.reportType.value;
  if (type === "staffStructure") return state.people.map((personRecord) => ({
    Person: personRecord.displayName,
    Title: personRecord.title,
    Department: departmentName(personRecord.departmentId),
    Manager: personName(personRecord.managerPersonId),
    "Employment Type": personRecord.employmentType,
    Status: personRecord.status,
    "Start Date": personRecord.startDate,
    "End Date": personRecord.endDate,
    Roles: personRoles(personRecord.id).join(", "),
    _personId: personRecord.id,
    _managerPersonId: personRecord.managerPersonId,
    _departmentId: personRecord.departmentId,
    _roleIds: state.personRoles.filter((item) => item.personId === personRecord.id).map((item) => item.roleId)
  }));

  if (type === "orgChartRoster") return state.people
    .slice()
    .sort((a, b) => orgDepth(a) - orgDepth(b) || departmentName(a.departmentId).localeCompare(departmentName(b.departmentId)) || a.displayName.localeCompare(b.displayName))
    .map((personRecord) => ({
      Level: orgDepth(personRecord),
      Person: personRecord.displayName,
      Title: personRecord.title,
      Department: departmentName(personRecord.departmentId),
      Manager: personName(personRecord.managerPersonId),
      "Manager Path": managerPath(personRecord),
      "Employment Type": personRecord.employmentType,
      Status: personRecord.status,
      Roles: personRoles(personRecord.id).join(", "),
      "Systems Touched": state.systemAssignments.filter((item) => item.personId === personRecord.id && item.status === "Active").length,
      "Direct Reports": state.people.filter((item) => item.managerPersonId === personRecord.id).length,
      _personId: personRecord.id,
      _managerPersonId: personRecord.managerPersonId,
      _departmentId: personRecord.departmentId,
      _roleIds: state.personRoles.filter((item) => item.personId === personRecord.id).map((item) => item.roleId)
    }));

  if (type === "systemsTouched") return state.systemAssignments.map((assignment) => {
    if (assignment.status !== "Active") return null;
    const personRecord = byId(state.people, assignment.personId);
    const system = byId(state.systemAssets, assignment.systemAssetId);
    return {
      Person: personRecord?.displayName ?? "",
      Department: departmentName(personRecord?.departmentId),
      Role: personRoles(assignment.personId).join(", "),
      "System/Asset": system?.name ?? "",
      Vendor: vendorName(system?.vendorId),
      "Assignment Type": assignment.assignmentType,
      "Access Level": assignment.accessLevel,
      "Assignment Status": assignment.status,
      "Start Date": assignment.startDate,
      "End Date": assignment.endDate,
      _assignmentId: assignment.id,
      _personId: personRecord?.id,
      _departmentId: personRecord?.departmentId,
      _roleIds: state.personRoles.filter((item) => item.personId === assignment.personId).map((item) => item.roleId),
      _systemId: system?.id,
      _vendorId: system?.vendorId
    };
  }).filter(Boolean);

  if (type === "subscriptionCost") return state.systemAssets.map((system) => ({
    "System/Asset": system.name,
    Type: system.type,
    Vendor: vendorName(system.vendorId),
    Department: departmentName(system.departmentId),
    Owner: ownerName(system),
    "Billing Frequency": system.billingFrequency,
    "Cost Amount": system.costAmount,
    "Monthly Equivalent Cost": system.monthlyEquivalentCost,
    "Annual Equivalent Cost": system.annualEquivalentCost,
    "Renewal Date": system.renewalDate,
    "Auto Renew": system.autoRenew ? "Yes" : "No",
    Status: system.status,
    _systemId: system.id,
    _vendorId: system.vendorId,
    _departmentId: system.departmentId,
    _ownerPersonId: system.ownerPersonId
  }));

  if (type === "formerStaffAccess") return formerStaffAccessRows();
  if (type === "contractorAccess") return contractorAccessRows();
  if (type === "vendorRenewal") return renewalRows(999).map((row) => ({
    Vendor: row.Vendor,
    "System/Asset": row["System/Asset"],
    Owner: row.Owner,
    Department: row.Department,
    "Renewal Date": row["Renewal Date"],
    "Cancellation Deadline": byId(state.systemAssets, row.id)?.cancellationDeadline ?? "",
    "Auto Renew": byId(state.systemAssets, row.id)?.autoRenew ? "Yes" : "No",
    "Monthly Cost": byId(state.systemAssets, row.id)?.monthlyEquivalentCost ?? 0,
    "Annual Cost": byId(state.systemAssets, row.id)?.annualEquivalentCost ?? 0,
    Status: byId(state.systemAssets, row.id)?.status ?? "",
    _systemId: row.id,
    _vendorId: row._vendorId,
    _ownerPersonId: row._ownerPersonId,
    _departmentId: row._departmentId
  }));
  if (type === "noOwner") return noOwnerRows();
  if (type === "adminAccessByRole") return state.systemAssignments.filter((assignment) => adminLevels.has(assignment.accessLevel) && assignment.status === "Active").flatMap((assignment) => {
    const personRecord = byId(state.people, assignment.personId);
    const system = byId(state.systemAssets, assignment.systemAssetId);
    return state.personRoles.filter((item) => item.personId === assignment.personId).map((personRole) => ({
      Role: roleName(personRole.roleId),
      Person: personRecord?.displayName ?? "",
      Department: departmentName(personRecord?.departmentId),
      "System/Asset": system?.name ?? "",
      Vendor: vendorName(system?.vendorId),
      "Assignment Type": assignment.assignmentType,
      "Access Level": assignment.accessLevel,
      _assignmentId: assignment.id,
      _roleId: personRole.roleId,
      _personId: personRecord?.id,
      _departmentId: personRecord?.departmentId,
      _systemId: system?.id,
      _vendorId: system?.vendorId
    }));
  });
  if (type === "departmentMonthlyCost") return state.departments.map((department) => {
    const systems = state.systemAssets.filter((system) => system.departmentId === department.id && system.status === "Active");
    return {
      Department: department.name,
      "Monthly Cost": systems.reduce((sum, system) => sum + system.monthlyEquivalentCost, 0),
      "Annual Cost": systems.reduce((sum, system) => sum + system.annualEquivalentCost, 0),
      "System/Asset Count": systems.length,
      "Active People Count": state.people.filter((personRecord) => personRecord.departmentId === department.id && personRecord.status === "Active" && !contractorTypes.has(personRecord.employmentType)).length,
      "Active Contractor Count": state.people.filter((personRecord) => personRecord.departmentId === department.id && personRecord.status === "Active" && contractorTypes.has(personRecord.employmentType)).length,
      _departmentId: department.id
    };
  });
  if (type === "personAssetSummary") return state.systemAssignments.map((assignment) => {
    if (assignment.status !== "Active") return null;
    const personRecord = byId(state.people, assignment.personId);
    const system = byId(state.systemAssets, assignment.systemAssetId);
    return {
      Person: personRecord?.displayName ?? "",
      Department: departmentName(personRecord?.departmentId),
      "Employment Type": personRecord?.employmentType ?? "",
      "System/Asset": system?.name ?? "",
      Type: system?.type ?? "",
      Vendor: vendorName(system?.vendorId),
      "Assignment Type": assignment.assignmentType,
      "Access Level": assignment.accessLevel,
      "Renewal Date": system?.renewalDate ?? "",
      "Monthly Cost": system?.monthlyEquivalentCost ?? 0,
      "Annual Cost": system?.annualEquivalentCost ?? 0,
      _assignmentId: assignment.id,
      _personId: personRecord?.id,
      _departmentId: personRecord?.departmentId,
      _systemId: system?.id,
      _vendorId: system?.vendorId
    };
  }).filter(Boolean);
  return actionRows();
}

function reportRows() {
  const rows = buildReportRows();
  const departmentId = el.reportDepartment.value;
  if (!departmentId) return rows;
  const selectedDepartment = departmentName(departmentId);
  return rows.filter((row) => row.Department === selectedDepartment);
}

function renderReport() {
  el.reportQuestion.textContent = reportQuestions[el.reportType.value];
  const tableState = currentReportTableState();
  renderReportVisuals(tableState.sortedRows);
  renderTable(el.reportOutput, tableState.columns, tableState.rows, tableState.options);
}

function reportColumns(rows) {
  return rows.length ? Object.keys(rows[0]).filter((key) => !key.startsWith("_")).map((key) => ({ label: key, key })) : [];
}

function currentReportTableState() {
  const rows = reportRows();
  const columns = reportColumns(rows);
  const options = reportTableOptions(columns, rows);
  const prefs = getTablePrefs(options.tableId, { ...options, columns });
  const filteredRows = rows
    .filter((row) => matchesSearch(row))
    .filter((row) => matchesSearch(row, prefs.search))
    .filter((row) => matchesTableFilters(row, prefs.filters, options.filters));
  const sortedRows = sortTableRows(filteredRows, prefs.sortKey, prefs.sortDir, prefs.sortStack);
  return { rows, columns, options, prefs, filteredRows, sortedRows };
}

function reportTableOptions(columns, rows = reportRows()) {
  const reportType = el.reportType.value;
  const defaultSorts = reportDefaultSorts(reportType, columns);
  return {
    tableId: `report-${reportType}`,
    defaultLimit: "50",
    defaultSort: defaultSorts[0]?.key || columns[0]?.key || "",
    defaultDirection: defaultSorts[0]?.direction || "asc",
    defaultSorts,
    multiSort: true,
    multiSortLevels: 3,
    filters: reportFilterDefinitions(rows, columns, reportType),
    cellRenderer: reportCell
  };
}

function reportFilterDefinitions(rows, columns, reportType) {
  const columnKeys = new Set(columns.map((column) => column.key));
  const filters = [];
  const addColumnFilter = (key, label = key, allLabel = `All ${String(label).toLowerCase()}`) => {
    if (!columnKeys.has(key)) return;
    const options = uniqueSorted(rows.map((row) => row[key]));
    if (options.length > 1) filters.push({ key, label, allLabel, options });
  };
  const addMultiValueFilter = (key, label = key) => {
    if (!columnKeys.has(key)) return;
    const options = uniqueSorted(rows.flatMap((row) => splitReportLabels(row[key])));
    if (options.length > 1) {
      filters.push({
        key,
        label,
        allLabel: `All ${String(label).toLowerCase()}`,
        options,
        predicate: (row, value) => splitReportLabels(row[key]).includes(value)
      });
    }
  };

  ["Department", "Vendor", "Status", "Person Status", "Employment Type", "Type", "Assignment Type", "Access Level", "Assignment Status", "Billing Frequency", "Auto Renew", "Action", "Severity", "Owner", "Manager"].forEach((key) => addColumnFilter(key));
  addMultiValueFilter("Role", "Role");
  addMultiValueFilter("Roles", "Role");
  addReportDateWindowFilter(filters, rows, columnKeys, reportType);
  addReportCostBandFilter(filters, rows, columnKeys);
  return filters;
}

function splitReportLabels(value) {
  return String(value ?? "").split(",").map((item) => item.trim()).filter(Boolean);
}

function addReportDateWindowFilter(filters, rows, columnKeys, reportType) {
  const preferredDateKeys = reportType === "cleanupAction"
    ? ["Due Date", "Renewal Date", "End Date", "Contractor End Date", "Cancellation Deadline"]
    : ["Renewal Date", "Due Date", "End Date", "Contractor End Date", "Cancellation Deadline"];
  const dateKey = preferredDateKeys.find((key) => columnKeys.has(key));
  if (!dateKey || !rows.some((row) => row[dateKey])) return;
  filters.push({
    key: "__dateWindow",
    label: "Date window",
    allLabel: "All dates",
    options: [
      { value: "past", label: "Past due" },
      { value: "next7", label: "Next 7 days" },
      { value: "next30", label: "Next 30 days" },
      { value: "next90", label: "Next 90 days" },
      { value: "future", label: "Future dated" },
      { value: "blank", label: "No date" }
    ],
    predicate: (row, value) => {
      const rawDate = row[dateKey];
      if (!rawDate) return value === "blank";
      const days = daysUntil(rawDate);
      if (value === "past") return days < 0;
      if (value === "next7") return days >= 0 && days <= 7;
      if (value === "next30") return days >= 0 && days <= 30;
      if (value === "next90") return days >= 0 && days <= 90;
      if (value === "future") return days > 90;
      return true;
    }
  });
}

function addReportCostBandFilter(filters, rows, columnKeys) {
  const monthlyKey = ["Monthly Cost", "Monthly Equivalent Cost"].find((key) => columnKeys.has(key));
  const annualKey = ["Annual Cost", "Annual Equivalent Cost"].find((key) => columnKeys.has(key));
  if (!monthlyKey && !annualKey) return;
  if (!rows.some((row) => reportMonthlyValue(row, monthlyKey, annualKey) > 0)) return;
  filters.push({
    key: "__costBand",
    label: "Cost band",
    allLabel: "All costs",
    options: [
      { value: "none", label: "No cost" },
      { value: "under100", label: "Under $100/mo" },
      { value: "100to499", label: "$100-$499/mo" },
      { value: "500plus", label: "$500+/mo" }
    ],
    predicate: (row, value) => {
      const monthly = reportMonthlyValue(row, monthlyKey, annualKey);
      if (value === "none") return monthly <= 0;
      if (value === "under100") return monthly > 0 && monthly < 100;
      if (value === "100to499") return monthly >= 100 && monthly < 500;
      if (value === "500plus") return monthly >= 500;
      return true;
    }
  });
}

function reportMonthlyValue(row, monthlyKey, annualKey) {
  if (monthlyKey) return numericValue(row[monthlyKey]);
  if (annualKey) return numericValue(row[annualKey]) / 12;
  return 0;
}

function reportCell(row, column) {
  const key = column.key;
  const value = row[key];
  if (value === undefined || value === null || value === "") return "";

  if (key === "Person" || key === "Contractor") return recordLink("person", row._personId, value, "people");
  if (key === "Manager") return recordLink("person", row._managerPersonId, value, "people");
  if (key === "Owner") return recordLink("person", row._ownerPersonId, value, row._systemId ? "systems" : "people");
  if (key === "Department") return recordLink("department", row._departmentId, value, "departments");
  if (key === "Vendor") return recordLink("vendor", row._vendorId, value, "vendors");
  if (key === "System/Asset") return recordLink("system", row._systemId || row.id, value, "systems");
  if (key === "Role") return recordLink("role", row._roleId, value, "roles");
  if (key === "Roles") return recordLinkList("role", row._roleIds, value, "roles");
  if (key === "Severity") return commandLink(value, "actions");
  if (key === "Action" || key === "Reason" || key === "Recommended Action" || key === "Recommended Next Step") return commandLink(value, "actions");

  if (["Assignment Type", "Access Level", "Assignment Status", "Start Date", "End Date"].includes(key) && row._assignmentId) {
    return recordLink("assignment", row._assignmentId, value, "assignments");
  }

  if (["Title", "Employment Type", "Person Status", "Status", "Manager Path", "Systems Touched", "Direct Reports"].includes(key) && row._personId) {
    return recordLink("person", row._personId, value, "people");
  }

  if (["Type", "Billing Frequency", "Cost Amount", "Monthly Equivalent Cost", "Annual Equivalent Cost", "Renewal Date", "Cancellation Deadline", "Auto Renew", "Monthly Cost", "Annual Cost"].includes(key) && row._systemId) {
    return recordLink("system", row._systemId, value, "systems");
  }

  if (["System/Asset Count", "Active People Count", "Active Contractor Count"].includes(key) && row._departmentId) {
    return recordLink("department", row._departmentId, value, "departments");
  }

  if (row._assignmentId) return recordLink("assignment", row._assignmentId, value, "assignments");
  if (row._systemId) return recordLink("system", row._systemId, value, "systems");
  if (row._personId) return recordLink("person", row._personId, value, "people");
  if (row._departmentId) return recordLink("department", row._departmentId, value, "departments");
  if (row._vendorId) return recordLink("vendor", row._vendorId, value, "vendors");
  return escapeHtml(value);
}

function reportDefaultSorts(reportType, columns) {
  const available = new Set(columns.map((column) => column.key));
  const defaults = {
    subscriptionCost: [
      { key: "Vendor", direction: "asc" },
      { key: "Annual Equivalent Cost", direction: "desc" },
      { key: "System/Asset", direction: "asc" }
    ],
    vendorRenewal: [
      { key: "Vendor", direction: "asc" },
      { key: "Annual Cost", direction: "desc" },
      { key: "Renewal Date", direction: "asc" }
    ],
    personAssetSummary: [
      { key: "Vendor", direction: "asc" },
      { key: "Annual Cost", direction: "desc" },
      { key: "Person", direction: "asc" }
    ],
    departmentMonthlyCost: [
      { key: "Annual Cost", direction: "desc" },
      { key: "Department", direction: "asc" }
    ],
    cleanupAction: [
      { key: "Severity", direction: "desc" },
      { key: "Due Date", direction: "asc" },
      { key: "System/Asset", direction: "asc" }
    ]
  };
  const fallback = [{ key: columns[0]?.key || "", direction: defaultSortDirectionForKey(columns[0]?.key || "") }];
  return (defaults[reportType] || fallback).filter((item) => available.has(item.key));
}

function defaultSortDirectionForKey(key) {
  return /cost|count|total|amount|systems|direct reports|days|level|admin/i.test(String(key)) ? "desc" : "asc";
}

function currentSortedReportRows() {
  return currentReportTableState().sortedRows;
}

function renderReportVisuals(rows) {
  if (!rows.length) {
    el.reportVisuals.innerHTML = `<div class="empty-state">No records available for this report.</div>`;
    return;
  }
  const reportType = el.reportType.value;
  const numericKeys = ["Monthly Cost", "Monthly Equivalent Cost", "Annual Cost", "Annual Equivalent Cost", "System/Asset Count", "Systems Touched", "Direct Reports", "Admin-Level Assignments"];
  const primaryNumericKey = numericKeys.find((key) => rows.some((row) => !Number.isNaN(numericValue(row[key]))));
  const sumValue = primaryNumericKey ? rows.reduce((sum, row) => sum + numericValue(row[primaryNumericKey]), 0) : rows.length;
  const groupKey = reportGroupKey(rows, reportType);
  const bars = buildReportBars(rows, groupKey, primaryNumericKey);
  const uniquePeople = new Set(rows.map((row) => row.Person).filter(Boolean)).size;
  const uniqueSystems = new Set(rows.map((row) => row["System/Asset"]).filter(Boolean)).size;
  const uniqueDepartments = new Set(rows.map((row) => row.Department).filter(Boolean)).size;
  const statCards = [
    ["Rows", rows.length, "records in this view", `report-${reportType}`],
    ["People", uniquePeople || "-", "unique people", "people"],
    ["Systems", uniqueSystems || "-", "unique systems/assets", "systems"],
    [primaryNumericKey || "Groups", primaryNumericKey?.includes("Cost") ? money(sumValue) : (primaryNumericKey ? Math.round(sumValue) : bars.length), primaryNumericKey ? "total value" : "reports", primaryNumericKey?.includes("Cost") ? "report-subscriptionCost" : `report-${reportType}`]
  ];

  el.reportVisuals.innerHTML = `
    <div class="report-stat-grid">
      ${statCards.map(([label, value, detail, target]) => `
        <button type="button" class="report-stat-card" data-dashboard-target="${escapeHtml(target)}">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
          <em>${escapeHtml(detail)}</em>
        </button>
      `).join("")}
    </div>
    <div class="report-chart">
      <div class="report-chart-header">
        <div>
          <p class="eyebrow">Visual Breakdown</p>
          <h3>${escapeHtml(groupKey)} ${primaryNumericKey ? `by ${escapeHtml(primaryNumericKey)}` : "by count"}</h3>
        </div>
      </div>
      <div class="bar-list">
        ${bars.map((bar) => `
          <div class="bar-row">
            <span>${reportGroupLink(bar.label, groupKey)}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${bar.percent}%"></div></div>
            <strong>${commandLink(primaryNumericKey?.includes("Cost") ? money(bar.value) : bar.value, primaryNumericKey?.includes("Cost") ? "report-subscriptionCost" : `report-${reportType}`)}</strong>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function reportGroupLink(label, groupKey) {
  if (groupKey === "Department") return recordLink("department", state.departments.find((item) => item.name === label)?.id, label, "departments");
  if (groupKey === "Vendor") return recordLink("vendor", state.vendors.find((item) => item.name === label)?.id, label, "vendors");
  if (groupKey === "Person" || groupKey === "Contractor") return recordLink("person", state.people.find((item) => item.displayName === label)?.id, label, "people");
  if (groupKey === "Role") return recordLink("role", state.roles.find((item) => item.name === label)?.id, label, "roles");
  if (groupKey === "Action") return commandLink(label, "actions");
  if (groupKey === "System/Asset") return recordLink("system", state.systemAssets.find((item) => item.name === label)?.id, label, "systems");
  return commandLink(label, `report-${el.reportType.value}`);
}

function reportGroupKey(rows, reportType) {
  const preferred = {
    staffStructure: "Department",
    orgChartRoster: "Department",
    systemsTouched: "Person",
    subscriptionCost: "Vendor",
    formerStaffAccess: "Person Status",
    contractorAccess: "Department",
    vendorRenewal: "Vendor",
    noOwner: "Department",
    adminAccessByRole: "Role",
    departmentMonthlyCost: "Department",
    personAssetSummary: "Person",
    cleanupAction: "Action"
  }[reportType];
  if (preferred && rows.some((row) => row[preferred])) return preferred;
  return ["Department", "Vendor", "Action", "Status", "Role", "Person"].find((key) => rows.some((row) => row[key])) || Object.keys(rows[0])[0];
}

function buildReportBars(rows, groupKey, numericKey) {
  const grouped = new Map();
  rows.forEach((row) => {
    const label = String(row[groupKey] || "Unassigned");
    const value = numericKey ? numericValue(row[numericKey]) : 1;
    grouped.set(label, (grouped.get(label) || 0) + (Number.isNaN(value) ? 0 : value));
  });
  const sorted = [...grouped.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  const max = Math.max(...sorted.map(([, value]) => value), 1);
  return sorted.map(([label, value]) => ({
    label,
    value: numericKey ? Math.round(value * 100) / 100 : value,
    percent: Math.max(4, Math.round((value / max) * 100))
  }));
}

function renderImports() {
  const types = importTypes();
  fillImportTypeSelect(types);
  el.importSummary.innerHTML = types.map((type) => `
    <article class="operation-card">
      <span class="operation-icon">${escapeHtml(type.short)}</span>
      <div>
        <strong>${escapeHtml(type.label)}</strong>
        <p>${state[type.collection].length} current records</p>
      </div>
      <button type="button" data-template-type="${escapeHtml(type.key)}">Template</button>
    </article>
  `).join("");
  const rows = types.map((type) => ({
    Record: type.label,
    "Current Records": state[type.collection].length,
    "Required Columns": type.required.join(", "),
    "Template Columns": type.columns.join(", "),
    "Section Export Columns": type.exportColumns.join(", ")
  }));
  renderTable(el.importTable, [col("Record"), col("Current Records"), col("Required Columns"), col("Template Columns"), col("Section Export Columns")], rows, { controls: false });
  renderImportPreview();
}

function importTypes() {
  return [
    { key: "people", label: "People", short: "Pe", collection: "people", required: ["firstName", "lastName", "title"], columns: ["id", "companyId", "firstName", "lastName", "displayName", "email", "phone", "title", "employmentType", "status", "departmentId", "managerPersonId", "startDate", "endDate", "notes"], exportColumns: ["Person", "Title", "Department", "Manager", "Employment Type", "Status", "Roles"] },
    { key: "departments", label: "Departments", short: "De", collection: "departments", required: ["name"], columns: ["id", "companyId", "name", "parentDepartmentId", "managerPersonId", "notes"], exportColumns: ["Department", "Parent", "Manager"] },
    { key: "roles", label: "Roles", short: "Ro", collection: "roles", required: ["name"], columns: ["id", "companyId", "name", "description"], exportColumns: ["Role", "Description"] },
    { key: "vendors", label: "Vendors", short: "Ve", collection: "vendors", required: ["name"], columns: ["id", "companyId", "name", "website", "contactName", "contactEmail", "contactPhone", "category", "renewalDate", "notes"], exportColumns: ["Vendor", "Category", "Website", "Next Renewal"] },
    { key: "systemAssets", label: "Systems / Assets", short: "As", collection: "systemAssets", required: ["name", "type"], columns: ["id", "companyId", "vendorId", "name", "type", "category", "description", "status", "ownerPersonId", "departmentId", "billingFrequency", "costAmount", "monthlyEquivalentCost", "annualEquivalentCost", "renewalDate", "cancellationDeadline", "autoRenew", "seatsPurchased", "seatsAssigned", "url", "lastReviewedAt", "notes"], exportColumns: ["System/Asset", "Type", "Vendor", "Department", "Owner", "Billing Frequency", "Monthly Cost", "Annual Cost", "Renewal Date", "Seats", "Status"] },
    { key: "systemAssignments", label: "Assignments", short: "Ac", collection: "systemAssignments", required: ["systemAssetId", "personId"], columns: ["id", "companyId", "systemAssetId", "personId", "assignmentType", "accessLevel", "startDate", "endDate", "status", "notes"], exportColumns: ["Person", "System/Asset", "Assignment Type", "Access Level", "Status", "Start Date", "End Date"] }
  ];
}

function fillImportTypeSelect(types) {
  const current = el.importType.value || "people";
  el.importType.innerHTML = types.map((type) => `<option value="${escapeHtml(type.key)}">${escapeHtml(type.label)}</option>`).join("");
  el.importType.value = types.some((type) => type.key === current) ? current : types[0].key;
}

function importTemplateRows(typeKey) {
  const type = importTypes().find((item) => item.key === typeKey);
  if (!type) return [];
  return [Object.fromEntries(type.columns.map((column) => [column, column === "companyId" ? "c1" : ""]))];
}

function analyzeImportFile() {
  const file = el.importFile.files?.[0];
  const type = importTypes().find((item) => item.key === el.importType.value);
  if (!file || !type) {
    pendingImport = { error: "Choose a record type and CSV file before analyzing." };
    renderImportPreview();
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const parsed = parseCsv(String(reader.result || ""));
    const rows = parsed.rows.map((row, index) => validateImportRow(type, row, index + 2));
    pendingImport = { type, headers: parsed.headers, rows, validRows: rows.filter((row) => row.valid).map((row) => row.source) };
    renderImportPreview();
  };
  reader.readAsText(file);
}

function validateImportRow(type, source, rowNumber) {
  const record = normalizeImportSource(type, source, { createReferences: false });
  const missing = type.required.filter((column) => !String(record[column] ?? "").trim());
  const invalidRefs = invalidImportReferences(type, record);
  const diff = importDiff(type, record);
  const issues = [
    ...missing.map((column) => `Missing ${column}`),
    ...invalidRefs
  ];
  return { rowNumber, source, record, valid: issues.length === 0, issue: issues.length ? issues.join("; ") : "Ready", ...diff };
}

function renderImportPreview() {
  if (!pendingImport) {
    el.importPreview.innerHTML = `<div class="empty-state">Choose a type and CSV file, then analyze it before importing.</div>`;
    el.applyImport.disabled = true;
    return;
  }
  if (pendingImport.error) {
    el.importPreview.innerHTML = `<div class="empty-state">${escapeHtml(pendingImport.error)}</div>`;
    el.applyImport.disabled = true;
    return;
  }
  const validRows = pendingImport.rows.filter((row) => row.valid);
  const counts = {
    New: validRows.filter((row) => row.changeType === "New").length,
    Update: validRows.filter((row) => row.changeType === "Update").length,
    "No change": validRows.filter((row) => row.changeType === "No change").length,
    "Needs Fix": pendingImport.rows.filter((row) => !row.valid).length
  };
  const rows = pendingImport.rows.map((row) => ({
    Row: row.rowNumber,
    Status: row.valid ? row.changeType : "Needs Fix",
    Issue: row.issue,
    Record: row.recordLabel,
    "Diff Preview": row.changeSummary
  }));
  const applyCount = validRows.filter((row) => row.changeType !== "No change").length;
  el.applyImport.disabled = !applyCount;
  el.importPreview.innerHTML = `
    <div class="diff-summary">
      ${Object.entries(counts).map(([label, value]) => `<div><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`).join("")}
    </div>
    <div id="importDiffTable"></div>
  `;
  renderTable(document.querySelector("#importDiffTable"), [
    col("Row"),
    { label: "Status", render: (row) => statusPill(row.Status === "New" || row.Status === "Update" ? "Active" : row.Status === "No change" ? "Pending" : "Inactive") },
    col("Record"),
    col("Issue"),
    col("Diff Preview")
  ], rows, {
    tableId: "importDiffPreview",
    defaultSort: "Row",
    filters: [
      { key: "Status", label: "Status" },
      { key: "Issue", label: "Issue" }
    ],
    exportFilename: `orgassets-import-diff-${pendingImport.type.key}.csv`
  });
}

function applyPendingImport() {
  if (!isAdminUser()) return;
  if (!pendingImport?.validRows?.length) return;
  const applicableRows = pendingImport.rows.filter((row) => row.valid && row.changeType !== "No change");
  applicableRows.forEach((row) => upsertImportedRecord(pendingImport.type, row.source));
  addAuditEvent({
    eventType: "IMPORT_APPLY",
    entityType: pendingImport.type.key,
    entityId: "csv",
    summary: `Applied ${applicableRows.length} ${pendingImport.type.label} import row${applicableRows.length === 1 ? "" : "s"} from diff review.`,
    before: `${pendingImport.rows.length} analyzed`,
    after: `${applicableRows.length} applied`
  });
  state = normalizeState(state);
  saveState();
  pendingImport = null;
  el.importFile.value = "";
  renderAll();
}

function importDiff(type, importedRecord) {
  const existing = findExistingImportedRecord(type, importedRecord);
  const recordLabel = importedRecord.displayName || importedRecord.name || [personName(importedRecord.personId), systemName(importedRecord.systemAssetId)].filter((value) => value && value !== "Unassigned").join(" -> ") || importedRecord.id || "Imported row";
  if (!existing) {
    return {
      changeType: "New",
      recordLabel,
      changeSummary: "New record will be created."
    };
  }
  const changes = importComparableKeys(type, importedRecord).filter((key) => {
    const before = normalizeDiffValue(existing[key]);
    const after = normalizeDiffValue(importedRecord[key]);
    return after !== "" && before !== after;
  }).map((key) => `${key}: ${formatDiffValue(existing[key])} -> ${formatDiffValue(importedRecord[key])}`);
  return {
    changeType: changes.length ? "Update" : "No change",
    recordLabel,
    changeSummary: changes.length ? changes.slice(0, 5).join("; ") : "No field changes detected."
  };
}

function importComparableKeys(type, record) {
  const excluded = new Set(["id", "companyId", "createdAt", "updatedAt", "seatsAssigned"]);
  if (type.key === "people") excluded.add("displayName");
  return Object.keys(record).filter((key) => !excluded.has(key) && key !== "roleIds");
}

function normalizeDiffValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value).trim();
}

function formatDiffValue(value) {
  const text = normalizeDiffValue(value);
  return text || "(blank)";
}

function upsertImportedRecord(type, source) {
  const importedRecord = normalizeImportSource(type, source, { createReferences: true });
  const recordType = {
    people: "person",
    departments: "department",
    roles: "role",
    vendors: "vendor",
    systemAssets: "system",
    systemAssignments: "assignment"
  }[type.key];
  const collection = state[type.collection];
  const existing = findExistingImportedRecord(type, importedRecord);
  const now = new Date().toISOString().slice(0, 10);
  const record = {
    ...(existing ?? {}),
    ...importedRecord,
    id: existing?.id || importedRecord.id || nextRecordId(recordType),
    companyId: importedRecord.companyId || existing?.companyId || "c1",
    createdAt: existing?.createdAt || importedRecord.createdAt || now,
    updatedAt: now
  };
  const roleIds = Array.isArray(record.roleIds) ? record.roleIds : null;
  delete record.roleIds;

  record.id = record.id || nextRecordId(recordType);
  ["costAmount", "monthlyEquivalentCost", "annualEquivalentCost", "seatsPurchased", "seatsAssigned"].forEach((key) => {
    if (record[key] !== undefined) record[key] = numericValue(record[key]) || 0;
  });
  if (type.key === "people") {
    record.employmentType = record.employmentType || state.settings.defaultEmploymentType;
    record.status = record.status || state.settings.defaultPersonStatus;
    normalizeRecord("person", record);
  }
  if (type.key === "systemAssets") {
    record.status = record.status || state.settings.defaultSystemStatus;
    record.billingFrequency = record.billingFrequency || "Monthly";
    record.autoRenew = importBoolean(record.autoRenew);
    recalculateSystemCosts(record);
  }
  if (type.key === "systemAssignments") {
    record.assignmentType = record.assignmentType || "User";
    record.accessLevel = record.accessLevel || state.settings.defaultAssignmentAccess;
    record.status = record.status || "Active";
  }
  if (existing) Object.assign(existing, record);
  else collection.push(record);
  if (type.key === "people" && roleIds) updatePersonRoles(record.id, roleIds);
}

function findExistingImportedRecord(type, record) {
  const collection = state[type.collection] || [];
  if (record.id) {
    const existingById = byId(collection, record.id);
    if (existingById) return existingById;
  }
  if (type.key === "people") {
    const email = normalizeLookup(record.email);
    const name = normalizeLookup(record.displayName || `${record.firstName || ""} ${record.lastName || ""}`);
    return collection.find((item) => (
      (email && normalizeLookup(item.email) === email)
      || (name && normalizeLookup(item.displayName) === name)
    )) || null;
  }
  if (["departments", "roles", "vendors", "systemAssets"].includes(type.key)) {
    const name = normalizeLookup(record.name);
    return collection.find((item) => name && normalizeLookup(item.name) === name) || null;
  }
  if (type.key === "systemAssignments") {
    return collection.find((item) => (
      item.systemAssetId === record.systemAssetId
      && item.personId === record.personId
    )) || null;
  }
  return null;
}

function normalizeImportSource(type, source, { createReferences = false } = {}) {
  const record = {};
  type.columns.forEach((column) => {
    const value = source[column];
    if (value !== undefined && value !== "") record[column] = value;
  });

  if (type.key === "people") mapPeopleImport(record, source, createReferences);
  if (type.key === "departments") mapDepartmentImport(record, source, createReferences);
  if (type.key === "roles") mapRoleImport(record, source);
  if (type.key === "vendors") mapVendorImport(record, source);
  if (type.key === "systemAssets") mapSystemImport(record, source, createReferences);
  if (type.key === "systemAssignments") mapAssignmentImport(record, source, createReferences);

  sanitizeImportedRecordIds(type, record);
  record.companyId = record.companyId || "c1";
  return record;
}

function mapPeopleImport(record, source, createReferences) {
  const displayName = importValue(source, ["displayName", "Person", "Name"]);
  if (!record.firstName || !record.lastName) {
    const [firstName, lastName] = splitPersonName(displayName);
    record.firstName = record.firstName || firstName;
    record.lastName = record.lastName || lastName;
  }
  assignImportValue(record, "displayName", displayName);
  assignImportValue(record, "title", importValue(source, ["Title"]));
  assignImportValue(record, "employmentType", importValue(source, ["Employment Type"]));
  assignImportValue(record, "status", importValue(source, ["Status"]));
  assignImportValue(record, "startDate", importValue(source, ["Start Date"]));
  assignImportValue(record, "endDate", importValue(source, ["End Date"]));
  const department = importValue(source, ["Department"]);
  if (department) record.departmentId = record.departmentId || resolveDepartmentId(department, createReferences);
  const manager = importValue(source, ["Manager"]);
  if (manager) record.managerPersonId = record.managerPersonId || resolvePersonId(manager, false);
  if (hasImportColumn(source, ["Roles", "Role", "roleIds"])) {
    record.roleIds = resolveRoleIds(importValue(source, ["Roles", "Role", "roleIds"]), createReferences);
  }
}

function mapDepartmentImport(record, source, createReferences) {
  assignImportValue(record, "name", importValue(source, ["Department", "Department Name", "Name"]));
  const parent = importValue(source, ["Parent", "Parent Department"]);
  if (parent) record.parentDepartmentId = record.parentDepartmentId || resolveDepartmentId(parent, createReferences);
  const manager = importValue(source, ["Manager"]);
  if (manager) record.managerPersonId = record.managerPersonId || resolvePersonId(manager, false);
}

function mapRoleImport(record, source) {
  assignImportValue(record, "name", importValue(source, ["Role", "Role Name", "Name"]));
  assignImportValue(record, "description", importValue(source, ["Description"]));
}

function mapVendorImport(record, source) {
  assignImportValue(record, "name", importValue(source, ["Vendor", "Vendor Name", "Name"]));
  assignImportValue(record, "category", importValue(source, ["Category"]));
  assignImportValue(record, "website", importValue(source, ["Website"]));
  assignImportValue(record, "renewalDate", importValue(source, ["Next Renewal", "Vendor Renewal Date", "Renewal Date"]));
}

function mapSystemImport(record, source, createReferences) {
  assignImportValue(record, "name", importValue(source, ["System/Asset", "System / Asset", "System / Asset Name", "Name"]));
  assignImportValue(record, "type", importValue(source, ["Type"]));
  assignImportValue(record, "category", importValue(source, ["Category"]));
  assignImportValue(record, "status", importValue(source, ["Status"]));
  const vendor = importValue(source, ["Vendor"]);
  if (vendor) record.vendorId = record.vendorId || resolveVendorId(vendor, createReferences);
  const owner = importValue(source, ["Owner"]);
  if (owner) record.ownerPersonId = record.ownerPersonId || resolvePersonId(owner, false);
  const department = importValue(source, ["Department"]);
  if (department) record.departmentId = record.departmentId || resolveDepartmentId(department, createReferences);
  assignImportValue(record, "billingFrequency", importValue(source, ["Billing Frequency"]));
  if (hasImportColumn(source, ["costAmount", "Cost Amount", "Monthly Cost", "Monthly Equivalent Cost", "Annual Cost", "Annual Equivalent Cost"])) {
    record.costAmount = record.costAmount || importCostAmount(source, record.billingFrequency || "Monthly");
  }
  assignImportValue(record, "renewalDate", importValue(source, ["Renewal Date", "Next Renewal"]));
  assignImportValue(record, "cancellationDeadline", importValue(source, ["Cancellation Deadline"]));
  if (hasImportColumn(source, ["Auto Renew", "autoRenew"])) record.autoRenew = record.autoRenew ?? importValue(source, ["Auto Renew", "autoRenew"]);
  if (hasImportColumn(source, ["Seats", "seatsPurchased", "Seats Purchased"])) record.seatsPurchased = record.seatsPurchased || importSeatsPurchased(source);
}

function mapAssignmentImport(record, source, createReferences) {
  const person = importValue(source, ["Person", "Contractor"]);
  const system = importValue(source, ["System/Asset", "System / Asset"]);
  if (person) record.personId = record.personId || resolvePersonId(person, false);
  if (system) record.systemAssetId = record.systemAssetId || resolveSystemId(system, false);
  assignImportValue(record, "assignmentType", importValue(source, ["Assignment Type"]));
  assignImportValue(record, "accessLevel", importValue(source, ["Access Level"]));
  assignImportValue(record, "status", importValue(source, ["Status", "Assignment Status"]));
  assignImportValue(record, "startDate", importValue(source, ["Start Date"]));
  assignImportValue(record, "endDate", importValue(source, ["End Date"]));
  if (!record.personId && createReferences && person) record.personId = resolvePersonId(person, true);
  if (!record.systemAssetId && createReferences && system) record.systemAssetId = resolveSystemId(system, true);
}

function assignImportValue(record, key, value) {
  if (value !== undefined && value !== null && String(value).trim() !== "") record[key] = value;
}

function hasImportColumn(source, aliases) {
  const normalizedAliases = new Set(aliases.map((alias) => normalizeLookup(alias)));
  return Object.keys(source).some((key) => normalizedAliases.has(normalizeLookup(key)));
}

function importValue(source, aliases) {
  for (const alias of aliases) {
    if (source[alias] !== undefined && String(source[alias]).trim() !== "") return String(source[alias]).trim();
  }
  const normalizedAliases = new Set(aliases.map((alias) => normalizeLookup(alias)));
  const match = Object.entries(source).find(([key, value]) => normalizedAliases.has(normalizeLookup(key)) && String(value ?? "").trim() !== "");
  return match ? String(match[1]).trim() : "";
}

function normalizeLookup(value) {
  return String(value ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function safeImportedId(value) {
  const text = String(value ?? "").trim();
  return /^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(text) ? text : "";
}

function sanitizeImportedRecordIds(type, record) {
  record.id = safeImportedId(record.id);
  record.companyId = safeImportedId(record.companyId) || "c1";
  const referenceKeys = {
    people: ["departmentId", "managerPersonId"],
    departments: ["parentDepartmentId", "managerPersonId"],
    systemAssets: ["vendorId", "ownerPersonId", "departmentId"],
    systemAssignments: ["systemAssetId", "personId"]
  }[type.key] || [];
  referenceKeys.forEach((key) => {
    if (record[key] !== undefined) record[key] = safeImportedId(record[key]);
  });
}

function invalidImportReferences(type, record) {
  const issues = [];
  const check = (condition, message) => {
    if (condition) issues.push(message);
  };
  if (type.key === "people") {
    check(record.departmentId && !byId(state.departments, record.departmentId), `Unknown departmentId ${record.departmentId}`);
    check(record.managerPersonId && !byId(state.people, record.managerPersonId), `Unknown managerPersonId ${record.managerPersonId}`);
  }
  if (type.key === "departments") {
    check(record.parentDepartmentId && !byId(state.departments, record.parentDepartmentId), `Unknown parentDepartmentId ${record.parentDepartmentId}`);
    check(record.managerPersonId && !byId(state.people, record.managerPersonId), `Unknown managerPersonId ${record.managerPersonId}`);
  }
  if (type.key === "systemAssets") {
    check(record.vendorId && !byId(state.vendors, record.vendorId), `Unknown vendorId ${record.vendorId}`);
    check(record.ownerPersonId && !byId(state.people, record.ownerPersonId), `Unknown ownerPersonId ${record.ownerPersonId}`);
    check(record.departmentId && !byId(state.departments, record.departmentId), `Unknown departmentId ${record.departmentId}`);
  }
  if (type.key === "systemAssignments") {
    check(record.personId && !byId(state.people, record.personId), `Unknown personId ${record.personId}`);
    check(record.systemAssetId && !byId(state.systemAssets, record.systemAssetId), `Unknown systemAssetId ${record.systemAssetId}`);
  }
  return issues;
}

function splitPersonName(displayName) {
  const parts = String(displayName || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return ["", ""];
  if (parts.length === 1) return [parts[0], ""];
  return [parts[0], parts.slice(1).join(" ")];
}

function resolveByName(collection, nameKeys, value) {
  const normalized = normalizeLookup(value);
  if (!normalized || normalized === normalizeLookup("Unassigned") || normalized === normalizeLookup("No owner") || normalized === normalizeLookup("No manager")) return "";
  const direct = collection.find((item) => normalizeLookup(item.id) === normalized);
  if (direct) return direct.id;
  const keys = Array.isArray(nameKeys) ? nameKeys : [nameKeys];
  return collection.find((item) => keys.some((key) => normalizeLookup(item[key]) === normalized))?.id || "";
}

function resolveDepartmentId(value, createReferences = false) {
  const id = resolveByName(state.departments, "name", value);
  if (id || !createReferences || !String(value || "").trim()) return id;
  const now = new Date().toISOString().slice(0, 10);
  const department = { id: nextRecordId("department"), companyId: "c1", name: String(value).trim(), parentDepartmentId: null, managerPersonId: null, notes: "", createdAt: now, updatedAt: now };
  state.departments.push(department);
  return department.id;
}

function resolveRoleIds(value, createReferences = false) {
  return splitReportLabels(value).map((roleLabel) => resolveRoleId(roleLabel, createReferences)).filter(Boolean);
}

function resolveRoleId(value, createReferences = false) {
  const id = resolveByName(state.roles, "name", value);
  if (id || !createReferences || !String(value || "").trim()) return id;
  const now = new Date().toISOString().slice(0, 10);
  const role = { id: nextRecordId("role"), companyId: "c1", name: String(value).trim(), description: "Imported role", createdAt: now, updatedAt: now };
  state.roles.push(role);
  return role.id;
}

function resolveVendorId(value, createReferences = false) {
  const id = resolveByName(state.vendors, "name", value);
  if (id || !createReferences || !String(value || "").trim()) return id;
  const now = new Date().toISOString().slice(0, 10);
  const vendor = { id: nextRecordId("vendor"), companyId: "c1", name: String(value).trim(), website: "", contactName: "", contactEmail: "", contactPhone: "", category: "", renewalDate: "", notes: "", createdAt: now, updatedAt: now };
  state.vendors.push(vendor);
  return vendor.id;
}

function resolvePersonId(value, createReferences = false) {
  const id = resolveByName(state.people, ["displayName", "email"], value);
  if (id || !createReferences || !String(value || "").trim()) return id;
  const [firstName, lastName] = splitPersonName(value);
  const now = new Date().toISOString().slice(0, 10);
  const personRecord = {
    id: nextRecordId("person"),
    companyId: "c1",
    firstName,
    lastName,
    displayName: String(value).trim(),
    email: "",
    phone: "",
    title: "Imported contact",
    employmentType: state.settings.defaultEmploymentType,
    status: state.settings.defaultPersonStatus,
    departmentId: "",
    managerPersonId: null,
    startDate: "",
    endDate: "",
    notes: "",
    createdAt: now,
    updatedAt: now
  };
  normalizeRecord("person", personRecord);
  state.people.push(personRecord);
  return personRecord.id;
}

function resolveSystemId(value, createReferences = false) {
  const id = resolveByName(state.systemAssets, "name", value);
  if (id || !createReferences || !String(value || "").trim()) return id;
  const now = new Date().toISOString().slice(0, 10);
  const system = {
    id: nextRecordId("system"),
    companyId: "c1",
    name: String(value).trim(),
    type: "Imported",
    category: "",
    status: state.settings.defaultSystemStatus,
    vendorId: "",
    ownerPersonId: "",
    departmentId: "",
    billingFrequency: "Free",
    costAmount: 0,
    renewalDate: "",
    cancellationDeadline: "",
    autoRenew: false,
    seatsPurchased: 0,
    seatsAssigned: 0,
    url: "",
    lastReviewedAt: "",
    description: "",
    notes: "",
    createdAt: now,
    updatedAt: now
  };
  recalculateSystemCosts(system);
  state.systemAssets.push(system);
  return system.id;
}

function importCostAmount(source, billingFrequency) {
  const explicit = importValue(source, ["costAmount", "Cost Amount"]);
  if (explicit) return numericValue(explicit);
  const monthly = numericValue(importValue(source, ["Monthly Cost", "Monthly Equivalent Cost"]));
  const annual = numericValue(importValue(source, ["Annual Cost", "Annual Equivalent Cost"]));
  if (billingFrequency === "Annual" && annual) return annual;
  if (billingFrequency === "Quarterly" && monthly) return monthly * 3;
  if (billingFrequency === "Monthly" && monthly) return monthly;
  if (annual) return annual;
  return monthly || 0;
}

function importSeatsPurchased(source) {
  const explicit = importValue(source, ["seatsPurchased", "Seats Purchased"]);
  if (explicit) return numericValue(explicit);
  const seats = importValue(source, ["Seats"]);
  if (!seats) return "";
  const match = seats.match(/\/\s*([\d,.]+)/);
  return match ? numericValue(match[1]) : "";
}

function importBoolean(value) {
  if (typeof value === "boolean") return value;
  const normalized = String(value ?? "").trim().toLowerCase();
  return ["true", "yes", "1", "y"].includes(normalized);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === "\"" && quoted && next === "\"") {
      value += "\"";
      i += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(value);
      if (row.some((cell) => cell !== "")) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }
  row.push(value);
  if (row.some((cell) => cell !== "")) rows.push(row);
  const headers = (rows.shift() || []).map((header, index) => (index === 0 ? header.replace(/^\uFEFF/, "") : header).trim());
  return { headers, rows: rows.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]))) };
}

function downloadCsv(name, rows) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]).filter((key) => !key.startsWith("_"));
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => `"${csvSafeValue(row[header]).replaceAll("\"", "\"\"")}"`).join(","))
  ].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

function csvSafeValue(value) {
  const text = String(value ?? "");
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function downloadTableExport(tableId) {
  const table = tableExportCache[tableId];
  if (!table?.rows?.length) return;
  const keys = table.columns.map((column) => column.key).filter(Boolean);
  const rows = table.rows.map((row) => Object.fromEntries(keys.map((key) => [key, row[key] ?? ""])));
  downloadCsv(table.filename, rows);
}

function downloadBlob(name, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

function setBackupMessage(message) {
  if (el.backupRestoreMessage) el.backupRestoreMessage.textContent = message;
}

async function downloadPortalBackupZip() {
  if (!isAdminUser()) {
    setBackupMessage("Folder backup requires an admin account.");
    return;
  }
  if (staticDemoHost) {
    setBackupMessage("Folder Backup ZIP is available in local server installs only. The GitHub Pages demo runs as a static browser-only portal.");
    return;
  }
  const originalText = el.downloadPortalBackup.textContent;
  el.downloadPortalBackup.disabled = true;
  el.downloadPortalBackup.textContent = "Preparing...";
  setBackupMessage("Preparing host folder backup...");
  try {
    const tokenResponse = await fetch("/api/backup-token", {
      method: "POST",
      credentials: "same-origin"
    });
    if (!tokenResponse.ok) throw new Error(await tokenResponse.text() || "Backup token request failed.");
    const response = await fetch("/api/folder-backup", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storageKey, state })
    });
    if (!response.ok) throw new Error(await response.text() || "Folder backup failed.");
    const blob = await response.blob();
    const disposition = response.headers.get("content-disposition") || "";
    const name = disposition.match(/filename="([^"]+)"/)?.[1] || `asset-topology-folder-backup-${new Date().toISOString().slice(0, 10)}.zip`;
    downloadBlob(name, blob);
    setBackupMessage("Host folder backup ZIP downloaded.");
  } catch (error) {
    setBackupMessage(error.message || "Folder backup failed. Make sure the local server is running.");
  } finally {
    el.downloadPortalBackup.disabled = false;
    el.downloadPortalBackup.textContent = originalText;
  }
}

function currentUser() {
  return state.users.find((user) => user.id === currentUserId && user.status === "Active") || null;
}

function isAdminUser(user = currentUser()) {
  return user?.role === "admin";
}

function canAccessView(view) {
  if (!view) return false;
  return isAdminUser() || !adminOnlyViews.has(view);
}

async function loginUser(event) {
  event.preventDefault();
  await ensurePasswordsMigrated();
  const username = el.loginUsername.value.trim().toLowerCase();
  const password = el.loginPassword.value;
  const user = state.users.find((item) => item.status === "Active" && item.username.toLowerCase() === username);
  if (!user || !(await verifyUserPassword(user, password))) {
    el.loginError.textContent = "Username or password is incorrect.";
    return;
  }
  currentUserId = user.id;
  sessionStorage.setItem(sessionUserKey, currentUserId);
  el.loginError.textContent = "";
  el.loginPassword.value = "";
  if (el.loginDialog.open) el.loginDialog.close();
  renderAuthState();
  setView(canAccessView(currentView) ? currentView : "dashboard");
}

function logoutCurrentUser() {
  currentUserId = "";
  sessionStorage.removeItem(sessionUserKey);
  setDetailPanelOpen(false);
  el.loginUsername.value = "";
  el.loginPassword.value = "";
  el.loginError.textContent = "";
  currentView = "dashboard";
  el.navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === currentView));
  el.views.forEach((section) => section.classList.toggle("active", section.id === currentView));
  el.viewTitle.textContent = "Dashboard";
  renderAuthState();
}

function renderAuthState() {
  const user = currentUser();
  const admin = isAdminUser(user);
  document.body.classList.toggle("logged-out", !user);
  el.currentUserLabel.textContent = user ? `${user.username} (${user.role})` : "Not signed in";
  el.logoutUser.hidden = !user;
  el.navItems.forEach((item) => {
    item.hidden = Boolean(user) && !canAccessView(item.dataset.view);
  });
  document.querySelectorAll("[data-view-jump]").forEach((item) => {
    item.hidden = Boolean(user) && !canAccessView(item.dataset.viewJump);
  });
  document.querySelectorAll("[data-record-action]").forEach((item) => {
    item.hidden = Boolean(user) && !admin;
  });
  [el.topologyOrganizeTree, el.topologyUndoTree, el.topologyRedoTree].forEach((item) => {
    if (item) item.hidden = Boolean(user) && !admin;
  });
  if (!admin && topologyOrganizeMode) {
    topologyOrganizeMode = false;
    clearOrgDropState();
  }
  if (user && !canAccessView(currentView)) {
    currentView = "dashboard";
  }
  if (!user && !el.loginDialog.open) {
    el.loginDialog.showModal();
    el.loginUsername.focus();
  }
}

function preserveUsersForDataReset(nextState) {
  const users = state.users?.length ? state.users : [defaultAdminUser()];
  nextState.users = users;
  return normalizeState(nextState);
}

function preserveAdminAndCustomUsersForDataClear(nextState) {
  const admin = defaultAdminUser();
  const users = (state.users?.length ? state.users : [admin])
    .filter((user) => {
      const isDefaultAdmin = String(user.username || "").trim().toLowerCase() === "admin";
      const isCustomAccount = !user.personId;
      return isDefaultAdmin || isCustomAccount;
    })
    .map((user) => ({ ...user, personId: "" }));
  if (!users.some((user) => String(user.username || "").trim().toLowerCase() === "admin")) {
    users.unshift(admin);
  }
  nextState.users = users;
  return normalizeState(nextState);
}

async function exportCurrentReportPdf() {
  const tableState = currentReportTableState();
  const rows = tableState.sortedRows;
  if (!rows.length) return;
  const columns = tableState.columns.map((column) => column.key).filter(Boolean);
  const selectedReport = el.reportType.options[el.reportType.selectedIndex]?.textContent || "OrgAssets Report";
  const selectedDepartment = el.reportDepartment.options[el.reportDepartment.selectedIndex]?.textContent || "All departments";
  const originalButtonText = el.printReport.textContent;
  el.printReport.disabled = true;
  el.printReport.textContent = "Preparing...";
  try {
    const logo = await reportLogoPdfPayload();
    const blob = buildReportPdf({
      title: selectedReport,
      question: reportPdfContext(tableState),
      department: selectedDepartment,
      rows,
      columns,
      logo
    });
    downloadBlob(`orgassets-report-${el.reportType.value}.pdf`, blob);
  } finally {
    el.printReport.disabled = false;
    el.printReport.textContent = originalButtonText;
  }
}

function reportPdfContext(tableState) {
  const pieces = [reportQuestions[el.reportType.value]];
  const filterSummary = reportFilterSummary(tableState.options, tableState.prefs);
  const sortSummary = reportSortSummary(tableState.prefs);
  pieces.push(`${tableState.sortedRows.length} filtered row${tableState.sortedRows.length === 1 ? "" : "s"}.`);
  if (filterSummary) pieces.push(`Filters: ${filterSummary}.`);
  if (sortSummary) pieces.push(`Sort: ${sortSummary}.`);
  return pieces.join(" ");
}

function reportFilterSummary(options, prefs) {
  return Object.entries(prefs.filters ?? {})
    .filter(([, value]) => value)
    .map(([key, value]) => {
      const definition = options.filters?.find((filter) => filter.key === key);
      const option = definition?.options?.find((item) => String(typeof item === "object" ? item.value : item) === String(value));
      const label = typeof option === "object" ? option.label : option;
      return `${definition?.label || key}: ${label || value}`;
    })
    .join("; ");
}

function reportSortSummary(prefs) {
  return (prefs.sortStack ?? [])
    .filter((item) => item.key)
    .map((item) => `${item.key} ${item.direction === "desc" ? "desc" : "asc"}`)
    .join(", ");
}

async function exportOrgChartPdf() {
  const originalButtonText = el.topologyPrintPdf.textContent;
  el.topologyPrintPdf.disabled = true;
  el.topologyPrintPdf.textContent = "Preparing...";
  try {
    const logo = await reportLogoPdfPayload();
    const model = topologyModel();
    const cardDetail = topologyCardDetailOptions();
    const printMode = el.topologyPrintMode?.value === "simple" ? "simple" : "full";
    const blob = printMode === "simple"
      ? buildSimpleOrgChartPdf({ model, logo })
      : buildOrgChartPdf({ model, cardDetail, logo });
    const dateStamp = new Date().toISOString().slice(0, 10);
    downloadBlob(`orgassets-employee-org-chart-${printMode}-${dateStamp}.pdf`, blob);
  } finally {
    el.topologyPrintPdf.disabled = false;
    el.topologyPrintPdf.textContent = originalButtonText;
  }
}

function buildOrgChartPdf({ model, cardDetail, logo }) {
  const pageWidth = 792;
  const pageHeight = 612;
  const margin = 36;
  const footerY = 32;
  const rowGap = 8;
  const rows = flattenOrgChartRows(model.rootPeople, model.childrenByManager);
  const detailLabels = orgChartSelectedDetailLabels(cardDetail);
  const pages = [];
  let cmds = [];
  let y = pageHeight - 154;

  const startPage = () => {
    cmds = [];
    drawReportPdfHeader(cmds, {
      title: "Employee Org Chart Printable View",
      question: detailLabels.length ? `Includes: ${detailLabels.join(", ")}` : "Basic card view. Turn on card detail boxes before export to include systems, roles, or access flags.",
      department: model.departmentLabel,
      pageWidth,
      pageHeight,
      margin,
      logo
    });
    if (!rows.length) {
      pdfText(cmds, "No people match this org chart scope.", margin, y, 10, "F1", [84, 99, 103]);
    }
  };

  startPage();
  rows.forEach((row) => {
    const lines = orgChartPrintLines(row.personRecord, cardDetail);
    const boxHeight = Math.max(46, 30 + (lines.details.length * 12));
    if (y - boxHeight < footerY) {
      pages.push(cmds.join("\n"));
      y = pageHeight - 154;
      startPage();
    }
    drawOrgChartPdfCard(cmds, { row, lines, cardDetail, pageWidth, margin, y, boxHeight });
    y -= boxHeight + rowGap;
  });
  pages.push(cmds.join("\n"));
  return createPdfBlob({ pageWidth, pageHeight, pages, logo });
}

function flattenOrgChartRows(rootPeople, childrenByManager, level = 0, rows = []) {
  rootPeople.forEach((personRecord) => {
    rows.push({ personRecord, level });
    flattenOrgChartRows(childrenByManager[personRecord.id] ?? [], childrenByManager, level + 1, rows);
  });
  return rows;
}

function flattenOrgChartTreeRows(rootPeople, childrenByManager, level = 0, ancestorLast = [], rows = []) {
  rootPeople.forEach((personRecord, index) => {
    const isLast = index === rootPeople.length - 1;
    rows.push({ personRecord, level, ancestorLast: ancestorLast.slice(), isLast });
    flattenOrgChartTreeRows(childrenByManager[personRecord.id] ?? [], childrenByManager, level + 1, [...ancestorLast, isLast], rows);
  });
  return rows;
}

function buildSimpleOrgChartPdf({ model, logo }) {
  const pageWidth = 792;
  const pageHeight = 612;
  const margin = 36;
  const footerY = 30;
  const rowHeight = 38;
  const rows = flattenOrgChartTreeRows(model.rootPeople, model.childrenByManager);
  const pages = [];
  let cmds = [];
  let y = pageHeight - 154;

  const startPage = () => {
    cmds = [];
    drawReportPdfHeader(cmds, {
      title: "Employee Org Chart Simple Printable View",
      question: "Simple view: head icons, names, and titles only.",
      department: model.departmentLabel,
      pageWidth,
      pageHeight,
      margin,
      logo
    });
    if (!rows.length) {
      pdfText(cmds, "No people match this org chart scope.", margin, y, 10, "F1", [84, 99, 103]);
    }
  };

  startPage();
  rows.forEach((row) => {
    if (y - rowHeight < footerY) {
      pages.push(cmds.join("\n"));
      y = pageHeight - 154;
      startPage();
    }
    drawSimpleOrgChartRow(cmds, { row, margin, pageWidth, y, rowHeight });
    y -= rowHeight;
  });
  pages.push(cmds.join("\n"));
  return createPdfBlob({ pageWidth, pageHeight, pages, logo });
}

function orgChartSelectedDetailLabels(cardDetail) {
  return [
    cardDetail.systems ? "systems touched" : "",
    cardDetail.roles ? "roles" : "",
    cardDetail.accessFlags ? "access flags" : ""
  ].filter(Boolean);
}

function orgChartPrintLines(personRecord, cardDetail) {
  const activeAssignments = state.systemAssignments
    .filter((assignment) => assignment.personId === personRecord.id && assignment.status === "Active")
    .sort((a, b) => systemName(a.systemAssetId).localeCompare(systemName(b.systemAssetId)));
  const roles = personRoles(personRecord.id);
  const details = [];

  if (cardDetail.systems) {
    const systemNames = activeAssignments.map((assignment) => systemName(assignment.systemAssetId));
    const shownSystems = systemNames.slice(0, 6);
    const moreLabel = systemNames.length > shownSystems.length ? `, +${systemNames.length - shownSystems.length} more` : "";
    details.push(`Systems: ${shownSystems.length ? `${shownSystems.join(", ")}${moreLabel}` : "No active systems"}`);
  }

  if (cardDetail.roles) {
    details.push(`Roles: ${roles.length ? roles.join(", ") : "No role"}`);
  }

  if (cardDetail.accessFlags) {
    const adminCount = activeAssignments.filter((assignment) => adminLevels.has(assignment.accessLevel)).length;
    const flags = [];
    if (personRecord.status !== "Active") flags.push(`Status: ${personRecord.status}`);
    if (contractorTypes.has(personRecord.employmentType) && personRecord.endDate && daysUntil(personRecord.endDate) < 0) flags.push(`Past end: ${personRecord.endDate}`);
    if (adminCount) flags.push(`${adminCount} admin access`);
    if (activeAssignments.length >= 8) flags.push(`${activeAssignments.length} systems touched`);
    details.push(`Access flags: ${flags.length ? flags.join(", ") : "OK"}`);
  }

  return {
    name: personRecord.displayName,
    subtitle: `${personRecord.title} | ${departmentName(personRecord.departmentId)} | ${personRecord.employmentType} | ${personRecord.status}`,
    details
  };
}

function drawOrgChartPdfCard(cmds, { row, lines, pageWidth, margin, y, boxHeight }) {
  const maxIndent = 180;
  const indent = Math.min(row.level * 24, maxIndent);
  const x = margin + indent;
  const width = pageWidth - margin - x;
  const bottom = y - boxHeight;
  const fill = row.level % 2 === 0 ? [249, 251, 249] : [244, 248, 245];
  pdfRect(cmds, x, bottom, width, boxHeight, fill);
  pdfLine(cmds, x, bottom + boxHeight, x + width, bottom + boxHeight, [199, 211, 203], 0.7);
  pdfLine(cmds, x, bottom, x + width, bottom, [216, 225, 219], 0.5);
  pdfLine(cmds, x, bottom, x, bottom + boxHeight, [216, 225, 219], 0.5);
  pdfLine(cmds, x + width, bottom, x + width, bottom + boxHeight, [216, 225, 219], 0.5);
  if (row.level > 0) {
    pdfLine(cmds, x - 14, bottom + (boxHeight / 2), x - 4, bottom + (boxHeight / 2), [153, 169, 158], 0.8);
  }
  pdfText(cmds, fitPdfText(lines.name, width - 18, 10.5), x + 9, y - 16, 10.5, "F2", [31, 42, 46]);
  pdfText(cmds, fitPdfText(lines.subtitle, width - 18, 8.2), x + 9, y - 29, 8.2, "F1", [84, 99, 103]);
  lines.details.forEach((detail, index) => {
    pdfText(cmds, fitPdfText(detail, width - 18, 7.6), x + 9, y - 42 - (index * 12), 7.6, "F1", [53, 65, 69]);
  });
}

function drawSimpleOrgChartRow(cmds, { row, margin, pageWidth, y, rowHeight }) {
  const step = 34;
  const iconRadius = 12;
  const centerY = y - (rowHeight / 2);
  const maxIndent = Math.min(300, pageWidth - margin * 2 - 280);
  const levelOffset = Math.min(row.level * step, maxIndent);
  const iconX = margin + levelOffset + iconRadius + 4;
  const lineColor = [118, 159, 142];
  const muted = [84, 99, 103];

  row.ancestorLast.forEach((ancestorIsLast, index) => {
    if (ancestorIsLast) return;
    const lineX = margin + Math.min(index * step, maxIndent) + iconRadius + 4;
    pdfLine(cmds, lineX, y - 2, lineX, y - rowHeight + 2, lineColor, 1.2);
  });

  if (row.level > 0) {
    const parentX = margin + Math.min((row.level - 1) * step, maxIndent) + iconRadius + 4;
    pdfLine(cmds, parentX, y - 2, parentX, centerY, lineColor, 1.2);
    pdfLine(cmds, parentX, centerY, iconX - iconRadius - 3, centerY, lineColor, 1.2);
    if (!row.isLast) pdfLine(cmds, parentX, centerY, parentX, y - rowHeight + 2, lineColor, 1.2);
  }

  drawPersonPdfIcon(cmds, iconX, centerY, iconRadius, row.level);
  const textX = iconX + iconRadius + 10;
  const availableWidth = pageWidth - margin - textX;
  pdfText(cmds, fitPdfText(row.personRecord.displayName, availableWidth, 9.2), textX, centerY + 3, 9.2, "F2", [31, 42, 46]);
  pdfText(cmds, fitPdfText(row.personRecord.title || "Untitled", availableWidth, 7.5), textX, centerY - 9, 7.5, "F1", muted);
}

function drawPersonPdfIcon(cmds, x, y, radius, level) {
  const accentPalette = [
    [77, 132, 112],
    [197, 124, 72],
    [61, 100, 125],
    [183, 159, 72],
    [119, 104, 151]
  ];
  const accent = accentPalette[level % accentPalette.length];
  pdfCircle(cmds, x, y, radius, { fill: [255, 255, 255], stroke: accent, lineWidth: 1.4 });
  pdfCircle(cmds, x, y + 3.5, radius * 0.3, { fill: [226, 233, 229] });
  pdfRoundedRect(cmds, x - radius * 0.48, y - radius * 0.6, radius * 0.96, radius * 0.48, 2, accent);
  pdfLine(cmds, x - radius * 0.42, y - radius * 0.18, x + radius * 0.42, y - radius * 0.18, [255, 255, 255], 0.5);
}

function reportHeaderLines() {
  const text = (state.company.reportHeader || state.company.name || "OrgAssets Report").trim();
  return (text || "OrgAssets Report").split(/\r?\n/).map((line) => line.trim()).filter(Boolean).slice(0, 4);
}

function reportLogoSource() {
  return state.company.logoUrl || "./assets/brand/techsavvy-logo.png";
}

async function reportLogoPdfPayload() {
  const src = reportLogoSource();
  if (!src) return null;
  try {
    return await imageSourceToJpegPayload(src, 420, 180);
  } catch {
    return null;
  }
}

function buildReportPdf({ title, question, department, rows, columns, logo }) {
  const pageWidth = 792;
  const pageHeight = 612;
  const margin = 36;
  const footerY = 24;
  const tableTop = pageHeight - 150;
  const rowHeight = 20;
  const headerHeight = 18;
  const usableHeight = tableTop - footerY - headerHeight - 10;
  const rowsPerPage = Math.max(1, Math.floor(usableHeight / rowHeight));
  const columnWidths = reportPdfColumnWidths(columns, pageWidth - (margin * 2));
  const fontSize = columns.length > 8 ? 7 : 8;
  const pages = [];

  pages.push(drawReportSummaryPage({ title, question, department, rows, pageWidth, pageHeight, margin, logo }));

  for (let start = 0; start < rows.length; start += rowsPerPage) {
    const pageRows = rows.slice(start, start + rowsPerPage);
    const cmds = [];
    drawReportPdfHeader(cmds, { title, question, department, pageWidth, pageHeight, margin, logo });
    drawReportPdfTable(cmds, { rows: pageRows, columns, columnWidths, margin, tableTop, rowHeight, headerHeight, fontSize });
    pages.push(cmds.join("\n"));
  }

  return createPdfBlob({ pageWidth, pageHeight, pages, logo });
}

function drawReportSummaryPage({ title, question, department, rows, pageWidth, pageHeight, margin, logo }) {
  const cmds = [];
  drawReportPdfHeader(cmds, { title: `${title} Summary`, question, department, pageWidth, pageHeight, margin, logo });
  const activeSystems = state.systemAssets.filter((system) => system.status === "Active");
  const totalSpend = activeSystems.reduce((sum, system) => sum + Number(system.monthlyEquivalentCost || 0), 0);
  const activeUsers = state.people.filter((personRecord) => personRecord.status === "Active" && personRecord.employmentType !== "Vendor Contact").length;
  const openActions = getActionItems().length;
  const adminAssignments = state.systemAssignments.filter((assignment) => assignment.status === "Active" && adminLevels.has(assignment.accessLevel)).length;
  const cards = [
    ["Filtered Rows", rows.length, "records in this export"],
    ["Monthly Spend", money(totalSpend), `${money(totalSpend * 12)} annualized`],
    ["Active Users", activeUsers, "staff and contractors"],
    ["Open Cleanup", openActions, "generated action items"],
    ["Admin Access", adminAssignments, "active admin-level assignments"],
    ["Active Assets", activeSystems.length, "systems/assets tracked"]
  ];
  const startY = pageHeight - 190;
  const cardWidth = (pageWidth - (margin * 2) - 24) / 3;
  const cardHeight = 74;
  cards.forEach(([label, value, detail], index) => {
    const colIndex = index % 3;
    const rowIndex = Math.floor(index / 3);
    const x = margin + colIndex * (cardWidth + 12);
    const y = startY - rowIndex * (cardHeight + 14);
    pdfRoundedRect(cmds, x, y - cardHeight, cardWidth, cardHeight, 7, [238, 244, 239]);
    pdfText(cmds, label, x + 12, y - 20, 8, "F2", [84, 99, 103]);
    pdfText(cmds, String(value), x + 12, y - 43, 18, "F2", [31, 42, 46]);
    pdfText(cmds, detail, x + 12, y - 60, 8, "F1", [84, 99, 103]);
  });
  const reviewY = startY - (2 * (cardHeight + 14)) - 20;
  pdfText(cmds, "Review Notes", margin, reviewY, 13, "F2", [31, 42, 46]);
  const notes = [
    "Use the summary metrics to brief leadership before reviewing detailed rows.",
    "The detailed pages that follow preserve the selected report, filters, department scope, and sort order.",
    "For access cleanup, prioritize former staff, expired contractors, owner gaps, and admin-level assignments."
  ];
  notes.forEach((note, index) => {
    pdfCircle(cmds, margin + 4, reviewY - 24 - index * 18, 2.2, { fill: [23, 111, 92] });
    pdfText(cmds, fitPdfText(note, pageWidth - margin * 2 - 20, 9), margin + 14, reviewY - 28 - index * 18, 9, "F1", [31, 42, 46]);
  });
  pdfText(cmds, "Detailed report rows begin on the next page.", margin, 44, 8.5, "F1", [84, 99, 103]);
  return cmds.join("\n");
}

function drawReportPdfHeader(cmds, { title, question, department, pageWidth, pageHeight, margin, logo }) {
  const top = pageHeight - margin;
  let textX = margin;
  if (logo) {
    const logoWidth = 72;
    const logoHeight = Math.min(42, logoWidth * (logo.height / logo.width));
    pdfImage(cmds, "Im1", margin, top - logoHeight + 2, logoWidth, logoHeight);
    textX = margin + logoWidth + 14;
  }
  const headerLines = reportHeaderLines();
  pdfText(cmds, headerLines[0] || state.company.name || "OrgAssets", textX, top - 4, 12, "F2", [31, 42, 46]);
  headerLines.slice(1).forEach((line, index) => {
    pdfText(cmds, line, textX, top - 20 - (index * 12), 8.5, "F1", [84, 99, 103]);
  });
  pdfText(cmds, title, margin, top - 76, 18, "F2", [31, 42, 46]);
  pdfText(cmds, fitPdfText(question || "", pageWidth - (margin * 2), 9), margin, top - 94, 9, "F1", [84, 99, 103]);
  pdfText(cmds, `Scope: ${department}   Exported: ${new Date().toLocaleDateString()}`, margin, top - 110, 8.5, "F1", [84, 99, 103]);
  pdfLine(cmds, margin, top - 124, pageWidth - margin, top - 124, [216, 225, 219], 0.8);
}

function drawReportPdfTable(cmds, { rows, columns, columnWidths, margin, tableTop, rowHeight, headerHeight, fontSize }) {
  let x = margin;
  pdfRect(cmds, margin, tableTop - headerHeight, columnWidths.reduce((sum, width) => sum + width, 0), headerHeight, [238, 244, 239]);
  columns.forEach((column, index) => {
    pdfText(cmds, fitPdfText(column, columnWidths[index] - 8, 8), x + 4, tableTop - 12, 7.5, "F2", [31, 42, 46]);
    x += columnWidths[index];
  });
  pdfLine(cmds, margin, tableTop - headerHeight, margin + columnWidths.reduce((sum, width) => sum + width, 0), tableTop - headerHeight, [190, 203, 194], 0.8);

  rows.forEach((row, rowIndex) => {
    const rowTop = tableTop - headerHeight - (rowIndex * rowHeight);
    const rowBottom = rowTop - rowHeight;
    if (rowIndex % 2 === 1) {
      pdfRect(cmds, margin, rowBottom, columnWidths.reduce((sum, width) => sum + width, 0), rowHeight, [249, 251, 249]);
    }
    let cellX = margin;
    columns.forEach((column, columnIndex) => {
      const value = formatReportPdfValue(row[column], column);
      pdfText(cmds, fitPdfText(value, columnWidths[columnIndex] - 8, fontSize), cellX + 4, rowBottom + 7, fontSize, "F1", [31, 42, 46]);
      cellX += columnWidths[columnIndex];
    });
    pdfLine(cmds, margin, rowBottom, margin + columnWidths.reduce((sum, width) => sum + width, 0), rowBottom, [226, 232, 227], 0.35);
  });
}

function reportPdfColumnWidths(columns, availableWidth) {
  const weights = columns.map((column) => Math.max(0.85, Math.min(2.2, String(column).length / 9)));
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0) || 1;
  const widths = weights.map((weight) => Math.max(48, (availableWidth * weight) / weightSum));
  const widthSum = widths.reduce((sum, width) => sum + width, 0);
  if (widthSum <= availableWidth) return widths;
  return widths.map((width) => (width / widthSum) * availableWidth);
}

function formatReportPdfValue(value, column) {
  if (value === undefined || value === null) return "";
  if (typeof value === "number" && /cost|amount/i.test(column)) return money(value);
  return String(value);
}

function fitPdfText(value, maxWidth, fontSize) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  const maxChars = Math.max(4, Math.floor(maxWidth / (fontSize * 0.52)));
  if (text.length <= maxChars) return text;
  return `${text.slice(0, Math.max(1, maxChars - 1))}...`;
}

function createPdfBlob({ pageWidth, pageHeight, pages, logo }) {
  const encoder = new TextEncoder();
  const objects = [];
  const addObject = (id, header, streamBytes = null) => objects.push({ id, header, streamBytes });
  const imageId = logo ? 5 : null;
  let nextId = logo ? 6 : 5;
  const pageRefs = pages.map((content) => ({ pageId: nextId++, contentId: nextId++, content }));

  addObject(1, "<< /Type /Catalog /Pages 2 0 R >>");
  addObject(2, `<< /Type /Pages /Count ${pageRefs.length} /Kids [${pageRefs.map((page) => `${page.pageId} 0 R`).join(" ")}] >>`);
  addObject(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  addObject(4, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  if (logo) {
    addObject(imageId, `<< /Type /XObject /Subtype /Image /Width ${logo.width} /Height ${logo.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${logo.bytes.length} >>`, logo.bytes);
  }
  pageRefs.forEach((pageRef, index) => {
    const xObjects = logo ? " /XObject << /Im1 5 0 R >>" : "";
    addObject(pageRef.pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >>${xObjects} >> /Contents ${pageRef.contentId} 0 R >>`);
    const footer = `\nq 0.45 0.51 0.49 rg BT /F1 7 Tf ${pageWidth - 78} 18 Td (Page ${index + 1} of ${pageRefs.length}) Tj ET Q`;
    const contentBytes = encoder.encode(`${pageRef.content}${footer}`);
    addObject(pageRef.contentId, `<< /Length ${contentBytes.length} >>`, contentBytes);
  });

  const chunks = [];
  const offsets = [];
  let length = 0;
  const pushAscii = (text) => {
    const bytes = encoder.encode(text);
    chunks.push(bytes);
    length += bytes.length;
  };
  const pushBytes = (bytes) => {
    chunks.push(bytes);
    length += bytes.length;
  };

  pushAscii("%PDF-1.4\n");
  objects.sort((a, b) => a.id - b.id).forEach((object) => {
    offsets[object.id] = length;
    pushAscii(`${object.id} 0 obj\n${object.header}\n`);
    if (object.streamBytes) {
      pushAscii("stream\n");
      pushBytes(object.streamBytes);
      pushAscii("\nendstream\n");
    }
    pushAscii("endobj\n");
  });
  const xrefOffset = length;
  const objectCount = Math.max(...objects.map((object) => object.id)) + 1;
  pushAscii(`xref\n0 ${objectCount}\n0000000000 65535 f \n`);
  for (let id = 1; id < objectCount; id += 1) {
    pushAscii(`${String(offsets[id] || 0).padStart(10, "0")} 00000 n \n`);
  }
  pushAscii(`trailer\n<< /Size ${objectCount} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return new Blob(chunks, { type: "application/pdf" });
}

function pdfText(cmds, text, x, y, size, font = "F1", rgb = [0, 0, 0]) {
  cmds.push(`q ${pdfRgb(rgb, "rg")} BT /${font} ${pdfNum(size)} Tf ${pdfNum(x)} ${pdfNum(y)} Td (${escapePdfText(text)}) Tj ET Q`);
}

function pdfRect(cmds, x, y, width, height, rgb) {
  cmds.push(`q ${pdfRgb(rgb, "rg")} ${pdfNum(x)} ${pdfNum(y)} ${pdfNum(width)} ${pdfNum(height)} re f Q`);
}

function pdfRoundedRect(cmds, x, y, width, height, radius, rgb) {
  const r = Math.min(radius, width / 2, height / 2);
  const k = 0.5522847498;
  const x0 = x;
  const x1 = x + width;
  const y0 = y;
  const y1 = y + height;
  const path = [
    `${pdfNum(x0 + r)} ${pdfNum(y0)} m`,
    `${pdfNum(x1 - r)} ${pdfNum(y0)} l`,
    `${pdfNum(x1 - r + r * k)} ${pdfNum(y0)} ${pdfNum(x1)} ${pdfNum(y0 + r - r * k)} ${pdfNum(x1)} ${pdfNum(y0 + r)} c`,
    `${pdfNum(x1)} ${pdfNum(y1 - r)} l`,
    `${pdfNum(x1)} ${pdfNum(y1 - r + r * k)} ${pdfNum(x1 - r + r * k)} ${pdfNum(y1)} ${pdfNum(x1 - r)} ${pdfNum(y1)} c`,
    `${pdfNum(x0 + r)} ${pdfNum(y1)} l`,
    `${pdfNum(x0 + r - r * k)} ${pdfNum(y1)} ${pdfNum(x0)} ${pdfNum(y1 - r + r * k)} ${pdfNum(x0)} ${pdfNum(y1 - r)} c`,
    `${pdfNum(x0)} ${pdfNum(y0 + r)} l`,
    `${pdfNum(x0)} ${pdfNum(y0 + r - r * k)} ${pdfNum(x0 + r - r * k)} ${pdfNum(y0)} ${pdfNum(x0 + r)} ${pdfNum(y0)} c`,
    "h"
  ].join(" ");
  cmds.push(`q ${pdfRgb(rgb, "rg")} ${path} f Q`);
}

function pdfCircle(cmds, x, y, radius, options = {}) {
  const k = 0.5522847498;
  const fill = options.fill;
  const stroke = options.stroke;
  const lineWidth = options.lineWidth ?? 0.8;
  const path = [
    `${pdfNum(x + radius)} ${pdfNum(y)} m`,
    `${pdfNum(x + radius)} ${pdfNum(y + radius * k)} ${pdfNum(x + radius * k)} ${pdfNum(y + radius)} ${pdfNum(x)} ${pdfNum(y + radius)} c`,
    `${pdfNum(x - radius * k)} ${pdfNum(y + radius)} ${pdfNum(x - radius)} ${pdfNum(y + radius * k)} ${pdfNum(x - radius)} ${pdfNum(y)} c`,
    `${pdfNum(x - radius)} ${pdfNum(y - radius * k)} ${pdfNum(x - radius * k)} ${pdfNum(y - radius)} ${pdfNum(x)} ${pdfNum(y - radius)} c`,
    `${pdfNum(x + radius * k)} ${pdfNum(y - radius)} ${pdfNum(x + radius)} ${pdfNum(y - radius * k)} ${pdfNum(x + radius)} ${pdfNum(y)} c`,
    "h"
  ].join(" ");
  const colorOps = [
    fill ? pdfRgb(fill, "rg") : "",
    stroke ? pdfRgb(stroke, "RG") : "",
    stroke ? `${pdfNum(lineWidth)} w` : ""
  ].filter(Boolean).join(" ");
  const operator = fill && stroke ? "B" : fill ? "f" : "S";
  cmds.push(`q ${colorOps} ${path} ${operator} Q`);
}

function pdfLine(cmds, x1, y1, x2, y2, rgb, lineWidth = 0.5) {
  cmds.push(`q ${pdfRgb(rgb, "RG")} ${pdfNum(lineWidth)} w ${pdfNum(x1)} ${pdfNum(y1)} m ${pdfNum(x2)} ${pdfNum(y2)} l S Q`);
}

function pdfImage(cmds, name, x, y, width, height) {
  cmds.push(`q ${pdfNum(width)} 0 0 ${pdfNum(height)} ${pdfNum(x)} ${pdfNum(y)} cm /${name} Do Q`);
}

function pdfRgb(rgb, operator) {
  return `${rgb.map((value) => pdfNum(value / 255)).join(" ")} ${operator}`;
}

function pdfNum(value) {
  return Number(value).toFixed(2).replace(/\.?0+$/, "");
}

function escapePdfText(value) {
  return String(value ?? "").replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/[\r\n]+/g, " ");
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function imageSourceToJpegPayload(src, maxWidth = 640, maxHeight = 260) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const scale = Math.min(1, maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
      const width = Math.max(1, Math.round(image.naturalWidth * scale));
      const height = Math.max(1, Math.round(image.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      resolve({ width, height, bytes: base64ToBytes(dataUrl.split(",")[1]) });
    };
    image.onerror = reject;
    image.src = src;
  });
}

function renderSettings() {
  el.settingDefaultScope.value = state.settings.defaultScope;
  el.settingDefaultDensity.value = state.settings.defaultDensity;
  el.settingShowCostKpis.checked = state.settings.showCostKpis;
  el.settingShowOrgSnapshot.checked = state.settings.showOrgSnapshot;
  el.settingShowFocusedTables.checked = state.settings.showFocusedTables;
  el.settingShowReportDeck.checked = state.settings.showReportDeck;
  el.settingDefaultPageSize.value = state.settings.defaultPageSize;
  el.settingDefaultPersonStatus.value = state.settings.defaultPersonStatus;
  el.settingDefaultEmploymentType.value = state.settings.defaultEmploymentType;
  el.settingDefaultSystemStatus.value = state.settings.defaultSystemStatus;
  el.settingDefaultAssignmentAccess.value = state.settings.defaultAssignmentAccess;
  el.settingShowAdvancedFields.checked = state.settings.showAdvancedFields;
  el.settingReportHeader.value = state.company.reportHeader || "";
  renderReportBrandPreview();
  renderBackupAvailability();
  renderUsers();
  renderAuditTrail();
}

function renderBackupAvailability() {
  if (!el.downloadPortalBackup) return;
  el.downloadPortalBackup.disabled = staticDemoHost;
  if (staticDemoHost) {
    setBackupMessage("Folder Backup ZIP is available in local server installs only. The GitHub Pages demo runs as a static browser-only portal.");
  }
}

function savePortalSettingsFromForm() {
  if (!isAdminUser()) return;
  state.company.reportHeader = el.settingReportHeader.value.trim();
  state.settings = {
    ...state.settings,
    defaultScope: el.settingDefaultScope.value,
    defaultDensity: el.settingDefaultDensity.value,
    showCostKpis: el.settingShowCostKpis.checked,
    showOrgSnapshot: el.settingShowOrgSnapshot.checked,
    showFocusedTables: el.settingShowFocusedTables.checked,
    showReportDeck: el.settingShowReportDeck.checked,
    defaultPageSize: el.settingDefaultPageSize.value,
    defaultPersonStatus: el.settingDefaultPersonStatus.value,
    defaultEmploymentType: el.settingDefaultEmploymentType.value,
    defaultSystemStatus: el.settingDefaultSystemStatus.value,
    defaultAssignmentAccess: el.settingDefaultAssignmentAccess.value,
    showAdvancedFields: el.settingShowAdvancedFields.checked
  };
  Object.values(tablePrefs).forEach((prefs) => {
    prefs.limit = state.settings.defaultPageSize;
  });
  applyPortalLayoutDefaults();
  addAuditEvent({
    eventType: "SETTINGS_UPDATE",
    entityType: "settings",
    entityId: "portal",
    summary: "Portal settings and report header updated."
  });
  saveState();
  renderAll();
}

function resetPortalSettings() {
  if (!isAdminUser()) return;
  state.settings = { ...defaultPortalSettings };
  Object.keys(tablePrefs).forEach((key) => delete tablePrefs[key]);
  applyPortalLayoutDefaults();
  saveState();
  renderAll();
}

function renderReportBrandPreview() {
  const headerLines = (el.settingReportHeader.value.trim() || state.company.name || "OrgAssets Report")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 4);
  const logo = reportLogoSource();
  el.reportBrandPreview.innerHTML = `
    <div class="report-preview-page">
      <div class="report-preview-header">
        <div class="report-preview-logo">${logo ? `<img src="${escapeHtml(logo)}" alt="" />` : `<span>Logo</span>`}</div>
        <div>
          <strong>${escapeHtml(headerLines[0] || state.company.name || "OrgAssets Report")}</strong>
          ${headerLines.slice(1).map((line) => `<span>${escapeHtml(line)}</span>`).join("")}
        </div>
      </div>
      <div class="report-preview-title">
        <strong>Cleanup Action Report</strong>
        <span>Scope: All departments | Exported: ${escapeHtml(new Date().toLocaleDateString())}</span>
      </div>
      <div class="report-preview-table">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
}

async function handleReportLogoUpload() {
  if (!isAdminUser()) return;
  const file = el.settingReportLogo.files?.[0];
  if (!file) return;
  const reportHeaderDraft = el.settingReportHeader.value.trim();
  try {
    const dataUrl = await fileToImageDataUrl(file, 640, 260);
    state.company.logoUrl = dataUrl;
    state.company.reportHeader = reportHeaderDraft || defaultReportHeader;
    addAuditEvent({
      eventType: "REPORT_LOGO_UPLOAD",
      entityType: "settings",
      entityId: "report-branding",
      summary: "Uploaded report logo updated."
    });
    saveState();
    renderSettings();
  } finally {
    el.settingReportLogo.value = "";
  }
}

function fileToImageDataUrl(file, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      imageSourceToDataUrl(reader.result, maxWidth, maxHeight).then(resolve).catch(reject);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function imageSourceToDataUrl(src, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
      const width = Math.max(1, Math.round(image.naturalWidth * scale));
      const height = Math.max(1, Math.round(image.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };
    image.onerror = reject;
    image.src = src;
  });
}

function clearReportLogo() {
  if (!isAdminUser()) return;
  state.company.logoUrl = "";
  addAuditEvent({
    eventType: "REPORT_LOGO_CLEAR",
    entityType: "settings",
    entityId: "report-branding",
    summary: "Uploaded report logo cleared."
  });
  saveState();
  renderSettings();
}

function renderAuditTrail() {
  if (!el.auditTrailTable) return;
  renderTable(el.auditTrailTable, [
    col("Time"),
    col("Actor"),
    col("Event"),
    col("Entity"),
    col("Summary"),
    col("Hash")
  ], auditRows(25), {
    tableId: "auditTrail",
    defaultSort: "Time",
    defaultDirection: "desc",
    controls: true,
    exportFilename: "orgassets-audit-trail.csv"
  });
}

function exportAuditCsv() {
  if (!isAdminUser()) return;
  downloadCsv("orgassets-audit-trail.csv", auditRows(500));
}

async function exportAuditPdf() {
  if (!isAdminUser()) return;
  const rows = auditRows(200);
  if (!rows.length) return;
  const logo = await reportLogoPdfPayload();
  const blob = buildReportPdf({
    title: "OrgAssets Audit Trail",
    question: `${rows.length} local event${rows.length === 1 ? "" : "s"} with hash-chain markers. Review Hash and previous records when validating history.`,
    department: "All portal events",
    rows,
    columns: ["Time", "Actor", "Event", "Entity", "Summary", "Hash"],
    logo
  });
  downloadBlob(`orgassets-audit-trail-${todayStamp()}.pdf`, blob);
}

function renderUsers() {
  const personOptions = state.people
    .slice()
    .sort((a, b) => a.displayName.localeCompare(b.displayName))
    .map((personRecord) => [personRecord.id, `${personRecord.displayName} (${personRecord.employmentType}, ${personRecord.status})`]);
  fillSelect(el.userPersonSelect, "Custom account", personOptions);
  if (!el.userPassword.value) el.userPassword.value = defaultAdminPassword;
  const userSearch = String(el.usersSearch.value || "").trim().toLowerCase();
  const rows = state.users
    .slice()
    .filter((user) => {
      if (!userSearch) return true;
      const personRecord = userPersonRecord(user);
      return [
        user.username,
        user.role,
        user.status,
        personRecord?.displayName,
        personRecord?.employmentType,
        personRecord?.email
      ].some((value) => String(value || "").toLowerCase().includes(userSearch));
    })
    .sort((a, b) => {
      const personA = userPersonRecord(a);
      const personB = userPersonRecord(b);
      const labelA = personA?.displayName || a.username;
      const labelB = personB?.displayName || b.username;
      return labelA.localeCompare(labelB) || a.username.localeCompare(b.username);
    });
  const staffEligible = state.people.filter((personRecord) => isStaffPerson(personRecord, { activeOrPendingOnly: true }));
  const userPersonIds = new Set(state.users.map((user) => userPersonRecord(user)?.id).filter(Boolean));
  const enabledStaff = staffEligible.filter((personRecord) => userPersonIds.has(personRecord.id)).length;
  const contractorAccounts = state.users.filter((user) => {
    const personRecord = userPersonRecord(user);
    return personRecord && contractorTypes.has(personRecord.employmentType);
  }).length;
  el.usersSummary.innerHTML = `
    <div><strong>${rows.length}</strong><span>accounts</span></div>
    <div><strong>${state.users.filter((user) => user.status === "Active").length}</strong><span>active</span></div>
    <div><strong>${enabledStaff}/${staffEligible.length}</strong><span>staff enabled</span></div>
    <div><strong>${contractorAccounts}</strong><span>contractor accounts</span></div>
  `;
  el.usersTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Person</th>
          <th>Username</th>
          <th>Access</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((user) => {
          const personRecord = userPersonRecord(user);
          const inferredLink = personRecord && !user.personId;
          const isCurrent = user.id === currentUserId;
          const canDelete = !isCurrent && (user.role !== "admin" || user.status !== "Active" || activeAdminCount() > 1);
          return `
            <tr>
              <td>${escapeHtml(userAccountPersonLabel(user, personRecord, inferredLink))}</td>
              <td>${escapeHtml(user.username)}</td>
              <td>${statusPill(user.role === "admin" ? "Admin" : "User")}</td>
              <td>${statusPill(user.status)}</td>
              <td>
                <div class="row-actions">
                  <button class="row-button edit-button" type="button" data-user-action="edit" data-user-id="${escapeHtml(user.id)}">Edit</button>
                  <button class="row-button" type="button" data-user-action="toggle" data-user-id="${escapeHtml(user.id)}" ${isCurrent ? "disabled" : ""}>${user.status === "Active" ? "Disable" : "Enable"}</button>
                  <button class="row-button" type="button" data-user-action="reset" data-user-id="${escapeHtml(user.id)}">Reset Password</button>
                  <button class="row-button danger-row" type="button" data-user-action="delete" data-user-id="${escapeHtml(user.id)}" ${canDelete ? "" : "disabled"}>Delete</button>
                </div>
              </td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
  `;
}

function activeAdminCount() {
  return state.users.filter((user) => user.role === "admin" && user.status === "Active").length;
}

function isStaffPerson(personRecord, { activeOrPendingOnly = false } = {}) {
  if (!personRecord) return false;
  if (contractorTypes.has(personRecord.employmentType) || personRecord.employmentType === "Vendor Contact") return false;
  return !activeOrPendingOnly || personRecord.status === "Active" || personRecord.status === "Pending";
}

function userPersonRecord(user, data = state) {
  if (!user) return null;
  const direct = byId(data.people, user.personId);
  if (direct) return direct;
  const username = String(user.username || "").trim().toLowerCase();
  if (!username) return null;
  return data.people.find((personRecord) => {
    const email = String(personRecord.email || "").trim().toLowerCase();
    const emailPrefix = email.split("@")[0];
    const nameSlug = `${personRecord.firstName || ""}.${personRecord.lastName || ""}`.toLowerCase().replace(/[^a-z0-9.]+/g, ".").replace(/^\.+|\.+$/g, "");
    return username === email || username === emailPrefix || username === nameSlug;
  }) || null;
}

function userAccountPersonLabel(user, personRecord = userPersonRecord(user), inferredLink = false) {
  if (personRecord) {
    return `${personRecord.displayName} (${personRecord.employmentType})${inferredLink ? " - matched by username" : ""}`;
  }
  return user?.username?.toLowerCase() === "admin" ? "System account" : "Custom account";
}

function suggestedUsername(personRecord) {
  const emailPrefix = String(personRecord.email || "").split("@")[0];
  const base = emailPrefix || `${personRecord.firstName || ""}.${personRecord.lastName || ""}`.toLowerCase().replace(/[^a-z0-9.]+/g, ".").replace(/^\.+|\.+$/g, "");
  return uniqueUsername(base || `user.${personRecord.id}`);
}

function uniqueUsername(base) {
  const normalized = String(base || "user").toLowerCase().replace(/[^a-z0-9._-]+/g, ".");
  const existing = new Set(state.users.map((user) => user.username.toLowerCase()));
  if (!existing.has(normalized)) return normalized;
  let index = 2;
  while (existing.has(`${normalized}${index}`)) index += 1;
  return `${normalized}${index}`;
}

async function createUserFromSelectedPerson() {
  if (!isAdminUser()) return;
  const personRecord = byId(state.people, el.userPersonSelect.value);
  const username = el.userUsername.value.trim() || (personRecord ? suggestedUsername(personRecord) : "");
  const password = el.userPassword.value.trim() || defaultAdminPassword;
  if (!username) {
    setUsersMessage("Enter a username for the custom account.");
    return;
  }
  if (state.users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
    setUsersMessage("That username already exists.");
    return;
  }
  if (personRecord && state.users.some((user) => userPersonRecord(user)?.id === personRecord.id)) {
    setUsersMessage("That person already has a user account.");
    return;
  }
  const user = newUserAccount({ personRecord, username, role: el.userRole.value });
  await setUserPassword(user, password);
  state.users.push(user);
  addAuditEvent({
    eventType: "USER_CREATE",
    entityType: "user",
    entityId: user.id,
    summary: `Created ${user.role} account ${user.username}${personRecord ? ` for ${personRecord.displayName}` : ""}.`
  });
  saveState();
  setUsersMessage(`Created ${personRecord ? "user" : "custom account"} ${username}.`);
  el.userUsername.value = "";
  renderSettings();
}

function newUserAccount({ personRecord, username, role = "user" }) {
  const today = todayStamp();
  return {
    id: uid("u"),
    username,
    passwordHash: "",
    passwordSalt: "",
    role: role === "admin" ? "admin" : "user",
    status: "Active",
    personId: personRecord?.id || "",
    createdAt: today,
    updatedAt: today
  };
}

async function enableAllStaffUsers() {
  if (!isAdminUser()) return;
  const password = el.userPassword.value.trim() || defaultAdminPassword;
  const existingPersonIds = new Set(state.users.map((user) => userPersonRecord(user)?.id).filter(Boolean));
  const staff = state.people.filter((personRecord) => (
    isStaffPerson(personRecord, { activeOrPendingOnly: true }) && !existingPersonIds.has(personRecord.id)
  ));
  for (const personRecord of staff) {
    const user = newUserAccount({
      personRecord,
      username: suggestedUsername(personRecord),
      role: "user"
    });
    await setUserPassword(user, password);
    state.users.push(user);
  }
  if (staff.length) {
    addAuditEvent({
      eventType: "USER_ENABLE_STAFF",
      entityType: "user",
      entityId: "bulk",
      summary: `Enabled ${staff.length} staff user account${staff.length === 1 ? "" : "s"}.`
    });
  }
  saveState();
  setUsersMessage(staff.length ? `Enabled ${staff.length} staff user account${staff.length === 1 ? "" : "s"}.` : "All eligible staff already have user accounts.");
  renderSettings();
}

function disableAllStaffUsers() {
  if (!isAdminUser()) return;
  const activeStaffUsers = state.users.filter((user) => {
    const personRecord = userPersonRecord(user);
    return user.status === "Active" && isStaffPerson(personRecord) && user.id !== currentUserId;
  });
  if (!activeStaffUsers.length) {
    setUsersMessage("No active staff user accounts are available to disable.");
    return;
  }
  openConfirmDialog({
    title: "Disable All Staff Users",
    message: `Disable ${activeStaffUsers.length} active staff user account${activeStaffUsers.length === 1 ? "" : "s"}? This does not delete people records, contractor accounts, custom accounts, or the account you are currently using.`,
    confirmLabel: "Disable Staff",
    onConfirm: () => {
      let remainingActiveAdmins = activeAdminCount();
      const disabled = [];
      const skipped = [];
      activeStaffUsers.forEach((user) => {
        if (user.role === "admin" && remainingActiveAdmins <= 1) {
          skipped.push(user.username);
          return;
        }
        const before = user.status;
        user.status = "Inactive";
        user.updatedAt = todayStamp();
        if (user.role === "admin" && before === "Active") remainingActiveAdmins -= 1;
        disabled.push(user.username);
      });
      if (disabled.length) {
        addAuditEvent({
          eventType: "USER_DISABLE_STAFF",
          entityType: "user",
          entityId: "bulk",
          summary: `Disabled ${disabled.length} staff user account${disabled.length === 1 ? "" : "s"}.`,
          before: JSON.stringify({ activeStaffUsers: activeStaffUsers.map((user) => user.username) }),
          after: JSON.stringify({ disabled, skipped })
        });
      }
      saveState();
      const skippedText = skipped.length ? ` Skipped ${skipped.length} admin account${skipped.length === 1 ? "" : "s"} to preserve admin access.` : "";
      setUsersMessage(disabled.length ? `Disabled ${disabled.length} staff user account${disabled.length === 1 ? "" : "s"}.${skippedText}` : `No staff accounts were disabled.${skippedText}`);
      renderSettings();
    }
  });
}

async function handleUserAction(action, id) {
  if (!isAdminUser()) return;
  const user = byId(state.users, id);
  if (!user) return;
  if (action === "edit") {
    openUserDialog(id);
    return;
  }
  if (action === "toggle") {
    if (user.id === currentUserId) return;
    if (user.status === "Active" && user.role === "admin" && activeAdminCount() <= 1) {
      setUsersMessage("At least one active admin is required.");
      return;
    }
    const before = user.status;
    user.status = user.status === "Active" ? "Inactive" : "Active";
    user.updatedAt = todayStamp();
    addAuditEvent({
      eventType: "USER_STATUS",
      entityType: "user",
      entityId: user.id,
      summary: `${user.username} ${user.status === "Active" ? "enabled" : "disabled"}.`,
      before,
      after: user.status
    });
    setUsersMessage(`${user.username} ${user.status === "Active" ? "enabled" : "disabled"}.`);
  }
  if (action === "reset") {
    await setUserPassword(user, defaultAdminPassword);
    addAuditEvent({
      eventType: "USER_PASSWORD_RESET",
      entityType: "user",
      entityId: user.id,
      summary: `${user.username} password reset.`
    });
    setUsersMessage(`${user.username} password reset to ${defaultAdminPassword}.`);
  }
  if (action === "delete") {
    if (user.id === currentUserId || (user.role === "admin" && activeAdminCount() <= 1)) return;
    openConfirmDialog({
      title: "Delete User Account",
      message: `Delete ${user.username}? This removes the local login account only and does not delete the linked person record.`,
      confirmLabel: "Delete User",
      onConfirm: () => {
        addAuditEvent({
          eventType: "USER_DELETE",
          entityType: "user",
          entityId: user.id,
          summary: `Deleted user account ${user.username}.`,
          before: JSON.stringify({ username: user.username, role: user.role, status: user.status, personId: user.personId })
        });
        state.users = state.users.filter((item) => item.id !== id);
        saveState();
        setUsersMessage(`${user.username} deleted.`);
        renderSettings();
      }
    });
    return;
  }
  saveState();
  renderSettings();
}

function setUsersMessage(message) {
  el.usersMessage.textContent = message;
}

function openConfirmDialog({ title, message, confirmLabel = "Confirm", onConfirm }) {
  pendingConfirmAction = onConfirm;
  el.confirmTitle.textContent = title;
  el.confirmMessage.textContent = message;
  el.confirmAction.textContent = confirmLabel;
  el.confirmAction.classList.toggle("danger-row", /delete/i.test(confirmLabel));
  el.confirmDialog.showModal();
}

function openUserDialog(id) {
  if (!isAdminUser()) return;
  const user = byId(state.users, id);
  if (!user) return;
  currentUserEditorId = id;
  fillSelect(el.editUserPerson, "Custom account", state.people
    .slice()
    .sort((a, b) => a.displayName.localeCompare(b.displayName))
    .map((personRecord) => [personRecord.id, `${personRecord.displayName} (${personRecord.employmentType}, ${personRecord.status})`]));
  el.userDialogTitle.textContent = `Edit ${user.username}`;
  el.editUserPerson.value = user.personId || "";
  el.editUserUsername.value = user.username;
  el.editUserRole.value = user.role;
  el.editUserStatus.value = user.status;
  el.editUserPassword.value = "";
  el.editUserMessage.textContent = "";
  el.userDialog.showModal();
}

async function saveUserFromDialog() {
  if (!isAdminUser()) return;
  const user = byId(state.users, currentUserEditorId);
  if (!user) return;
  const beforeAudit = JSON.stringify({ username: user.username, role: user.role, status: user.status, personId: user.personId });
  const username = el.editUserUsername.value.trim();
  const role = el.editUserRole.value === "admin" ? "admin" : "user";
  const status = el.editUserStatus.value === "Inactive" ? "Inactive" : "Active";
  const personId = el.editUserPerson.value;
  const password = el.editUserPassword.value.trim();

  if (!username) {
    el.editUserMessage.textContent = "Username is required.";
    return;
  }
  if (state.users.some((item) => item.id !== user.id && item.username.toLowerCase() === username.toLowerCase())) {
    el.editUserMessage.textContent = "That username already exists.";
    return;
  }
  if (personId && state.users.some((item) => item.id !== user.id && userPersonRecord(item)?.id === personId)) {
    el.editUserMessage.textContent = "That person already has a user account.";
    return;
  }
  const removingLastAdmin = user.role === "admin" && user.status === "Active" && (role !== "admin" || status !== "Active") && activeAdminCount() <= 1;
  if (removingLastAdmin) {
    el.editUserMessage.textContent = "At least one active admin is required.";
    return;
  }

  user.username = username;
  user.role = role;
  user.status = status;
  user.personId = personId;
  if (password) await setUserPassword(user, password);
  user.updatedAt = todayStamp();
  addAuditEvent({
    eventType: "USER_UPDATE",
    entityType: "user",
    entityId: user.id,
    summary: `Updated user account ${user.username}.`,
    before: beforeAudit,
    after: JSON.stringify({ username: user.username, role: user.role, status: user.status, personId: user.personId, passwordChanged: Boolean(password) })
  });
  saveState();
  if (user.id === currentUserId && user.status !== "Active") {
    logoutCurrentUser();
  } else {
    renderSettings();
    renderAuthState();
  }
  el.userDialog.close();
}

function applyPortalLayoutDefaults() {
  el.topologyScope.value = state.settings.defaultScope;
  el.topologyDensity.value = state.settings.defaultDensity;
  el.topologySystems.checked = state.settings.showSystemsOnCards;
  el.topologyRoles.checked = false;
  el.topologyAccessFlags.checked = false;
  applyDashboardLayout();
}

function applyDashboardLayout() {
  el.orgSnapshotPanel.hidden = !state.settings.showOrgSnapshot;
  el.reportDeckPanel.hidden = !state.settings.showReportDeck;
  el.focusedDashboardGrid.hidden = !state.settings.showFocusedTables;
}

function renderViewRuleStats() {
  if (!el.viewRuleStats) return;
  const activeVisible = state.people.filter((personRecord) => isDirectoryVisiblePerson(personRecord) && isAllStaffEmployment(personRecord.employmentType)).length;
  const contractorVisible = visiblePeople().filter((personRecord) => contractorTypes.has(personRecord.employmentType)).length;
  const renewals = state.systemAssets.filter((system) => system.status === "Active" && daysUntil(system.renewalDate) <= Number(el.renewalWindow.value || 30)).length;
  const actions = getActionItems().length;
  const cards = [
    ["Staff", activeVisible, "people-staff"],
    ["Contractors", contractorVisible, "people-contractors"],
    ["Renewals", renewals, "report-vendorRenewal"],
    ["Actions", actions, "actions"]
  ];
  el.viewRuleStats.innerHTML = cards.map(([label, value, target]) => `
    <button type="button" class="view-rule-card" data-dashboard-target="${escapeHtml(target)}">
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(label)}</span>
    </button>
  `).join("");
}

function clampValue(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function adjustTopologyZoom(delta) {
  const currentZoom = topologyZoomOverride ?? lastTopologyFitZoom;
  topologyZoomOverride = Math.round(clampValue(currentZoom + delta, 0.35, 1.4) * 100) / 100;
  renderTopology();
}

function resetTopologyZoom() {
  topologyZoomOverride = null;
  renderTopology();
}

function staticOptions(values) {
  return values.map((value) => [value, value]);
}

function personOptions(blank = "Unassigned", excludeId = "") {
  return [["", blank], ...state.people
    .filter((personRecord) => personRecord.id !== excludeId)
    .sort((a, b) => a.displayName.localeCompare(b.displayName))
    .map((personRecord) => [personRecord.id, personRecord.displayName])];
}

function departmentOptions(blank = "Unassigned", excludeId = "") {
  return [["", blank], ...state.departments
    .filter((department) => department.id !== excludeId)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((department) => [department.id, department.name])];
}

function roleOptions() {
  return state.roles
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((roleRecord) => [roleRecord.id, roleRecord.name]);
}

function vendorOptions(blank = "Unassigned") {
  return [["", blank], ...state.vendors
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((vendorRecord) => [vendorRecord.id, vendorRecord.name])];
}

function systemOptions(blank = "Unassigned") {
  return [["", blank], ...state.systemAssets
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((system) => [system.id, system.name])];
}

function assignmentPersonOptions() {
  return state.people
    .filter((personRecord) => ["Active", "Pending"].includes(personRecord.status) && personRecord.employmentType !== "Vendor Contact")
    .slice()
    .sort((a, b) => a.displayName.localeCompare(b.displayName))
    .map((personRecord) => [
      personRecord.id,
      personRecord.displayName,
      `${personRecord.employmentType} | ${departmentName(personRecord.departmentId)}`
    ]);
}

function activeSystemAssignmentPersonIds(systemId) {
  if (!systemId) return [];
  return state.systemAssignments
    .filter((assignment) => assignment.systemAssetId === systemId && assignment.status === "Active")
    .map((assignment) => assignment.personId);
}

function activeSystemTextOptions(key, currentValue = "") {
  return uniqueTextOptions([
    currentValue,
    ...state.systemAssets
      .filter((system) => system.status === "Active")
      .map((system) => system[key])
  ]);
}

function getRecordConfig(type, id = "") {
  const statusOptions = staticOptions(["Active", "Pending", "Inactive", "Terminated", "Archived"]);
  const systemStatusOptions = staticOptions(["Active", "Pending", "Inactive", "Archived"]);
  const assignmentStatusOptions = staticOptions(["Active", "Pending", "Inactive", "Removed"]);
  const assignmentTypeOptions = staticOptions(["Owner", "Licensed User", "User", "Admin Contact", "Billing Contact", "Technical Contact", "Reviewer", "Approver"]);
  const assignmentAccessOptions = staticOptions(["Owner", "Admin", "Billing Admin", "Manager", "User", "Read Only", "No Access"]);
  const currentSystem = type === "system" && id ? getRecord("system", id) : null;
  const configs = {
    person: {
      title: "Person",
      collection: "people",
      fields: [
        field("firstName", "First Name", "text", { required: true }),
        field("lastName", "Last Name", "text", { required: true }),
        field("email", "Email", "email"),
        field("phone", "Phone", "tel", { advanced: true }),
        field("title", "Title", "text", { required: true }),
        field("employmentType", "Employment Type", "select", { options: staticOptions(["Owner", "Executive", "Employee", "Contractor", "Subcontractor", "Vendor Contact"]), defaultValue: state.settings.defaultEmploymentType }),
        field("status", "Status", "select", { options: statusOptions, defaultValue: state.settings.defaultPersonStatus }),
        field("departmentId", "Department", "select", { options: departmentOptions(), emptyAsNull: true }),
        field("managerPersonId", "Manager", "select", { options: personOptions("No manager", id), emptyAsNull: true }),
        field("roleIds", "Roles", "checkboxes", { options: roleOptions(), getValue: (record) => state.personRoles.filter((item) => item.personId === record?.id).map((item) => item.roleId) }),
        field("startDate", "Start Date", "date", { defaultValue: todayStamp() }),
        field("endDate", "End Date", "date"),
        field("notes", "Notes", "textarea", { advanced: true })
      ]
    },
    department: {
      title: "Department",
      collection: "departments",
      fields: [
        field("name", "Department Name", "text", { required: true }),
        field("parentDepartmentId", "Parent Department", "select", { options: departmentOptions("No parent", id), emptyAsNull: true }),
        field("managerPersonId", "Manager", "select", { options: personOptions("No manager"), emptyAsNull: true }),
        field("notes", "Notes", "textarea", { advanced: true })
      ]
    },
    role: {
      title: "Role",
      collection: "roles",
      fields: [
        field("name", "Role Name", "text", { required: true }),
        field("description", "Description", "textarea", { required: true })
      ]
    },
    vendor: {
      title: "Vendor",
      collection: "vendors",
      fields: [
        field("name", "Vendor Name", "text", { required: true }),
        field("category", "Category", "text"),
        field("website", "Website", "url"),
        field("contactName", "Contact Name", "text", { advanced: true }),
        field("contactEmail", "Contact Email", "email", { advanced: true }),
        field("contactPhone", "Contact Phone", "tel", { advanced: true }),
        field("renewalDate", "Vendor Renewal Date", "date"),
        field("notes", "Notes", "textarea", { advanced: true })
      ]
    },
    system: {
      title: "System / Asset",
      collection: "systemAssets",
      fields: [
        field("name", "System / Asset Name", "text", { required: true, suggestions: activeSystemTextOptions("name", currentSystem?.name) }),
        field("type", "Type", "text", { required: true, suggestions: activeSystemTextOptions("type", currentSystem?.type) }),
        field("category", "Category", "text", { suggestions: activeSystemTextOptions("category", currentSystem?.category) }),
        field("status", "Status", "select", { options: systemStatusOptions, defaultValue: state.settings.defaultSystemStatus }),
        field("vendorId", "Vendor", "select", { options: vendorOptions(), emptyAsNull: true }),
        field("ownerPersonId", "Owner", "select", { options: personOptions("No owner"), emptyAsNull: true }),
        field("departmentId", "Department", "select", { options: departmentOptions(), emptyAsNull: true }),
        field("billingFrequency", "Billing Frequency", "select", { options: staticOptions(["Monthly", "Quarterly", "Annual", "One-Time", "Free"]), defaultValue: "Monthly" }),
        field("costAmount", "Cost Amount", "number", { min: 0, step: "0.01" }),
        field("renewalDate", "Renewal Date", "date"),
        field("cancellationDeadline", "Cancellation Deadline", "date"),
        field("autoRenew", "Auto Renew", "checkbox", { defaultValue: true }),
        field("seatsPurchased", "Seats Purchased", "number", { min: 0, step: "1" }),
        field("seatsAssigned", "Seats Assigned", "readonly", { getValue: (record) => assignedSeatCount(record?.id), helpText: "Derived from active assignment rows" }),
        field("assignedPersonIds", "Assigned People", "checkboxes", { options: assignmentPersonOptions(), getValue: (record) => activeSystemAssignmentPersonIds(record?.id), layout: "cards", helpText: "Select people to assign to this system or asset. Unchecking an active assignment marks it removed." }),
        field("newAssignmentType", "New Assignment Type", "select", { options: assignmentTypeOptions, defaultValue: "User" }),
        field("newAssignmentAccess", "New Assignment Access", "select", { options: assignmentAccessOptions, defaultValue: state.settings.defaultAssignmentAccess }),
        field("url", "System URL", "url", { advanced: true }),
        field("lastReviewedAt", "Last Reviewed", "date"),
        field("description", "Description", "textarea", { advanced: true }),
        field("notes", "Notes", "textarea", { advanced: true })
      ]
    },
    assignment: {
      title: "Assignment",
      collection: "systemAssignments",
      fields: [
        field("systemAssetId", "System / Asset", "select", { options: systemOptions(), required: true, emptyAsNull: true }),
        field("personId", "Person", "select", { options: personOptions(), required: true, emptyAsNull: true }),
        field("assignmentType", "Assignment Type", "select", { options: assignmentTypeOptions, defaultValue: "User" }),
        field("accessLevel", "Access Level", "select", { options: assignmentAccessOptions, defaultValue: state.settings.defaultAssignmentAccess }),
        field("status", "Status", "select", { options: assignmentStatusOptions, defaultValue: "Active" }),
        field("startDate", "Start Date", "date", { defaultValue: todayStamp() }),
        field("endDate", "End Date", "date"),
        field("notes", "Notes", "textarea", { advanced: true })
      ]
    }
  };
  return configs[type];
}

function field(key, label, type, options = {}) {
  return { key, label, type, ...options };
}

function openRecordDialog(type, id = "", presets = {}) {
  if (!isAdminUser()) return;
  const config = getRecordConfig(type, id);
  if (!config) return;
  const record = id ? getRecord(type, id) : presets;
  currentEditor = { type, id, mode: id ? "edit" : "add", presets };
  el.recordDialogMode.textContent = id ? "Edit Record" : "New Record";
  el.recordDialogTitle.textContent = `${id ? "Edit" : "Add"} ${config.title}`;
  el.deleteRecord.hidden = !id;
  el.recordFields.innerHTML = renderRecordEditor(config, record, type);
  if (typeof el.recordDialog.showModal === "function") {
    el.recordDialog.showModal();
  } else {
    el.recordDialog.setAttribute("open", "");
  }
}

function renderRecordEditor(config, record, type) {
  const sections = groupRecordFields(config.fields, type);
  return sections.map((section) => `
    <section class="record-section">
      <div class="record-section-header">
        <span>${escapeHtml(section.kicker)}</span>
        <h4>${escapeHtml(section.title)}</h4>
      </div>
      <div class="record-section-grid">
        ${section.fields.map((fieldConfig) => renderRecordField(fieldConfig, record)).join("")}
      </div>
    </section>
  `).join("");
}

function groupRecordFields(fields, type) {
  const labels = {
    person: {
      identity: ["Identity", "Who this person is"],
      organization: ["Org", "Reporting and roles"],
      lifecycle: ["Lifecycle", "Status and dates"],
      notes: ["Notes", "Extra context"]
    },
    system: {
      identity: ["Asset", "What is being tracked"],
      ownership: ["Ownership", "Vendor, owner, department"],
      billing: ["Billing", "Cost, seats, renewals"],
      assignments: ["Access", "Assigned people"],
      notes: ["Details", "URLs and notes"]
    },
    assignment: {
      identity: ["Link", "Person and system"],
      lifecycle: ["Access", "Type, level, dates"],
      notes: ["Notes", "Extra context"]
    },
    vendor: {
      identity: ["Vendor", "Provider details"],
      lifecycle: ["Renewal", "Contact and dates"],
      notes: ["Notes", "Extra context"]
    },
    department: {
      identity: ["Department", "Name and hierarchy"],
      notes: ["Notes", "Extra context"]
    },
    role: {
      identity: ["Role", "Name and purpose"]
    }
  };
  const groupMap = new Map();
  fields.forEach((fieldConfig) => {
    const group = recordFieldGroup(type, fieldConfig.key);
    if (!groupMap.has(group)) {
      const [kicker, title] = labels[type]?.[group] ?? ["Record", "Details"];
      groupMap.set(group, { kicker, title, fields: [] });
    }
    groupMap.get(group).fields.push(fieldConfig);
  });
  return [...groupMap.values()];
}

function recordFieldGroup(type, key) {
  const groups = {
    person: {
      identity: ["firstName", "lastName", "email", "phone", "title"],
      organization: ["departmentId", "managerPersonId", "roleIds"],
      lifecycle: ["employmentType", "status", "startDate", "endDate"],
      notes: ["notes"]
    },
    system: {
      identity: ["name", "type", "category", "status"],
      ownership: ["vendorId", "ownerPersonId", "departmentId"],
      billing: ["billingFrequency", "costAmount", "renewalDate", "cancellationDeadline", "autoRenew", "seatsPurchased", "seatsAssigned", "lastReviewedAt"],
      assignments: ["assignedPersonIds", "newAssignmentType", "newAssignmentAccess"],
      notes: ["url", "description", "notes"]
    },
    assignment: {
      identity: ["systemAssetId", "personId"],
      lifecycle: ["assignmentType", "accessLevel", "status", "startDate", "endDate"],
      notes: ["notes"]
    },
    vendor: {
      identity: ["name", "category", "website"],
      lifecycle: ["contactName", "contactEmail", "contactPhone", "renewalDate"],
      notes: ["notes"]
    },
    department: {
      identity: ["name", "parentDepartmentId", "managerPersonId"],
      notes: ["notes"]
    },
    role: {
      identity: ["name", "description"]
    }
  };
  return Object.entries(groups[type] ?? {}).find(([, keys]) => keys.includes(key))?.[0] ?? "identity";
}

function renderRecordField(fieldConfig, record) {
  if (fieldConfig.advanced && !state.settings.showAdvancedFields) return "";
  const id = `field-${fieldConfig.key}`;
  const value = fieldConfig.getValue ? fieldConfig.getValue(record) : record?.[fieldConfig.key] ?? fieldConfig.defaultValue ?? "";
  const required = fieldConfig.required ? "required" : "";
  const common = `id="${escapeHtml(id)}" name="${escapeHtml(fieldConfig.key)}" ${required}`;

  if (fieldConfig.type === "readonly") {
    return `
      <div class="record-field readonly-field">
        <span>${escapeHtml(fieldConfig.label)}</span>
        <strong>${escapeHtml(value)}</strong>
        ${fieldConfig.helpText ? `<small>${escapeHtml(fieldConfig.helpText)}</small>` : ""}
      </div>
    `;
  }

  if (fieldConfig.type === "textarea") {
    return `<label class="record-field record-field-wide">${escapeHtml(fieldConfig.label)}<textarea ${common}>${escapeHtml(value)}</textarea></label>`;
  }

  if (fieldConfig.type === "select") {
    return `
      <label class="record-field">${escapeHtml(fieldConfig.label)}
        <select ${common}>
          ${(fieldConfig.options ?? []).map(([optionValue, optionLabel]) => `<option value="${escapeHtml(optionValue)}" ${String(optionValue) === String(value ?? "") ? "selected" : ""}>${escapeHtml(optionLabel)}</option>`).join("")}
        </select>
      </label>
    `;
  }

  if (fieldConfig.type === "checkbox") {
    return `<label class="record-field record-toggle"><input type="checkbox" name="${escapeHtml(fieldConfig.key)}" ${value ? "checked" : ""} /><span></span><strong>${escapeHtml(fieldConfig.label)}</strong></label>`;
  }

  if (fieldConfig.type === "checkboxes") {
    const selected = new Set(Array.isArray(value) ? value : []);
    if (fieldConfig.key === "roleIds" || fieldConfig.layout === "cards") {
      return `
        <fieldset class="record-field record-field-wide role-select-fieldset">
          <legend>${escapeHtml(fieldConfig.label)}</legend>
          ${fieldConfig.helpText ? `<small class="fieldset-help">${escapeHtml(fieldConfig.helpText)}</small>` : ""}
          <div class="role-select-list">
            ${(fieldConfig.options ?? []).length ? (fieldConfig.options ?? []).map(([optionValue, optionLabel, optionDescription]) => {
              const roleRecord = byId(state.roles, optionValue);
              const description = optionDescription || roleRecord?.description || "Role assignment";
              return `
                <label class="role-option">
                  <input type="checkbox" name="${escapeHtml(fieldConfig.key)}" value="${escapeHtml(optionValue)}" ${selected.has(optionValue) ? "checked" : ""} />
                  <span class="role-option-check" aria-hidden="true"></span>
                  <span class="role-option-copy">
                    <strong>${escapeHtml(optionLabel)}</strong>
                    <small>${escapeHtml(description)}</small>
                  </span>
                </label>
              `;
            }).join("") : `<p class="empty-state compact-empty">No selectable records available.</p>`}
          </div>
        </fieldset>
      `;
    }
    return `
      <fieldset class="record-field record-field-wide checkbox-fieldset chip-fieldset">
        <legend>${escapeHtml(fieldConfig.label)}</legend>
        <div class="checkbox-grid">
          ${(fieldConfig.options ?? []).map(([optionValue, optionLabel]) => `
            <label><input type="checkbox" name="${escapeHtml(fieldConfig.key)}" value="${escapeHtml(optionValue)}" ${selected.has(optionValue) ? "checked" : ""} /><span>${escapeHtml(optionLabel)}</span></label>
          `).join("")}
        </div>
      </fieldset>
    `;
  }

  const min = fieldConfig.min !== undefined ? `min="${escapeHtml(fieldConfig.min)}"` : "";
  const step = fieldConfig.step !== undefined ? `step="${escapeHtml(fieldConfig.step)}"` : "";
  const suggestions = fieldConfig.suggestions ?? [];
  const listId = suggestions.length ? `${id}-suggestions` : "";
  const list = listId ? `list="${escapeHtml(listId)}"` : "";
  const datalist = listId
    ? `<datalist id="${escapeHtml(listId)}">${suggestions.map((suggestion) => `<option value="${escapeHtml(suggestion)}"></option>`).join("")}</datalist>`
    : "";
  return `<label class="record-field">${escapeHtml(fieldConfig.label)}<input ${common} type="${escapeHtml(fieldConfig.type)}" value="${escapeHtml(value)}" ${min} ${step} ${list} />${datalist}</label>`;
}

function closeRecordDialog() {
  currentEditor = null;
  if (typeof el.recordDialog.close === "function") {
    el.recordDialog.close();
  } else {
    el.recordDialog.removeAttribute("open");
  }
}

function saveRecordFromDialog() {
  if (!currentEditor || !isAdminUser()) return;
  const config = getRecordConfig(currentEditor.type, currentEditor.id);
  const collection = state[config.collection];
  const existing = currentEditor.id ? byId(collection, currentEditor.id) : null;
  const beforeAudit = existing ? JSON.stringify(existing) : "";
  const values = readRecordValues(config);
  const roleIds = values.roleIds;
  const assignedPersonIds = values.assignedPersonIds;
  const newAssignmentType = values.newAssignmentType;
  const newAssignmentAccess = values.newAssignmentAccess;
  delete values.roleIds;
  delete values.assignedPersonIds;
  delete values.newAssignmentType;
  delete values.newAssignmentAccess;
  const now = new Date().toISOString().slice(0, 10);
  const record = {
    ...(existing ?? {}),
    ...values,
    id: existing?.id ?? nextRecordId(currentEditor.type),
    companyId: "c1",
    createdAt: existing?.createdAt ?? now,
    updatedAt: now
  };

  normalizeRecord(currentEditor.type, record);
  if (existing) {
    Object.assign(existing, record);
  } else {
    collection.push(record);
  }

  if (currentEditor.type === "person") updatePersonRoles(record.id, roleIds ?? []);
  if (currentEditor.type === "system") syncSystemAssignments(record.id, assignedPersonIds ?? [], newAssignmentType || "User", newAssignmentAccess || state.settings.defaultAssignmentAccess);
  addAuditEvent({
    eventType: existing ? "RECORD_UPDATE" : "RECORD_CREATE",
    entityType: currentEditor.type,
    entityId: record.id,
    summary: `${existing ? "Updated" : "Created"} ${config.title}: ${record.displayName || record.name || record.id}.`,
    before: beforeAudit,
    after: JSON.stringify(record)
  });
  state = normalizeState(state);
  saveState();
  closeRecordDialog();
  renderAll();
}

function readRecordValues(config) {
  const values = {};
  config.fields.forEach((fieldConfig) => {
    if (fieldConfig.advanced && !state.settings.showAdvancedFields) return;
    if (fieldConfig.type === "readonly") return;
    if (fieldConfig.type === "checkboxes") {
      values[fieldConfig.key] = [...el.recordFields.querySelectorAll(`input[name="${fieldConfig.key}"]:checked`)].map((input) => input.value);
      return;
    }
    if (fieldConfig.type === "checkbox") {
      values[fieldConfig.key] = Boolean(el.recordFields.querySelector(`input[name="${fieldConfig.key}"]`)?.checked);
      return;
    }
    const input = el.recordFields.querySelector(`[name="${fieldConfig.key}"]`);
    if (!input) return;
    let value = input.value;
    if (fieldConfig.type === "number") value = Number(value) || 0;
    if (fieldConfig.emptyAsNull && value === "") value = null;
    values[fieldConfig.key] = value;
  });
  return values;
}

function canonicalActiveSystemText(key, value, recordId = "") {
  const normalized = String(value ?? "").trim();
  if (!normalized) return "";
  const match = state.systemAssets.find((system) => {
    if (system.id === recordId || system.status !== "Active") return false;
    return String(system[key] ?? "").trim().toLowerCase() === normalized.toLowerCase();
  });
  return match ? String(match[key] ?? "").trim() : normalized;
}

function normalizeRecord(type, record) {
  if (type === "person") {
    record.displayName = `${record.firstName ?? ""} ${record.lastName ?? ""}`.trim() || "Unnamed person";
    if (!record.email) record.email = `${record.firstName || "person"}.${record.lastName || record.id}@example.local`.toLowerCase();
    if (record.managerPersonId === record.id) record.managerPersonId = null;
  }
  if (type === "department" && record.parentDepartmentId === record.id) record.parentDepartmentId = null;
  if (type === "system") {
    record.name = canonicalActiveSystemText("name", record.name, record.id) || "Unnamed system";
    record.type = canonicalActiveSystemText("type", record.type, record.id);
    record.category = canonicalActiveSystemText("category", record.category, record.id);
    recalculateSystemCosts(record);
  }
}

function updatePersonRoles(personId, roleIds) {
  state.personRoles = state.personRoles.filter((item) => item.personId !== personId);
  roleIds.forEach((roleId, index) => {
    state.personRoles.push({
      id: `pr-${personId}-${roleId}`,
      companyId: "c1",
      personId,
      roleId,
      isPrimary: index === 0,
      notes: "",
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10)
    });
  });
}

function syncSystemAssignments(systemId, personIds, assignmentType, accessLevel) {
  const selected = new Set((Array.isArray(personIds) ? personIds : []).filter(Boolean));
  const today = new Date().toISOString().slice(0, 10);
  const activeAssignments = state.systemAssignments.filter((assignment) => assignment.systemAssetId === systemId && assignment.status === "Active");
  const activeByPerson = new Map();

  activeAssignments.forEach((assignment) => {
    if (activeByPerson.has(assignment.personId)) {
      assignment.status = "Removed";
      assignment.endDate = assignment.endDate || today;
      assignment.updatedAt = today;
      return;
    }
    activeByPerson.set(assignment.personId, assignment);
    if (!selected.has(assignment.personId)) {
      assignment.status = "Removed";
      assignment.endDate = assignment.endDate || today;
      assignment.updatedAt = today;
    }
  });

  selected.forEach((personId) => {
    if (activeByPerson.has(personId)) return;
    state.systemAssignments.push({
      id: nextRecordId("assignment"),
      companyId: "c1",
      systemAssetId: systemId,
      personId,
      assignmentType,
      accessLevel,
      startDate: today,
      endDate: "",
      status: "Active",
      notes: "",
      createdAt: today,
      updatedAt: today
    });
  });
}

function nextRecordId(type) {
  const config = getRecordConfig(type);
  const prefix = { person: "p", department: "d", role: "r", vendor: "v", system: "s", assignment: "sa" }[type] ?? "rec";
  const numbers = state[config.collection]
    .map((item) => String(item.id || "").match(new RegExp(`^${prefix}(\\d+)$`))?.[1])
    .filter(Boolean)
    .map(Number);
  return `${prefix}${numbers.length ? Math.max(...numbers) + 1 : 1}`;
}

function deleteCurrentRecord() {
  if (!currentEditor?.id || !isAdminUser()) return;
  const config = getRecordConfig(currentEditor.type, currentEditor.id);
  const record = getRecord(currentEditor.type, currentEditor.id);
  const label = record?.displayName || record?.name || config.title;
  openConfirmDialog({
    title: `Delete ${config.title}`,
    message: `Delete ${label}? Related assignments or references will be cleaned up.`,
    confirmLabel: "Delete",
    onConfirm: () => {
      addAuditEvent({
        eventType: "RECORD_DELETE",
        entityType: currentEditor.type,
        entityId: currentEditor.id,
        summary: `Deleted ${config.title}: ${label}.`,
        before: JSON.stringify(record || {})
      });
      removeRecord(currentEditor.type, currentEditor.id);
      saveState();
      closeRecordDialog();
      renderAll();
    }
  });
}

function removeRecord(type, id) {
  if (type === "person") {
    state.people = state.people.filter((item) => item.id !== id);
    state.personRoles = state.personRoles.filter((item) => item.personId !== id);
    state.systemAssignments = state.systemAssignments.filter((item) => item.personId !== id);
    state.people.forEach((personRecord) => {
      if (personRecord.managerPersonId === id) personRecord.managerPersonId = null;
    });
    state.departments.forEach((department) => {
      if (department.managerPersonId === id) department.managerPersonId = null;
    });
    state.systemAssets.forEach((system) => {
      if (system.ownerPersonId === id) system.ownerPersonId = null;
    });
  }
  if (type === "department") {
    state.departments = state.departments.filter((item) => item.id !== id);
    state.departments.forEach((department) => {
      if (department.parentDepartmentId === id) department.parentDepartmentId = null;
    });
    state.people.forEach((personRecord) => {
      if (personRecord.departmentId === id) personRecord.departmentId = null;
    });
    state.systemAssets.forEach((system) => {
      if (system.departmentId === id) system.departmentId = null;
    });
  }
  if (type === "role") {
    state.roles = state.roles.filter((item) => item.id !== id);
    state.personRoles = state.personRoles.filter((item) => item.roleId !== id);
  }
  if (type === "vendor") {
    state.vendors = state.vendors.filter((item) => item.id !== id);
    state.systemAssets.forEach((system) => {
      if (system.vendorId === id) system.vendorId = null;
    });
  }
  if (type === "system") {
    state.systemAssets = state.systemAssets.filter((item) => item.id !== id);
    state.systemAssignments = state.systemAssignments.filter((item) => item.systemAssetId !== id);
  }
  if (type === "assignment") {
    state.systemAssignments = state.systemAssignments.filter((item) => item.id !== id);
  }
  state = normalizeState(state);
}

function renderDetail(type, id) {
  const record = getRecord(type, id);
  if (!record) return;
  setDetailPanelOpen(true);

  if (type === "person") {
    const assignments = state.systemAssignments.filter((item) => item.personId === id && item.status === "Active");
    const directReports = state.people.filter((item) => item.managerPersonId === id);
    el.detailTitle.textContent = record.displayName;
    el.detailBody.innerHTML = detailSection("Person", {
      Title: record.title,
      Department: departmentName(record.departmentId),
      Manager: personName(record.managerPersonId),
      "Employment Type": record.employmentType,
      Status: record.status,
      Roles: personRoles(id).join(", "),
      "Direct Reports": directReports.length,
      "Systems Touched": assignments.length
    }) + detailActions([
      recordActionButton("Assign System / Asset", "assignment", { personId: id })
    ]) + detailList("Assignments", assignments.map((item) => ({
      label: `${systemName(item.systemAssetId)} - ${item.assignmentType} - ${item.accessLevel}`,
      type: "assignment",
      id: item.id
    })));
    return;
  }

  if (type === "system") {
    const assignments = state.systemAssignments.filter((item) => item.systemAssetId === id && item.status === "Active");
    el.detailTitle.textContent = record.name;
    el.detailBody.innerHTML = detailSection("SystemAsset", {
      Type: record.type,
      Vendor: vendorName(record.vendorId),
      Department: departmentName(record.departmentId),
      Owner: ownerName(record),
      "Monthly Cost": money(record.monthlyEquivalentCost),
      "Annual Cost": money(record.annualEquivalentCost),
      Renewal: record.renewalDate,
      Seats: `${record.seatsAssigned}/${record.seatsPurchased}`,
      "Last Reviewed": record.lastReviewedAt || "Never"
    }) + detailActions([
      recordActionButton("Assign Person", "assignment", { systemAssetId: id })
    ]) + detailList("Assigned People", assignments.map((item) => ({
      label: `${personName(item.personId)} - ${item.assignmentType} - ${item.accessLevel}`,
      type: "person",
      id: item.personId
    })));
    return;
  }

  if (type === "assignment") {
    el.detailTitle.textContent = "System Assignment";
    el.detailBody.innerHTML = detailSection("Assignment", {
      Person: personName(record.personId),
      "System/Asset": systemName(record.systemAssetId),
      "Assignment Type": record.assignmentType,
      "Access Level": record.accessLevel,
      Status: record.status,
      "Start Date": record.startDate,
      "End Date": record.endDate
    });
    return;
  }

  if (type === "department") {
    const people = state.people.filter((item) => item.departmentId === id);
    const systems = state.systemAssets.filter((item) => item.departmentId === id);
    el.detailTitle.textContent = record.name;
    el.detailBody.innerHTML = detailSection("Department", {
      Manager: personName(record.managerPersonId),
      Parent: departmentName(record.parentDepartmentId),
      People: people.length,
      "Systems/Assets": systems.length,
      "Monthly Cost": money(systems.reduce((sum, system) => sum + system.monthlyEquivalentCost, 0))
    }) + detailActions([
      recordActionButton("Add System / Asset", "system", { departmentId: id })
    ]) + detailList("Systems", systems.slice(0, 20).map((system) => ({
      label: system.name,
      type: "system",
      id: system.id
    })));
    return;
  }

  if (type === "vendor") {
    const systems = state.systemAssets.filter((item) => item.vendorId === id);
    el.detailTitle.textContent = record.name;
    el.detailBody.innerHTML = detailSection("Vendor", {
      Category: record.category,
      Website: record.website,
      Contact: record.contactName,
      Email: record.contactEmail,
      "Systems/Assets": systems.length,
      "Monthly Cost": money(systems.reduce((sum, system) => sum + system.monthlyEquivalentCost, 0))
    }) + detailActions([
      recordActionButton("Add System / Asset", "system", { vendorId: id })
    ]) + detailList("Systems", systems.map((system) => ({
      label: system.name,
      type: "system",
      id: system.id
    })));
    return;
  }

  if (type === "role") {
    const personIds = state.personRoles.filter((item) => item.roleId === id).map((item) => item.personId);
    el.detailTitle.textContent = record.name;
    el.detailBody.innerHTML = detailSection("Role", {
      Description: record.description,
      People: personIds.length,
      "Admin-Level Assignments": state.systemAssignments.filter((assignment) => personIds.includes(assignment.personId) && adminLevels.has(assignment.accessLevel)).length
    }) + detailList("People", personIds.map((personId) => ({
      label: personName(personId),
      type: "person",
      id: personId
    })));
  }
}

function setDetailPanelOpen(open) {
  el.detailPanel.classList.toggle("open", open);
  document.body.classList.toggle("detail-open", open);
  [...document.querySelectorAll(".app-shell > *")].forEach((item) => {
    if (item === el.detailPanel) return;
    if (open) {
      item.setAttribute("inert", "");
      item.setAttribute("aria-hidden", "true");
    } else {
      item.removeAttribute("inert");
      item.removeAttribute("aria-hidden");
    }
  });
  if (open) el.closeDetail.focus();
}

function getRecord(type, id) {
  const map = {
    person: state.people,
    system: state.systemAssets,
    assignment: state.systemAssignments,
    department: state.departments,
    vendor: state.vendors,
    role: state.roles
  };
  return byId(map[type] ?? [], id);
}

function detailSection(title, values) {
  return `<section class="detail-section"><h4>${escapeHtml(title)}</h4><dl>${Object.entries(values).map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd>`).join("")}</dl></section>`;
}

function presetAttributes(presets = {}) {
  const names = {
    personId: "person-id",
    systemAssetId: "system-asset-id",
    departmentId: "department-id",
    vendorId: "vendor-id",
    ownerPersonId: "owner-person-id"
  };
  return Object.entries(presets)
    .filter(([, value]) => value)
    .map(([key, value]) => names[key] ? `data-record-preset-${names[key]}="${escapeHtml(value)}"` : "")
    .filter(Boolean)
    .join(" ");
}

function recordActionButton(label, type, presets = {}) {
  if (!isAdminUser()) return "";
  return `<button type="button" class="row-button" data-record-action="add" data-record-type="${escapeHtml(type)}" ${presetAttributes(presets)}>${escapeHtml(label)}</button>`;
}

function recordPresetsFromTarget(target) {
  const map = {
    recordPresetPersonId: "personId",
    recordPresetSystemAssetId: "systemAssetId",
    recordPresetDepartmentId: "departmentId",
    recordPresetVendorId: "vendorId",
    recordPresetOwnerPersonId: "ownerPersonId"
  };
  return Object.entries(map).reduce((presets, [dataKey, recordKey]) => {
    if (target.dataset[dataKey]) presets[recordKey] = target.dataset[dataKey];
    return presets;
  }, {});
}

function detailActions(actions) {
  return `<div class="detail-actions">${actions.join("")}</div>`;
}

function detailList(title, rows) {
  const tags = rows.map((row) => {
    if (row && typeof row === "object") {
      return row.type && row.id
        ? `<button type="button" class="tag tag-link" data-record-link-type="${escapeHtml(row.type)}" data-record-link-id="${escapeHtml(row.id)}">${escapeHtml(row.label)}</button>`
        : `<span class="tag">${escapeHtml(row.label)}</span>`;
    }
    return `<span class="tag">${escapeHtml(row)}</span>`;
  }).join("");
  return `<section class="detail-section"><h4>${escapeHtml(title)}</h4>${rows.length ? `<div class="tag-list">${tags}</div>` : `<p>No related records.</p>`}</section>`;
}

function setView(view) {
  if (!canAccessView(view)) view = "dashboard";
  currentView = view;
  el.navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  el.views.forEach((section) => section.classList.toggle("active", section.id === view));
  el.viewTitle.textContent = document.querySelector(`[data-view="${view}"]`).textContent;
  renderAll();
}

function openDashboardTarget(target) {
  if (target === "people-staff") {
    el.showContractors.checked = true;
    el.globalSearch.value = "";
    tablePrefs.people = tablePrefs.people ?? { search: "", sortKey: "", sortDir: "asc", limit: state.settings.defaultPageSize, filters: {} };
    tablePrefs.people.search = "";
    tablePrefs.people.filters = { ...(tablePrefs.people.filters ?? {}), "Employment Type": "__staff" };
    setView("people");
    return;
  }

  if (target === "people") {
    el.showInactive.checked = false;
    el.showContractors.checked = true;
    el.globalSearch.value = "";
    tablePrefs.people = tablePrefs.people ?? { search: "", sortKey: "", sortDir: "asc", limit: state.settings.defaultPageSize, filters: {} };
    tablePrefs.people.search = "";
    tablePrefs.people.filters = { ...(tablePrefs.people.filters ?? {}), "Employment Type": "__staff" };
    setView("people");
    return;
  }

  if (target === "people-contractors") {
    el.showInactive.checked = false;
    el.showContractors.checked = true;
    el.globalSearch.value = "Contractor";
    setView("people");
    return;
  }

  if (target === "systems") {
    el.globalSearch.value = "";
    tablePrefs.systems = tablePrefs.systems ?? { search: "", sortKey: "", sortDir: "asc", limit: state.settings.defaultPageSize, filters: {} };
    tablePrefs.systems.search = "";
    tablePrefs.systems.filters = { ...(tablePrefs.systems.filters ?? {}), Status: "Active" };
    setView("systems");
    return;
  }

  if (target === "vendors") {
    el.globalSearch.value = "";
    setView("vendors");
    return;
  }

  if (target === "departments") {
    el.globalSearch.value = "";
    setView("departments");
    return;
  }

  if (target === "actions") {
    el.globalSearch.value = "";
    setView("actions");
    return;
  }

  if (target?.startsWith("report-")) {
    const reportName = target.replace("report-", "");
    el.globalSearch.value = "";
    el.reportDepartment.value = "";
    el.reportType.value = reportName;
    setView("reports");
  }
}

function renderAll() {
  renderAuthState();
  applyDashboardLayout();
  renderViewRuleStats();
  renderMetrics();
  renderDashboardTables();
  renderPeople();
  renderDepartments();
  renderRoles();
  renderVendors();
  renderSystems();
  renderAssignments();
  renderOffboarding();
  renderTopologyFilters();
  renderTopology();
  renderActions();
  renderReport();
  renderImports();
  renderSettings();
  renderAuthState();
}

document.addEventListener("click", (event) => {
  const templateTarget = event.target.closest("[data-template-type]");
  if (templateTarget) {
    if (!isAdminUser()) return;
    const type = templateTarget.dataset.templateType;
    downloadCsv(`orgassets-template-${type}.csv`, importTemplateRows(type));
    return;
  }

  const tableExportTarget = event.target.closest("[data-table-export]");
  if (tableExportTarget) {
    if (["auditTrail", "importDiffPreview"].includes(tableExportTarget.dataset.tableExport) && !isAdminUser()) return;
    downloadTableExport(tableExportTarget.dataset.tableExport);
    return;
  }

  const offboardAssignmentTarget = event.target.closest("[data-offboard-assignment]");
  if (offboardAssignmentTarget) {
    if (!isAdminUser()) return;
    const assignment = byId(state.systemAssignments, offboardAssignmentTarget.dataset.offboardAssignment);
    if (!assignment) return;
    const revoke = () => revokeAssignmentForOffboarding(assignment.id);
    if (adminLevels.has(assignment.accessLevel) || assignment.assignmentType === "Owner") {
      openConfirmDialog({
        title: "Revoke High-Risk Access",
        message: `Revoke ${personName(assignment.personId)} access to ${systemName(assignment.systemAssetId)} (${assignment.accessLevel})?`,
        confirmLabel: "Revoke Access",
        onConfirm: revoke
      });
    } else {
      revoke();
    }
    return;
  }

  const userActionTarget = event.target.closest("[data-user-action]");
  if (userActionTarget) {
    if (!isAdminUser()) return;
    handleUserAction(userActionTarget.dataset.userAction, userActionTarget.dataset.userId);
    return;
  }

  const recordLinkTarget = event.target.closest("[data-record-link-type]");
  if (recordLinkTarget) {
    openRecordLink(recordLinkTarget.dataset.recordLinkType, recordLinkTarget.dataset.recordLinkId);
    return;
  }

  const headerSortTarget = event.target.closest("[data-table-header-sort]");
  if (headerSortTarget) {
    const tableId = headerSortTarget.dataset.tableId;
    tablePrefs[tableId] = tablePrefs[tableId] ?? { search: "", sortKey: "", sortDir: "asc", limit: state.settings.defaultPageSize, filters: {} };
    const prefs = tablePrefs[tableId];
    const sortKey = headerSortTarget.dataset.tableHeaderSort;
    if (prefs.multiSort) {
      updateHeaderMultiSort(prefs, sortKey, event.shiftKey);
    } else if (prefs.sortKey === sortKey) {
      prefs.sortDir = prefs.sortDir === "desc" ? "asc" : "desc";
    } else {
      prefs.sortKey = sortKey;
      prefs.sortDir = defaultSortDirectionForKey(sortKey);
    }
    renderAll();
    return;
  }

  const recordTarget = event.target.closest("[data-record-action]");
  if (recordTarget) {
    if (!isAdminUser()) return;
    openRecordDialog(recordTarget.dataset.recordType, recordTarget.dataset.recordId || "", recordPresetsFromTarget(recordTarget));
    return;
  }

  const sortDirectionTarget = event.target.closest("[data-table-dir]");
  if (sortDirectionTarget) {
    const prefs = tablePrefs[sortDirectionTarget.dataset.tableDir];
    if (prefs) {
      prefs.sortDir = prefs.sortDir === "desc" ? "asc" : "desc";
      renderAll();
    }
    return;
  }

  const dashboardTarget = event.target.closest("[data-dashboard-target]");
  if (dashboardTarget) {
    openDashboardTarget(dashboardTarget.dataset.dashboardTarget);
    return;
  }

  const sortResetTarget = event.target.closest("[data-table-sort-reset]");
  if (sortResetTarget) {
    resetTableSort(sortResetTarget.dataset.tableSortReset);
    renderAll();
    return;
  }

  const detailTarget = event.target.closest("[data-detail-type]");
  if (detailTarget) {
    if (topologyOrganizeMode && detailTarget.matches(".employee-card")) return;
    renderDetail(detailTarget.dataset.detailType, detailTarget.dataset.detailId);
    return;
  }

  const jumpTarget = event.target.closest("[data-view-jump]");
  if (jumpTarget) {
    setView(jumpTarget.dataset.viewJump);
  }
});

document.addEventListener("input", (event) => {
  const tableId = event.target.dataset.tableSearch;
  if (!tableId) return;
  tablePrefs[tableId] = tablePrefs[tableId] ?? { search: "", sortKey: "", sortDir: "asc", limit: state.settings.defaultPageSize, filters: {} };
  tablePrefs[tableId].search = event.target.value;
  const cursor = event.target.selectionStart;
  renderAll();
  const replacement = document.querySelector(`[data-table-search="${tableId}"]`);
  if (replacement) {
    replacement.focus();
    replacement.setSelectionRange(cursor, cursor);
  }
});

document.addEventListener("change", (event) => {
  const sortTableId = event.target.dataset.tableSort;
  const limitTableId = event.target.dataset.tableLimit;
  const filterKey = event.target.dataset.tableFilter;
  const filterTableId = event.target.dataset.tableId;
  const multiSortKeyTableId = event.target.dataset.tableMultiSortKey;
  const multiSortDirTableId = event.target.dataset.tableMultiSortDir;

  if (sortTableId) {
    tablePrefs[sortTableId] = tablePrefs[sortTableId] ?? { search: "", sortKey: "", sortDir: "asc", limit: state.settings.defaultPageSize, filters: {} };
    tablePrefs[sortTableId].sortKey = event.target.value;
    renderAll();
    return;
  }

  if (multiSortKeyTableId) {
    updateMultiSortKey(multiSortKeyTableId, Number(event.target.dataset.sortLevel || 0), event.target.value);
    renderAll();
    return;
  }

  if (multiSortDirTableId) {
    updateMultiSortDirection(multiSortDirTableId, Number(event.target.dataset.sortLevel || 0), event.target.value);
    renderAll();
    return;
  }

  if (limitTableId) {
    tablePrefs[limitTableId] = tablePrefs[limitTableId] ?? { search: "", sortKey: "", sortDir: "asc", limit: state.settings.defaultPageSize, filters: {} };
    tablePrefs[limitTableId].limit = event.target.value;
    renderAll();
    return;
  }

  if (filterKey && filterTableId) {
    tablePrefs[filterTableId] = tablePrefs[filterTableId] ?? { search: "", sortKey: "", sortDir: "asc", limit: state.settings.defaultPageSize, filters: {} };
    tablePrefs[filterTableId].filters[filterKey] = event.target.value;
    renderAll();
  }
});

function orgDropTarget(eventTarget) {
  return eventTarget.closest("[data-org-drop-person], [data-org-drop-root]");
}

function clearOrgDropState() {
  document.querySelectorAll(".org-drop-active, .org-dragging").forEach((node) => {
    node.classList.remove("org-drop-active", "org-dragging");
  });
}

document.addEventListener("dragstart", (event) => {
  if (!topologyOrganizeMode || !isAdminUser()) return;
  const card = event.target.closest("[data-org-drag-person]");
  if (!card) return;
  topologyDragPersonId = card.dataset.orgDragPerson;
  card.classList.add("org-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", topologyDragPersonId);
});

document.addEventListener("dragover", (event) => {
  if (!topologyOrganizeMode || !topologyDragPersonId || !isAdminUser()) return;
  const target = orgDropTarget(event.target);
  if (!target) return;
  const managerId = target.dataset.orgDropPerson || "";
  if (!canMovePersonUnder(topologyDragPersonId, managerId)) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  document.querySelectorAll(".org-drop-active").forEach((node) => {
    if (node !== target) node.classList.remove("org-drop-active");
  });
  target.classList.add("org-drop-active");
});

document.addEventListener("dragleave", (event) => {
  const target = orgDropTarget(event.target);
  if (target && !target.contains(event.relatedTarget)) target.classList.remove("org-drop-active");
});

document.addEventListener("drop", (event) => {
  if (!topologyOrganizeMode || !isAdminUser()) return;
  const target = orgDropTarget(event.target);
  if (!target) return;
  const personId = event.dataTransfer.getData("text/plain") || topologyDragPersonId;
  const managerId = target.dataset.orgDropPerson || "";
  if (!canMovePersonUnder(personId, managerId)) return;
  event.preventDefault();
  clearOrgDropState();
  topologyDragPersonId = "";
  movePersonUnder(personId, managerId);
});

document.addEventListener("dragend", () => {
  topologyDragPersonId = "";
  clearOrgDropState();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (el.loginDialog.open) return;
  if (el.confirmDialog.open) {
    pendingConfirmAction = null;
    el.confirmDialog.close();
    event.preventDefault();
    return;
  }
  if (el.userDialog.open) {
    el.userDialog.close();
    event.preventDefault();
    return;
  }
  if (el.recordDialog.open) {
    closeRecordDialog();
    event.preventDefault();
    return;
  }
  if (el.detailPanel.classList.contains("open")) {
    setDetailPanelOpen(false);
    event.preventDefault();
  }
});

el.navItems.forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
el.loginForm.addEventListener("submit", loginUser);
el.loginDialog.addEventListener("cancel", (event) => event.preventDefault());
el.logoutUser.addEventListener("click", logoutCurrentUser);
el.renewalWindow.addEventListener("change", renderAll);
el.showInactive.addEventListener("change", renderAll);
el.showContractors.addEventListener("change", renderAll);
el.globalSearch.addEventListener("input", renderAll);
el.topologyScope.addEventListener("change", renderTopology);
el.topologyDepartment.addEventListener("change", renderTopology);
el.topologyRole.addEventListener("change", renderTopology);
el.topologyDensity.addEventListener("change", renderTopology);
el.topologySystems.addEventListener("change", renderTopology);
el.topologyRoles.addEventListener("change", renderTopology);
el.topologyAccessFlags.addEventListener("change", renderTopology);
el.topologyZoomOut.addEventListener("click", () => adjustTopologyZoom(-0.08));
el.topologyZoomReset.addEventListener("click", resetTopologyZoom);
el.topologyZoomIn.addEventListener("click", () => adjustTopologyZoom(0.08));
el.topologyUndoTree.addEventListener("click", undoTreeMove);
el.topologyRedoTree.addEventListener("click", redoTreeMove);
el.topologyOrganizeTree.addEventListener("click", () => {
  if (!isAdminUser()) return;
  topologyOrganizeMode = !topologyOrganizeMode;
  topologyDragPersonId = "";
  clearOrgDropState();
  renderTopology();
});
el.offboardingPerson.addEventListener("change", renderOffboarding);
el.offboardingOpenPerson.addEventListener("click", openSelectedOffboardingPersonInPeople);
el.offboardingMarkInactive.addEventListener("click", () => {
  const personRecord = selectedOffboardingPerson();
  if (!personRecord || !isAdminUser()) return;
  openConfirmDialog({
    title: "Mark Person Inactive",
    message: `Mark ${personRecord.displayName} inactive and set their end date to today?`,
    confirmLabel: "Mark Inactive",
    onConfirm: markSelectedPersonInactive
  });
});
el.offboardingRevokeAll.addEventListener("click", () => {
  const personRecord = selectedOffboardingPerson();
  const activeCount = personRecord ? activeAssignmentsForPerson(personRecord.id).length : 0;
  if (!personRecord || !activeCount || !isAdminUser()) return;
  openConfirmDialog({
    title: "Revoke All Active Assignments",
    message: `Revoke ${activeCount} active assignment${activeCount === 1 ? "" : "s"} for ${personRecord.displayName}? This can be undone before leaving the current session.`,
    confirmLabel: "Revoke All",
    onConfirm: revokeAllOffboardingAssignments
  });
});
el.offboardingUndo.addEventListener("click", undoLastOffboardingChange);
el.offboardingExportPdf.addEventListener("click", exportOffboardingChecklistPdf);
el.topologyPrintPdf.addEventListener("click", exportOrgChartPdf);
el.reportType.addEventListener("change", renderReport);
el.reportDepartment.addEventListener("change", renderReport);
el.downloadReport.addEventListener("click", () => downloadCsv(`orgassets-report-${el.reportType.value}.csv`, currentSortedReportRows()));
el.printReport.addEventListener("click", exportCurrentReportPdf);
el.exportStandardAssignments.addEventListener("click", () => downloadCsv(`orgassets-standard-assignments-${todayStamp()}.csv`, standardAssignmentExportRows()));
el.downloadTemplates.addEventListener("click", () => {
  if (!isAdminUser()) return;
  importTypes().forEach((type) => downloadCsv(`orgassets-template-${type.key}.csv`, importTemplateRows(type.key)));
});
el.downloadAssignmentSchema.addEventListener("click", () => {
  if (!isAdminUser()) return;
  downloadCsv("orgassets-assignment-schema.csv", assignmentSchemaRows());
});
el.analyzeImport.addEventListener("click", analyzeImportFile);
el.applyImport.addEventListener("click", applyPendingImport);
el.loadDemoData.addEventListener("click", () => {
  if (!isAdminUser()) return;
  openConfirmDialog({
    title: "Seed Demo Data",
    message: "Replace current portal records with demo data? User accounts are preserved.",
    confirmLabel: "Seed Demo Data",
    onConfirm: () => {
      state = preserveUsersForDataReset(buildSeedData());
      clearTreeHistory();
      saveState();
      renderAll();
    }
  });
});
el.clearDemoData.addEventListener("click", () => {
  if (!isAdminUser()) return;
  openConfirmDialog({
    title: "Clear Demo Data",
    message: "Clear portal records from this browser data set? The admin account and custom accounts are preserved; user accounts linked to People records are removed.",
    confirmLabel: "Clear Demo Data",
    onConfirm: () => {
      state = preserveAdminAndCustomUsersForDataClear(emptyState());
      clearTreeHistory();
      saveState();
      renderAll();
    }
  });
});
el.closeDetail.addEventListener("click", () => setDetailPanelOpen(false));
el.settingReportLogo.addEventListener("change", handleReportLogoUpload);
el.settingReportHeader.addEventListener("input", renderReportBrandPreview);
el.clearReportLogo.addEventListener("click", clearReportLogo);
el.downloadPortalBackup.addEventListener("click", downloadPortalBackupZip);
el.exportAuditCsv.addEventListener("click", exportAuditCsv);
el.exportAuditPdf.addEventListener("click", exportAuditPdf);
el.usersSearch.addEventListener("input", renderUsers);
el.userPersonSelect.addEventListener("change", () => {
  const personRecord = byId(state.people, el.userPersonSelect.value);
  el.userUsername.value = personRecord ? suggestedUsername(personRecord) : "";
});
el.createUser.addEventListener("click", createUserFromSelectedPerson);
el.enableAllStaffUsers.addEventListener("click", enableAllStaffUsers);
el.disableAllStaffUsers.addEventListener("click", disableAllStaffUsers);
el.savePortalSettings.addEventListener("click", savePortalSettingsFromForm);
el.resetPortalSettings.addEventListener("click", resetPortalSettings);
el.deleteRecord.addEventListener("click", deleteCurrentRecord);
el.recordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.submitter?.value === "save") {
    saveRecordFromDialog();
  } else {
    closeRecordDialog();
  }
});
el.recordDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeRecordDialog();
});
el.userForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.submitter?.value === "save") {
    saveUserFromDialog();
  } else {
    el.userDialog.close();
  }
});
el.userDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  el.userDialog.close();
});
el.confirmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const action = pendingConfirmAction;
  pendingConfirmAction = null;
  el.confirmDialog.close();
  if (event.submitter?.value === "confirm" && action) action();
});
el.confirmDialog.addEventListener("cancel", () => {
  pendingConfirmAction = null;
});
window.addEventListener("resize", () => {
  if (currentView === "topology" && topologyZoomOverride === null) renderTopology();
});

applyPortalLayoutDefaults();
renderAll();
ensurePasswordsMigrated();
