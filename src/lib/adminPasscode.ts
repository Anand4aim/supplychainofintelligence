// In-memory admin passcode store.
// Deliberately NOT persisted to localStorage/sessionStorage — the shared
// admin secret must not survive page reload or be readable by any script
// on the origin. Admins re-authenticate each browser session; that is the
// intended UX for a rarely-visited operator cockpit.

let currentPasscode: string | null = null;

export function setAdminPasscode(code: string): void {
  currentPasscode = code;
}

export function getAdminPasscode(): string {
  return currentPasscode ?? "";
}

export function clearAdminPasscode(): void {
  currentPasscode = null;
}

export function hasAdminPasscode(): boolean {
  return !!currentPasscode;
}
