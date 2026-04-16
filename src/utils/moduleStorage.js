const LEGACY_MODULE_ID = "8.5";
const NORMALIZED_MODULE_ID = "8-5";
const LEGACY_PREFIX = `${LEGACY_MODULE_ID}-`;
const NORMALIZED_PREFIX = `${NORMALIZED_MODULE_ID}-`;

function moduleIdToString(moduleRef) {
  if (typeof moduleRef === "object" && moduleRef !== null) {
    return String(moduleRef.id ?? "");
  }
  return String(moduleRef ?? "");
}

export function moduleStorageSlug(moduleRef) {
  const moduleId = moduleIdToString(moduleRef);
  if (moduleId === LEGACY_MODULE_ID) return NORMALIZED_MODULE_ID;
  return moduleId;
}

export function buildLessonStorageKey(moduleRef, lessonId) {
  return `${moduleStorageSlug(moduleRef)}-${lessonId}`;
}

export function buildReviewStorageKey(moduleRef, stepId) {
  return `${moduleStorageSlug(moduleRef)}-${stepId}`;
}

export function buildCohortStorageKey(moduleRef, key) {
  return `${moduleStorageSlug(moduleRef)}-${key}`;
}

function migrateLegacyKey(key) {
  if (typeof key !== "string") return key;
  if (!key.startsWith(LEGACY_PREFIX)) return key;
  return `${NORMALIZED_PREFIX}${key.slice(LEGACY_PREFIX.length)}`;
}

function migrateArrayKeys(list) {
  if (!Array.isArray(list)) return { next: list, changed: false };
  let changed = false;
  const next = list.map((item) => {
    const migrated = migrateLegacyKey(item);
    if (migrated !== item) changed = true;
    return migrated;
  });
  return { next, changed };
}

function migrateObjectKeys(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return { next: record, changed: false };
  }
  let changed = false;
  const next = {};
  for (const [key, value] of Object.entries(record)) {
    const migratedKey =
      key === LEGACY_MODULE_ID ? NORMALIZED_MODULE_ID : migrateLegacyKey(key);
    if (migratedKey !== key) changed = true;
    next[migratedKey] = value;
  }
  return { next, changed };
}

function migrateWeakConcepts(items) {
  if (!Array.isArray(items)) return { next: items, changed: false };
  let changed = false;
  const next = items.map((item) => {
    if (!item || typeof item !== "object") return item;
    const migratedLessonKey = migrateLegacyKey(item.lessonKey);
    if (migratedLessonKey !== item.lessonKey) {
      changed = true;
      return { ...item, lessonKey: migratedLessonKey };
    }
    return item;
  });
  return { next, changed };
}

export function migrateLegacyModuleStorage(payload) {
  if (!payload || typeof payload !== "object") {
    return { payload, migrated: false };
  }

  let migrated = false;
  const nextPayload = { ...payload };

  const arrayFields = ["completed", "bookmarks"];
  for (const field of arrayFields) {
    const { next, changed } = migrateArrayKeys(nextPayload[field]);
    nextPayload[field] = next;
    migrated = migrated || changed;
  }

  const objectFields = [
    "lessonStates",
    "reviewChecks",
    "reviewEvidence",
    "cohortChecks",
    "cohortEvidence",
    "artifactChecks",
    // moduleIntroSeen/moduleOutroReady intentionally excluded:
    // they are keyed by canonical module id (e.g., 8.5), not storage slug.
  ];
  for (const field of objectFields) {
    const { next, changed } = migrateObjectKeys(nextPayload[field]);
    nextPayload[field] = next;
    migrated = migrated || changed;
  }

  const { next: weakConcepts, changed: weakConceptsChanged } = migrateWeakConcepts(
    nextPayload.weakConcepts
  );
  nextPayload.weakConcepts = weakConcepts;
  migrated = migrated || weakConceptsChanged;

  return { payload: migrated ? nextPayload : payload, migrated };
}
