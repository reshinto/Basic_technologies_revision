function hashString(string) {
  let hash = 0;
  if (string.length === 0) return hash;
  for (let i = 0; i < string.length; i++) {
    const charCode = string.charCodeAt(i);
    hash = (hash << 5) - hash + charCode;
    hash |= 0;
  }
  return hash;
}

function computeScore(username, server) {
  const usernameHash = hashString(username);
  const serverHash = hashString(server);
  // just for example purposes to make it work, normally do not write this yourself
  return (usernameHash * 13 + serverHash * 11) % 67;
}

module.exports.hashString = hashString;
module.exports.computeScore = computeScore;
