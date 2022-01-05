export function generateId() {
  let idStr = Date.now().toString(36);
  idStr += Math.random().toString(36).slice(2);
  return idStr;
}
